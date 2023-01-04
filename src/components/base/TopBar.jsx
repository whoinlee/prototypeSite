import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useEventListener from '../../utils/useEventListener';
//-- components
import BarButton from './BarButton';
//-- contexts
import { ThemeNavContext } from '../../contexts/ThemeNavContext';

const TopBar = ({ data }) => {
  const [isMenuVertical, setIsMenuVertical] = useState(false);
  const [showHide, setShowHide] = useState('show');
  const { isDarkTheme, setIsBarButtonActive } = useContext(ThemeNavContext);
  const navigate = useNavigate();

  const onLogoClickHandler = () => {
    navigate(data.logo.path);
  };

  const onBarClickHandler = () => {
    setIsMenuVertical(!isMenuVertical);
  };

  const onMenuClickHandler = () => {
    if (isMenuVertical) {
      setIsMenuVertical(false);
      setIsBarButtonActive(false);
    }
  };

  const toggleShowHide = (e) => {
    e.preventDefault();
    if (e.pageY > 500) setShowHide('hide');
    else setShowHide('show');
  };

  const onResizeHandler = (e) => {
    e.preventDefault();
    setShowHide('show');
  };

  useEventListener('mousemove', toggleShowHide);
  useEventListener('resize', onResizeHandler);

  return (
    <div
      className={
        isDarkTheme ? 'TopBar light ' + showHide : 'TopBar ' + showHide
      }
    >
      <div id='logo' onClick={onLogoClickHandler} />
      <div id='home'>
        <a href={data.home.path} rel='noreferrer' target='_blank'>
          {data.home.text}
          <span className='version'> {data.home.version}</span>
        </a>
      </div>
      <div className='menuHolder'>
        <ul className={isMenuVertical ? 'active' : ''}>
          {data.menu.map((menu, index) => (
            <li key={index + menu.title} onClick={onMenuClickHandler}>
              {menu.path && (
                <NavLink
                  to={menu.path}
                  className={({ isActive }) =>
                    isActive ? 'active' : undefined
                  }
                >
                  {menu.title}
                </NavLink>
              )}
              {menu.url && (
                <a href={menu.url} rel='noreferrer' target='_blank'>
                  {menu.title}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
      <BarButton onBarClickHandler={onBarClickHandler} />
    </div>
  );
};

TopBar.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TopBar;
