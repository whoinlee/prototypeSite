import { useState } from 'react';
//-- components
import SpecPanel from './SpecPanel'
//-- styles
import "../../../styles/SkeletonScreen.scss";


const ChartCompSm = ( {chartType, chartTitle} ) => {
    const [animType, setAnimType] = useState("fade-chart");  //shimmer-chart and fade-chart
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
        setShowComponent(true);
        setShowSkeleton(false);
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
        if (onDataLoadedID) clearTimeout(onDataLoadedID);
        resetComponent();
        setOnDataLoadedID(setTimeout(onDataLoaded, duration*1000));
    }
    
    return (
        <div className="specContainer">
        <div className="compContainer chartComponentContainer">
            <div className="chartHolder" style={{   width:"461px", height:"250px", 
                                                    marginTop: "25px", 
                                                    marginLeft: "15px", marginRight: "25px"}}>
                <div className="chartBkgHolder" />
                <div className="chartHeader">{chartTitle}</div>
                <div className="chartHeaderIcon" />
                <div 
                     className={ (showComponent)? "chartContentHolder show" : "chartContentHolder" } />
                <div 
                     className={ (showSkeleton)? "chartSkeletonHolder skeleton-bar-chart ":
                                                 "chartSkeletonHolder" } >
                    <div 
                        className={ (showSkeleton)? iconHolderClassName + " " + animType : iconHolderClassName } 
                    />
                </div>
            </div>
            <div className="controlPanel" style={{paddingTop: "35px"}} >
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
        <SpecPanel  
            width={325} height={292} 
            content={<p>
                <br></br>
                $chart-skeleton-icon-color: #878991;<br></br>
                $chart-skeleton-gradient-dark: #5a5c61;<br></br>
                $fade-chart-duration: 1.5s;<br></br>
                $shimmer-chart-duration: 2s;<br></br>
                <br></br>
                .shimmer-chart &#123;<br></br>
                &nbsp;background-size: 200% 100%;<br></br> 
                &nbsp;background-image: linear-gradient(<br></br>
                    &nbsp;&nbsp;&nbsp;to right,<br></br>
                    &nbsp;&nbsp;&nbsp;$chart-skeleton-icon-color 0%,<br></br>
                    &nbsp;&nbsp;&nbsp;$chart-skeleton-gradient-dark 15%,<br></br>
                    &nbsp;&nbsp;&nbsp;$chart-skeleton-icon-color 30%,<br></br>
                    &nbsp;&nbsp;&nbsp;$chart-skeleton-icon-color 100%);<br></br>
                    &nbsp;animation: shimmering-chart $shimmer-<br></br>
                    &nbsp;&nbsp;&nbsp;chart-duration $particle-easing-linear infinite;<br></br>
                &#125;<br></br>
            </p>} />
        <SpecPanel  
            width={325} height={292} additionalClass="second"
            content={<p>
                <br></br>
                .fade-chart &#123;<br></br>
                &nbsp;animation: fade-in-out $fade-chart-<br></br>
                &nbsp;&nbsp;&nbsp;duration $particle-easing-linear infinite alternate;<br></br>
                &#125;<br></br>
                <br></br>
                @keyframes shimmering-chart &#123;<br></br>
                &nbsp;0% &#123;<br></br>
                &nbsp;&nbsp;background-position: 50% 0;<br></br>
                &nbsp;&#125;<br></br>
                    <br></br>
                &nbsp;100% &#123;<br></br>
                &nbsp;&nbsp;background-position: -150% 0;<br></br>
                &nbsp;&#125;<br></br>
                &#125;<br></br> 
            </p>} />
    </div>
    );
}

export default ChartCompSm