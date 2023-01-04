import { useContext, useEffect, useRef } from 'react';
import IframeResizer from 'iframe-resizer-react';
import PropTypes from 'prop-types';
//-- contexts
import { ThemeNavContext } from '../contexts/ThemeNavContext';


const BaseIFrame = (props) => {
  const { isDarkTheme, setIsDarkTheme, setIsNavOpen } = useContext(ThemeNavContext);
  
  useEffect(() => {
    if (isDarkTheme !== props.isDark) setIsDarkTheme(props.isDark);
    setIsNavOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const iFrameRef = useRef(null);
  
  return (
    <div style={divStyle}>
      <IframeResizer 
        frameBorder="0" 
        scrolling="no" 
        warningTimeout="10000"
        forwardRef={iFrameRef}
        log={true}
        src={props.dataURL} 
        style={{ width: '100vw', height: '100vh', overflow: "hidden" }}
      />
    </div>
  )
};

//-- resolves iFrame bottom extra margin issue
const divStyle = {
  width: '100%',
  height: '100%'
};

BaseIFrame.defaultProps = {
  isDark: false,
  projClassName: ''
}

BaseIFrame.propTypes = {
  dataURL: PropTypes.string.isRequired,
  isDark: PropTypes.bool.isRequired,
  projClassName: PropTypes.string
}

export default BaseIFrame;