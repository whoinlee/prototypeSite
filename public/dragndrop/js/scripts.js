// import * as agGrid from "ag-grid-community";
//-- for preventing eslint(no-undef) warning
/* global agGrid */

const columnDefs = [
    { field: "name", 
      rowDrag: true, 
      lockPosition: true,
      cellStyle: {
        'display': 'flex ', 'justify-content': 'left', 'align-items': 'left ',
      },
    },
    { field: "phase" },
    { field: "col3" },
    { field: "col4" },
    { field: "cpu", headerName: "CPU % of limit",  headerClass: "ag-right-aligned-header", cellStyle: {'text-align': 'right' } }
  ];

  const KEY_LEFT = 'ArrowLeft';
  const KEY_UP = 'ArrowUp';
  const KEY_RIGHT = 'ArrowRight';
  const KEY_DOWN = 'ArrowDown';
  const KEY_SPACE = ' ';
  let isDraggable = false;

    // specify the data
    let rowData = [
        { name: "Toyota", phase: "Celica", col3: "something", col4: "something", cpu: 300 },
        { name: "Ford", phase: "Mondeo", col3: "something", col4: "something", cpu: 0 },
        { name: "Porsche", phase: "Boxter", col3: "something", col4: "something", cpu: 700},
        { name: "Toyota", phase: "Celica", col3: "something", col4: "something", cpu: 300 },
        { name: "Ford", phase: "Mondeo", col3: "something", col4: "something", cpu: 300 },
        { name: "Porsche", phase: "Boxter", col3: "something", col4: "something", cpu: 700}
        ];

    // let the grid know which columns and what data to use
    const gridOptions = {
      columnDefs: columnDefs,
      rowSelection: 'multiple', //enable selecting multiple rows with shift and ctrl
      rowDragManaged: true,
      animateRows: true,
      rowClass: "rowStyling",
      rowDragMultiRow: true,
      rowData: rowData, //disable if using api to gen rows
      headerHeight: 40,
      // suppressCellSelection:true,
      icons: {
        rowDrag: '<img src="https://i.postimg.cc/9X7NPbf3/drag-indicator.png">',
        columnMoveMove: '<img src="https://i.postimg.cc/9X7NPbf3/drag-indicator.png">',
      },
      
      onFirstDataRendered: onFirstDataRendered,
      navigateToNextCell: navigateToNextCell,
    };

    function onFirstDataRendered(params) {
      params.api.sizeColumnsToFit();
    /*   var myInput = document.getElementById('myGrid');
      
      // intercept key strokes within input element
      myInput.addEventListener(
        'keydown',
        function (event) {
          // ignore non Tab key strokes
          if (event.key !== 'Tab') return;
      
          // prevents tabbing into the url section
          event.preventDefault();
      
          // scrolls to the first row
          params.api.ensureIndexVisible(0);
      
          // scrolls to the first column
          var firstCol = params.columnApi.getAllDisplayedColumns()[0];
          params.api.ensureColumnVisible(firstCol);
      
          // sets focus into the first grid cell
          params.api.setFocusedCell(0, firstCol);
        },
        true
      ); */
    }

    function navigateToNextCell(params) {
      const previousCell = params.previousCellPosition,
        suggestedNextCell = params.nextCellPosition;
      let renderedRowCount, nextRowIndex, currRowIndex, 
        currObj, nextObj, currObjIndex, nextObjIndex;
      currRowIndex = previousCell.rowIndex;
      currObj = rowData[currRowIndex];
      currObjIndex = rowData.indexOf(currObj);
      switch (params.key) {
        case KEY_UP:
            // return the cell above
            nextRowIndex = previousCell.rowIndex - 1;
            if (nextRowIndex <= -1) {
                return null;
            } // returning null means don't navigate
            
            if (isDraggable) {
                //-- swap currObj with nextObj in rowData
                nextObj = rowData[nextRowIndex];
                nextObjIndex = rowData.indexOf(nextObj);
                rowData[currObjIndex] = nextObj;
                rowData[nextObjIndex] = currObj;
                //-- reset the grid w. updated rowData
                gridOptions.api.setRowData(rowData);
                // console.log("INFO navigateToNextCell called, rowData", rowData)
            }

          return {
            rowIndex: nextRowIndex,
            column: previousCell.column,
            rowPinned: previousCell.rowPinned,
          };
        case KEY_DOWN:
            // return the cell below
            nextRowIndex = previousCell.rowIndex + 1;
            renderedRowCount = gridOptions.api.getModel().getRowCount();
            if (nextRowIndex >= renderedRowCount) {
                return null;
            } // returning null means don't navigate
            
            if (isDraggable) {
                nextObj = rowData[nextRowIndex];
                nextObjIndex = rowData.indexOf(nextObj);
                rowData[currObjIndex] = nextObj;
                rowData[nextObjIndex] = currObj;
                gridOptions.api.setRowData(rowData);
            }
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
    }
 
// lookup the container we want the Grid to use
const eGridDiv = document.querySelector('#myGrid');

// create the grid passing in the div to use together with the columns & data we want to use
new agGrid.Grid(eGridDiv, gridOptions);

window.addEventListener("keydown", event => {
  if (event.key === KEY_SPACE) {
    event.preventDefault();
    isDraggable = !isDraggable;
  }
}, true);