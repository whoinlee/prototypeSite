import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//-- contexts
import { ThemeNavContext } from '../contexts/ThemeNavContext';

const BaseApp = (props) => {
  const {
    // scrollToTop,
    setIsDarkTheme,
    setIsNavOpen,
    setIsNavStay,
    setHideNav,
    setResetNav,
  } = useContext(ThemeNavContext);
  const appClassName = 'BaseApp ' + props.projClassName;

  useEffect(() => {
    document.title = props.title;
    // if (scrollToTop) document.querySelector('body').scrollTo({top:0, left:0, behavior: 'smooth'});
    setIsDarkTheme(props.isDark);
    setIsNavOpen(false);
    setIsNavStay(false);
    setHideNav(true);
    setResetNav(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={props.isDark ? appClassName + ' dark ' : appClassName}>
      {/* <p className="headline"><b>{props.title}</b></p> */}
      {props.children}
      {props.isBackHome && (
        <p className='backHome'>
          <Link to='/'>Back Home</Link>
        </p>
      )}
    </div>
  );
};

//***********/
BaseApp.defaultProps = {
  title: 'Particle Prototypes',
  isBackHome: false,
  isDark: false,
  projClassName: '',
};
//***********/

BaseApp.propTypes = {
  title: PropTypes.string.isRequired,
  isBackHome: PropTypes.bool.isRequired,
  isDark: PropTypes.bool.isRequired,
  projClassName: PropTypes.string,
};

export default BaseApp;