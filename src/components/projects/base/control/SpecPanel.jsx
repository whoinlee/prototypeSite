const SpecPanel = ( {width, height, content, additionalClass} ) => {
    const styleObj = {
        display: "block",
        width: width + "px",
        height: height + "px",
    };
    
    return (
        <div className={"specPanel " + additionalClass} style={styleObj}>
            {content}
        </div>
    );
}

export default SpecPanel