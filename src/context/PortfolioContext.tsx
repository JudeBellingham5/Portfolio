import React, { createContext, useContext, useState, useEffect } from 'react';
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
    // Load from LocalStorage only
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Merge with INITIAL_DATA to ensure new fields are present
        setData({
          ...INITIAL_DATA,
          ...parsed,
          hero: { ...INITIAL_DATA.hero, ...(parsed.hero || {}) },
          profile: { 
            ...INITIAL_DATA.profile, 
            ...(parsed.profile || {}),
            info: { ...INITIAL_DATA.profile.info, ...(parsed.profile?.info || {}) }
          },
          contact: { ...INITIAL_DATA.contact, ...(parsed.contact || {}) },
          competencies: parsed.competencies || INITIAL_DATA.competencies,
          projects: parsed.projects || INITIAL_DATA.projects
        });
      } catch (e) {
        console.error('Failed to parse local data', e);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateData = async (newData: typeof INITIAL_DATA) => {
    setIsSyncing(true);
    try {
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setData(newData);
    } catch (e) {
      console.error('Failed to save data', e);
      alert('데이터 저장 중 오류가 발생했습니다.');
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
