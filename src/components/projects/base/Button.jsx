import PropTypes from 'prop-types';


const Button = (props) => {
  const styleObj = {
    textAlign: 'center',
    width: `${props.width}px`,
    height: `${props.height}px`,
    borderRadius: `${props.borderRadius}px`,
    color: `${props.color}`,
    backgroundColor: `${props.backgroundColor}`,
  };

  return(
    <div className="button" style={styleObj}>
      {props.text}
    </div>
)};

Button.defaultProps = {
  text: "Button Text",
  color: "rgba(#ffffff, .94)", //"#f3f3f4"
  width: 190, 
  height: 30, 
  borderRadius: 3, 
  backgroundColor: "rgba(#ffffff, .1)",
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  borderRadius: PropTypes.number,
  backgroundColor: PropTypes.string,
}

export default Button;