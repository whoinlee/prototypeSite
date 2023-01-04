import { useState, useRef } from 'react';
//-- components
import Circle from "./Circle";
import SpecPanel from "./SpecPanel";
//-- styles
import "../../../styles/SkeletonScreen.scss";


const RelationshipComp = () => {
    const [animType, setAnimType] = useState("fade-base");   //shimmer-base & fade-base
    const [showSkeleton, setShowSkeleton] = useState(false);
    const [showComponent, setShowComponent] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [entityName, setEntityName] = useState("");
    const [totalNum, setTotalNum] = useState("");
    const [errTotal, setErrTotal] = useState("");
    const [warningTotal, setWarningTotal] = useState("");
    const [healthyTotal, setHealthyTotal] = useState("");
    const [duration, setDuration] = useState(3);
    const [groupSelected, setGroupSelected] = useState(true);
    const [onDataLoadedID, setOnDataLoadedID] = useState(null);
    const groupNameArr = ["APM", "KUBERNETES", "INFRASTRUCTURE"];
    const entityNamesArr = [
        ["Business Transactions", "Services", "Service Instances"],
        ["Clusters", "Namespaces", "Workloads", "Pods"],
        ["Hosts", "Databases"]
    ];
    const bubbleRadius = 2;
    const rightArrowRef = useRef();
    
    const resetComponent = () => {
        setGroupName("");
        setEntityName("");
        setTotalNum("");
        setErrTotal("");
        setWarningTotal("");
        setHealthyTotal("");
        setShowComponent(false);
        setShowSkeleton(true);
        // rightArrowRef.current.innerHTML="";
        if (onDataLoadedID) clearTimeout(onDataLoadedID);
    }

    const onDataLoaded = () => {
        const groupIndex = Math.floor(Math.random()*3);
        setShowSkeleton(false);
        setShowComponent(true);
        setGroupName(groupNameArr[groupIndex]);
        const entityNames = entityNamesArr[groupIndex];
        const entityIndex = Math.floor(Math.random(entityNames.length));
        setEntityName(entityNames[entityIndex]);
        const healthyN = 5 + Math.floor(Math.random()*35);
        let warningN = Math.ceil(Math.random()*20 -10);
        if (warningN <0) {
            warningN = 0;
            setWarningTotal("");
        } else setWarningTotal(warningN);
        let errorN = (Math.ceil(Math.random()*10) -3);
        if (errorN <0) {
            errorN = 0;
            setErrTotal("");
        } else setErrTotal(errorN);
        setTotalNum(healthyN + warningN + errorN);
        setHealthyTotal(healthyN);
    }

    const onPlayBtClicked = () => {
        resetComponent();
        if (onDataLoadedID) clearTimeout(onDataLoadedID);
        setOnDataLoadedID(setTimeout(onDataLoaded, duration*1000));
    }

    const onGroupNameSelection = (e) => {
        resetComponent();
        setGroupSelected(!groupSelected);
        if (onDataLoadedID) clearTimeout(onDataLoadedID);
        setOnDataLoadedID(setTimeout(onDataLoaded, duration*1000));
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
        setOnDataLoadedID(setTimeout(onDataLoaded, (e.target.value)*1000));
    }
    
    return (
        <div className="specContainer relationship">
            <div className="compContainer relationshipCompContainer">
                <div className={(showComponent)? "relationshipComp show" : "relationshipComp"}>
                    <div className="groupHeader" style={{visibility: groupSelected? "visible" : "hidden"}}>
                        <div className={(showSkeleton)? "group skeleton-text-headline " + animType: "group"}
                        >{groupName}</div>
                    </div>
                    <div className="header">
                        <div className={(showSkeleton)? "entity skeleton-text-title " + animType : "entity"}
                        >{entityName} <span className="arrowIcon" ref={rightArrowRef}></span></div>
                        <div className="total">{totalNum}</div>
                    </div>
                    <div className="bubbleHolder">
                        <div className={(showSkeleton)? "skeleton-bubble " + animType : "skeleton-bubble"}
                            style={{"display": (showSkeleton)? "block" : "none"}}/>
                        { errTotal !== "" && errTotal >0 &&
                            <Circle radius={15 + bubbleRadius * ((errTotal-1)/2)} bubbleTypeIndex={0} total={errTotal} opacity={100}/>
                        }
                        { warningTotal !== "" && warningTotal >0 &&
                            <Circle radius={15 + bubbleRadius * ((warningTotal-1)/2)} bubbleTypeIndex={1} total={warningTotal} opacity={100}/>
                        }
                        { healthyTotal !== "" &&                     
                            <Circle radius={15 + bubbleRadius * ((healthyTotal-1)/2)} bubbleTypeIndex={2} total={healthyTotal} opacity={100}/>
                        }
                    </div>
                </div>
                <div className="controlPanel">
                    <label  className="groupLabel">Include Group header</label>
                    <input  type="checkbox" name="checkbox" checked={groupSelected}
                            onChange={onGroupNameSelection}/>
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
                width={325} height={346} 
                content={<p>
                    {/* SPEC<br></br><br></br> */}
                    <br></br>
                    $neutral-white-6: hsla(0,0%,100%,.06);<br></br>
                    $neutral-white-15: hsla(0,0%,100%,.15);<br></br>
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
                </p>} />
            <SpecPanel  
                width={325} height={346} additionalClass="second"
                content={<p>
                    <br></br>
                    @keyframes fade-in-out &#123;<br></br>
                    &nbsp;0% &#123; opacity: 15%; &#125;<br></br>
                    <br></br> 
                    &nbsp;85% &#123; opacity: 100%; &#125;<br></br>
                    <br></br>
                    &nbsp;100% &#123; opacity: 100%; &#125;<br></br>
                    &#125;<br></br>
                    <br></br>
                    @keyframes shimmering-base &#123;<br></br>
                    &nbsp;0% &#123;<br></br>
                    &nbsp;&nbsp;background-position: 0% 0;<br></br>
                    &nbsp;&#125;<br></br>
                        <br></br>
                    &nbsp;100% &#123;<br></br>
                    &nbsp;&nbsp;background-position: -200% 0;<br></br>
                    &nbsp;&#125;<br></br>
                    &#125;<br></br> 
                </p>} />
        </div>
    );
}

export default RelationshipComp