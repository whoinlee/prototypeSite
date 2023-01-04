import BaseApp from "../BaseApp";
import { useContext, useEffect } from 'react';
import { HashLink } from '@xzar90/react-router-hash-link';
//-- contexts
import { ThemeNavContext } from '../../contexts/ThemeNavContext';
//-- styles
import "../../styles/DummyProject.scss";


const DummyProject = (props) => {
  const { scrollToTop } = useContext(ThemeNavContext);

  useEffect(() => {
    console.log("INFO DummyProject :: useEffect, scrollToTop? ", scrollToTop);
    if (scrollToTop) window.scrollTo(0, 0);
  }, [scrollToTop]);

  return (
    <BaseApp  projClassName="DummyProject"
              title={props.title} 
              isBackHome={props.isBackHome}
              isDark={props.isDark}>
      <p className="headline"><b>A Place Holder Project</b></p>
      <section id="section1">
        <br/><br/><br/>
        <h1><HashLink smooth to={'/c4menu1#section1'}>Section1</HashLink></h1>
        <br/><br/><br/>
        <p>Section 1 ...</p>
      </section>
      <p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/>
      <br/><br/><br/>
      <section id="section2">
      <br/><br/><br/>
        <h1><HashLink smooth to={'/c4menu1#section2'}>Section2</HashLink></h1>
        <br/><br/><br/>
        <p>Section 2 ...</p>
      </section>
      <p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/><p/>
      <br/><br/><br/>
      <section id="section3">
        <br/><br/><br/>
        <h1><HashLink smooth to={'/c4menu1#section3'}>Section3</HashLink></h1>
        <br/><br/><br/>
        <p>Section 3 ...</p>
      </section>
      <p/><p/><p/><p/><p/>
    </BaseApp>
  )
};

export default DummyProject;