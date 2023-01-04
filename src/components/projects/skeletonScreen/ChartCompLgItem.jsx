import { useContext, useEffect, useState } from 'react';
//-- contexts
import { SkeletonServicesContext } from '../../../contexts/SkeletonLoadingState';
//-- styles
import "../../../styles/SkeletonScreen.scss";


const ChartCompLgItem = ( {chartType, chartTitle} ) => {
    const { showSkeleton, showComponent, animType } = useContext(SkeletonServicesContext);
    const [animTypeChart, setAnimTypeChart] = useState("fade-base"); //fade-base and shimmer
    const iconHolderClassName = (chartType.toLowerCase() !== "line")? 'iconHolderBar' : "iconHolderLine";

    useEffect(() => {
        if (animType) {
            const alteredAnimType = (animType.substr(0, 4) === "fade")? "fade-chart" : "shimmer-chart";
            setAnimTypeChart(alteredAnimType);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [animType]);

    return (
        <div className="compContainer chartComponentContainer Lg item">
            <div className="chartHolder Lg" style={{    width:"909px", height:"250px", 
                                                        marginTop: "5px", 
                                                        marginLeft: "10px" }}>
                <div className="chartBkgHolder Lg" />
                <div className="chartHeader">{chartTitle}</div>
                <div className="chartHeaderIcon" />
                <div 
                     className={ (showComponent)? "chartContentHolder Lg show " + chartType : "chartContentHolder Lg " } 
                />
                <div 
                     className={ (showSkeleton)? "chartSkeletonHolder Lg skeleton-bar-chart " :
                                                 "chartSkeletonHolder Lg" }
                >
                    <div 
                        className={ (showSkeleton)? iconHolderClassName + " " + animTypeChart : iconHolderClassName }
                    />
                </div>
            </div>
        </div>
    );
}

export default ChartCompLgItem