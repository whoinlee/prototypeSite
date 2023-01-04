import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner">
        <div className="circle circle-1">
          <div className="circle-inner"></div>
        </div>
        <div className="circle circle-2">
          <div className="circle-inner"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
