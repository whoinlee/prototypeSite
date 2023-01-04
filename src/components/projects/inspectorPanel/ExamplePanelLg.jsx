//-- components
import LeftNavPane from "./LeftNavPane";
import ContentPaneLg from "./ContentPaneLg";


const ExamplePanelLg = () => {
  return (
    <div className="examplePanel">
      <div className="panelContainer">
        <LeftNavPane />
        <ContentPaneLg />
      </div>
    </div>
  )
}

export default ExamplePanelLg
