import { 
    useContext,
    useEffect, 
    useState
} from 'react';
//-- components
import Circle from "../../base/Circle";
//-- contexts
import { RGExample3Context } from '../../../../contexts/RelationshipGraphState';


const RGPaneSingleEntity = ( {  title,
                                isGroupSelected,
                            } ) => {
    const { isSinglepageCenterAlign } = useContext(RGExample3Context);
    const minRadius = 6;
    const [totalNum, setTotalNum] = useState(0);
    const [criticalTotal, setCriticalTotal] = useState(0);
    const [healthyTotal, setHealthyTotal] = useState(0);
    const [unknownTotal, setUnknownTotal] = useState(0);
    const [selectedEntityName, setSelectedEntityName] = useState("");

    const entityNames = ["brostatus-entity-11eli", "load", "long-long-long-long-long-long-long-long-long-long-entity-title"];

    const setItems = () => {
        let criticalN, healthyN, unknownN;
        
        //-- creating a special case for prototyping:: 
        switch (title.toLowerCase(0)) {
            case "service":
                criticalN = 0;
                healthyN = 1;
                unknownN = 0;
                setSelectedEntityName(entityNames[0]);
                break;
            case "namespace":
                criticalN = 1;
                healthyN = 0;
                unknownN = 0;
                setSelectedEntityName(entityNames[1]);
                break;
            case "storage":
                criticalN = 0;
                healthyN = 0;
                unknownN = 1;
                setSelectedEntityName(entityNames[2]);
                break;
            default:
        }

        setHealthyTotal(healthyN);
        setUnknownTotal(unknownN);
        setCriticalTotal(criticalN);
        setTotalNum(healthyN + unknownN + criticalN);
    }

    useEffect(() => {
        setItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ isGroupSelected ]);

    return (
        <div className="rgPaneSingleEntity">
            <div className="entityHeader selected" >
                <span className="componentTitle">{title}<i className="chevronRight">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i></span><span className="totalNum">{totalNum}</span>
            </div>
            {/* <div className="entityHolder" > */}
            <div className={`entityHolder ${isSinglepageCenterAlign? "centerAlign" : ""}`} >
                
                <div 
                // className="bubbleHolder"
                className="bubbleHolder singleEntity"
                >
                { criticalTotal > 0 && 
                    <Circle 
                            isSelected={true}
                            radius={minRadius} 
                            bubbleTypeIndex={0} total={1} opacity={100} />
                }
                { healthyTotal > 0 &&         
                    <Circle 
                            isSelected={true}
                            radius={minRadius} 
                            bubbleTypeIndex={2} total={1} opacity={100}/>
                }
                { unknownTotal > 0 && 
                    <Circle 
                            isSelected={true}
                            radius={minRadius} 
                            bubbleTypeIndex={1} total={1} opacity={100}/>
                }
                </div>
                <div className="labelHolder">{selectedEntityName}</div>
            </div>
        </div>
    )
}

export default RGPaneSingleEntity