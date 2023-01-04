import React, { useState } from 'react';
import './Nav.scss';

const navRightItems = [
  {
    id: 1,
    name: 'Search',
    icon: '/appAssets/search.svg',
  },
  {
    id: 2,
    name: 'Refresh',
    icon: '/appAssets/refresh.svg',
  },
  {
    id: 3,
    name: 'Timespan',
    icon: '/appAssets/clock.svg',
    options: [
      {
        id: 0,
        name: 'Last 30 Mins',
      },
      {
        id: 1,
        name: 'Last 60 Mins',
      },
      {
        id: 2,
        name: 'Last 24 hours',
      },
    ],
    selectedOptionId: 1,
  },
  {
    id: 4,
    name: 'Help',
    icon: '/appAssets/help.svg',
  },
  {
    id: 5,
    name: 'Profile',
    icon: '/appAssets/user.svg',
    link: '',
  },
];

const Nav = () => {
  const [toggledSearch, setToggledSearch] = useState(false);

  return (
    <nav className='top-nav'>
      <menu className='nav-left'>
        <img src='/appAssets/arrow-left-light.svg' alt='back' />
        <img
          src='/appAssets/arrow-right-light.svg'
          alt='forward'
          className='disabled'
        />
        <h3>Observe</h3>
      </menu>

      <menu className='nav-right'>
        {navRightItems.map((n) => (
          <li key={n.id}>
            <div className='menu-item'>
              <img src={n.icon} alt={n.name} />
              {n.options && (
                <div className='menu-item-label'>
                  {n.options[n.selectedOptionId].name}
                </div>
              )}
            </div>
          </li>
        ))}
      </menu>
    </nav>
  );
};

export default Nav;
