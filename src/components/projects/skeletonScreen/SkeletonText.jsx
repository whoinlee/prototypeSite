import PropTypes from 'prop-types';
import { useEffect, useState} from 'react';


const SkeletonText = ({ width, height, text, showSkeleton, showComponent, animType="fade-base", delay }) => {
  const styleObj = {
    width: width + "px",
    height: height + "px",
  };

  const [showDelayedSkeleton, setShowDelayedSkeleton] = useState(false);
  useEffect(() => {
    let delayedSkeletonID;
    const updateDelayedSkeleton = () => {
        setShowDelayedSkeleton(true);
    }
    if (showSkeleton) {
        if (delayedSkeletonID) clearTimeout(delayedSkeletonID);
        delayedSkeletonID = setTimeout(updateDelayedSkeleton, delay*1000);
    }
    if (showComponent) {
      if (delayedSkeletonID) clearTimeout(delayedSkeletonID);
      setShowDelayedSkeleton(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSkeleton, showComponent]);

  return (
    <div  
          // className={ showSkeleton? "skeleton-text " + animType : "skeleton-text" }
          className={ showDelayedSkeleton? "skeleton-text " + animType : "skeleton-text" }
          style={styleObj}>
      <p className={ showComponent? "skeleton-text-p show" : "skeleton-text-p" }>{text}</p>
    </div>
  )
}

SkeletonText.defaultProps = {
  width: 82,
  height: 16,
  text: "Text",
  showSkeleton: true
}

SkeletonText.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  text: PropTypes.string,
  showSkeleton: PropTypes.bool
}

export default SkeletonText;


