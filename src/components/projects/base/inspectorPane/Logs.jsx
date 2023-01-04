import { useContext } from 'react';
//-- contexts
import { InspectorPanelLgContext } from '../../../../../contexts/InspectorPanelState';
//-- components
import ExpanderDown from "../../../base/ExpanderDown";
import PlusIcon from "../../../base/PlusIcon";
import SearchIcon from "../../../base/SearchIcon";
import LogDataGrid from "./LogDataGrid";


const line1 = "Unexpected TLS Verify Vode for<br>";
const line2 = ".com/152389 192.168.2.1</span> ERROR<br>";
const line3 = "<span>12387642909746768767867868693627285417871739487787878797967048393</span>  &nbsp;&nbsp;&nbsp;log ";
const logDataList = [
  { "timestamp": "12:31:42:231",
    "rawMessage": line1 + "<span>row1" + line2,
    "rawMessageLine3": line3 + "1 content goes here .........."
  },
  { "timestamp": "12:31:43:073",
    "rawMessage": line1 + "<span>row2" + line2,
    "rawMessageLine3": line3 + "2 content goes here .........."
  },
  { "timestamp": "12:31:43:982",
    "rawMessage": line1 + "<span>row3" + line2,
    "rawMessageLine3": line3 + "3 content goes here .........."
  },
  { "timestamp": "12:31:44:174",
    "rawMessage": line1 + "<span>row4" + line2,
    "rawMessageLine3": line3 + "4 content goes here .........."
  },
  { "timestamp": "12:31:44:231",
    "rawMessage": line1 + "<span>row5" + line2,
    "rawMessageLine3": line3 + "5 content goes here .........."
  },
  { "timestamp": "12:31:45:201",
    "rawMessage": line1 + "<span>row6" + line2,
    "rawMessageLine3": line3 + "6 content goes here .........."
  },
  { "timestamp": "12:31:46:241",
    "rawMessage": line1 + "<span>row7" + line2,
    "rawMessageLine3": line3 + "7 content goes here .........."
  },
  { "timestamp": "12:31:47:009",
    "rawMessage": line1 + "<span>row8" + line2,
    "rawMessageLine3": line3 + "8 content goes here .........."
  },
  { "timestamp": "12:31:48:031",
    "rawMessage": line1 + "<span>row9" + line2,
    "rawMessageLine3": line3 + "9 content goes here .........."
  },
  { "timestamp": "12:31:40:331",
    "rawMessage": line1 + "<span>row10" + line2,
    "rawMessageLine3": line3 + "10 content goes here .........."
  }
];
const Logs = ( { title, paneWidth } ) => {
  const { 
    rescaleButtonLg 
  } = useContext(InspectorPanelLgContext);

  // console.log("Logs :: logDataList ?\n", logDataList);
  return (
    <div className="logs" style={ { width: `${paneWidth}px` } }>
        <div className="headline">
          <p className="title">{title}</p>
            <ExpanderDown />
          </div>
          <div className="searchSection" style={ rescaleButtonLg ?  {justifyContent: "space-between"} : {justifyContent: "flex-start"} }>
            <div  className="search"
                  style={ rescaleButtonLg ?  {width: `${paneWidth - 60}px`} : {} }
            >
              Find Logs in Pattern...<SearchIcon />
            </div>
            <PlusIcon />
          </div>
        <div className="contentHolder">
          <LogDataGrid  paneWidth={paneWidth - 6} 
                        headlineList={["Timestamp", "Raw Message"]}
                        logDataList={logDataList}
          />
        </div>
    </div>
  )
}

Logs.defaultProps = {
  title: "LOGS IN PATTERN", 
  paneWidth: 460
}

export default Logs;