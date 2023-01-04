import React, { useState, useEffect } from 'react';
import './Slideshow.scss';

function Slideshow({ slides }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showCaption, setShowCaption] = useState(true);

  const goForward = (index) => {
    if (index === slides.length - 1) {
      return;
      //setSelectedIndex(0);
    } else {
      setSelectedIndex(index + 1);
    }
  };

  const goBackward = (index) => {
    if (index === 0) {
      return;
      //setSelectedIndex(slides.length - 1);
    } else {
      setSelectedIndex(index - 1);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowRight') goForward(selectedIndex);
    if (e.key === 'ArrowLeft') goBackward(selectedIndex);
    if (e.key === 'Enter') setShowCaption(!showCaption);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className='slideshow'>
      <div className='controls'>
        <div
          className={selectedIndex === 0 ? 'hidden' : ''}
          onClick={() => goBackward(selectedIndex)}
        >
          <img src='/appAssets/arrow-left.svg' alt='left' />
        </div>
        <div
          className={selectedIndex === slides.length - 1 ? 'hidden' : ''}
          onClick={() => goForward(selectedIndex)}
        >
          <img src='/appAssets/arrow-right.svg' alt='right' />
        </div>
      </div>
      <div
        className={`caption ${showCaption ? 'active' : ''}`}
        onClick={() => setShowCaption(!showCaption)}
      >
        {showCaption ? (
          <div className='caption-container'>
            <img src='/appAssets/chevron-right.svg' alt='collapse' />{' '}
            {slides[selectedIndex].slideCaption}
          </div>
        ) : (
          <img src='/appAssets/feedback.svg' alt='Toggle Caption' />
        )}
      </div>
      <div className='counter'>
        {selectedIndex + 1} / {slides.length}
      </div>
      <div className='showshow-slides'>
        <div className='slide' key={slides[selectedIndex].slideId}>
          <img
            className={showCaption ? 'captions-shown' : ''}
            src={
              slides[selectedIndex].slideImage.images[
                slides[selectedIndex].slideImageDataId
              ]
            }
            alt={slides[selectedIndex].slideId}
          />
        </div>
      </div>
    </div>
  );
}

export default Slideshow;
