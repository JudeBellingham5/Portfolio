import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, collection, deleteDoc, getDocs, writeBatch } from 'firebase/firestore';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase';
import { INITIAL_DATA } from '../data/defaultData';

const STORAGE_KEY = 'portfolio_data_v1';

interface PortfolioContextType {
  data: typeof INITIAL_DATA;
  updateData: (newData: typeof INITIAL_DATA) => Promise<void>;
  isLoaded: boolean;
  isSyncing: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState(INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // 1. Listen to Settings
    const settingsRef = doc(db, 'settings', 'portfolio');
    const unsubscribeSettings = onSnapshot(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        const remoteData = snapshot.data();
        setData(prev => ({
          ...prev,
          ...remoteData,
          hero: { ...INITIAL_DATA.hero, ...(remoteData.hero || {}) },
          profile: { 
            ...INITIAL_DATA.profile, 
            ...(remoteData.profile || {}),
            info: { ...INITIAL_DATA.profile.info, ...(remoteData.profile?.info || {}) }
          },
          contact: { ...INITIAL_DATA.contact, ...(remoteData.contact || {}) },
          competencies: remoteData.competencies || INITIAL_DATA.competencies
        }));
        setIsLoaded(true);
      } else {
        // Fallback to local if no remote settings
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData && !isLoaded) {
          try {
            const parsed = JSON.parse(savedData);
            setData(prev => ({ ...prev, ...parsed }));
          } catch (e) {
            console.error('Failed to parse local data', e);
          }
        }
        setIsLoaded(true);
      }
    }, (error) => {
      console.error("Settings Firestore Error:", error);
    });

    // 2. Listen to Projects Collection
    const projectsRef = collection(db, 'projects');
    const unsubscribeProjects = onSnapshot(projectsRef, (snapshot) => {
      const remoteProjects = snapshot.docs.map(doc => doc.data() as typeof INITIAL_DATA.projects[0]);
      // Sort by id to maintain order
      const sortedProjects = remoteProjects.sort((a, b) => a.id - b.id);
      
      if (sortedProjects.length > 0) {
        setData(prev => ({
          ...prev,
          projects: sortedProjects
        }));
      }
    }, (error) => {
      console.error("Projects Firestore Error:", error);
    });

    return () => {
      unsubscribeSettings();
      unsubscribeProjects();
    };
  }, []);

  const updateData = async (newData: typeof INITIAL_DATA) => {
    setIsSyncing(true);
    try {
      // Always save to localStorage as backup
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      
      const batch = writeBatch(db);

      // 1. Save Settings (excluding projects)
      const { projects, ...settingsData } = newData;
      const settingsRef = doc(db, 'settings', 'portfolio');
      batch.set(settingsRef, settingsData);

      // 2. Handle Projects
      // First, get existing projects to know what to delete
      const projectsRef = collection(db, 'projects');
      const existingDocs = await getDocs(projectsRef);
      const existingIds = existingDocs.docs.map(d => d.id);
      const newIds = projects.map(p => p.id.toString());

      // Delete removed projects
      existingIds.forEach(id => {
        if (!newIds.includes(id)) {
          batch.delete(doc(db, 'projects', id));
        }
      });

      // Update/Create projects
      projects.forEach(project => {
        const projectRef = doc(db, 'projects', project.id.toString());
        batch.set(projectRef, project);
      });

      await batch.commit();
      setData(newData);
    } catch (e) {
      console.error('Failed to save data', e);
      alert('데이터 저장 중 오류가 발생했습니다. 개별 프로젝트의 이미지 용량을 줄여보세요.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <PortfolioContext.Provider value={{ data, updateData, isLoaded, isSyncing }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
