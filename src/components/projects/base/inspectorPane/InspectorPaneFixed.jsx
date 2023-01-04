//-- components
import Actions from "./Actions";
import Properties from "./Properties";


const offsetX = 20;
const paneW = 230;
const InspectorPaneFixed = ( {isActions, isProperties}) => {
  return (
    <div className="inspectorPaneFixed" style={{"width" : "230px"}}>
      { isActions &&
        <Actions  title="ACTIONS" paneWidth={paneW - offsetX} 
                  isAdjustable={false} 
                  buttonTexts={["Anomaly Detetion", "Health Rules"]} />
      }
      { isProperties &&
        <Properties title="PROPERTIES" paneWidth={paneW - offsetX} hidePropertiesFlag={false} /> }
    </div>
  )
}

export default InspectorPaneFixed