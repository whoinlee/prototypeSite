import { 
  useContext,
  useState
} from 'react';
import RGComponent from './RGComponent';
//-- contexts
import { RGComponentContext } from '../../../../contexts/RelationshipGraphState';


const RGComponentSection = ( { sectionTitle, 
                               componentTitles,
                               isCenterAlign=false,
                               isOutline = false,
                               isObservePage = false,
                               gridType = "flexBox",
                               compBkg=false,
                            } ) => {
  const {showGridsComponent} = useContext(RGComponentContext);
  const [isSectionOpen, setIsSectionOpen] = useState(true);
  const onOpenerClickHandler = () => setIsSectionOpen(!isSectionOpen);

  return (
    <div className={isOutline? "rgComponentSection outline" : "rgComponentSection"} >
        <div className={isSectionOpen? "sectionHeader open" : "sectionHeader"}
             onClick={onOpenerClickHandler}>
          <i className={isSectionOpen? "sectionOpener open" : "sectionOpener close"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i><span className="sectionTitle">{sectionTitle}</span>
        </div>
        {/* <div className={isSectionOpen? "sectionHolder show" : "sectionHolder"} > */}
        { (gridType === "flexBox") &&
          <div className={isSectionOpen? "sectionHolder show" : "sectionHolder"} >
            {
            componentTitles.map((title, index) => <RGComponent  key={"" + title + index}
                                                                title={title} 
                                                                isCenterAlign={isCenterAlign} 
                                                                isObservePage={isObservePage}
                                                                isFixedWidth={true}
                                                  />)
          }
          </div>
        }

        { (gridType !== "flexBox") &&
          <div className={isSectionOpen? "gridHolder show" : "gridHolder"} >
            <div className={`grid${gridType === "type1Grid"? " grid1":" grid2"}${compBkg? " showBkg":""}`} >
            {
              componentTitles.map((title, index) => <RGComponent  key={"" + title + index}
                                                                  title={title} 
                                                                  isCenterAlign={isCenterAlign} 
                                                                  isObservePage={isObservePage}
                                                    />)
            }
            </div>
          </div>
        }

        { showGridsComponent &&
        <div className="particle-rg-fluid">
            <div className="sm"></div>
            <div className="sm"></div>
            <div className="sm"></div>
            <div className="sm"></div>
            <div className="sm"></div>
            <div className="sm"></div>
            <div className="sm"></div>
            <div className="sm"></div>
            <div className="sm md"></div>
            <div className="sm md"></div>
            <div className="sm md"></div>
            <div className="sm md"></div>
            <div className="sm md xxl"></div>
            <div className="sm md xxl"></div>
            <div className="sm md xxl"></div>
            <div className="sm md xxl"></div>
            <div className="sm md xxl"></div>
            <div className="sm md xxl"></div>
            <div className="sm md xxl"></div>
            <div className="sm md xxl"></div>
          </div>
        }
    </div>
  )
}

export default RGComponentSection;