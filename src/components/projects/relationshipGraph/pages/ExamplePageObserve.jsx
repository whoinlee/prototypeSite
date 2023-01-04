//-- components
import ContentPaneObserve from "../contentPane/ContentPaneObserve";


const ExamplePageObserve= () => {
  return (
    <div className="examplePanel observe">
        <div className="panelContainer observe">
          <div className="leftNavPane" />
          <ContentPaneObserve />
        </div>
    </div>
  )
}

export default ExamplePageObserve