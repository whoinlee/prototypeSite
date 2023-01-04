import { useContext } from 'react';
//-- contexts
import { RGComponentContext } from '../../../../contexts/RelationshipGraphState';


const ControlPanelComponent = () => {
    const { 
        selectedEntityGroupIndex, setSelectedEntityGroupIndex,
        isComponentCenterAlign, setIsComponentCenterAlign, 
        showGridsComponent, setShowGridsComponent,
        // isType1Grid, setIsType1Grid, 
        // isFlex, setIsFlex,
        isGridTypeComp, setIsGridTypeComp,
    } = useContext(RGComponentContext);

    const sectionTitles = [
        "Application Performance Monitoring",
        "Kubernetes",
        "Infrastructure"
    ];

    const onSelectChange = (e) => { setSelectedEntityGroupIndex(e.target.value*1) };
    const onAlignmentChange = (e) => { setIsComponentCenterAlign(e.target.value === "true") };
    const onShowGridsChange = () => { setShowGridsComponent(!showGridsComponent) };
    const onTypeChange = (e) => { setIsGridTypeComp(e.target.value) };

    return (
        <div className="controlPanel">
            <div className="column">
                <div className="dropdown">
                    <select onChange={onSelectChange} defaultValue={selectedEntityGroupIndex}>
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
                <input  className="radioOption" type="radio" 
                        name="center"
                        checked={isComponentCenterAlign}
                        value={true}
                        onChange={onAlignmentChange}
                /> Center&nbsp;&nbsp;&nbsp;
                <input  className="radioOption" type="radio" 
                        name="left"
                        checked={!isComponentCenterAlign}
                        value={false}
                        onChange={onAlignmentChange}
                /> Left
            </div>
            <div className="column">
            <label  className="optionLabel">Layout Type: </label>
                <input  className="radioOption" type="radio" 
                        name="type0"
                        checked={isGridTypeComp === "flexBox"}
                        value={"flexBox"}
                        onChange={onTypeChange}
                /> Flexbox&nbsp;&nbsp;&nbsp;
                <input  className="radioOption" type="radio" 
                        name="type1"
                        checked={isGridTypeComp === "type1Grid"}
                        value={"type1Grid"}
                        onChange={onTypeChange}
                /> Grid1&nbsp;&nbsp;&nbsp;
                <input  className="radioOption" type="radio" 
                        name="type2"
                        checked={isGridTypeComp === "type2Grid"}
                        value={"type2Grid"}
                        onChange={onTypeChange}
                /> Grid2
            </div>
            <div className="column">
                <label  className="optionLabel">Show Grid Layout Guides: </label>
                <input  className="checkboxOption" type="checkbox"
                        name="showGridsComponent" 
                        checked={showGridsComponent === true}
                        onChange={onShowGridsChange}
                />
            </div>
        </div>
    )
}

export default ControlPanelComponent;