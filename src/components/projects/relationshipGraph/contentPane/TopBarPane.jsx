const TopBarPane = ( {subClassName, breadcrumbPrevPrev = "", breadcrumbPrev = "", breadcrumbCurr = "Observe"} ) => {
  return (
    <div className="topBar">
      <div className={"breadcrumb " + subClassName} >
        { (breadcrumbPrevPrev !== "") && 
          <span className="prevPrev">{breadcrumbPrevPrev}</span>
        }
        { (breadcrumbPrevPrev !== "") && 
          <span className="connector">&nbsp;&nbsp;&nbsp;/ &nbsp;&nbsp;&nbsp;</span>
        }
        { (breadcrumbPrev !== "") && 
          <span className="prev">{breadcrumbPrev}</span>
        }
        { (breadcrumbPrev !== "") && 
          <span className="connector">&nbsp;&nbsp;&nbsp;/ &nbsp;&nbsp;&nbsp;</span>
        }
        <span className="curr">{breadcrumbCurr}</span>
      </div>
      <div className="topBarMenu"/>
    </div>
  )
}

export default TopBarPane