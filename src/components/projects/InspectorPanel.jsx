import { 
  useContext, 
  useEffect, 
  useState 
} from 'react';
import BaseApp from "../BaseApp";
//-- contexts
import { ThemeNavContext } from '../../contexts/ThemeNavContext';
import { InspectorPanelFixedContext, InspectorPanelSmContext, InspectorPanelLgContext } from '../../contexts/InspectorPanelState';
//-- components
import ControlPanelFixed from "./inspectorPanel/ControlPanelFixed";
import ControlPanelSm from "./inspectorPanel/ControlPanelSm";
import ControlPanelLg from "./inspectorPanel/ControlPanelLg";
import SpecPanel from "./inspectorPanel/SpecPanel";
import ExamplePanelFixed from "./inspectorPanel/ExamplePanelFixed";
import ExamplePanelSm from "./inspectorPanel/ExamplePanelSm";
import ExamplePanelLg from "./inspectorPanel/ExamplePanelLg";
//-- styles
import "../../styles/InspectorPanel.scss";


const InspectorPanel = (props) => {
  const [showGuidesFixed, setShowGuidesFixed] = useState(false);

  const [panelRatioSm, setPanelRatioSm] = useState(.2);
  const [showGuidesSm, setShowGuidesSm] = useState(false);
  const [showGridsSm, setShowGridsSm] = useState(false);
  const [rescaleButtonSm, setRescaleButtonSm] = useState(false); 
  const [hideProperties, setHideProperties] = useState(false);  

  const [panelRatioLg, setPanelRatioLg] = useState(.4);
  const [showGuidesLg, setShowGuidesLg] = useState(false);
  const [showGridsLg, setShowGridsLg] = useState(false);
  const [rescaleButtonLg, setRescaleButtonLg] = useState(false);   
   
  const { 
    setHideNav,
    isNavOpen, setIsNavOpen,
   } = useContext(ThemeNavContext);

  useEffect(() => {
    setHideNav(true);
    if (isNavOpen) setIsNavOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //-- fixed Panel
  const onShowGuidesChangeFixed = (e) => { setShowGuidesFixed(!showGuidesFixed) }

  //-- small Panel related ---------- //
  const onPanelRatioChangeSm = (e) => { setPanelRatioSm(e.target.value) }
  const onShowGuidesChangeSm = (e) => { setShowGuidesSm(!showGuidesSm) }
  const onShowGridsChangeSm = (e) => { setShowGridsSm(!showGridsSm) }
  const onRescaleButtonChangeSm = (e) => { setRescaleButtonSm(!rescaleButtonSm) }
  const onHidePropertiesChange = (e) => { setHideProperties(!hideProperties) }
  //--------------------------------- //

  //-- large Panel related ---------- //
  const onPanelRatioChangeLg = (e) => { setPanelRatioLg(e.target.value) }
  const onShowGridsChangeLg = (e) => { setShowGridsLg(!showGridsLg) }
  const onShowGuidesChangeLg = (e) => { setShowGuidesLg(!showGuidesLg) }
  const onRescaleButtonChangeLg = (e) => { setRescaleButtonLg(!rescaleButtonLg) }
  //--------------------------------- //

  return (
    <BaseApp  title={props.title} 
              projClassName="InspectorPanel"
              isBackHome={props.isBackHome}
              isDark={props.isDark}>
      <div className="container">
        <p className="headline"><b>{props.title}</b></p>
        <section id="fixedWidth">
          <h1>Fixed Width Inspector Panel w. Body Resizing</h1>
          <InspectorPanelFixedContext.Provider 
            value={{  
              showGuidesFixed,
            }}
          >
            <ControlPanelFixed 
                          type="Fixed" 
                          ratioLabelList={ [" 20% (2/10)", " 16.7% (2/12)"] }
                          ratioList={ [.2, .167] } 
                          onShowGuidesChange={onShowGuidesChangeFixed} 
                          />
            <SpecPanel  width={800} height={25} 
                        content={<p>
                          - body min-width: 600px with 12px margins,<br></br>
                          - inspector panel width: 230px (fixed)</p>} />
            <ExamplePanelFixed />
          </InspectorPanelFixedContext.Provider>
        </section>
        <section id="smallPanel">
          <h1>Small Inspector Panel</h1>
          <InspectorPanelSmContext.Provider 
            value={{  
              panelRatioSm,
              showGridsSm,
              showGuidesSm,
              rescaleButtonSm,
              hideProperties
            }}>
            <ControlPanelSm type="Sm" 
                          ratioLabelList={ [" 20% (2/10 grids)", " 16.7% (2/12 grids)"] }
                          ratioList={ [.2, .167] } 
                          onPanelRatioChange={onPanelRatioChangeSm} 
                          onShowGridsChange={onShowGridsChangeSm} 
                          onShowGuidesChange={onShowGuidesChangeSm} 
                          onRescaleButtonChange={onRescaleButtonChangeSm}
                          onHidePropertiesChange={onHidePropertiesChange}
            />
            <SpecPanel  width={1200} height={43} 
                        content={<p>
                          - body min-width: 600px,<br></br>
                          - content pane min-width: 854px = 230px (relationship pane) + 12px (left margin) + 600px (body min-width) + 12px (right margin),<br></br>
                          - inspector panel min-width: 230px & max-width: 460px, {panelRatioSm * 100}% of total content width</p>} 
            />
            <ExamplePanelSm />
          </InspectorPanelSmContext.Provider>
        </section>
        <section id="largePanel">
          <h1>Large Inspector Panel</h1>
          <InspectorPanelLgContext.Provider 
            value={{  
              panelRatioLg,
              showGridsLg,
              showGuidesLg,
              rescaleButtonLg
            }}>
            <ControlPanelLg type="Lg" 
                          ratioLabelList={ [" 40% (4/10 grids)", " 33.4% (4/12 grids)"] }
                          ratioList={ [.4, .334] } 
                          onPanelRatioChange={onPanelRatioChangeLg} 
                          onShowGridsChange={onShowGridsChangeLg} 
                          onShowGuidesChange={onShowGuidesChangeLg}
                          onRescaleButtonChange={onRescaleButtonChangeLg} 
            />
            <SpecPanel  width={1200} height={43} 
                        content={<p>
                          - body min-width: 600px,<br></br>
                          - content pane min-width: 624px = 12px (left margin) + 600px (body min-width) + 12px (right margin),<br></br>
                          - inspector panel min-width: 460px & max-width: 920px, {panelRatioLg * 100}% of total content width</p>} 
            />
            <ExamplePanelLg />
          </InspectorPanelLgContext.Provider>
        </section>
      </div>
    </BaseApp>
  )
};

export default InspectorPanel;