import { Link } from "react-router-dom";
import { useContext, useEffect } from 'react';
//-- contexts
import { ThemeNavContext } from '../../contexts/ThemeNavContext';
//-- components
import BaseApp from "../BaseApp";
//-- styles
import "../../styles/HomePage.scss";


const HomePage = (props) => {
  const { 
    setResetNav,
    setHideNav,
    setIsNavOpen,
  } = useContext(ThemeNavContext);

  useEffect(() => {
    setResetNav(true);
    setHideNav(false);
    setIsNavOpen(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BaseApp  title={props.title}
              projClassName="HomePage"
              isBackHome={props.isBackHome}
              isDark={props.isDark}>
      <p className="headline"><b>{props.title}</b></p>
      { props.projects.map((project, index) => 
          <Link key={index + project.title} 
                style={
                  (project.isActive)? activeStyle:inactiveStyle
                }
                to={project.path}
                className='homeLink'
          >{project.title}</Link>
      ) }
    </BaseApp>
  );
}

const activeStyle = {
  opacity: "100%"
};

const inactiveStyle = {
  opacity: "50%"
};

export default HomePage;