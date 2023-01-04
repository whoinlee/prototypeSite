import PropTypes from 'prop-types';


const Circle = ({ radius, bubbleTypeIndex, total, opacity }) => {
  const colorArr = [ "#F9585C", "#ffd769", "#6be398", "#ffffff" ];
  const styleObj = {
    width: radius*2 + "px",
    height: radius*2 + "px",
    borderRadius: "50%",
    backgroundColor: colorArr[bubbleTypeIndex],
    opacity: opacity+"%",
    fontSize: "11px",
    textAlign: "center",
  };

  return (
    <div className="circleHolder">
      <div  className="circle" 
            style={styleObj}>
        <p  className="totalNum">{total}</p>
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


