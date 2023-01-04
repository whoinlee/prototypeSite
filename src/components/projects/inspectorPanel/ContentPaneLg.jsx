import { useContext, useEffect, useState, useRef } from 'react';
//-- contexts
import { InspectorPanelLgContext } from '../../../contexts/InspectorPanelState';
//-- components
import TopBarPaneLg from "./contentPane/TopBarPaneLg";
import InspectorPaneLg from "./contentPane/InspectorPaneLg";
import MainContent from "./contentPane/MainContent";


const minInspectorW = 460;
const maxInspectorW = 920;
const ContentPaneLg = () => {
  const { 
    panelRatioLg,
    showGridsLg,
    showGuidesLg,
  } = useContext(InspectorPanelLgContext);
  const contentRef = useRef(null);
  const [contentLeftStyle, setContentLeftStyle] = useState({ "width" : Math.floor((1-panelRatioLg)*100) +"%"});
  const [inspectorPaneW, setInspectorPaneW] = useState(minInspectorW);
  const [contentLeftPaneW, setContentLeftPaneW] = useState(0);
  const [contentClassName, setContentClassName] = useState("content lg");
  
  useEffect(() => {
    function handleResize() {
      let inspectorW, contentLeftW;
      if (contentRef.current && contentRef.current.offsetWidth) {
        inspectorW = Math.round(contentRef.current.offsetWidth * panelRatioLg);
        if (inspectorW < minInspectorW) inspectorW = minInspectorW
        else if (inspectorW > maxInspectorW) inspectorW = maxInspectorW;
        contentLeftW = Math.round(contentRef.current.offsetWidth - inspectorW);
        //
        setInspectorPaneW(inspectorW);
        setContentLeftPaneW(contentLeftW);
        setContentLeftStyle ({ "width" : "" + contentLeftW + "px"});
      } 
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    let contentClassName = "content lg";
    if (showGridsLg) contentClassName += " showGrids";
    if (!showGuidesLg) contentClassName += " noBorder"
    setContentClassName(contentClassName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panelRatioLg, showGridsLg, showGuidesLg]);

  return (
    <div className="contentPane">
      <TopBarPaneLg />
      <div  ref={contentRef} 
            className={contentClassName} >
        <div className="contentLeft" style={ contentLeftStyle } >
          <div className="mainPane Lg">
            <div className="contentHolder" />
            {/* <MainContent width={contentLeftPaneW - 40} contentClassName="main Lg"/> */}
            {/* 24-->26, but outline takes space */}
            <MainContent width={contentLeftPaneW - 26} height={951} contentClassName="main Lg"/>
          </div>
          { showGuidesLg &&
            <div className="paneWidthIndicator" style={ {"right":"5px", "left": "auto"} }>{contentLeftPaneW}</div>
          }
        </div>
        <InspectorPaneLg paneW={inspectorPaneW} />
        { showGridsLg && (panelRatioLg > .39) &&
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
        { showGridsLg && (panelRatioLg < .39) &&
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

export default ContentPaneLg