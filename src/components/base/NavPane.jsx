import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
//-- components
import MenuItem from "./MenuItem";
//-- contexts
import { ThemeNavContext } from '../../contexts/ThemeNavContext';


const NavPane = (props) => {
  const { 
    isNavOpen, setIsNavOpen, 
    isNavStay, 
    hideNav, 
    resetNav, 
    setScrollToTop } = useContext(ThemeNavContext);
  const [ selectedParentMenu, setSelectedParentMenu ] = useState(null);
  const [ selectedSubMenuHolder, setSelectedSubMenuHolder ] = useState(null);
  const [ selectedSubMenu, setSelectedSubMenu ] = useState(null);
  const navigate = useNavigate();

  const resetSelectedMenu = () => {
    // console.log("\nINFO NavPane :: resetSelectedMenu =========================> START");
    //-- deselect previous parentMenu 
    if (selectedParentMenu) {
      selectedParentMenu.classList.remove("activeWithSub");
      const arrow = selectedParentMenu.querySelector("span");
      if (arrow) arrow.classList.remove("down");
    }
    //-- close/hide previous subMenuHolder
    if (selectedSubMenuHolder) selectedSubMenuHolder.classList.remove("show");
    //-- deselect previous subMenu
    if (selectedSubMenu) selectedSubMenu.classList.remove("active");
    setSelectedParentMenu(null);
    setSelectedSubMenuHolder(null);
    setSelectedSubMenu(null);
    setScrollToTop(true);
  }

  useEffect(() => {
    if (resetNav) resetSelectedMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetNav]);

  const onLogoClickHandler = () => {
    navigate(props.logo.path);
  }

  const onMenuClicked = (targetElt) => {
    // console.log("\nINFO NavPane :: onMenuClicked, targetElt? ", targetElt);
    resetSelectedMenu();
    setSelectedParentMenu(targetElt);
    setScrollToTop(true);
  }

  const onMenuWithSubClicked = (targetElt, isOpening) => {
    // console.log("\nINFO NavPane :: onMenuWithSubClicked, isOpening? ", isOpening);
    const parentMenu = targetElt;
    const arrow = targetElt.querySelector("span");
    const subMenuHolder = targetElt.parentElement.nextElementSibling;
    if (isOpening) {
      //-- reset previous menu selections
      resetSelectedMenu();
      parentMenu.classList.add("activeWithSub");
      arrow.classList.add("down");
      subMenuHolder.classList.add("show");
      setSelectedSubMenuHolder(subMenuHolder);
      setScrollToTop(false);
    } else {
      //-- reset previous menu selections
      if (selectedParentMenu && selectedParentMenu !== parentMenu) resetSelectedMenu();
      //-- deselect previous subMenu
      if (selectedSubMenu) selectedSubMenu.classList.remove("active");
      //-- close/hide SubMenu
      subMenuHolder.classList.remove("show");
      //-- set parentMenu to active state
      parentMenu.classList.add("activeWithSub");
      arrow.classList.remove("down");
      setSelectedSubMenuHolder(null);
      setScrollToTop(true);
    }
    setSelectedParentMenu(parentMenu);
    setSelectedSubMenu(null);
  }

  const onSubMenuClicked = (targetElt) => {
    // console.log("\nINFO NavPane :: onSubMenuClicked, targetElt? ", targetElt);
    const subMenuHolder = targetElt.parentElement.parentElement;
    const parentMenu = subMenuHolder.previousSibling.querySelector("a");
    //-- reset/deselect parent menu
    if (selectedParentMenu) selectedParentMenu.classList.remove("activeWithSub");
    //-- reset/deselect all subMenu, except the current
    if (selectedSubMenu) selectedSubMenu.classList.remove("active");
    //-- set current selection
    setSelectedSubMenu(targetElt);
    parentMenu.classList.remove("activeWithSub");
    //
    // window.scrollLeft = 0;
  }

  const onToggleBtnClicked = () => {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <div className={`NavPane ${isNavOpen? 'open':'close'} ${hideNav? 'hide':''} ${isNavStay? 'stay':''}`} 
          // onScroll={adjustToggleButton}
    >
      <div className="header">
        <div id="logo" onClick={onLogoClickHandler}/>
        <div id="home">
          <a href={props.home.path} rel="noreferrer" target="_blank">
            {props.home.text}<span className="version"> {props.home.version}</span>
          </a>
        </div>
      </div>
      <div className="navHolder">
      {props.data.map((category, index) => 
        <div className="categoryHolder" key={category.title + index} >
          <p id="title">{category.title}</p>
          <div className="menuHolder">
            {category.menu.map((item, index1) => 
              <div key={item.title + index1} >
                <MenuItem text={item.title}
                          path={item.path}
                          hasSub={item.subMenu.length > 0}
                          isSub={false}
                          onMenuClicked={onMenuClicked}
                          onMenuWithSubClicked={onMenuWithSubClicked} />
                <div className="submenu" >
                { //-- building submenu
                  item.subMenu.map((sub, index2) => 
                    <MenuItem key={sub.title + index2}
                              text={sub.title}
                              path={sub.path}
                              hasSub={false}
                              isSub={true} 
                              onSubMenuClicked={onSubMenuClicked} />
                )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
      <div id="toggleButton" 
           className={isNavOpen? "":"flip"} 
          //  style={{'position':'absolute', 'bottom':'14px', 'backgroundColor': 'red'}}
           onClick={onToggleBtnClicked}>
      </div>
    </div>
  )
}

NavPane.propTypes = {
  data: PropTypes.array.isRequired,
  logo: PropTypes.object.isRequired,
  home: PropTypes.object.isRequired
}

export default NavPane