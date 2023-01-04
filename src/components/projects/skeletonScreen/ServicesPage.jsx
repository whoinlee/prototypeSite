import { useState } from 'react';
//-- contexts
import { SkeletonServicesContext } from '../../../contexts/SkeletonLoadingState';
//-- components
import RelationshipCompItemSm from './RelationshipCompItemSm';
import BindGraphItem from './BindGraphItem';
import ChartCompLgItem from './ChartCompLgItem';


const ServicesPage = () => {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [duration, setDuration] = useState(3);
  const [animType2, setAnimType2] = useState("fade-base");
  const [onDataLoadedID, setOnDataLoadedID] = useState(null);
  const [resetCompItem, setResetCompItem] = useState(false);
  const [compItemDataLoaded, setCompItemDataLoaded] = useState(false);

  const resetComponent = () => {
    setShowComponent(false);
    setShowSkeleton(true);
    setResetCompItem(true);
    setCompItemDataLoaded(false);
    if (onDataLoadedID) clearTimeout(onDataLoadedID);
  }

  const onDataLoaded = () => {
    setCompItemDataLoaded(true);
    setResetCompItem(false);
    setShowSkeleton(false);
    setShowComponent(true);
  }

  const onAnimTypeChange = (e) => {
    resetComponent();
    setAnimType2(e.target.value);
    if (onDataLoadedID) clearTimeout(onDataLoadedID);
    setOnDataLoadedID(setTimeout(onDataLoaded, duration*1000));
  }

  const onDurationChange = (e) => {
    resetComponent();
    setDuration(e.target.value);
    setShowSkeleton(true);
    if (onDataLoadedID) clearTimeout(onDataLoadedID);
    setOnDataLoadedID(setTimeout(onDataLoaded, e.target.value*1000));
  }

  const onPlayBtClicked = () => {
    if (onDataLoadedID) clearTimeout(onDataLoadedID);
    resetComponent();
    setShowSkeleton(true);
    setOnDataLoadedID(setTimeout(onDataLoaded, duration*1000));
  }

  return (
    <>
      <div className="pageControlPanel">
          <div className="column">
              <label  className="animationLabel">Animation Style: </label>
              <label  className="animTypeLabel" htmlFor="radio3">
                <input  className="animTypeInput" type="radio" name="radio3" 
                        checked={animType2 === "fade-base"}
                        value="fade-base"
                        onChange={onAnimTypeChange}/> fade-in-out
              </label>
              <label  className="animTypeLabel" htmlFor="radio4">
                <input  className="animTypeInput" type="radio" name="radio4"
                        checked={animType2 === "shimmer-base"}
                        value="shimmer-base"
                        onChange={onAnimTypeChange}/> shimmering
                  
              </label>
          </div>
          <div className="column">
            <label  className="durationLabel" htmlFor="secs">Duration (in sec): </label>
            <input  className="durationInput"
                    id="secs" type="number"
                    min={.5} max={5} step={.5}
                    defaultValue={duration}
                    onChange={onDurationChange}/>
          </div>
          <div className="column">
              <div className="pageButtonHolder">
                <button className="playBt"
                        onClick={onPlayBtClicked}/>
              </div>
          </div>
      </div>
      <SkeletonServicesContext.Provider 
        value={{  
                animType2, 
                showComponent,
                showSkeleton,
                resetCompItem,
                compItemDataLoaded
      }}>
        <div className="pageContainer">
          <div className="contentHolder services">
            <div className="relationshipPanel">
                <RelationshipCompItemSm delay={0}
                                      entityTitle="Entity 1"/>
                <RelationshipCompItemSm delay={0.15}
                                      entityTitle="Entity 2"/>
                <RelationshipCompItemSm delay={0.3}
                                      entityTitle="Entity 3"/>
                <RelationshipCompItemSm isDummy={true} delay={0.45}
                                      entityTitle="Entity 4"/>
                <RelationshipCompItemSm isDummy={true} isLast={true} delay={0.6}
                                      entityTitle="Entity 5"/>
              </div>
              <div className="chartPanel">
                <BindGraphItem chartTitle="Service: QuotingBind"/>
                <ChartCompLgItem chartType="bar" chartTitle="CHART"/>
                <ChartCompLgItem chartType="line" chartTitle="AVERAGE RESPONSE TIME (MS)"/>
                <ChartCompLgItem chartType="line" chartTitle="CALLS / MIN"/>
              </div>
          </div>
        </div>
      </SkeletonServicesContext.Provider>
    </>
  )
}

export default ServicesPage