import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


const PropertyText = ({ width, height, labelText, descText, showSkeleton, showComponent, animType }) => {
  const [animTypeSpecial, setAnimTypeSpecial] = useState("fade-base"); //fade-base and shimmer
  const styleObj = {
    display: "block",
    width: width + "px",
    height: height + "px",
  };

  useEffect(() => {
    if (animType) {
        const alteredAnimType = (animType.substr(0, 4) === "fade")? "fade-base" : "shimmer-base";
        setAnimTypeSpecial(alteredAnimType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animType]);

  return (
    <div  className={ showSkeleton? "skeleton-text property " + animTypeSpecial : "skeleton-text property" }
          style={styleObj}>
      <p className={ showComponent? "skeleton-text-p label show" : "skeleton-text-p label" }>{labelText}</p>
      <p className={ showComponent? "skeleton-text-p desc show" : "skeleton-text-p desc" }>{descText}</p> 
    </div>
  )
}

PropertyText.defaultProps = {
  width: 101,
  height: 16,
  labelText: "Label",
  descText: "Description",
  showSkeleton: true
}

PropertyText.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  labelText: PropTypes.string,
  descText: PropTypes.string,
  showSkeleton: PropTypes.bool
}

export default PropertyText;