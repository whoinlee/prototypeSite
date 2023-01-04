import { 
  useContext, 
  useEffect, 
  useState
} from 'react';
import RGPaneSingleEntity from './RGPaneSingleEntity';
import RGPaneComponent from './RGPaneComponent';
//-- contexts
import { RGExample3Context } from '../../../../contexts/RelationshipGraphState';


const RGPaneSingleEntitySection = ( {title, componentTitles, 
                                  isOpen = true, selectedIndex = -1} ) => {
  const { isSinglepageCenterAlign } = useContext(RGExample3Context);
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const onOpenerClickHandler = () => setIsSectionOpen(!isSectionOpen);

  useEffect(() => {
    setIsSectionOpen(isOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div className="rgPaneSingleEntitySection" >
        <div className={isSectionOpen? "sectionHeader open" : "sectionHeader"}
             onClick={onOpenerClickHandler}>
          {/* APM, Kubernetes, Infrastructure */}
          <i className={isSectionOpen? "sectionOpener open" : "sectionOpener close"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i><span className="sectionTitle">{title}</span>
        </div>
        <div className={isSectionOpen? "sectionHolder show" : "sectionHolder"} >
          {
            componentTitles.map((title, index) => {
              // console.log("title?? ", title);
              if (isSectionOpen && (index === 0)) {
              return (
                  <RGPaneSingleEntity 
                    title={title} key={"" + title + index} 
                    label=" test label test label"
                  />)
              } else {
                return (
                  <RGPaneComponent 
                    title={title} key={"" + title + index} 
                    isCenterAlign={isSinglepageCenterAlign}
                  />)
              }
            }
          )}
        </div>
    </div>
  )
}

export default RGPaneSingleEntitySection;