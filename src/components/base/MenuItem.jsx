import { useRef } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { HashLink } from '@xzar90/react-router-hash-link';
import PropTypes from 'prop-types';


const MenuItem = (props) => {
  const menuKind = (props.isSub)? "MenuItem sub" : "MenuItem";
  const activeClassName = (props.hasSub)? "activeWithSub" : "active";
  const navigate = useNavigate();
  const arrowRef = useRef();

  const onClickHandler = (e) => {
    e.preventDefault();
    const targetElt = e.target; //<a> tag

    if (props.hasSub) {
      //-- has subMenu
      navigate(props.path);
      const isOpening =  (arrowRef.current.classList.contains("down"))? false: true;
      props.onMenuWithSubClicked(e.target, isOpening);
    } else if (!targetElt.classList.contains("active")) {
      //-- has no subMenu &&
      //-- not previously selectedMenu
      targetElt.classList.add("active");
      if (props.isSub) {
        props.onSubMenuClicked(e.target);
      } else {
        navigate(props.path);
        props.onMenuClicked(e.target);
      }
    }
  };

  return (
    <div  className={menuKind}
          onMouseDown={onClickHandler}>
      { !props.isSub &&
        <NavLink  to={props.path} end
                  className={
                    ({ isActive }) => isActive ? activeClassName : undefined}>
          {props.hasSub && <span id="arrow" ref={arrowRef}></span>}
        {props.text}</NavLink>
      }
      { props.isSub &&
        <HashLink smooth to={props.path}>{props.text}</HashLink> 
      }
    </div>
  )
};

MenuItem.defaultProps = {
  text: "Menu Item",
  path: "/",
  hasSub: false,
  isSub: false
}

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  hasSub: PropTypes.bool.isRequired,
  isSub: PropTypes.bool.isRequired,
  onMenuClicked:PropTypes.func,
  onMenuWithSubClicked: PropTypes.func,
  onSubMenuClicked: PropTypes.func,
}

export default MenuItem;