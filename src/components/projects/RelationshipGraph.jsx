import BaseApp from "../BaseApp";
import { 
  useContext, 
  useEffect, 
  useState 
} from 'react';
//-- contexts
import { ThemeNavContext } from '../../contexts/ThemeNavContext';
import { 
  RGComponentContext,
  RGExample1Context,
  RGExample2Context,
  RGExample3Context
} from '../../contexts/RelationshipGraphState';
//-- components
import SpecPanel from "./base/control/SpecPanel";
import ControlPanelComponent from "./relationshipGraph/controlPanel/ControlPanelComponent";
import ControlPanelObserve from "./relationshipGraph/controlPanel/ControlPanelObserve";
import ControlPanelSubpage from "./relationshipGraph/controlPanel/ControlPanelSubpage";
import ControlPanelSinglepage from "./relationshipGraph/controlPanel/ControlPanelSinglepage";
import RGComponentSection from "./relationshipGraph/components/RGComponentSection";
import ExamplePageObserve from "./relationshipGraph/pages/ExamplePageObserve";
import ExamplePageSubpage from "./relationshipGraph/pages/ExamplePageSubpage";
import ExamplePageSinglepage from "./relationshipGraph/pages/ExamplePageSinglepage";
//
//-- styles
import "../../styles/RelationshipGraph.scss";


