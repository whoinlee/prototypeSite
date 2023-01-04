import { useContext } from 'react';
//-- components
import DataGridRow from "./DataGridRow";
//-- contexts
import { SkeletonPodsContext } from '../../../contexts/SkeletonLoadingState';
//-- styles
import "../../../styles/SkeletonScreen.scss";


const DataGridCompItem = () => {
    const { showSkeleton, showComponent, animType } = useContext(SkeletonPodsContext);
    
    let dataGridRows = [];
    for (var i = 0; i < 17; i++) {
        dataGridRows.push(<DataGridRow  key={"row" + i} 
                                        columnWidthArr={[62, 152, 60, 110, 134, 126, 140, 74, 48]}
                                        columnTextArr={["", "", "", "", "", "", "", "", ""]}
                                        columnMarginArr={[0, 0, 0, 0, 0, 0, 0, 0, 0]}
                                        showSkeleton={showSkeleton}
                                        showComponent={showComponent}
                                        animType={animType}
                                        delay={Math.floor(i/2) *.1}
        />);
    }
    
    return (
        <div className="gridHolder" 
             style={{ width:"949px", height:"800px" }}>
            <div className={ showComponent? "gridBkgHolder2 show" : "gridBkgHolder2 "} />
            <div className="gridContentHolder2">
                {dataGridRows}
            </div>
        </div>
    );
}

export default DataGridCompItem