import { useState } from 'react';
//-- contexts
import { SkeletonRelationshipContext } from '../../../contexts/SkeletonLoadingState';
//-- components
import RelationshipCompItem from './RelationshipCompItem';


const RelationshipPage = () => {
  const [animType1, setAnimType1] = useState("fade-base");   //shimmer-base & fade-base
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [duration, setDuration] = useState(3);
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
    setAnimType1(e.target.value);
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
              <label  className="animTypeLabel" htmlFor="radio1">
                <input  className="animTypeInput" type="radio" name="radio1" 
                        checked={animType1 === "fade-base"}
                        value="fade-base"
                        onChange={onAnimTypeChange}/> fade-in-out
              </label>
              <label  className="animTypeLabel" htmlFor="radio2">
                <input  className="animTypeInput" type="radio" name="radio2"
                        checked={animType1 === "shimmer-base"}
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
      <SkeletonRelationshipContext.Provider 
        value={{  
                animType1, 
                showComponent,
                showSkeleton,
                resetCompItem,
                compItemDataLoaded
      }}>
        <div className="pageContainer">
          <div className="contentHolder">
            <div className="itemContainer">
              <div className="row row1">
                <RelationshipCompItem groupHeader="ATM" delay={0} 
                                      entityTitle="Business Transactions"/>
                <RelationshipCompItem groupHeader="" delay={0} 
                                      entityTitle="Services"/>
                <RelationshipCompItem groupHeader="" delay={0} 
                                      entityTitle="Service Instances"/>
                <RelationshipCompItem groupHeader="" isLast={true} isDummy={true} delay={0} 
                                      entityTitle=""/>
              </div>
              <div className="row row2">
                <RelationshipCompItem groupHeader="KUBERNETES" delay={0.15}
                                      entityTitle="Clusters"/>
                <RelationshipCompItem groupHeader="" delay={0.15}
                                      entityTitle="Namespaces"/>
                <RelationshipCompItem groupHeader="" delay={0.15}
                                      entityTitle="Workloads"/>
                <RelationshipCompItem groupHeader="" isLast={true} delay={0.15}
                                      entityTitle="Pods"/>
              </div>
              <div className="row row3">
                <RelationshipCompItem groupHeader="INFRASTRUCTURE" delay={0.3}
                                      entityTitle="Hosts"/>
                <RelationshipCompItem groupHeader="" delay={0.3}
                                      entityTitle="Databases"/>
                <RelationshipCompItem groupHeader="" isDummy={true} noBorder={true} delay={0.3}
                                      entityTitle=""/>
                <RelationshipCompItem groupHeader="" isLast={true} isDummy={true} delay={0.3}
                                      entityTitle=""/>

              </div>
            </div>
          </div>
        </div>
      </SkeletonRelationshipContext.Provider>
    </>
  )
}

export default RelationshipPage