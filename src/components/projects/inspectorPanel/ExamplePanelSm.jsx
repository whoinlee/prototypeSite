//-- components
import LeftNavPane from "./LeftNavPane";
import ContentPaneSm from "./ContentPaneSm";


const ExamplePanelSm = () => {
  return (
    <div className="examplePanel">
        <div className="panelContainer">
            <LeftNavPane />
            <ContentPaneSm />
        </div>
    </div>
  )
}

export default ExamplePanelSm
