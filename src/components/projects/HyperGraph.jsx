import { 
  useContext, 
  useEffect, 
  // useState 
} from 'react';
//-- components
import BaseApp from "../BaseApp";
//-- contexts
import { ThemeNavContext } from '../../contexts/ThemeNavContext';
//-- styles
import "../../styles/HyperGraph.scss";


const HyperGraph = (props) => {
  const { 
    setHideNav,
    isNavOpen, setIsNavOpen,
   } = useContext(ThemeNavContext);

  useEffect(() => {
    setHideNav(false);
    if (isNavOpen) setIsNavOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BaseApp  title={props.title} 
              isBackHome={props.isBackHome}
              isDark={props.isDark}>
      <p className="headline"><b>{props.title} Visualization</b></p>
    </BaseApp>
  )
};

export default HyperGraph;