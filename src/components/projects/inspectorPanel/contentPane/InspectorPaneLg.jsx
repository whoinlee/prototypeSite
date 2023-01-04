import { useContext, useEffect, useState } from 'react';
//-- contexts
import { InspectorPanelLgContext } from '../../../../contexts/InspectorPanelState';
//-- components
import Actions from "./inspectorPane/Actions";
import Logs from "./inspectorPane/Logs";


const offsetX = 20;
const InspectorPaneLg = ( {paneW} ) => {
  const { 
    panelRatioLg,
    showGuidesLg,
    rescaleButtonLg 
  } = useContext(InspectorPanelLgContext);
  const [innerPaneW, setInnerPaneW] = useState(paneW - offsetX);
  const [paneStyle, setPaneStyle] = useState({"width" : Math.floor(panelRatioLg*100) +"%"});

  useEffect(() => {
    setInnerPaneW(paneW - offsetX);
    setPaneStyle({"width" : (panelRatioLg*100) +"%"});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paneW]);

  return (
    <div className={showGuidesLg? "inspectorPaneLg" : "inspectorPaneLg noBorder"} style={ paneStyle }>
      <Actions title="ACTIONS" paneWidth={innerPaneW} isAdjustable={rescaleButtonLg} 
               buttonTexts={["View All Logs in Pattern"]} />
      <Logs title="LOGS IN PATTERN" paneWidth={innerPaneW} />
      { showGuidesLg &&
        <div className="paneWidthIndicator">{paneW}</div>
      }
    </div>
  )
}

export default InspectorPaneLg