import { useContext, 
        //  useState 
} from 'react';
//-- contexts
import { RGExample3Context } from '../../../../contexts/RelationshipGraphState';


const ControlPanelSinglepage = ( props ) => {
    const { 
            selectedSingleEntityGroupIndex, setSelectedSingleEntityGroupIndex,
            isSinglepageCenterAlign, setIsSinglepageCenterAlign
          } = useContext(RGExample3Context);

    const sectionTitles = [
        "APM > Services, healthy (5) & unknown (46) > a healthy entity selected",
        "Kubernetes > Namespaces, critical (1) > a critical entity selected",
        "Infrastructure > Storage, unknown (15) > an unknown entity selected"
    ];

    const onAlignmentChange = (e) => { 
        setIsSinglepageCenterAlign(e.target.value === "true");
    };
    const onSelectChange = (e) => { setSelectedSingleEntityGroupIndex(e.target.value*1) }

    return (
        <div className="controlPanel subpage">
            <div className="column">
                <div className="dropdown">
                    <select onChange={onSelectChange} defaultValue={selectedSingleEntityGroupIndex}>
                        {
                            sectionTitles.map((item, index) => 
                                <option key={index + item} value={index}>{item}</option>
                            )
                        }
                    </select>
                </div>
            </div>
            <div className="column">
                <label  className="optionLabel">Entity Alignment: </label>
                <label  className="ratioLabel" htmlFor="left4">
                    <input  className="radioOption" type="radio" name="left4"
                            checked={!isSinglepageCenterAlign}
                            value={false}
                            onChange={onAlignmentChange}
                    /> Left&nbsp;&nbsp;&nbsp;
                </label>
                <label  className="ratioLabel" htmlFor="center4">
                    <input  className="radioOption" type="radio" name="center4"
                            checked={isSinglepageCenterAlign}
                            value={true}
                            onChange={onAlignmentChange}
                    /> Center
                </label>
            </div>
        </div>
    )
}

export default ControlPanelSinglepage;