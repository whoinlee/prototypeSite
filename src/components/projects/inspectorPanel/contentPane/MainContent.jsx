const lineColor="#8b55e7";  //#9e7eff #8b55e7
const strokeWidth="2";
const MainContent = ( props ) => {
  return (
    // <div className={props.contentClassName} style={ {backgroundColor:"transparent", height:"932px"} }>
    <div className={props.contentClassName} style={ {backgroundColor:"transparent", height: `${props.height}px`} }>
        <div className="overlay" />
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={ {zIndex: 0}}>
            <line x1="0" y1="0" x2={props.width} y2="0" stroke={lineColor} strokeWidth={strokeWidth} />
            <line x1={props.width} y1="0" x2={props.width} y2={props.height} stroke={lineColor} strokeWidth={strokeWidth} />
            <line x1={props.width} y1={props.height} x2="0" y2={props.height} stroke={lineColor} strokeWidth={strokeWidth} />
            <line x1="0" y1={props.height} x2="0" y2="0" stroke={lineColor} strokeWidth={strokeWidth} />
            <line x1="0" y1="0" x2={props.width} y2={props.height} stroke={lineColor} strokeWidth={1} />
            <line x1="0" y1={props.height} x2={props.width} y2="0" stroke={lineColor} strokeWidth={1} />
        </svg>
    </div>
  )
}

export default MainContent