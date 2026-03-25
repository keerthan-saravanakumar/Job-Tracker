/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { fetchMockJobs } from '../services/api';

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useLocalStorage('job-tracker-apps', []);
  const [theme, setTheme] = useLocalStorage('job-tracker-theme', 'light');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const loadInitialData = async () => {
      if (applications.length === 0) {
        setLoading(true);
        const mockJobs = await fetchMockJobs();
        if (mockJobs.length > 0) {
          setApplications(mockJobs);
        }
        setLoading(false);
      }
    };
    loadInitialData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const addApplication = (app) => {
    setApplications(prev => [{ ...app, id: crypto.randomUUID(), bookmarked: false }, ...prev]);
  };

  const updateApplication = (id, updatedApp) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, ...updatedApp } : app));
  };

  const deleteApplication = (id) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const toggleBookmark = (id) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, bookmarked: !app.bookmarked } : app));
  };

  return (
    <ApplicationContext.Provider value={{
      applications,
      setApplications,
      addApplication,
      updateApplication,
      deleteApplication,
      toggleBookmark,
      theme,
      toggleTheme,
      loading
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  return useContext(ApplicationContext);
};
