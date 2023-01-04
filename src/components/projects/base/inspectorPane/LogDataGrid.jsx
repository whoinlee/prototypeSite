//-- components
import LogDataGridRow from "./LogDataGridRow";


const firstColWidth = 130;
const LogDataGrid = ( { paneWidth, headlineList, logDataList } ) => {
  const secondColWidth = paneWidth - firstColWidth;
  // console.log("LogDataGrid :: logDataList ?\n", logDataList);
  return (
    <div className="logDataGrid" style={ { width: `${paneWidth}px` } }>
        <div className="headerRow">
          <span className="header" style={ { width: `${firstColWidth}px`} }>{headlineList[0]}</span>
          <span className="header" style={ { width: `${secondColWidth}px`} }>{headlineList[1]}</span>
        </div>
        { logDataList.map((logData, index) => {
          // console.log (logData);
          return <LogDataGridRow 
                  key={index + logData["timestamp"]}
                  firstColWidth={firstColWidth}
                  secondColWidth={secondColWidth}
                  paneWidth={paneWidth - 14} 
                  data={logData} />
          })
        }
    </div>
  )
}

export default LogDataGrid;