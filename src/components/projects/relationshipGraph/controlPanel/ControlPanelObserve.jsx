import { useContext } from 'react';
//-- contexts
import { RGExample1Context } from '../../../../contexts/RelationshipGraphState';


const ControlPanelObserve = ( props ) => {
    const { 
            isObserveCenterAlign, setIsObserveCenterAlign,
            showGridsObserve, setShowGridsObserve,
            isGridTypeObserve, setIsGridTypeObserve,
          } = useContext(RGExample1Context);

    const onAlignmentChange = (e) => { setIsObserveCenterAlign(e.target.value === "true") };
    const onShowGridsChange = () => { setShowGridsObserve(!showGridsObserve) };
    const onTypeChange = (e) => { setIsGridTypeObserve(e.target.value) };

    return (
        <div className="controlPanel observe">
            <div className="column">
                <label  className="optionLabel">Entity Alignment: </label>
                <input  className="radioOption" type="radio" name="center2"
                        checked={isObserveCenterAlign}
                        value={true}
                        onChange={onAlignmentChange}
                /> Center&nbsp;&nbsp;&nbsp;
                <input  className="radioOption" type="radio" name="left2"
                        checked={!isObserveCenterAlign}
                        value={false}
                        onChange={onAlignmentChange}
                /> Left
            </div>
            {/* <div className="column">
                <label  className="optionLabel">Show Grid Layout: </label>
                <input  className="checkboxOption" type="checkbox"
                        name="showGridsObserve" 
                        checked={showGridsObserve === true}
                        onChange={onShowGridsChange}
                />
            </div> */}
            <div className="column">
            <label  className="optionLabel">Layout Type: </label>
                <input  className="radioOption" type="radio" 
                        name="ob-type0"
                        checked={isGridTypeObserve === "flexBox"}
                        value={"flexBox"}
                        onChange={onTypeChange}
                /> Flexbox&nbsp;&nbsp;&nbsp;
                <input  className="radioOption" type="radio" 
                        name="ob-type1"
                        checked={isGridTypeObserve === "type1Grid"}
                        value={"type1Grid"}
                        onChange={onTypeChange}
                /> Grid1&nbsp;&nbsp;&nbsp;
                <input  className="radioOption" type="radio" 
                        name="ob-type2"
                        checked={isGridTypeObserve === "type2Grid"}
                        value={"type2Grid"}
                        onChange={onTypeChange}
                /> Grid2
            </div>
        </div>
    )
}

export default ControlPanelObserve;