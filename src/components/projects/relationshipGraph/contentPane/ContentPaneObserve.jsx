import { useContext } from 'react';
//-- contexts
import { RGExample1Context } from '../../../../contexts/RelationshipGraphState';
//-- components
import TopBarPane from "./TopBarPane";
import RGComponentSection from '../components/RGComponentSection';


const ContentPaneObserve = () => {
  const { 
    showGridsObserve, 
    isGridTypeObserve
  } = useContext(RGExample1Context);

  const sectionTitles = [
    "Application Performance Monitoring",
    "Kubernetes",
    "Infrastructure"
  ];
  const componentTitles = [
    ["Services", "Service Instances"],
    ["Clusters", "Namespaces", "Workloads", "Pods", "Ingresses"],
    ["Hosts", "Load Balancers", "Storage", "Databases", "Test1", "Test2", "Test3", "Test4", "Test5", "Test6", "Test7", "Test8"]
  ];

  return (
    <div className="contentPane">
      <TopBarPane subClassName="observe" breadcrumbCurr = "Observe" />
      <div className="selectionTiles" />
      <div className="contentFilter" >
        <div className="filterLeft" >
          <span className="filterIcon"></span>
          <span className="filterSelections"></span>
        </div>
        <div className="clearButton" />
      </div>
      <div className="content observe">
       { showGridsObserve &&
          <div className="particle-rg-fluid">
            <div className="sm"></div>
            <div className="sm"></div>
            <div className="sm"></div>
            <div className="sm"></div>
            <div className="sm"></div>
            <div className="sm"></div>
            <div className="sm"></div>
            <div className="sm"></div>
            <div className="sm md"></div>
            <div className="sm md"></div>
            <div className="sm md"></div>
            <div className="sm md"></div>
            <div className="sm md xxl"></div>
            <div className="sm md xxl"></div>
            <div className="sm md xxl"></div>
            <div className="sm md xxl"></div>
            <div className="sm md xxl"></div>
            <div className="sm md xxl"></div>
            <div className="sm md xxl"></div>
            <div className="sm md xxl"></div>
          </div>
        }
        {
          sectionTitles.map((title, index) => 
            <RGComponentSection key={"" + title + index}
                                sectionTitle={title} 
                                componentTitles={componentTitles[index]} 
                                isObservePage={true}
                                gridType={isGridTypeObserve}
                                compBkg={false}                          
            />)
        }
        
      </div>
      <div className="footer" />
    </div>
  )
}

export default ContentPaneObserve