import { useContext, useEffect, useState, useRef } from 'react';
//-- contexts
import { InspectorPanelSmContext } from '../../../contexts/InspectorPanelState';
//-- components
import TopBarPaneSm from "./contentPane/TopBarPaneSm";
import InspectorPaneSm from "./contentPane/InspectorPaneSm";
import MainContent from "./contentPane/MainContent";


const minInspectorW = 230;
const maxInspectorW = 460;
const relationshipPaneW = 230;

const ContentPaneSm = () => {
  const { 
    panelRatioSm,
    showGridsSm,
    showGuidesSm,
  } = useContext(InspectorPanelSmContext);
  const [contentLeftStyle, setContentLeftStyle] = useState({ "width" : Math.floor((1-panelRatioSm)*100) +"%"});
  const [inspectorPaneW, setInspectorPaneW] = useState(minInspectorW);
  const [contentLeftPaneW, setContentLeftPaneW] = useState(0);
  const [mainPaneW, setMainPaneW] = useState(0);
  const [contentClassName, setContentClassName] = useState("content sm");
  const contentRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      let inspectorW, contentLeftW;
      if (contentRef.current && contentRef.current.offsetWidth) {
        inspectorW = Math.round(contentRef.current.offsetWidth * panelRatioSm);
        if (inspectorW < minInspectorW) inspectorW = minInspectorW
        else if (inspectorW > maxInspectorW) inspectorW = maxInspectorW;
        contentLeftW = Math.round(contentRef.current.offsetWidth - inspectorW);
        //
        setInspectorPaneW(inspectorW);
        setContentLeftPaneW(contentLeftW);
        setMainPaneW(contentLeftW - relationshipPaneW);
        setContentLeftStyle ({ "width" : "" + contentLeftW + "px" });
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    let contentClassName = "content sm";
    if (showGridsSm) contentClassName += " showGrids";
    if (!showGuidesSm) contentClassName += " noBorder"
    setContentClassName(contentClassName);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panelRatioSm, showGridsSm, showGuidesSm]);

  return (
    <div className="contentPane">
      <TopBarPaneSm />
      <div ref={contentRef} 
           className={contentClassName} >
        <div className="contentLeft" style={ contentLeftStyle } >
          
          <div className="relationshipPane">
            <div className="background" />
          </div>
          <div className="mainPane Sm">
            <div className="contentHolder" />
            {/* 12(padding)x2 = 24 */}
            {/* 24-->26, but outline takes space */}
            <MainContent width={mainPaneW - 26} height={951} contentClassName="main Sm"/>
          </div>
         { showGuidesSm && 
          <div className="paneWidthIndicator" style={ {"right":"6px", "left": "auto"} }>{contentLeftPaneW}</div>
         }
        </div>
        <InspectorPaneSm paneW={inspectorPaneW} />
        { showGridsSm && (panelRatioSm > .19) &&
            <div className="particle-rg-fluid-body-sm-10">
              <div className="sm"></div>
              <div className="sm"></div>
              <div className="sm"></div>
              <div className="sm"></div>
              <div className="sm"></div>
              <div className="sm"></div>
              <div className="sm"></div>
              <div className="sm"></div>
              <div className="sm"></div>
              <div className="sm"></div>
            </div>
        }
        { showGridsSm && (panelRatioSm < .19) &&
            <div className="particle-rg-fluid-body-sm-12">
              <div className="sm"></div>
              <div className="sm"></div>
              <div className="sm"></div>
              <div className="sm"></div>
              <div className="sm"></div>
              <div className="sm"></div>
              <div className="sm"></div>
              <div className="sm"></div>
              <div className="sm"></div>
              <div className="sm"></div>
              <div className="sm"></div>
              <div className="sm"></div>
            </div>
        }   
      </div>
    </div>
  )
}

export default ContentPaneSm