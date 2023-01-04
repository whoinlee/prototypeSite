import { useContext, useEffect, useState } from 'react';
//-- contexts
import { InspectorPanelSmContext } from '../../../../contexts/InspectorPanelState';
//-- components
import Actions from "./inspectorPane/Actions";
import Properties from "./inspectorPane/Properties";


const offsetX = 20;
const InspectorPaneSm = ( {paneW} ) => {
  const { 
    panelRatioSm,
    showGuidesSm,
    showGridsSm,
    rescaleButtonSm,
    hideProperties
  } = useContext(InspectorPanelSmContext);
  const [innerPaneW, setInnerPaneW] = useState(paneW - offsetX);
  const [paneStyle, setPaneStyle] = useState({"width" : Math.floor(panelRatioSm*100) +"%"});

  useEffect(() => {
    setInnerPaneW(paneW - offsetX);
    setPaneStyle({"width" : (panelRatioSm*100) +"%"});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paneW]);

  return (
    <div className={showGuidesSm? "inspectorPaneSm" : "inspectorPaneSm noBorder"} style={ paneStyle }>
      { showGridsSm &&
          <div className="particle-rg-fluid-inspector-sm">
            <div className="sm"></div>
            <div className="sm"></div>
            {/* <div class="sm md"></div> */}
          </div>
      }
      <Actions    title="ACTIONS" paneWidth={innerPaneW} 
                  isAdjustable={rescaleButtonSm} 
                  buttonTexts={["Anomaly Detetion", "Health Rules"]} />
      <Properties title="PROPERTIES" paneWidth={innerPaneW} hidePropertiesFlag={hideProperties} />
      { showGuidesSm &&
        <div className="paneWidthIndicator">{paneW}</div>
      }
    </div>
  )
}

export default InspectorPaneSm