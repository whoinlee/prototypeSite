import { useContext } from 'react';
//-- contexts
import { InspectorPanelLgContext } from '../../../contexts/InspectorPanelState';


const ControlPanel = ( { type="Lg", ratioLabelList, ratioList, onPanelRatioChange, 
                         onShowGuidesChange, onShowGridsChange, onRescaleButtonChange }) => {
    const { panelRatioLg,
            showGuidesLg,
            showGridsLg,
            rescaleButtonLg } = useContext(InspectorPanelLgContext);

    return (
        <div className="controlPanel" style={{width: "1400px"}}>
            <div className="column">
                <label  className="optionLabel">Inspector Panel Ratio: </label>
                <label  className="ratioLabel" htmlFor="radio">
                    <input  className="radioOption" type="radio" name={"radio"+type} 
                            checked={panelRatioLg.toString() === ratioList[0].toString()}
                            value={ratioList[0]}
                            onChange={onPanelRatioChange}
                            /> {ratioLabelList[0]}
                </label>
                <label  className="ratioLabel" htmlFor="radio">
                    <input  className="radioOption" type="radio" name={"radio"+type}
                            checked={panelRatioLg.toString() === ratioList[1].toString()}
                            value={ratioList[1]}
                            onChange={onPanelRatioChange}
                            /> {ratioLabelList[1]}
                </label>
            </div>
            <div className="column">
                <label  className="optionLabel" htmlFor="showGridsLg">Show Grid Layout: </label>
                <input  className="checkboxOption"
                        id="showGridsLg" type="checkbox"
                        checked={showGridsLg === true}
                        onChange={onShowGridsChange}
                />
            </div>
            <div className="column">
                <label  className="optionLabel" htmlFor="showHideLg">Show Width Guides: </label>
                <input  className="checkboxOption"
                        id="showHideLg" type="checkbox"
                        checked={showGuidesLg === true}
                        onChange={onShowGuidesChange}
                        />
            </div>
            <div className="column">
                <label  className="optionLabel" htmlFor="rescaleButton">Rescale Button & Field Width: </label>
                <input  className="checkboxOption"
                        id="rescaleButton" type="checkbox"
                        checked={rescaleButtonLg === true}
                        onChange={onRescaleButtonChange}
                        />
            </div>
        </div>
    )
}

export default ControlPanel