import { useState } from 'react';
//-- contexts
import { SkeletonPodsContext } from '../../../contexts/SkeletonLoadingState';
//-- components
import DataGridCompItem from './DataGridCompItem';
import RCItemSm from './RCItemSm';
import RCItemSpecial1 from './RCItemSpecial1';
import RCItemSpecial2 from './RCItemSpecial2';
import RCItemSpecial3 from './RCItemSpecial3';
import RCItemSpecial4 from './RCItemSpecial4';
import PropertyText from './PropertyText';


const PodsPage = () => {
  const [animType, setAnimType] = useState("fade-base");   //shimmer-base & fade-base
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
    setAnimType(e.target.value);
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
            <label  className="animTypeLabel" htmlFor="radio5">
              <input  className="animTypeInput" type="radio" name="radio5" 
                      checked={animType === "fade-base"}
                      value="fade-base"
                      onChange={onAnimTypeChange}/> fade-in-out
            </label>
            <label  className="animTypeLabel" htmlFor="radio6">
              <input  className="animTypeInput" type="radio" name="radio6"
                      checked={animType === "shimmer-base"}
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
      <SkeletonPodsContext.Provider 
        value={{  
                animType,
                showComponent,
                showSkeleton,
                resetCompItem,
                compItemDataLoaded
      }}>
        <div className="pageContainer">
          <div className="contentHolder pods">
            <div className="relationshipPanel">
                <RCItemSpecial1 entityTitle="Clusters" delay={0}/>
                <RCItemSpecial2 entityTitle="Namespaces" delay={0.1}/>
                <RCItemSpecial3 entityTitle="Workloads" delay={0.2}/>
                <RCItemSpecial4 entityTitle="Pods" delay={0.3}/>
                <RCItemSm entityTitle="Containers" delay={0.4}/>
                <RCItemSm entityTitle="Hosts" 
                          isLast={true}  delay={0.5}
                /> 
            </div>
            <div className="gridPanel">
              <DataGridCompItem />
            </div>
            <div className="actionPropertyPanel">
              <PropertyText width={101} 
                              height={16}
                              labelText="Label1"
                              descText="Description1"
                              showSkeleton={showSkeleton} 
                              showComponent={showComponent}
                              animType={animType} />
              <PropertyText width={101} 
                              height={16}
                              labelText="Label2"
                              descText="Description2"
                              showSkeleton={showSkeleton} 
                              showComponent={showComponent}
                              animType={animType} />
              <PropertyText width={101} 
                              height={16}
                              labelText="Label3"
                              descText="Description3"
                              showSkeleton={showSkeleton} 
                              showComponent={showComponent}
                              animType={animType} />
              <PropertyText width={101} 
                              height={16}
                              labelText="Label4"
                              descText="Description4"
                              showSkeleton={showSkeleton} 
                              showComponent={showComponent}
                              animType={animType} />
              <PropertyText width={101} 
                              height={16}
                              labelText="Label5"
                              descText="Description5"
                              showSkeleton={showSkeleton} 
                              showComponent={showComponent}
                              animType={animType} />
              <PropertyText width={101} 
                              height={16}
                              labelText="Label6"
                              descText="Description6"
                              showSkeleton={showSkeleton} 
                              showComponent={showComponent}
                              animType={animType} />
            </div>
          </div>
        </div>
      </SkeletonPodsContext.Provider>
    </>
  )
}

export default PodsPage