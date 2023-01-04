import { useContext } from 'react';
//-- contexts
import { RGExample2Context } from '../../../../contexts/RelationshipGraphState';


const ControlPanelSubpage = ( props ) => {
    const { 
            selectedSubEntityGroupIndex, setSelectedSubEntityGroupIndex,
            setSelectedMainHeader,
            isSubpageCenterAlign, setIsSubpageCenterAlign
          } = useContext(RGExample2Context);

    const sectionTitles = [
        "APM > Services, header (all) selected",
        "Kubernetes > Namespaces, critical (1) selected",
        "Infrastructure > Storage, unknown (15) selected"
    ];

    const selectedMainHeaders = ["Services (51)", "Namespaces (1)", "Storage (15)"];

    const onAlignmentChange = (e) => { 
        setIsSubpageCenterAlign(e.target.value === "true");
    };

    const onSelectChange = (e) => { 
        setSelectedSubEntityGroupIndex(e.target.value*1);
        setSelectedMainHeader(selectedMainHeaders[e.target.value*1]);
    };

    return (
        <div className="controlPanel subpage">
            <div className="column">
                <div className="dropdown">
                    <select onChange={onSelectChange} defaultValue={selectedSubEntityGroupIndex}>
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
                <label  className="ratioLabel" htmlFor="left3">
                    <input  className="radioOption" type="radio" name="left3"
                            checked={!isSubpageCenterAlign}
                            value={false}
                            onChange={onAlignmentChange}
                    /> Left&nbsp;&nbsp;&nbsp;
                </label>
                <label  className="ratioLabel" htmlFor="center3">
                    <input  className="radioOption" type="radio" name="center3"
                            checked={isSubpageCenterAlign}
                            value={true}
                            onChange={onAlignmentChange}
                    /> Center
                </label>
            </div>
        </div>
    )
}

export default ControlPanelSubpage;