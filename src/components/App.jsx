import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
//-- components
import HomePage from './pages/HomePage';
import NavPane from './base/NavPane';
import TopBar from './base/TopBar';
import * as All from './projects';
//-- contexts
import { ThemeNavContext } from '../contexts/ThemeNavContext';
//-- config
import config from '../config.json';

const Components = {
  SkeletonScreen: All.SkeletonScreen,
  InspectorPanel: All.InspectorPanel,
  RelationshipGraph: All.RelationshipGraph,
  GroupingVisualization: All.GroupingVisualization,
  HyperGraph: All.HyperGraph,
  DragDropIFrame: All.DragDropIFrame,
  DummyProject: All.DummyProject,
  DisplayDensity: All.DisplayDensity,
};

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNavStay, setIsNavStay] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isBarButtonActive, setIsBarButtonActive] = useState(false);
  const [hideNav, setHideNav] = useState(true);
  const [resetNav, setResetNav] = useState(false);
  const [scrollToTop, setScrollToTop] = useState(true);
  const [hideTopBar, setHideTopBar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log('location', location);
    if (location.pathname === '/displayDensity') {
      console.log('hit');
      setHideTopBar(true);
    } else {
      setHideTopBar(false);
    }
  }, [location]);

  return (
    <>
      <ThemeNavContext.Provider
        value={{
          isDarkTheme,
          setIsDarkTheme,
          isNavOpen,
          setIsNavOpen,
          isNavStay,
          setIsNavStay,
          isBarButtonActive,
          setIsBarButtonActive,
          resetNav,
          setResetNav,
          hideNav,
          setHideNav,
          scrollToTop,
          setScrollToTop,
        }}
      >
        <Routes>
          <Route
            path={config.home.path}
            element={
              <HomePage
                title={config.home.title}
                path={config.home.path}
                isDark={config.home.isDark}
                isBackHome={false}
                projects={config.home.projects}
              />
            }
          />
          {config.home.projects.map((project, index) => {
            const ComponentName = Components[project.componentName];
            return (
              <Route
                key={index + project.title}
                exact
                path={project.path}
                element={
                  <ComponentName
                    title={project.title}
                    path={project.path}
                    isDark={project.isDark}
                    isBackHome={project.isBackHome}
                    isIFrame={project.isIFrame}
                    dataURL={project.dataURL}
                  />
                }
              />
            );
          })}
        </Routes>
        <NavPane
          data={config.navPane}
          logo={config.topBar.logo}
          home={config.topBar.home}
        />
        {!hideTopBar && <TopBar data={config.topBar} />}
      </ThemeNavContext.Provider>
    </>
  );
};

export default App;
