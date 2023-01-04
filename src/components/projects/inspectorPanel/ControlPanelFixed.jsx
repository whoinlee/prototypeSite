import { useContext } from 'react';
//-- contexts
import { InspectorPanelFixedContext } from '../../../contexts/InspectorPanelState';


const ControlPanelFixed = ({    type="Fixed", ratioLabelList, ratioList, 
                                onShowGuidesChange, 
                        }) => {
    const { showGuidesFixed } = useContext(InspectorPanelFixedContext);

    return (
        <div className="controlPanel">
            <div className="column">
                <label  className="optionLabel" htmlFor="showHideFixed">Show Width Guides: </label>
                <input  className="checkboxOption"
                        id="showHideFixed" type="checkbox"
                        checked={showGuidesFixed === true}
                        onChange={onShowGuidesChange}
                />
            </div>
        </div>
    )
}

export default ControlPanelFixed