import { 
  // useContext, 
  useEffect, 
  useState
} from 'react';
import RGPaneComponent from './RGPaneComponent';


const RGPaneComponentSection = ( {title, componentTitles, isCenterAlign=false,
                                  isOpen = true, selectedIndex = -1} ) => {
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  
  const onOpenerClickHandler = () => setIsSectionOpen(!isSectionOpen);

  useEffect(() => {
    setIsSectionOpen(isOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div className="rgPaneComponentSection" >
        <div className={isSectionOpen? "sectionHeader open" : "sectionHeader"}
             onClick={onOpenerClickHandler}>
          <i className={isSectionOpen? "sectionOpener open" : "sectionOpener close"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i><span className="sectionTitle">{title}</span>
        </div>
        <div className={isSectionOpen? "sectionHolder show" : "sectionHolder"} >
          {
            componentTitles.map((title, index) => {
              return (
              <RGPaneComponent 
                title={title} key={"" + title + index} 
                isGroupSelected={index === selectedIndex} 
                isCenterAlign={isCenterAlign}
              />)
            } )
          }
        </div>
    </div>
  )
}

export default RGPaneComponentSection;