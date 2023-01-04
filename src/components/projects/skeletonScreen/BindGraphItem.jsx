import { useContext, useEffect, useRef, useState } from 'react';
//-- contexts
import { SkeletonServicesContext } from '../../../contexts/SkeletonLoadingState';
//-- styles
import "../../../styles/SkeletonScreen.scss";


const BindGraphItem = ( {chartTitle} ) => {
    const { showSkeleton, showComponent } = useContext(SkeletonServicesContext);
    const [ showLoader, setShowLoader ] = useState(false);

    let hideLoaderID = useRef();   //****/
    const updateShowLoader = () => {
        setShowLoader(false);
    }

    useEffect(() => {
        if (showSkeleton) setShowLoader(true);
        if (showComponent) {
            if (hideLoaderID.current) clearTimeout(hideLoaderID.current);
            hideLoaderID.current = setTimeout(updateShowLoader, 500 + Math.random()*1500);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showSkeleton, showComponent]);

    return (
        <div className="compContainer bindComponentContainer" >
            <div className="bindHolder" style={{   width:"909px", height:"200px", 
                                                   marginTop: "5px",
                                                   }}>
                <div className="bindHeader">{chartTitle}</div>
                <div className={ (!showLoader && showComponent) ? "binderContentHolder show " : "binderContentHolder " } 
                     style={{ marginLeft: "75px" }}
                />
                <div 
                     className="bindLoader"
                     style={{visibility: (showLoader)? "visible" : "hidden"}}                  
                >
                    <div className="ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="loading-text">Loading...</div>
                </div>
            </div>
        </div>
    );
}

export default BindGraphItem