const RelationshipGraph = (props) => {
  // const { setHideNav } = useContext(ThemeNavContext);

  const sectionTitles = [
    "Application Performance Monitoring",
    "Kubernetes",
    "Infrastructure"
  ];
  const componentTitles = [
    ["Services", "Service Instances"],
    ["Clusters", "Namespaces", "Workloads", "Pods", "Ingresses"],
    ["Hosts", "Load Balancers", "Storage", "Databases", "Test0", "Test1", "Test2", "Test3", "Test4", "Test5", "Test6", "Test7", "Test8", "Test9"]
  ];

  const [selectedEntityGroupIndex, setSelectedEntityGroupIndex] = useState(2);  //-- default to Kubernetes
  const [selectedSubEntityGroupIndex, setSelectedSubEntityGroupIndex] = useState(0);  //-- default to Kubernetes
  const [selectedSingleEntityGroupIndex, setSelectedSingleEntityGroupIndex] = useState(1);  //-- default to Kubernetes
  const [selectedMainHeader, setSelectedMainHeader] = useState("Namespaces (1)");  //-- default to Kubernetes
  const [isComponentCenterAlign, setIsComponentCenterAlign] = useState(true);
  const [isObserveCenterAlign, setIsObserveCenterAlign] = useState(true);
  const [isSubpageCenterAlign, setIsSubpageCenterAlign] = useState(true);
  const [isSinglepageCenterAlign, setIsSinglepageCenterAlign] = useState(true);
  const [showGridsComponent, setShowGridsComponent] = useState(false);
  const [showGridsObserve, setShowGridsObserve] = useState(false);
  const [isGridTypeComp, setIsGridTypeComp] = useState("type1Grid");  //flexBox, type1Grid, type2Grid
  const [isGridTypeObserve, setIsGridTypeObserve] = useState("type1Grid");

  const { 
    setHideNav,
    isNavOpen, setIsNavOpen,
   } = useContext(ThemeNavContext);

  useEffect(() => {
    setHideNav(false);
    if (isNavOpen) setIsNavOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onShowGridsChange = (e) => { 
    // console.log("onShowGridsChange");
  }

  return (
    <BaseApp  title={props.title}
              projClassName="RelationshipGraph"
              isBackHome={props.isBackHome}
              isDark={props.isDark}>
      <div className="container">
        <p className="headline"><b>{props.title}</b></p>
        <section id="relationshipComponents">
          <h1>Components</h1>
          <SpecPanel  width={1200} 
                      content={<p>- minimum body width: 600px<br></br>
                      - component size: 230px (246px w. 16px margin-right) x 187px<br></br>
                        &nbsp;(187px = entity header height: 47px + entity holder height: 140px)<br></br>
                      - minimum entity radius: 6px, and maximum entity radius: 30px<br></br><br></br>
                      <u>improvements</u><br></br>
                      1. foldable domain section header w. hover state - color change to secondary-100 (#ffffff from white-94)<br></br>
                      2. entity header hover state added - underline, color change to primary-82 (#bca3ff from white-64), and<br></br> 
                      &nbsp;&nbsp;&nbsp;shows entity holder background (#ffffff w. 10% opacity, 6px border radius)<br></br>
                      3. entity hover state updated - brightness change to 115%, and outline around (primary-75, #a280ff)<br></br>
                      4. entity radius ranges from 6px to 30px (diameter: 12px~60px)<br></br>
                      5. layout wraps responsively w. maximum 2 columns of components at minimum body width, 600px<br></br>
                      &nbsp;&nbsp;&nbsp;- Flexbox : component width fixed at 230px<br></br>
                      &nbsp;&nbsp;&nbsp;- Grid1: component width dynamically adjusted to fill the whole row with keeping the minimum width of 230px<br></br>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));)<br></br>
                      &nbsp;&nbsp;&nbsp;- Grid2: component width dynamically adjusted to take 4 grids <br></br>
                      </p>} 
          />
          <RGComponentContext.Provider 
            value={{  
              selectedEntityGroupIndex, setSelectedEntityGroupIndex,
              isComponentCenterAlign, setIsComponentCenterAlign,
              showGridsComponent, setShowGridsComponent,
              isGridTypeComp, setIsGridTypeComp,
            }}
          >
          <ControlPanelComponent onShowGridsChange={onShowGridsChange} />
          <RGComponentSection sectionTitle={sectionTitles[selectedEntityGroupIndex]} 
                              componentTitles={componentTitles[selectedEntityGroupIndex]} 
                              isOutline={true}
                              isCenterAlign={isComponentCenterAlign}
                              isObservePage={false}
                              gridType={isGridTypeComp}
                              compBkg={showGridsComponent}
          />
          </RGComponentContext.Provider>
        </section> {/* section #components */}
        <section id="relationshipExamples">
          <h1>Page Examples</h1>
          <RGExample1Context.Provider 
            value={{  
              isObserveCenterAlign, setIsObserveCenterAlign,
              showGridsObserve, setShowGridsObserve,
              isGridTypeObserve, setIsGridTypeObserve,
            }}
          >
            <h2 className="pageHeader" 
            id="relationshipObservePage"
            >1. Observe Page</h2>
            <ControlPanelObserve />
            <ExamplePageObserve />
          </RGExample1Context.Provider>
          <RGExample2Context.Provider 
            value={{  
              selectedSubEntityGroupIndex, setSelectedSubEntityGroupIndex,
              selectedMainHeader, setSelectedMainHeader,
              isSubpageCenterAlign, setIsSubpageCenterAlign
            }}
          >
            <h2 className="pageHeader" id="subPage">2. Sub Page</h2>
            <SpecPanel  width={1250} 
                        content={<p>
                          - relationship panel width: 230px<br></br>
                          - component size: 190px x 120px<br></br><br></br>
                        <u>improvements</u><br></br>
                        1. "Show all"/"Show less" option added<br></br>
                        2. foldable domain section header w. selected state - color change to rgba(white, .94) with border bottom <br></br>
                        3. page starts with a selected domain open<br></br>
                        4. <u><b>when an entity header selected</b>, for selecting the whole group of entities</u> (e.g. APM &gt; Services)<br></br>
                        &nbsp;&nbsp;&nbsp;selected entity header is not selectable<br></br>  
                        &nbsp;&nbsp;&nbsp;- color change to primary-82 (#bca3ff), and default cursor<br></br>
                        &nbsp;&nbsp;&nbsp;- shows component background in primary-69, #8b61ff, w. 30% opacity<br></br>
                        5.  <u><b>when a type of entity, a node, selected</b></u> (e.g. Kubernetes &gt; Namespaces &gt; critical 1, or Infrastructure &gt; Storage&gt; unknown 15)<br></br>
                        &nbsp;&nbsp;&nbsp;selected node is not selectable, even when the number of entity is 1 (single entity)<br></br>
                        &nbsp;&nbsp;&nbsp;- brightness change to 115%, outline around, and default cursor<br></br>
                        </p>} 
            />
            <ControlPanelSubpage />
            <ExamplePageSubpage/> 
          </RGExample2Context.Provider>
          <RGExample3Context.Provider 
            value={{  
              selectedSingleEntityGroupIndex, setSelectedSingleEntityGroupIndex,
              isSinglepageCenterAlign, setIsSinglepageCenterAlign
            }}
          >
            <h2 className="pageHeader" id="singleEntityPage">3. Single Entity (Sub-sub) Page</h2>
            <SpecPanel  width={1200} 
                        content={<p>component size: 190px x 120px<br></br><br></br>
                        <u>improvements</u><br></br>
                        1. page starts with a selected domain open<br></br>
                        2. selected entity header state updated - color change to primary-82 (#bca3ff), and non-selectable w. default cursor<br></br>  
                        3. any current selection - header or entity - is not selectable<br></br>
                        4. selecting previous breadcrumb lists all the entities in the selected header group<br></br>
                        </p>} 
            />
            <ControlPanelSinglepage />
            <ExamplePageSinglepage/> 
          </RGExample3Context.Provider>
        </section> {/* section #pageExamples */}
      </div> {/* div.container */}
    </BaseApp>
  )
};

export default RelationshipGraph;