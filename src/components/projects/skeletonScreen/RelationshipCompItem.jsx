import { useContext, useEffect, useState, useRef } from 'react';
//-- contexts
import { SkeletonRelationshipContext } from '../../../contexts/SkeletonLoadingState';
//-- components
import Circle from "./Circle";
//-- styles
import "../../../styles/SkeletonScreen.scss";


const RelationshipCompItem = ( { groupHeader, isLast, entityTitle, isDummy, noBorder, delay }) => {
    const { showComponent, showSkeleton, resetCompItem, compItemDataLoaded, animType1 } = useContext(SkeletonRelationshipContext);

    const [groupName, setGroupName] = useState("");
    const [entityName, setEntityName] = useState("");
    const [totalNum, setTotalNum] = useState("");
    const [errTotal, setErrTotal] = useState("");
    const [warningTotal, setWarningTotal] = useState("");
    const [healthyTotal, setHealthyTotal] = useState("");
    const bubbleRadius = 2;
    const rightArrowRef = useRef();
    const className = (isLast)? "relationshipComp isLast ":"relationshipComp ";

    const resetItems = () => {
        setGroupName("");
        setEntityName("");
        setTotalNum("");
        setErrTotal("");
        setWarningTotal("");
        setHealthyTotal("");
    }

    const setItems = () => {
        if (isDummy) {
            resetItems();
            return;
        }
        setGroupName(groupHeader);
        setEntityName(entityTitle);
        const healthyN = 5 + Math.floor(Math.random()*35);
        let warningN = Math.ceil(Math.random()*20 - 14);
        if (warningN <0) {
            setWarningTotal("");
            warningN = 0;
        } else {
            setWarningTotal(warningN);
        }
        let errorN = (Math.ceil(Math.random()*10)- 5);
        if (errorN <0) {
            setErrTotal("");
            errorN = 0;
        } else {
            setErrTotal(errorN);
        }
        setTotalNum(healthyN + warningN + errorN);
        setHealthyTotal(healthyN);
    }

    useEffect(() => {
        if (resetCompItem) resetItems();
        if (compItemDataLoaded) setItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [resetCompItem, compItemDataLoaded]);

    return (
        <div className={(showComponent && !isDummy)? className + "show" : className} 
             style={{visibility: ( !showSkeleton && !showComponent ? "hidden":"visible")}}>
            <div className="groupHeader" style={{visibility: (groupHeader === "")? "hidden" : "visible"}}>
                <div 
                className={(showSkeleton)? "group skeleton-text-headline " + animType1 : "group"}
                >{groupName}</div>
            </div>
            <div className={ (isLast || (showComponent && noBorder) )? "entityHolder isLast" : "entityHolder"}>
                <div className="header">
                    <div 
                    className={(showSkeleton)? "entity skeleton-text-title " + animType1 : "entity"}
                    >{entityName} <span className="arrowIcon" ref={rightArrowRef}></span></div>
                    <div className="total">{totalNum}</div>
                </div>
                <div className="bubbleHolder">
                    <div 
                        className={(showSkeleton)? "skeleton-bubble " + animType1 : "skeleton-bubble"}
                        style={{"display": (showSkeleton)? "block" : "none"}}
                    />
                    { errTotal !== "" && errTotal >0 && !isDummy &&
                        <Circle radius={15 + bubbleRadius * ((errTotal-1)/2)} bubbleTypeIndex={0} total={errTotal} opacity={100}/>
                    }
                    { warningTotal !== "" && warningTotal >0 && !isDummy &&
                        <Circle radius={15 + bubbleRadius * ((warningTotal-1)/2)} bubbleTypeIndex={1} total={warningTotal} opacity={100}/>
                    }
                    { healthyTotal !== "" && healthyTotal >0 && !isDummy &&           
                        <Circle radius={15 + bubbleRadius * ((healthyTotal-1)/2)} bubbleTypeIndex={2} total={healthyTotal} opacity={100}/>
                    } 
                    
                </div>
            </div>
        </div>
    );
}

export default RelationshipCompItem