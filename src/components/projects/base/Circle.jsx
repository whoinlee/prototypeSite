import PropTypes from 'prop-types';
import { 
  useState,
  useEffect
} from 'react';


const Circle = ({ radius, bubbleTypeIndex, total, opacity, isSelected=false, 
                  onClickHandler, onOverHandler, onOutHandler
                }) => {
  // const colorArr = [ "#F9585C", "#bcbec8", "#6be398", "#ffffff", "#ffd769" ];
  const colorArr = [ "#ed5a5f", "#bcbec8", "#40bf73", "#ffffff", "#ffd769" ];
  const styleObj = {
    width: radius*2 + "px",
    height: radius*2 + "px",
    borderRadius: "50%",
    backgroundColor: colorArr[bubbleTypeIndex],
    opacity: opacity+"%",
    fontSize: "11px",
    textAlign: "center",
  };
  const [statusClassName, setStatusClassName] = useState("");

  useEffect(() => {
    setStatusClassName("");
    if (isSelected) setStatusClassName("selected");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected]);

  
  return (
    <div className={"circleHolder " + statusClassName} 
         onClick={!isSelected? onClickHandler : void {} } 
         onMouseOver={onOverHandler}
         onMouseOut={onOutHandler}
    >
      <div  className="circle"
            style={styleObj}>
        {(total !== 0) &&
          <p  className="totalNum">{total}</p>
        }
      </div>
    </div>
  )
}

Circle.defaultProps = {
  radius: 25,
  bubbleTypeIndex: 2,
  total: 1,
  opacity: 100,
}

Circle.propTypes = {
  radius: PropTypes.number,
  bubbleTypeIndex: PropTypes.number,
  opacity: PropTypes.number,
  total: PropTypes.number,
}

export default Circle;