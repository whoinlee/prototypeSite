import { useContext } from 'react';
import PropTypes from 'prop-types';
//-- contexts
import { ThemeNavContext } from '../../contexts/ThemeNavContext';


const BarButton = ({ onBarClickHandler }) => {
  const { isBarButtonActive, setIsBarButtonActive } = useContext(ThemeNavContext);

  const onClickHandler = (e) => {
    e.preventDefault();
    setIsBarButtonActive(!isBarButtonActive);
    onBarClickHandler();
  };

  return (
    <div  id="barButton" 
          className={
            isBarButtonActive ? 'active' : ''
          }
          onClick={onClickHandler}>
      <div className="bar"></div>
    </div>
  )
}

BarButton.propTypes = {
  onBarClickHandler: PropTypes.func.isRequired
}

export default BarButton;