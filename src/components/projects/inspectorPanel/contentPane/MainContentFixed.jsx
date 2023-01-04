const lineColor="#8b55e7";  //#9e7eff #8b55e7
const strokeWidth="1";
const adjustment=2;
const lineHeight=930;
// const multiplier=1;
//-- for fluid body panel with fixedWidth inspector panel
const MainContentFixed = ( props ) => {
  return (
    <div className={props.contentClassName} style={ {backgroundColor:"transparent", height:"930px"} }>
        <div className="overlay" />
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={ {zIndex: 0} }>
            <line x1={adjustment} y1={adjustment} x2={props.width - adjustment*props.multiplier} y2={adjustment} stroke={lineColor} strokeWidth={strokeWidth} />
            <line x1={props.width - adjustment*props.multiplier} y1={adjustment} x2={props.width - adjustment*props.multiplier} y2={lineHeight - adjustment*props.multiplier} stroke={lineColor} strokeWidth={strokeWidth} />
            <line x1={props.width - adjustment*props.multiplier} y1={lineHeight - adjustment*props.multiplier} x2={adjustment} y2={lineHeight - adjustment*props.multiplier} stroke={lineColor} strokeWidth={strokeWidth} />
            <line x1={adjustment} y1={lineHeight - adjustment*props.multiplier} x2={adjustment} y2={adjustment} stroke={lineColor} strokeWidth={strokeWidth} />
            <line x1={adjustment} y1={adjustment} x2={props.width - adjustment*props.multiplier} y2={lineHeight - adjustment*props.multiplier} stroke={lineColor} strokeWidth={1} />
            <line x1={adjustment} y1={lineHeight - adjustment*props.multiplier} x2={props.width - adjustment*props.multiplier} y2={adjustment} stroke={lineColor} strokeWidth={1} />
        </svg>
        {/* } */}
    </div>
  )
}

export default MainContentFixed