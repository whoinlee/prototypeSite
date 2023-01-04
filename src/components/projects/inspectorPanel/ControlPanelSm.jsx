import { useContext } from 'react';
//-- contexts
import { InspectorPanelSmContext } from '../../../contexts/InspectorPanelState';


const ControlPanelSm = ({   type="Sm", ratioLabelList, ratioList, 
                            onPanelRatioChange, 
                            onShowGuidesChange, 
                            onShowGridsChange,
                            onRescaleButtonChange ,
                            onHidePropertiesChange 
                        }) => {
    const { panelRatioSm,
            showGuidesSm,
            showGridsSm,
            rescaleButtonSm,
            hideProperties
    } = useContext(InspectorPanelSmContext);

    return (
        <div className="controlPanel" style={{width: "1500px"}}>
            <div className="column">
                <label  className="optionLabel">Inspector Panel Ratio: </label>
                <label  className="ratioLabel" htmlFor="radio">
                    <input  className="radioOption" type="radio" name={"radio"+type} 
                            checked={panelRatioSm.toString() === ratioList[0].toString()}
                            value={ratioList[0]}
                            onChange={onPanelRatioChange}
                    /> {ratioLabelList[0]}
                </label>
                <label  className="ratioLabel" htmlFor="radio">
                    <input  className="radioOption" type="radio" name={"radio"+type}
                            checked={panelRatioSm.toString() === ratioList[1].toString()}
                            value={ratioList[1]}
                            onChange={onPanelRatioChange}
                    /> {ratioLabelList[1]}
                </label>
            </div>
            <div className="column">
                <label  className="optionLabel" htmlFor="showGridsSm">Show Grid Layout: </label>
                <input  className="checkboxOption"
                        id="showGridsSm" type="checkbox"
                        checked={showGridsSm === true}
                        onChange={onShowGridsChange}
                />
            </div>
            <div className="column">
                <label  className="optionLabel" htmlFor="showHideSm">Show Width Guides: </label>
                <input  className="checkboxOption"
                        id="showHideSm" type="checkbox"
                        checked={showGuidesSm === true}
                        onChange={onShowGuidesChange}
                />
            </div>
            <div className="column">
                <label  className="optionLabel" htmlFor="rescaleButton">Rescale Button Width: </label>
                <input  className="checkboxOption"
                        id="rescaleButton" type="checkbox"
                        checked={rescaleButtonSm === true}
                        onChange={onRescaleButtonChange}
                />
            </div>
            <div className="column">
                <label  className="optionLabel" htmlFor="hideProperties">Hide Properties: </label>
                <input  className="checkboxOption"
                        id="hideProperties" type="checkbox"
                        checked={hideProperties === true}
                        onChange={onHidePropertiesChange}
                />
            </div>
        </div>
    )
}

export default ControlPanelSm