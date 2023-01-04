import { 
    useContext,
    useEffect, 
    useState
} from 'react';
//-- components
import Circle from "../../base/Circle";
//-- contexts
import { RGExample2Context } from '../../../../contexts/RelationshipGraphState';


const RGPaneComponent = ( { title, 
                            isGroupSelected = false,
                            isCenterAlign = false
                        } ) => {
    const { 
            setSelectedMainHeader,
            isSubpageCenterAlign
    } = useContext(RGExample2Context);

    const bubbleRadius = 2;
    const minRadius = 6;
    const maxRadius = 36;

    const [totalNum, setTotalNum] = useState(0);
    const [criticalTotal, setCriticalTotal] = useState(0);
    const [healthyTotal, setHealthyTotal] = useState(0);
    const [unknownTotal, setUnknownTotal] = useState(0);
    const [isHeaderOver, setIsHeaderOver] = useState(false);
    const [isBkgOver, setIsBkgOver] = useState(false);
    const [isCircleOver, setIsCircleOver] = useState(false);
    const [isSingleEntity, setIsSingleEntity] = useState(false);

    const [isCriticalSelected, setIsCriticalSelected] = useState(false);
    const [isHealthySelected, setIsHealthySelected] = useState(false);
    const [isUnknownSelected, setIsUnknownSelected] = useState(false);
    const [allEntitiesSelected, setAllEntitiesSelected] = useState(false);

    const setItems = () => {
        let criticalN, healthyN, unknownN;

        setIsCriticalSelected(false);
        setIsHealthySelected(false);
        setIsUnknownSelected(false);
        setAllEntitiesSelected(false);
        setIsSingleEntity(false);
        
        //-- creating a special case for prototyping:: 
        switch (title.toLowerCase(0)) {
            case "services":
                //-- APM Services - 0, 5, 46
                criticalN = 0;
                healthyN = 5;
                unknownN = 46;
                if (isGroupSelected) {
                    setAllEntitiesSelected(true);
                }
                break;
            case "namespaces":
                //-- Kubernetes Namespaces - 1, 25, 120
                criticalN = 1;
                // healthyN = 25;
                // unknownN = 120;
                healthyN = 0;
                unknownN = 0;
                if (isGroupSelected) {
                    setIsCriticalSelected(true);
                    setIsSingleEntity(true);
                }
                break;
            case "storage":
                //-- Infrastructure Storage - 0, 0, 15
                criticalN = 0;
                healthyN = 0;
                unknownN = 15;
                if (isGroupSelected) {
                    setIsUnknownSelected(true);
                }
                break;
            default:
                criticalN = (Math.ceil(Math.random()*10)- 5);
                healthyN = 5 + Math.floor(Math.random()*35);
                unknownN = Math.ceil(Math.random()*20 - 7);
                if (unknownN <0) unknownN = 0;
                if (criticalN <0) criticalN = 0;
        }

        setHealthyTotal(healthyN);
        setUnknownTotal(unknownN);
        setCriticalTotal(criticalN);
        setTotalNum(healthyN + unknownN + criticalN);
    }

    useEffect(() => {
        setItems();
        setIsHeaderOver(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ isGroupSelected ]);

    const onHeaderOverHandler = () => { 
        if (!isGroupSelected || !allEntitiesSelected) 
        setIsHeaderOver(true); 
    }
    const onHeaderOutHandler = () => { 
        if (!isGroupSelected || !allEntitiesSelected) 
        setIsHeaderOver(false); 
    }
    // const onBkgOverHandler = () => { if (!isGroupSelected || !allEntitiesSelected) setIsBkgOver(true); }
    // const onBkgOutHandler = () => { if (!isGroupSelected || !allEntitiesSelected) setIsBkgOver(false); }
    const onCircleOverHandler = () => { setIsCircleOver(true); }
    const onCircleOutHandler = () => { setIsCircleOver(false);}

    const onHeaderClickHandler = () => { 
        setAllEntitiesSelected(true);
        if (!isGroupSelected || !allEntitiesSelected) {
            // setAllEntitiesSelected(true);
            setIsCriticalSelected(false);
            setIsHealthySelected(false);
            setIsUnknownSelected(false);
            setSelectedMainHeader(`${title} (${totalNum})`);
        }
    }
    // const onBkgClickHandler = () => { 
    //     if (!isCircleOver) {
    //         console.log("onBkgClickHandler, isCircleOver?? ", isCircleOver)
    //         setAllEntitiesSelected(true);
    //         if (!isGroupSelected || !allEntitiesSelected) {
    //             setIsCriticalSelected(false);
    //             setIsHealthySelected(false);
    //             setIsUnknownSelected(false);
    //             setSelectedMainHeader(`${title} (${totalNum})`);
    //         }
    //     }
    // }
    const onCriticalClickHandler = (e) => { 
        setAllEntitiesSelected(false);
        setIsCriticalSelected(true);
        setIsHealthySelected(false);
        setIsUnknownSelected(false);
        setIsHeaderOver(false); 
        setSelectedMainHeader(`${title} (${e.target.textContent})`);
        //
        setUnknownTotal(0);
        setHealthyTotal(0);
        setTotalNum(criticalTotal);
    }
    const onHealthyClickHandler = (e) => { 
        setAllEntitiesSelected(false);
        setIsCriticalSelected(false);
        setIsHealthySelected(true);
        setIsUnknownSelected(false);
        setIsHeaderOver(false); 
        setSelectedMainHeader(`${title} (${e.target.textContent})`);
        //
        setCriticalTotal(0);
        setUnknownTotal(0);
        setTotalNum(healthyTotal);
    }
    const onUnknownClickHandler = (e) => { 
        setAllEntitiesSelected(false);
        setIsCriticalSelected(false);
        setIsHealthySelected(false);
        setIsUnknownSelected(true);
        setIsHeaderOver(false); 
        setSelectedMainHeader(`${title} (${e.target.textContent})`);
        //
        setCriticalTotal(0);
        setHealthyTotal(0);
        setTotalNum(unknownTotal);
    }

    return (
        <div className="rgPaneComponent">
            <div className={isGroupSelected && allEntitiesSelected ? "entityHeader selected" : "entityHeader"} 
                 onMouseOver={onHeaderOverHandler}
                 onMouseOut={onHeaderOutHandler}
                 onClick={onHeaderClickHandler}
            >
                <span className="componentTitle">{title}<i className="chevronRight">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i></span><span className="totalNum">{totalNum}</span>
            </div>
            <div 
                //  className={(isHeaderOver || (isGroupSelected && allEntitiesSelected) ) ? "entityHolder show" : "entityHolder"} 
                 className={`entityHolder ${((isHeaderOver || isBkgOver) && !isCircleOver) ? "bkgHover" : ""} ${(isGroupSelected && allEntitiesSelected) ? "show" : ""} ${(isSubpageCenterAlign || isCenterAlign)? "centerAlign" : ""}
                 `} 
                //  onMouseOver={onBkgOverHandler}
                //  onMouseOut={onBkgOutHandler} 
                //  onClick={onBkgClickHandler}
            >
                <div className={`bubbleHolder ${isSingleEntity? "singleEntity" : ""}`}
                // className={(isHeaderOver || (isGroupSelected && allEntitiesSelected) ) ? "bubbleHolder show" : "bubbleHolder"} 
                >
                { criticalTotal > 0 && 
                    <Circle onOverHandler={onCircleOverHandler} onOutHandler={onCircleOutHandler}
                            isSelected={isCriticalSelected}
                            radius={Math.min(minRadius + bubbleRadius * ((criticalTotal-1)/2), maxRadius)} 
                            bubbleTypeIndex={0} total={criticalTotal} opacity={100} 
                            onClickHandler={onCriticalClickHandler} />
                }
                { healthyTotal > 0 &&         
                    <Circle onOverHandler={onCircleOverHandler} onOutHandler={onCircleOutHandler}
                            isSelected={isHealthySelected}
                            radius={Math.min(minRadius + bubbleRadius * ((healthyTotal-1)/2), maxRadius)} 
                            bubbleTypeIndex={2} total={healthyTotal} opacity={100}
                            onClickHandler={onHealthyClickHandler} />
                }
                { unknownTotal > 0 && 
                    <Circle onOverHandler={onCircleOverHandler} onOutHandler={onCircleOutHandler}
                            isSelected={isUnknownSelected}
                            radius={Math.min(minRadius + bubbleRadius * ((unknownTotal-1)/2), maxRadius)} 
                            bubbleTypeIndex={1} total={unknownTotal} opacity={100}
                            onClickHandler={onUnknownClickHandler} />
                }
                </div>
                {isSingleEntity &&
                    <div className="labelHolder">load&nbsp;&nbsp;</div>
                }
            </div>
        </div>
    )
}

export default RGPaneComponent