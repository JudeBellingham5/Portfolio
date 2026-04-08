import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
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
    // 1. Ensure anonymous auth for Firestore access
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        signInAnonymously(auth).catch(console.error);
      }
    });

    // 2. Listen to Firestore
    const docRef = doc(db, 'settings', 'portfolio');
    const unsubscribeDoc = onSnapshot(docRef, async (snapshot) => {
      if (snapshot.exists()) {
        const remoteData = snapshot.data() as typeof INITIAL_DATA;
        setData({
          ...INITIAL_DATA,
          ...remoteData,
          hero: { ...INITIAL_DATA.hero, ...(remoteData.hero || {}) },
          profile: { 
            ...INITIAL_DATA.profile, 
            ...(remoteData.profile || {}),
            info: { ...INITIAL_DATA.profile.info, ...(remoteData.profile?.info || {}) }
          },
          contact: { ...INITIAL_DATA.contact, ...(remoteData.contact || {}) }
        });
        setIsLoaded(true);
      } else {
        // If no remote data, check localStorage for migration
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          try {
            const parsed = JSON.parse(savedData);
            const merged = {
              ...INITIAL_DATA,
              ...parsed,
              hero: { ...INITIAL_DATA.hero, ...(parsed.hero || {}) },
              profile: { 
                ...INITIAL_DATA.profile, 
                ...(parsed.profile || {}),
                info: { ...INITIAL_DATA.profile.info, ...(parsed.profile?.info || {}) }
              },
              contact: { ...INITIAL_DATA.contact, ...(parsed.contact || {}) }
            };
            setData(merged);
            
            // Auto-migrate to Firestore if we have auth
            if (auth.currentUser) {
              await setDoc(docRef, merged);
            }
          } catch (e) {
            console.error('Failed to parse local data', e);
          }
        }
        setIsLoaded(true);
      }
    }, (error) => {
      console.error("Firestore Error:", error);
      setIsLoaded(true); // Fallback to initial data
    });

    return () => {
      unsubscribeAuth();
      unsubscribeDoc();
    };
  }, []);

  const updateData = async (newData: typeof INITIAL_DATA) => {
    setIsSyncing(true);
    try {
      // Always save to localStorage as backup
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      
      // Save to Firestore
      const docRef = doc(db, 'settings', 'portfolio');
      await setDoc(docRef, newData);
      
      setData(newData);
    } catch (e) {
      console.error('Failed to save data', e);
      alert('데이터 저장 중 오류가 발생했습니다. 이미지 용량이 너무 크면(1MB 초과) 저장이 실패할 수 있습니다.');
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
