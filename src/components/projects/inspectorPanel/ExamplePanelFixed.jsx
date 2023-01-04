//-- components
import LeftNavPane from "./LeftNavPane";
import ContentPaneFixed from "./ContentPaneFixed";


const ExamplePanelFixed= () => {
  return (
    <div className="examplePanel fixed">
        <div className="panelContainer fixed">
            <LeftNavPane />
            <ContentPaneFixed />
        </div>
    </div>
  )
}

export default ExamplePanelFixed
