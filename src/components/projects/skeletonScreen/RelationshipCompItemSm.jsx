import { useContext, useEffect, useState } from 'react';
//-- contexts
import { SkeletonServicesContext } from '../../../contexts/SkeletonLoadingState';
//-- components
import Circle from "./Circle";
//-- styles
import "../../../styles/SkeletonScreen.scss";


const RelationshipCompItemSm = ( { isLast, entityTitle, isDummy, noBorder, delay }) => {
    const { showComponent, showSkeleton, resetCompItem, compItemDataLoaded, animType2 } = useContext(SkeletonServicesContext);
    const [entityName, setEntityName] = useState("");
    const [totalNum, setTotalNum] = useState("");
    const [errTotal, setErrTotal] = useState("");
    const [healthyTotal, setHealthyTotal] = useState("");
    const bubbleRadius = 1.5;
    const className = (isLast)? "relationshipComp Sm isLast ":"relationshipComp Sm ";
    
    const resetItems = () => {
        setEntityName("");
        setTotalNum("");
        setErrTotal("");
        setHealthyTotal("");
    }

    const setItems = () => {
        if (isDummy) {
            resetItems();
            return;
        }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [resetCompItem, compItemDataLoaded]);

    return (
        <div className={(showComponent && !isDummy)? className + "show" : className}>
            <div className={ (isLast || (showComponent && noBorder) )? "entityHolder Sm isLast" : "entityHolder Sm"} 
                 style={ {visibility: ( (isDummy && showComponent) || (!showSkeleton && !showComponent) ) ? "hidden" : "visible"} }>
                <div className="header">
                    <div 
                    className={(showSkeleton)? "skeleton-text-title-sm " + animType2 : ""}
                    >{entityName}</div>
                    <div className="total">{totalNum}</div>
                </div>
                <div className="bubbleHolder">
                    <div 
                    className={(showSkeleton)? "skeleton-bubble-sm " + animType2: "skeleton-bubble-sm"}
                    style={{"display": (showSkeleton)? "block" : "none"}}
                    />
                    { errTotal !== "" && !isDummy &&
                        <Circle radius={15 + bubbleRadius * ((errTotal-1)/2)} bubbleTypeIndex={0} total={errTotal} opacity={100}/>
                    }
                    { totalNum !== "" && !isDummy &&                     
                        <Circle radius={15 + bubbleRadius * ((healthyTotal-1)/2)} bubbleTypeIndex={2} total={healthyTotal} opacity={100}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default RelationshipCompItemSm