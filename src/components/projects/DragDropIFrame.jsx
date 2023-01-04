import BaseIFrame from '../BaseIFrame';


const DragDropIFrame = (props) => 
{
    return (
      <div style={divStyle}>
        <BaseIFrame dataURL={props.dataURL}
                    isDark={props.isDark} />
      </div>
    )
};
  
const divStyle = {
    width: '100vw',
    height: '100vh'
};

export default DragDropIFrame;