import { createContext, useContext, useState } from 'react';

/**
 * Holds the most recent AI-generated micro-app blueprint in memory.
 */
const AppBuilderContext = createContext(null);

export function AppBuilderProvider({ children }) {
  const [blueprint, setBlueprint] = useState(null);
  return (
    <AppBuilderContext.Provider value={{ blueprint, setBlueprint }}>
      {children}
    </AppBuilderContext.Provider>
  );
}

/**
 * Hook to access the micro-app blueprint context.
 */
export function useAppBuilder() {
  return useContext(AppBuilderContext);
}
