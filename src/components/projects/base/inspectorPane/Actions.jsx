import { useEffect, useState } from 'react';
//-- components
import Button from "../Button";
import ExpanderDown from "../icons/ExpanderDown";

const offsetX = 20;
const initButtonWidth = 190;
const Actions = ( { title, paneWidth, isAdjustable, buttonTexts} ) => {
    const [buttonWidth, setButtonWidth] = useState(initButtonWidth);

    useEffect(() => {
        if (isAdjustable) {
            // setButtonWidth(Math.max(paneWidth - 4, initButtonWidth));
            setButtonWidth(Math.max(paneWidth - offsetX, initButtonWidth));
        } else {
            setButtonWidth(initButtonWidth);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paneWidth, isAdjustable]);

  return (
    <div className="actions" style={ { width: `${paneWidth}px` } }>
        <div className="headline">
            <p className="title">{title}</p>
            <ExpanderDown />
        </div>
        {buttonTexts.map((bText, index) => (
            <Button key={index+"bText"} text={bText} width={buttonWidth} />
        ))}
    </div>
  )
}

Actions.defaultProps = {
    title: "ACTIONS", 
    paneWidth: 230,
    isAdjustable: false, //-- isButtonWidth adjustable?
    buttonTexts: ["Anomaly Detetion", "Health Rules"]
}

export default Actions;