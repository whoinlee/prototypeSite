import { useContext, useEffect, useState } from 'react';
//-- contexts
import { SkeletonPodsContext } from '../../../contexts/SkeletonLoadingState';
//-- styles
import "../../../styles/SkeletonScreen.scss";


const RCItemSpecial1 = ( { isLast, entityTitle, delay }) => {
    const { showSkeleton, showComponent, resetCompItem, compItemDataLoaded, animType } = useContext(SkeletonPodsContext);
    const [entityName, setEntityName] = useState("");
    const [totalNum, setTotalNum] = useState("");
    const [animTypeSpecial, setAnimTypeSpecial] = useState("fade-base"); //fade-base and shimmer
    const className = "relationshipComp Special";

    // const [showDelayedSkeleton, setShowDelayedSkeleton] = useState(false);
    // let delayedSkeletonID;

    const resetItems = () => {
        setEntityName("");
        setTotalNum("");
        // setShowDelayedSkeleton(false);
    }

    const setItems = () => {
        setEntityName(entityTitle);
        setTotalNum("1");
    }
    
    useEffect(() => {
        if (resetCompItem) resetItems();
        if (compItemDataLoaded) setItems();
        if (animType) {
            const alteredAnimType = (animType.substr(0, 4) === "fade")? "fade-base" : "shimmer-base";
            setAnimTypeSpecial(alteredAnimType);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [resetCompItem, compItemDataLoaded, animType]);

    return (
        <div className={className}>
            <div className="entityHolder Special"
                 style={{"visibility": (!showSkeleton&&!showComponent)? "hidden" : "visible"}}>
                <div className="header">
                    <div 
                        className={(showSkeleton)? "skeleton-text-title-sm " + animTypeSpecial : ""}
                    >{entityName}</div>
                    <div className="total">{totalNum}</div>
                </div>
                <div className="bubbleHolder Special">
                    <div 
                        className={(showSkeleton)? "skeleton-bubble-sm " + animTypeSpecial : "skeleton-bubble-sm"}
                        style={{"display": (showSkeleton)? "block" : "none"}}
                    />
                    <div className={(showComponent)? "entityBkgHolder bkg1 show" : "entityBkgHolder bkg1 "} />
                </div>
            </div>
        </div>
    );
}

export default RCItemSpecial1