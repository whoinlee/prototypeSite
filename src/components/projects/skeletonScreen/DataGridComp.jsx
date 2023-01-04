import { useState } from 'react';
//-- components
import DataGridRow from "./DataGridRow";
import SpecPanel from './SpecPanel';
//-- styles
import "../../../styles/SkeletonScreen.scss";


const DataGridComp = () => {
    const [animType, setAnimType] = useState("fade-base");  //shimmer-base, fade-base
    const [showSkeleton, setShowSkeleton] = useState(false);
    const [showComponent, setShowComponent] = useState(false);
    const [duration, setDuration] = useState(1.5);
    const [onDataLoadedID, setOnDataLoadedID] = useState(null);
    
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
        if (onDataLoadedID) clearTimeout(onDataLoadedID);
        resetComponent();
        setOnDataLoadedID(setTimeout(onDataLoaded, duration*1000));
    }

    let dataGridRows = [];
    for (var i = 0; i < 11; i++) {
        dataGridRows.push(<DataGridRow  key={"row" + i} 
                                        columnWidthArr={[102, 102, 102, 102]}
                                        columnTextArr={[" Text-" + (i+1) + "-1", 
                                                        " Text-" + (i+1) + "-2", 
                                                        " Text-" + (i+1) + "-3", 
                                                        " Text-" + (i+1) + "-4"]}
                                        columnMarginArr={[5, 6, 5, 0]}
                                        showSkeleton={showSkeleton}
                                        showComponent={showComponent}
                                        animType={animType}
                                        // delay={i *.05}
                                        delay={Math.floor(i/2)*.15}
        />);
    }
    
    return (
        <div className="specContainer">
        <div className="compContainer gridCompContainer">
            <div className="gridHolder" 
                 style={{ width:"492px", height:"522px" }}>
                <div className="gridBkgHolder1" style={ {visibility: (showComponent || showSkeleton)? "visible" : "hidden"} }/>
                <div className="gridContentHolder1">
                    {dataGridRows}
                </div>
            </div>
            <div className="controlPanel" style={{paddingTop: "35px"}} >
                <label  className="animationLabel">Animation Style</label>
                <form>
                    <label  className="animTypeLabel" htmlFor="radio">
                        <input  className="animTypeInput" type="radio" name="radio" 
                                checked={animType === "fade-base"}
                                value="fade-base"
                                onChange={onAnimTypeChange}/> fade-in-out
                    </label>
                    <label  className="animTypeLabel" htmlFor="radio">
                        <input  className="animTypeInput" type="radio" name="radio"
                                checked={animType === "shimmer-base"}   
                                value="shimmer-base"                    
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
            width={350} height={572} additionalClass="datagrid"
            content={<p>
                    <br></br>
                    $neutral-white-6: hsla(0,0%,100%,.06);<br></br>
                    $neutral-white-15: hsla(0,0%,100%,.15);<br></br>
                    $particle-easing-linear: cubic-bezier(0,0,1,1);<br></br>
                    $fade-base-duration: 1.5s;<br></br>
                    $shimmer-base-duration: 3s;<br></br>
                    <br></br>
                    .fade-base &#123;<br></br>
                    &nbsp;background-color: $neutral-white-15;<br></br>
                    &nbsp;animation: fade-in-out $fade-base-duration<br></br>
                        &nbsp;&nbsp;&nbsp;$particle-easing-linear infinite alternate;<br></br>
                    &#125;<br></br>
                    <br></br>
                    .shimmer-base &#123;<br></br>
                    &nbsp;background-size: 200% 100%;<br></br> 
                    &nbsp;background-image: linear-gradient(<br></br>
                        &nbsp;&nbsp;&nbsp;to right,<br></br>
                        &nbsp;&nbsp;&nbsp;$neutral-white-15 5%,<br></br>
                        &nbsp;&nbsp;&nbsp;$neutral-white-6 45%,<br></br> 
                        &nbsp;&nbsp;&nbsp;$neutral-white-15 85%);<br></br>
                    &nbsp;animation: shimmering-base $shimmer-base-<br></br>
                        &nbsp;&nbsp;&nbsp;duration $particle-easing-linear infinite;<br></br>
                    &#125;<br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    * rows come in by 2 rows with .15 sec delay<br></br> 
                    &nbsp;&nbsp;for each, i.e. <br></br>
                    &nbsp;&nbsp;delay=Math.floor([rowIndex]/2)*.15<br></br>
            </p>} />
    </div>
    );
}

export default DataGridComp