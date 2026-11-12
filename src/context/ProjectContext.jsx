import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  loadProjectState,
  saveProjectState,
  resetProjectState,
  executeScenarioA,
  executeScenarioB,
  executeScenarioC,
  executeScenarioD,
} from '../services/demoDataService';

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [project, setProject] = useState(() => loadProjectState());
  const [activeScenario, setActiveScenario] = useState('A'); // 'A', 'B', 'C', 'D'

  useEffect(() => {
    saveProjectState(project);
  }, [project]);

  const updateProject = (updater) => {
    setProject((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      saveProjectState(next);
      return next;
    });
  };

  const runScenario = (scenarioKey) => {
    setActiveScenario(scenarioKey);
    let next;
    if (scenarioKey === 'A') {
      next = executeScenarioA(loadProjectState(), false);
    } else if (scenarioKey === 'B') {
      next = executeScenarioB(loadProjectState());
    } else if (scenarioKey === 'C') {
      next = executeScenarioC(loadProjectState());
    } else if (scenarioKey === 'D') {
      next = executeScenarioD(loadProjectState());
    }
    if (next) setProject(next);
  };

  const resetAll = () => {
    const fresh = resetProjectState();
    setProject(fresh);
    setActiveScenario('A');
  };

  return (
    <ProjectContext.Provider
      value={{
        project,
        updateProject,
        activeScenario,
        runScenario,
        resetAll,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
