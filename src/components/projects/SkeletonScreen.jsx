import BaseApp from "../BaseApp";
import { useContext, useEffect } from 'react';
//-- contexts
import { ThemeNavContext } from '../../contexts/ThemeNavContext';
//-- components
import RelationshipComp from "./skeletonScreen/RelationshipComp";
import ChartCompSm from "./skeletonScreen/ChartCompSm";
import ChartCompLg from "./skeletonScreen/ChartCompLg";
import DataGridComp from "./skeletonScreen/DataGridComp";
import RelationshipPage from "./skeletonScreen/RelationshipPage";
import ServicesPage from "./skeletonScreen/ServicesPage";
import PodsPage from "./skeletonScreen/PodsPage";
//-- styles
import "../../styles/SkeletonScreen.scss";


const SkeletonScreen = (props) => {
  const { 
          setHideNav,
          isNavOpen, setIsNavOpen,
          setIsNavStay,
         } = useContext(ThemeNavContext);

  useEffect(() => {
    setHideNav(true);
    if (isNavOpen) setIsNavOpen(true);
    setIsNavStay(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BaseApp  title={props.title} 
              projClassName="SkeletonScreen"
              isBackHome={props.isBackHome}
              isDark={props.isDark}>
      <div className="container">
        <p className="headline"><b>{props.title}</b></p>
        <section id="skeletonComponents">
          <h1>Components</h1>
          <h2>Relationship Graph Component</h2>
          <RelationshipComp />
          <h2>Chart & Graph Components</h2>
          <ChartCompSm chartType="bar" chartTitle="CHART"/>
          <ChartCompLg chartType="line" chartTitle="AVERAGE RESPONSE TIME (MS)"/>
          <h2>Data-Grid Component</h2>
          <DataGridComp />
        </section>
        <section id="skeletonExamples">
          <h1>Page Examples</h1>
          <h2 id="skeletonObservePage">1. Observe Page (Relationship Graphs)</h2>
          <RelationshipPage />
          <h2 id="servicesPage">2. Services Page (Charts & Graphs)</h2>
          <ServicesPage />
          <h2 id="podsPage">3. Pods Page (Data-Grid & Properties)</h2>
          <PodsPage />
        </section>
      </div>
    </BaseApp>
  )
};

export default SkeletonScreen;