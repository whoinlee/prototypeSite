
//-- components
import ContentPaneSubpage from "../contentPane/ContentPaneSubpage";


const ExamplePageSubpage = () => {
  return (
    <div className="examplePanel subPage">
        <div className="panelContainer subPage">
          <div className="leftNavPane" />
          <ContentPaneSubpage />
        </div>
    </div>
  )
}

export default ExamplePageSubpage