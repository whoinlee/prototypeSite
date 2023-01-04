import { useState } from 'react';
//-- styles
import "../../../styles/SkeletonScreen.scss";


const ChartCompLg = ( {chartType, chartTitle} ) => {
    const [animType, setAnimType] = useState("fade-chart");  //shimmer-chart, fade-chart
    const [showSkeleton, setShowSkeleton] = useState(false);
    const [showComponent, setShowComponent] = useState(false);
    const [duration, setDuration] = useState(2);
    const [onDataLoadedID, setOnDataLoadedID] = useState(null);
    const iconHolderClassName = (chartType.toLowerCase() === "bar")? "iconHolder bar" : "iconHolder line"; 
    
    const resetComponent = () => {
        setShowSkeleton(true);
        setShowComponent(false);
        if (onDataLoadedID) clearTimeout(onDataLoadedID);
    }

    const onDataLoaded = () => {
        setShowSkeleton(false);
        setShowComponent(true);
    }

    const onAnimTypeChange = (e) => {
        resetComponent();
        setAnimType(e.target.value);
        if (onDataLoadedID) clearTimeout(onDataLoadedID);
        setOnDataLoadedID(setTimeout(onDataLoaded, duration*1000));
    }

    const onDurationChange = (e) => {
        resetComponent();
        setDuration(e.target.value);
        if (onDataLoadedID) clearTimeout(onDataLoadedID);
        setOnDataLoadedID(setTimeout(onDataLoaded, e.target.value*1000));
    }

    const onPlayBtClicked = () => {
        resetComponent();
        if (onDataLoadedID) clearTimeout(onDataLoadedID);
        setOnDataLoadedID(setTimeout(onDataLoaded, duration*1000));
    }
    
    return (
        <div className="compContainer chartComponentContainer Lg">
            <div className="chartHolder Lg" style={{   width:"909px", height:"250px", 
                                                    marginTop: "25px", 
                                                    marginLeft: "15px", marginRight: "25px"}}>
                <div className="chartBkgHolder" />
                <div className="chartHeader">{chartTitle}</div>
                <div className="chartHeaderIcon" />
                <div 
                     className={ (showComponent)? "chartContentHolder Lg show " + chartType : "chartContentHolder Lg " } 
                />
                <div 
                     className={ (showSkeleton)? "chartSkeletonHolder Lg skeleton-bar-chart " :
                                                 "chartSkeletonHolder Lg" }>
                    <div 
                        className={ (showSkeleton)? iconHolderClassName + " " + animType : iconHolderClassName } 
                    />
                </div>
            </div>
            <div className="controlPanel" style={{paddingTop: "35px"}}>
                <label  className="animationLabel">Animation Style</label>
                <form>
                    <label  className="animTypeLabel" htmlFor="radio">
                        <input  className="animTypeInput" type="radio" name="radio" 
                                checked={animType === "fade-chart"}
                                value="fade-chart"
                                onChange={onAnimTypeChange}/> fade-in-out
                    </label>
                    <label  className="animTypeLabel" htmlFor="radio">
                        <input  className="animTypeInput" type="radio" name="radio"
                                checked={animType === "shimmer-chart"}
                                value="shimmer-chart"
                                onChange={onAnimTypeChange}/> shimmering
                    </label>
                </form>
                <label  className="durationLabel" htmlFor="secs">Duration (in sec)</label>
                <input  className="durationInput"
                        id="secs" type="number"
                        min={.5} max={5} step={.5}
                        defaultValue={duration}
                        onChange={onDurationChange}/>
                <div className="buttonHolder">
                    <button className="playBt"
                            onClick={onPlayBtClicked}/>
                </div>
            </div>
        </div>
    );
}

export default ChartCompLg