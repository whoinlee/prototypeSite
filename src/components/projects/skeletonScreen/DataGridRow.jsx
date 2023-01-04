import PropTypes from 'prop-types';
//-- components
import SkeletonText from './SkeletonText';


const DataGridRow = ({ columnWidthArr, columnTextArr, columnMarginArr, showSkeleton, showComponent, animType, delay}) => {
  return (
    <div  className="gridRowHolder">
      {columnWidthArr.map((colWidth, index) => 
        <li key={columnTextArr[index] + index}
            style={{marginRight: columnMarginArr[index]}}>
          <SkeletonText width={colWidth - 20}
                        height={16}
                        text={columnTextArr[index]}
                        showSkeleton={showSkeleton} 
                        showComponent={showComponent} 
                        animType={animType} 
                        delay={delay} 
          />
        </li>
      )}
    </div>
  )
}

DataGridRow.propTypes = {
  columnWidthArr: PropTypes.array.isRequired,
  columnTextArr: PropTypes.array.isRequired,
  columnMarginArr: PropTypes.array.isRequired,
}

export default DataGridRow;