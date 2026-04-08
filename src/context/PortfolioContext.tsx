import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DATA } from '../data/defaultData';

const STORAGE_KEY = 'portfolio_data_v1';

interface PortfolioContextType {
  data: typeof INITIAL_DATA;
  updateData: (newData: typeof INITIAL_DATA) => void;
  isLoaded: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState(INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setData({
          ...INITIAL_DATA,
          ...parsed,
          hero: { ...INITIAL_DATA.hero, ...(parsed.hero || {}) },
          profile: { 
            ...INITIAL_DATA.profile, 
            ...(parsed.profile || {}),
            info: { ...INITIAL_DATA.profile.info, ...(parsed.profile?.info || {}) }
          },
          contact: { ...INITIAL_DATA.contact, ...(parsed.contact || {}) }
        });
      } catch (e) {
        console.error('Failed to parse saved data', e);
        setData(INITIAL_DATA);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateData = (newData: typeof INITIAL_DATA) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setData(newData);
    } catch (e) {
      console.error('Failed to save to localStorage', e);
      alert('저장 공간이 부족하거나 오류가 발생했습니다. 이미지 용량을 줄여보세요.');
    }
  };

  return (
    <PortfolioContext.Provider value={{ data, updateData, isLoaded }}>
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
