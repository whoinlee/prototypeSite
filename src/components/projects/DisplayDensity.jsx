import { useState } from 'react';
import BaseApp from '../BaseApp';
import ReactSlider from 'react-slider';
import { mockData } from './DisplayDensityComponents/data';
import Nav from './DisplayDensityComponents/Nav/Nav';
//-- styles
import '../../styles/DisplayDensity.scss';

const textSizeOptions = [
  {
    id: 0,
    name: 11,
  },
  {
    id: 1,
    name: 12,
  },
  {
    id: 2,
    name: 13,
  },
  {
    id: 3,
    name: 14,
  },
  {
    id: 4,
    name: 15,
  },
];

const displayOptions = [
  { id: 0, name: 'Compact', multiplier: 0.8 },
  { id: 1, name: 'Cozy', multiplier: 0.9 },
  { id: 2, name: 'Comfortable', multiplier: 1 },
];

const themeOptions = [
  { id: 0, name: 'Auto', helper: 'Match web browser theme settings' },
  { id: 1, name: 'Dark' },
  { id: 2, name: 'Light' },
];

const leftPanelData = [
  {
    title: 'Services',
    icon: 'application-servers.svg',
    count: 20,
    value: 85,
    status: 'good',
  },
  {
    title: 'Service Instances',
    icon: 'mobile-app.svg',
    count: 30,
    value: 100,
    status: 'good',
  },
  {
    title: 'Clusters',
    icon: 'cluster.svg',
    count: 10,
    value: 60,
    status: 'good',
  },
  {
    title: 'Namespaces',
    icon: 'activity.svg',
    count: 14,
    value: 70,
    status: 'good',
  },
];

const sideNavOptions = [
  {
    id: 2,
    name: 'Observe',
    icon: '/appAssets/view-details.svg',
    link: '/observe',
    active: true,
  },
  {
    id: 3,
    name: 'Alerts',
    icon: '/appAssets/configure.svg',
    link: '/alerts',
  },
];

const DisplayDensity = (props) => {
  const [selectedDisplay, setSelectedDisplay] = useState(displayOptions[1]);
  const [selectedThemeId, setSelectedThemeId] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [selectedTextSizeOption, setSelectedTextSizeOption] = useState(
    textSizeOptions[2]
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [data, setData] = useState(mockData);

  const getTableDensity = (index) => {
    return displayOptions[index].name;
  };

  return (
    <BaseApp
      projClassName='DisplayDensity'
      title={props.title}
      isDark={props.isDark}
    >
      <div className='display-density-parent'>
        <div className='side-nav'>
          <div className='side-nav-item logo'>
            <img src='/appAssets/logo.svg' alt='logo' title='Logo' />
          </div>
          {sideNavOptions.map((s) => (
            <div className={`side-nav-item ${s.active ? 'active' : ''}`}>
              <img src={s.icon} alt={s.name} title={s.name} />
            </div>
          ))}
          <img
            src={`/appAssets/double-chevron-right.svg`}
            className='toggle-indicator'
            alt='toggle'
          />
        </div>
        <div
          className={`display-density  size-${selectedTextSizeOption.name} ${selectedDisplay.name}`}
        >
          <Nav />
          <div className='display-density-container'>
            <div className='left panel'>
              <div className='panel-header'>Relationships</div>
              <div className='panel-body'>
                {leftPanelData.map((l) => (
                  <div className='section'>
                    <div className='section-header'>
                      <div className='section-header-left'>
                        <img src={`appAssets/${l.icon}`} alt={l.title} />
                        {l.title}
                        <img
                          className='go'
                          src='appAssets/chevron-right.svg'
                          alt='go'
                        />
                      </div>
                      {l.count}
                    </div>
                    <div className='section-body'>
                      <div
                        className={`circle ${l.status}`}
                        style={{
                          height: `${l.value * selectedDisplay.multiplier}px`,
                          width: `${l.value * selectedDisplay.multiplier}px`,
                        }}
                      >
                        {l.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='main'>
              <div className='card'>
                <div className='card-header'>
                  <div className='search-container'>
                    <input type='text' placeholder='Search' />
                    <img src='/appAssets/search.svg' />
                  </div>
                </div>

                <table className='data-table'>
                  <thead>
                    <tr>
                      <th>Domain</th>
                      <th width={windowWidth * 0.2}>Entities</th>
                      <th>Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((d, index) => (
                      <tr
                        className='list-item'
                        key={`${d['attributes("service.name")']}${index}`}
                      >
                        <td className='item-name'>
                          <a href=''>{d['attributes("service.name")']}</a>
                        </td>
                        <td>{d.type}</td>
                        <td id='last-child'>{d.tags['$jsonPath']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='side'>
              <section>
                <h3>Settings</h3>
              </section>
              <section>
                <h4>Table Density</h4>
                {displayOptions.map((d) => (
                  <div
                    className='options'
                    onClick={() => setSelectedDisplay(d)}
                  >
                    <img
                      src={
                        selectedDisplay.id === d.id
                          ? 'appAssets/radiobuttonActive.svg'
                          : 'appAssets/radiobutton.svg'
                      }
                    />
                    <span>
                      {d.name} <img src={`appAssets/${d.name}Icon.svg`} />
                    </span>
                  </div>
                ))}
              </section>
              <section>
                <h4>Default Text Size</h4>
                <p>This is what your body text will look like.</p>
                <div className='slider-container'>
                  <ReactSlider
                    className='horizontal-slider'
                    marks={[11, 12, 13, 14, 15]}
                    markClassName='example-mark'
                    min={11}
                    max={15}
                    thumbClassName='example-thumb'
                    trackClassName='example-track'
                    defaultValue={selectedTextSizeOption.name}
                    renderThumb={(props, state) => {
                      setSelectedTextSizeOption(
                        textSizeOptions.find((t) => t.name === state.valueNow)
                      );
                      return (
                        <div {...props}>{selectedTextSizeOption.name}</div>
                      );
                    }}
                  />
                  <p>{selectedTextSizeOption.name}</p>
                </div>
              </section>
              <section>
                <h4>Theme</h4>
                {themeOptions.map((d) => (
                  <div
                    className='options'
                    onClick={() => setSelectedThemeId(d.id)}
                  >
                    <img
                      src={
                        selectedThemeId === d.id
                          ? 'appAssets/radiobuttonActive.svg'
                          : 'appAssets/radiobutton.svg'
                      }
                    />
                    <span className='option-name'>
                      {d.name}
                      <p className='helper'>{d.helper}</p>
                    </span>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      </div>
    </BaseApp>
  );
};

export default DisplayDensity;
