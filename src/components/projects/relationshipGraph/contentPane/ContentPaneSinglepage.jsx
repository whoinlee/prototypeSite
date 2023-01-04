import { 
  useContext, 
  useEffect, 
  useRef,
  useState, 
} from 'react';
//-- contexts
import { RGExample3Context } from '../../../../contexts/RelationshipGraphState';
//-- components
import TopBarPane from "./TopBarPane";
import MainContent from "./MainContent";
import RGPaneComponentSection from '../components/RGPaneComponentSection';
import RGPaneSingleEntitySection from '../components/RGPaneSingleEntitySection';


const ContentPaneSinglepage = () => {
  const { 
    selectedSingleEntityGroupIndex, isSinglepageCenterAlign
  } = useContext(RGExample3Context);

  const contentRef = useRef(null);
  const [bodyPaneW, setBodyPaneW] = useState(0);
  const [isShowAll, setIsShowAll] = useState(0);  //0 or 1

  const linkTexts = ["Show all", "Show less"];

  const domainTitles = [
    "APM",
    "Kubernetes",
    "Infrastructure"
  ];
  const componentHeaderTitles = [
    ["Services"],
    ["Namespaces", "Workloads", "Ingresses"],
    ["Storage", "Databases"]
  ];
  const selectedEntityHeaderTitles = [
    ["Service"],
    ["Namespace", "Workloads", "Ingresses"],
    ["Storage", "Databases"]
  ];
  const selectedEntityIndexes = [0, 1, 2];
  const selectedPageHeaders = [
      "Service: brostatus-entity-11eli", 
      "Namespace: load", 
      "Storage: long-long-long-long-entity-title"];
  const selectedSubpages = ["Services", "Namespaces", "Storage"];
  const selectedEntityTitles = ["brostatus-entity-11eli", "load", "long-long-long-long-entity-title"];
  const dataGridTexts = [
    "info, charts and graphs, for <b><u>brostatus-entity-11eli</u></b>",
    // "info, charts and graphs, for <b><u>load</u></b>",
    "",
    "info, charts and graphs, for <b><u>long-long-long-long-entity-title</u></b>"
  ];
  // const dataGridTexts = [ "", "", "" ];
  const contentClassNames = ["", "loadOne", ""];

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
                  breadcrumbPrevPrev = "Observe"
                  breadcrumbPrev = {selectedSubpages[selectedSingleEntityGroupIndex]}
                  breadcrumbCurr={selectedEntityTitles[selectedSingleEntityGroupIndex]}
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
              domainTitles.map((title, index) => {
                let isOpen = (index === selectedSingleEntityGroupIndex)? true : false;
                let selectedIndex = (isOpen)? selectedEntityIndexes[selectedSingleEntityGroupIndex] : -1;
                if (selectedIndex >= 0)
                return (<RGPaneSingleEntitySection key={"" + title + index}
                    title={title} 
                    componentTitles={selectedEntityHeaderTitles[index]} 
                    isOpen={isOpen}
                    selectedIndex={selectedIndex}
                    />)
                else {
                  return (<RGPaneComponentSection key={"" + title + index}
                    title={title} 
                    componentTitles={componentHeaderTitles[index]} 
                    isOpen={isOpen}
                    selectedIndex={selectedIndex}
                    isCenterAlign={isSinglepageCenterAlign}
                    />)
                }
              })
            }
            </div>
          </div>
          <div className="mainPane">
            <div className="bodyHeader">
              <span className="title">{selectedPageHeaders[selectedSingleEntityGroupIndex]}</span>
            </div> 
            <div className="bodyContent" ref={contentRef} >
                <div className="desc" dangerouslySetInnerHTML={{__html: dataGridTexts[selectedSingleEntityGroupIndex]}} />
                <MainContent width={bodyPaneW} 
                             contentClassName={contentClassNames[selectedSingleEntityGroupIndex]}
                             />
            </div>
          </div>
        </div>
        <div className="inspectorPaneFixed" />
      </div>
    </div>
  )
}

export default ContentPaneSinglepage