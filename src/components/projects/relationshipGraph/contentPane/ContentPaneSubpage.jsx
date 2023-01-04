import { 
  useContext, 
  useEffect, 
  useState, 
  useRef 
} from 'react';
//-- contexts
import { RGExample2Context } from '../../../../contexts/RelationshipGraphState';
//-- components
import TopBarPane from "./TopBarPane";
import MainContent from "./MainContent";
import RGPaneComponentSection from '../components/RGPaneComponentSection';


const ContentPaneSubpage = () => {
  const { 
    selectedSubEntityGroupIndex,
    selectedMainHeader,
  } = useContext(RGExample2Context);

  const contentRef = useRef(null);
  const sectionTitles = [
    "APM",
    "Kubernetes",
    "Infrastructure"
  ];
  const componentTitles = [
    ["Services", "Service Instances"],
    ["Clusters", "Namespaces", "Workloads", "Pods", "Ingresses"],
    ["Hosts", "Load Balancers", "Storage", "Databases"]
  ];
  const selectedEntityIndexes = [0, 1, 2];
  const selectedSubpages = ["Services", "Namespaces", "Storage"];
  const dataUpdate = [
    {
      "Services (51)": "",
      "Services (5)": "",
      "Services (46)": ""
    },
    {
      "Namespaces (146)": "",
      "Namespaces (1)": "",
      "Namespaces (25)": "",
      "Namespaces (120)": ""
    },
    {
      "Storage (15)": "data-grid for <b><u>15 unknown entities</u></b>"
    }
  ];
  const contentClassNames = {
    "Services (5)": "serviceHealthy",
    "Services (46)": "serviceUnknown",
    "Services (51)": "serviceAll",
    "Namespaces (1)": "criticalOne",
    "Namespaces (25)": "healthyTwo",
    "Namespaces (120)": "unknownThree",
    "Namespaces (146)": "mixedZero"
  };

  const linkTexts = ["Show all", "Show less"];
  const [bodyPaneW, setBodyPaneW] = useState(0);
  const [isShowAll, setIsShowAll] = useState(0);  //0 or 1

  useEffect(() => {
    function handleResize() {
      if (contentRef.current && contentRef.current.offsetWidth) {
        setBodyPaneW(contentRef.current.offsetWidth);
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onShowAllClickHandler = () => { 
    setIsShowAll((isShowAll + 1) % 2);
  }

  return (
    <div className="contentPane">
      <TopBarPane subClassName="subpage" 
                  breadcrumbPrev = "Observe"
                  breadcrumbCurr={selectedSubpages[selectedSubEntityGroupIndex]}
      />
      <div className="content subpage">
        <div className="contentLeft">
          <div className="relationshipPane">
            <div className="background" />
            <div className="header">
              <span id="title">RELATIONSHIPS</span>
              <span id="showAll" onClick={onShowAllClickHandler}>{linkTexts[isShowAll]}</span>
            </div>
            <div className="componentHolder">
            {
              sectionTitles.map((title, index) => {
                let isOpen = (index === selectedSubEntityGroupIndex)? true : false;
                let selectedIndex = (isOpen)? selectedEntityIndexes[selectedSubEntityGroupIndex] : -1;
                return (<RGPaneComponentSection title={title} key={"" + title + index}
                                                componentTitles={componentTitles[index]} 
                                                isOpen={isOpen}
                                                selectedIndex={selectedIndex}
                        />)
              })
            }
            </div>
          </div>
          <div className="mainPane">
            <div className="bodyHeader">
              <span className="title">{selectedMainHeader}</span>
            </div> 
            <div className="bodyContent" ref={contentRef} >
              <div className="desc" dangerouslySetInnerHTML={{__html: dataUpdate[selectedSubEntityGroupIndex][selectedMainHeader]}} />
              <MainContent  width={bodyPaneW} 
                            contentClassName={ contentClassNames[selectedMainHeader] }
            />
            </div>
          </div>
        </div>
        <div className="inspectorPaneFixed" />
      </div>
    </div>
  )
}

export default ContentPaneSubpage