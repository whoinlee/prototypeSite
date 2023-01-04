import { 
  useContext, 
  useEffect, 
  // useState 
} from 'react';
import BaseApp from "../BaseApp";
import useData from '../../utils/useData';
//-- contexts
import { ThemeNavContext } from '../../contexts/ThemeNavContext';
//-- styles
import "../../styles/GroupingVisualization.scss";


const GroupingVisualization = (props) => {
  const data = useData(props.dataURL); //-- memory leak???, CHECK
  const { 
    setHideNav,
    isNavOpen, setIsNavOpen,
   } = useContext(ThemeNavContext);

  useEffect(() => {
    setHideNav(false);
    if (isNavOpen) setIsNavOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) return <div className="BaseApp">Loading data ... </div>
  console.log(props.title + ":: data\n", data);

  return (
    <BaseApp  title={props.title} 
              projClassName="GroupingViz"
              isBackHome={props.isBackHome}
              isDark={props.isDark}>
      <p className="headline"><b>{props.title}</b></p>
      <p className="centered">
        Data loaded from <b>{props.dataURL}</b><br></br>
        Please check the console to see the data.
      </p>
    </BaseApp>
  )
};

export default GroupingVisualization;