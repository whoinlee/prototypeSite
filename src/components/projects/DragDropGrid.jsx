import { useState, useRef, useCallback } from "react";
// import useData from '../../utils/useData';
import useEventListener from '../../utils/useEventListener';
//-- components
import { AgGridReact } from 'ag-grid-react';
import BaseApp from "../BaseApp";
//-- styles
import { useMemo } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "../../styles/DragDropGrid.scss";


const KEY_UP = 'ArrowUp';
const KEY_DOWN = 'ArrowDown';
const KEY_LEFT = 'ArrowLeft';
const KEY_RIGHT = 'ArrowRight';
const KEY_SPACE = ' ';

const DragDropGrid = (props) => {
  const gridRef = useRef(null);
  const [isDraggable, setIsDraggable] = useState(false);
  const [columnDefs] = useState([
    { field: "name", rowDrag: true, lockPosition: true, sortable: true, filter: true },
    { field: "phase", sortable: true, filter: false },
    { field: "cpu", headerName: "CPU % of limit",  
                    headerClass: "ag-right-aligned-header", 
                    cellStyle: {'textAlign': 'right' },
                    sortable: true, filter: false }
  ]);

  // const [rowData, setRowData] = useState([
  const [rowData] = useState([
    { name: "Toyota", phase: "Celica", cpu: 300 },
    { name: "Ford", phase: "Mondeo", cpu: 0 },
    { name: "Porsche", phase: "Boxter", cpu: 700},
    { name: "Toyota", phase: "Celica", cpu: 300 },
    { name: "Ford", phase: "Mondeo", cpu: 300 },
    { name: "Porsche", phase: "Boxter", cpu: 700}
  ]);

  // const onButtonClick = e => {
  //   const selectedNodes = gridRef.current.api.getSelectedNodes();
  //   const selectedData = selectedNodes.map(node => node.data);
  //   // console.log("onButtonClick: e - ", e);
  //   console.log("onButtonClick: selectedData - ", selectedData);
  // }
  const icons = useMemo(()=>{
    return{
      rowDrag: '<img src="https://i.postimg.cc/9X7NPbf3/drag-indicator.png" style="height: 12px; width: 12px">',
      columnMoveMove: '<img src="https://i.postimg.cc/9X7NPbf3/drag-indicator.png">',
    }
  },[])

  const keyDownHandler = ({ key }) => {
    if (key === KEY_SPACE) {
      setIsDraggable(!isDraggable);
      // console.log("isDraggable?? ", isDraggable);
    }
  };
  useEventListener("keydown", keyDownHandler);

  const onFirstDataRendered = (params) => {
    console.log("INFO DragDropGrid :: onFirstDataRendered called");
    // params.api.sizeColumnsToFit();
    gridRef.current.api.sizeColumnsToFit();
  };

  const navigateToNextCell = useCallback((params) => {
    console.log("INFO DragDropGrid :: params.key ??", params.key); 

    // const selectedNodes = gridRef.current.api.getSelectedNodes();
    // const selectedData = selectedNodes.map(node => node.data);
    // console.log("navigateToNextCell: selectedData - ", selectedData);

    const previousCell = params.previousCellPosition,
          suggestedNextCell = params.nextCellPosition;
    let renderedRowCount, nextRowIndex;
    // let currRowIndex, currObj, nextObj, currObjIndex, nextObjIndex;
    /*rowNode.setData*/
    switch (params.key) {
      case KEY_UP:
        //-- return the cell above
        nextRowIndex = previousCell.rowIndex - 1;
        if (nextRowIndex < -1) {
          return null;
        } //-- returning null means don't navigate
        return {
          rowIndex: nextRowIndex,
          column: previousCell.column,
          rowPinned: previousCell.rowPinned,
        };
      case KEY_DOWN:
        //-- return the cell below
        nextRowIndex = previousCell.rowIndex + 1;
        renderedRowCount = gridRef.current.api.getModel().getRowCount();
        if (nextRowIndex >= renderedRowCount) {
          return null;
        } //-- returning null means don't navigate
        return {
          rowIndex: nextRowIndex,
          column: previousCell.column,
          rowPinned: previousCell.rowPinned,
        };
      case KEY_LEFT:
      case KEY_RIGHT:
        return suggestedNextCell;
      default:
        throw Error(
          'this will never happen, navigation is always one of the 4 keys above'
        );
    }
  }, []);

  // const gridOptions = {
  //   rowDragManaged: true,
  //   animateRows: true,
  //   rowClass: "rowStyling",
  //   rowDragMultiRow: true,
  //   headerHeight: 40,
  //   icons: {
  //     rowDrag: '<img src="https://i.ibb.co/YPWC6mW/indicator.png"/>',
  //     columnMoveMove: '<img src="https://i.ibb.co/YPWC6mW/indicator.png"/>',
  //   },
  //   // onFirstDataRendered: onFirstDataRendered,
  // };
  return (
    <BaseApp  title={props.title} 
              isBackHome={props.isBackHome}
              isDark={props.isDark}>
      <div  className="ag-theme-alpine"
            style={{height:300, width:800}} >
        {/* <button onClick={onButtonClick}>Get Selected Rows</button> */}
        <AgGridReact  ref={gridRef}
                      rowData={rowData} 
                      columnDefs={columnDefs} 
                      rowSelection="multiple"
                      rowDragManaged="true"
                      animateRows= "true"
                      rowClass= "rowStyling"
                      rowDragMultiRow= "true"
                      headerHeight= "40"
                      icons={icons}
                      defaultColDef={{
                        cellStyle: (params) => ({
                          display: "flex",
                          alignItems: "center"
                        })
                      }}
                      onFirstDataRendered={onFirstDataRendered}
                      navigateToNextCell={navigateToNextCell}/>
      </div>
      <div id="guide">Click Tab, then use UP and DOWN keys to navigate</div>

    </BaseApp>
  )
};

export default DragDropGrid;