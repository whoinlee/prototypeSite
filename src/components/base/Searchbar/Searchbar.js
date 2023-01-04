import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useDetectOutsideClick from '../../hooks/useDetectOutsideClick';
import { containsEntity, searchCategories } from '../../helpers/helpers';
import './Searchbar.scss';

function Searchbar({ value, placeholder, setToggledSearch, close, data }) {
  const navigate = useNavigate();
  const resultsRef = useRef();

  const [searchQuery, setSearchQuery] = useState(value || '');
  const [filteredData, setFilteredData] = useState(data);

  useDetectOutsideClick(resultsRef, () => setSearchQuery(''));

  const closeSearch = () => {
    setSearchQuery('');
    setToggledSearch(false);
  };

  const handleOnChange = (e) => {
    setSearchQuery(e.target.value);
    if (searchQuery.length > 0) {
      //const filtered = filterByValue(data, searchQuery?.toLowerCase());
      const fData = containsEntity(
        data,
        e.target.value.toLowerCase(),
        searchCategories
      );
      setFilteredData(fData);
    }
  };

  const handleKeyDown = (event) => {
    if (searchQuery.length === 0) return;
    if (event.key === 'Enter') {
      goToSearchResults();
    }
  };

  const goToSearchResults = () => {
    if (searchQuery.length === 0) {
      closeSearch();
      return;
    }
    navigate(`/search-results?search=${searchQuery}`);
    closeSearch();
  };

  return (
    <div className='search-container'>
      <div className={`search ${close ? 'has-close' : 'close'}`}>
        <input
          autoFocus
          value={searchQuery}
          placeholder={placeholder}
          onChange={(e) => handleOnChange(e)}
          onKeyDown={handleKeyDown}
        />
        {close && (
          <img
            src='/appAssets/close.svg'
            alt='Close Search'
            className='close'
            onClick={() => closeSearch()}
          />
        )}
        {/* <img
          src="/appAssets/search.svg"
          alt="Search Button"
          className="search-icon"
          onClick={() => goToSearchResults()}
        /> */}
      </div>
      {searchQuery.length > 0 && (
        <div className='results' ref={resultsRef}>
          <ul>
            {filteredData.length > 0 ? (
              <li
                className='top-search-item'
                onClick={() => goToSearchResults()}
              >
                <div>
                  <img
                    src='/appAssets/search.svg'
                    alt='Search Button'
                    className='search-icon'
                  />
                  Search for <b>{searchQuery}</b> across all entities
                </div>

                {/* <div className="faded">
                  Search <span>↳</span>
                </div> */}
              </li>
            ) : (
              <li className='top-search-item no-results'>No results...</li>
            )}
            {filteredData.map((d) => (
              <>
                {d?.data?.length > 0 && <li className='category'>{d.type}</li>}
                {d?.data?.map((dd) => (
                  <li>
                    <Link
                      to={`/detail/${dd['attributes("service.name")']}`}
                      onClick={() => closeSearch()}
                    >
                      {dd['attributes("service.name")']}
                    </Link>
                  </li>
                ))}
              </>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Searchbar;
