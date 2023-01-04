import PropTypes from 'prop-types';


const RoundedRectangle = ({ width, height, borderRadius, color, opacity }) => 
  <div  className="roundedRectangle"
        style={styleObj} />

const styleObj = {
  width: `{width}px`,
  height: `{height}px`,
  borderRadius: `{borderRadius}px`,
  backgroundColor: `{color}`,
  opacity: `{opacity}%`
};

RoundedRectangle.defaultProps = {
  borderRadius: 3, 
  width: 81, 
  height: 16, 
  color: "#ffffff",
  opacity: 50
}

RoundedRectangle.propTypes = {
  borderRadius: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  opacity: PropTypes.number,
}

export default RoundedRectangle;