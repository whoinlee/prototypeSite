import { useContext, useEffect, useState } from 'react';
//-- contexts
import { SkeletonPodsContext } from '../../../contexts/SkeletonLoadingState';
//-- components
import Circle from "./Circle";
//-- styles
import "../../../styles/SkeletonScreen.scss";


const RCItemSm = ( { isLast, entityTitle, noBorder, isDummy, delay }) => {
    const { showComponent, showSkeleton, resetCompItem, compItemDataLoaded, animType } = useContext(SkeletonPodsContext);
    const [animTypeSpecial, setAnimTypeSpecial] = useState("fade-base"); //fade-base and shimmer-base
    const [entityName, setEntityName] = useState("");
    const [totalNum, setTotalNum] = useState("");
    const [errTotal, setErrTotal] = useState("");
    const [healthyTotal, setHealthyTotal] = useState("");
    // const [showDelayedSkeleton, setShowDelayedSkeleton] = useState(false);
    // let delayedSkeletonID;
    
    const bubbleRadius = 1.5;
    const className = (isLast)? "relationshipComp Sm isLast ":"relationshipComp Sm ";

    const resetItems = () => {
        setEntityName("");
        setTotalNum("");
        setErrTotal("");
        setHealthyTotal("");
        // setShowDelayedSkeleton(false);
    }

    const setItems = () => {
        setEntityName(entityTitle);
        const healthyN = 5 + Math.floor(Math.random()*25);
        const errorN = (Math.ceil(Math.random()*8));
        setTotalNum(healthyN + errorN);
        setHealthyTotal(healthyN);
        setErrTotal(errorN);
    }
    
    useEffect(() => {
        if (resetCompItem) resetItems();
        if (compItemDataLoaded) setItems();
        if (animType) {
            const alteredAnimType = (animType.substr(0, 4) === "fade")? "fade-base" : "shimmer-base";
            setAnimTypeSpecial(alteredAnimType);
        }
        // const updateDelayedSkeleton = () => {
        //     if (delayedSkeletonID) clearTimeout(delayedSkeletonID);
        //     setShowDelayedSkeleton(true);
        // }
        // if (showSkeleton) {
        //     if (delayedSkeletonID) clearTimeout(delayedSkeletonID);
        //     delayedSkeletonID = setTimeout(updateDelayedSkeleton, delay*1000);
        // }
        // if (showComponent) {
        //   if (delayedSkeletonID) clearTimeout(delayedSkeletonID);
        //   setShowDelayedSkeleton(false);
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [resetCompItem, compItemDataLoaded, animType]);
    //   }, [resetCompItem, compItemDataLoaded, showSkeleton, showComponent]);

    return (
        <div className={(showComponent && !isDummy)? className + "show" : className}>
            <div className={ (isLast || (showComponent && noBorder) ) ? "entityHolder Sm isLast" : "entityHolder Sm"}
                 style={ {visibility: ((isDummy && showComponent) || (!showSkeleton && !showComponent)) ? "hidden" : "visible"} } >
                 {/* style={ {visibility: ((isDummy && showComponent) || (!showDelayedSkeleton && !showComponent)) ? "hidden" : "visible"} } > */}
                <div className="header">
                    <div 
                    className={(showSkeleton)? "skeleton-text-title-sm " + animTypeSpecial : ""}
                    // className={(showDelayedSkeleton)? "skeleton-text-title-sm " + animTypeSpecial : ""}
                    >{entityName}</div>
                    <div className="total">{totalNum}</div>
                </div>
                <div className="bubbleHolder">
                    <div 
                    className={(showSkeleton)? "skeleton-bubble-sm " + animTypeSpecial : "skeleton-bubble-sm"}
                    // className={(showDelayedSkeleton)? "skeleton-bubble-sm " + animTypeSpecial : "skeleton-bubble-sm"}
                    style={{"display": (showSkeleton)? "block" : "none"}}
                    // style={{"display": (showDelayedSkeleton)? "block" : "none"}}
                    />
                    { errTotal !== "" && 
                        <Circle radius={15 + bubbleRadius * ((errTotal-1)/2)} bubbleTypeIndex={0} total={errTotal} opacity={100}/>
                    }
                    { totalNum !== "" &&                     
                        <Circle radius={15 + bubbleRadius * ((healthyTotal-1)/2)} bubbleTypeIndex={2} total={healthyTotal} opacity={100}/>
                    } 
                    
                </div>
            </div>
        </div>
    );
}

export default RCItemSm;