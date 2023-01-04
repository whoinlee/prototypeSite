import { useContext, useEffect, useState, useRef } from 'react';
//-- contexts
import { InspectorPanelFixedContext } from '../../../contexts/InspectorPanelState';
//-- components
import TopBarPaneFixed from "./contentPane/TopBarPaneFixed";
import InspectorPaneFixed from "./contentPane/InspectorPaneFixed";
import MainContentFixed from "./contentPane/MainContentFixed";


const inspectorPaneW = 230;
const relationshipPaneW = 230;
const mainPaneClassNameInit ="mainPane Fixed";
const mainMinWidth=600;

const ContentPaneFixed = () => {
  const {showGuidesFixed} = useContext(InspectorPanelFixedContext);
  const [mainPaneW, setMainPaneW] = useState(0);
  const [mainPaneClassName, setMainPaneClassName] = useState(mainPaneClassNameInit);  //07/01/22
  const contentRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      let contentLeftW;
      let mainW;
      if (contentRef.current && contentRef.current.offsetWidth) {
        contentLeftW = Math.round(contentRef.current.offsetWidth - inspectorPaneW);
        mainW = contentLeftW - (relationshipPaneW + 24);  //24 = margin(12)*2
        setMainPaneW(mainW);
        //-- 07/01/22 ---//
        if (mainW <= mainMinWidth) {
          setMainPaneClassName(mainPaneClassName + " scroll");
        } else {
          setMainPaneClassName(mainPaneClassName);
        }
        //-- till here --//
        // console.log("mainPaneW?? ", (contentLeftW - relationshipPaneW) + "\n");
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showGuidesFixed]);

  return (
    <div className="contentPane fixed">
      <TopBarPaneFixed />
      <div  className="content fixed noBorder" 
            ref={contentRef} >
        <div className="contentLeft fixed">
          <div className="relationshipPane">
            <div className="background" />
          </div>
          <div className={(showGuidesFixed) ? mainPaneClassName + " border" : mainPaneClassName} >
            <div id="bodyHeader">
              <div id="title">Generate Policy</div>
              <div id="iconHolder"><span className="add"></span><span className="dots"></span></div>
            </div>
            <div className="contentHolder" style={ {"height" : showGuidesFixed ? "920px" : "924px"} }>
              <div id="flowHolder" style={ {} }/>
              <div id="chartHolder" />
              { mainPaneW > mainMinWidth &&
                <MainContentFixed width={mainPaneW - 8} contentClassName="main Fixed" multiplier={(showGuidesFixed) ? 2.5 : 1} />
              }
            </div>
          </div>
          { showGuidesFixed &&
            <div className="paneWidthIndicator" style={ {"right":"16px", "left":"auto", "top":"4px"} }>{mainPaneW}</div>
          }
        </div>
        <InspectorPaneFixed />
      </div>
    </div>
  )
}

export default ContentPaneFixed