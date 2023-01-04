/*
const line1 = "Unexpected TLS Verify Vode for<br>";
const line2 = ".com/152389 192.168.2.1</span> ERROR<br>";
const line3 = "<span>123876429097467687678678686936272854178717394877878787979</span> content goes here ..."
const logDataList = [
  { "timestamp": "12:31:42:231",
    "rawMessage": line1 + "<span>row1" + line2 + line3
  },
*/
// const firstColWidth = 130;
const LogDataGridRow = ( { firstColWidth, secondColWidth, paneWidth, data } ) => {
  return (
    <div className="logDataGridRow" style={ { width: `${paneWidth}px` } }>
      <div className="col1" style={ { width: `${firstColWidth}px`} }>{data["timestamp"]}</div>
      <div className="col2" style={ { width: `${secondColWidth}px`} }
           dangerouslySetInnerHTML={{__html: data["rawMessage"] + data["rawMessageLine3"]}}
      />
    </div>
  )
}

export default LogDataGridRow;