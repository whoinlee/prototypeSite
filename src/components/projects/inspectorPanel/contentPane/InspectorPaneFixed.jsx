//-- components
import Actions from "./inspectorPane/Actions";
import Properties from "./inspectorPane/Properties";


const offsetX = 20;
const paneW = 230;
const InspectorPaneFixed = () => {
  return (
    <div className="inspectorPaneFixed" style={{"width" : "230px"}}>
      <Actions    title="ACTIONS" paneWidth={paneW - offsetX} 
                  isAdjustable={false} 
                  buttonTexts={["Anomaly Detetion", "Health Rules"]} />
      <Properties title="PROPERTIES" paneWidth={paneW - offsetX} hidePropertiesFlag={false} />
    </div>
  )
}

export default InspectorPaneFixed