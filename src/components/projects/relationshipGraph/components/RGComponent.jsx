import { 
    useContext,
    useEffect, 
    useState
} from 'react';
//-- components
import Circle from "../../base/Circle";
//-- contexts
import { RGExample1Context } from '../../../../contexts/RelationshipGraphState';


const RGComponent = ( { title, 
                        isObservePage=false,
                        isCenterAlign=false,
                        isFixedWidth=false
                     } ) => {
    const { isObserveCenterAlign } = useContext(RGExample1Context);
    const bubbleRadius = 2;
    const maxRadius = 30;
    const minRadius = 6;
    const [totalNum, setTotalNum] = useState(0);
    const [criticalTotal, setCriticalTotal] = useState(0);
    const [healthyTotal, setHealthyTotal] = useState(0);
    const [unknownTotal, setUnknownTotal] = useState(0);
    const [isHeaderOver, setIsHeaderOver] = useState(false);
    // const [isBkgOver, setIsBkgOver] = useState(false);
    const [isCircleOver, setIsCircleOver] = useState(false);
    const [componentHolderClassName, setComponentHolderClassName] = useState("componentHolder");

    const setItems = () => {
        let criticalN, healthyN, unknownN;
        //-- creating a special case for prototyping:: 
        switch (title.toLowerCase(0)) {
            case "services":
                //-- APM Services - 0, 5, 46
                criticalN = 0;
                healthyN = 5;
                unknownN = 46;
                break;
            case "namespaces":
                //-- Kubernetes Namespaces - 1, 25, 120
                criticalN = 1;
                healthyN = 25;
                unknownN = 120;
                break;
            case "storage":
                //-- Infrastructure Storage - 0, 0, 15
                criticalN = 0;
                healthyN = 0;
                unknownN = 15;
                break;
            case "test1":
                //-- Infrastructure Test1 - 25, 35, 60
                criticalN = 30;
                healthyN = 35;
                unknownN = 60;
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
    };


    useEffect(() => {
        let isFocused = false;
        if (isObservePage && (title.toLowerCase() === ("services") || title.toLowerCase() === ("namespaces") || title.toLowerCase() === ("storage")) )
        {
            isFocused = true;
        }
        setItems();
        if (isFocused && isObservePage) {
            setComponentHolderClassName("componentHolder isFocused");
        }
        else {
            setComponentHolderClassName("componentHolder");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onHeaderOverHandler = () => { setIsHeaderOver(true); }
    const onHeaderOutHandler = () => { setIsHeaderOver(false); }
    // const onBkgOverHandler = () => {setIsBkgOver(true); }
    // const onBkgOutHandler = () => { setIsBkgOver(false); }
    const onCircleOverHandler = () => { setIsCircleOver(true); }
    const onCircleOutHandler = () => { setIsCircleOver(false);}
    const fixedWidthStyleObj = {width: "243px"};

    return (
        // <div className="rgComponent">
       <div className="rgComponent" style={ isFixedWidth ? fixedWidthStyleObj : {} }>
            <div className="componentHeader" 
                 onMouseOver={onHeaderOverHandler}
                 onMouseOut={onHeaderOutHandler}
            >
                <span className="componentTitle">{title}<i className="chevronRight">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i></span><span className="totalNum">{totalNum}</span>
            </div>
            <div className={isCenterAlign || isObserveCenterAlign? componentHolderClassName + " centerAlign":componentHolderClassName} >
                <div 
                    className={`entityHolder ${( isHeaderOver && !isCircleOver) ? "bkgHover" : ""}`}
                    // onMouseOver={onBkgOverHandler}
                    // onMouseOut={onBkgOutHandler}
                >
                { criticalTotal > 0 && 
                    <Circle onOverHandler={onCircleOverHandler} onOutHandler={onCircleOutHandler}
                    radius={Math.min(minRadius + bubbleRadius * ((criticalTotal-1)/2), maxRadius)} bubbleTypeIndex={0} total={criticalTotal} opacity={100}/>
                }
                { healthyTotal > 0 &&         
                    <Circle onOverHandler={onCircleOverHandler} onOutHandler={onCircleOutHandler}
                    radius={Math.min(minRadius + bubbleRadius * ((healthyTotal-1)/2), maxRadius)} bubbleTypeIndex={2} total={healthyTotal} opacity={100}/>
                }
                { unknownTotal > 0 && 
                    <Circle onOverHandler={onCircleOverHandler} onOutHandler={onCircleOutHandler}
                    radius={Math.min(minRadius + bubbleRadius * ((unknownTotal-1)/2), maxRadius)} bubbleTypeIndex={1} total={unknownTotal} opacity={100}/>
                }
                </div>
            </div>
        </div>
    )
}

export default RGComponent