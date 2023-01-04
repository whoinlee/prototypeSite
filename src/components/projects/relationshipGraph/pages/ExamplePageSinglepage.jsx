//-- components
import ContentPaneSinglepage from "../contentPane/ContentPaneSinglepage";


const ExamplePageSinglepage = () => {
  // const { 
  //  } = useContext(RelationshipGraphContext);

  return (
    <div className="examplePanel subPage">
        <div className="panelContainer subPage">
          <div className="leftNavPane" />
          <ContentPaneSinglepage />
        </div>
    </div>
  )
}

export default ExamplePageSinglepage