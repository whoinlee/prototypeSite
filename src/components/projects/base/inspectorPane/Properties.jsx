//-- components
import ExpanderDown from "../ExpanderDown";


const Properties = ( { title, paneWidth, hidePropertiesFlag } ) => {
  // console.log("hidePropertiesFlag? ", hidePropertiesFlag);
  return (
    <div className="properties" style={ { width: `${paneWidth}px`, "visibility": hidePropertiesFlag ? "hidden" : "visible"} }>
    {/* // <div className="properties" style={ { width: `${paneWidth}px`} }> */}
        <div className="headline">
          <p className="title">{title}</p>
          <ExpanderDown />
        </div>
        <div className="contentHolder">
          <div className="propertyValue">
            <p className="property">Property 1</p>
            <p className="value">Property 1 content goes here</p>
          </div>
          <div className="propertyValue">
            <p className="property">Property 2</p>
            <p className="value">Property 2 content goes here</p>
          </div>
          <span className="propertyValue">
            <p className="property">Property 3</p>
            <p className="value">Property 3 content goes here</p>
          </span>
          <span className="propertyValue">
            <p className="property">Property 4</p>
            <p className="value">Property 4 content goes here</p>
          </span>
          <span className="propertyValue">
            <p className="property">Property 5</p>
            <p className="value">Property 5 content goes here</p>
          </span>
        </div>
    </div>
  )
}

Properties.defaultProps = {
  title: "PROPERTIES", 
  paneWidth: 230
}

export default Properties;