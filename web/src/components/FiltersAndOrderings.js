import React from 'react';

import { FiltersWrapper, Orderings, CurrencyFilters, CurrencyButton } from '../styles/ComponentStyles';

export default function CurrencyFilter({filterParams, setFilterParams}) {

  const selectHandler = (event) => {
    setFilterParams((prev) => ({...prev, [event.target.name]: event.target.value}));
  };

  const clickHandler = (event) => {
    setFilterParams((prev) => ({...prev, [event.target.name]: event.target.value}));
  };

  return (
    <>
      <FiltersWrapper>
        <Orderings>
          <select name='select' onChange={selectHandler} value={filterParams.select}>
            <option value='-date'>Sort by Date descending (default)</option>
            <option value='date'>Sort by Date ascending</option>
            <option value='-amount_in_huf'>Sort by Amount descending</option>
            <option value='amount_in_huf'>Sort by Amount ascending</option>
          </select>
        </Orderings>
        <CurrencyFilters>
          <li>
            <CurrencyButton
              name='currency'
              value='ALL'
              onClick={clickHandler}
              filterParams={filterParams.currency}
            >
              ALL
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              name='currency'
              value='HUF'
              onClick={clickHandler}
              filterParams={filterParams.currency}
            >
              HUF
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              name='currency'
              value='USD'
              onClick={clickHandler}
              filterParams={filterParams.currency}
            >
              USD
            </CurrencyButton>
          </li>
        </CurrencyFilters>
      </FiltersWrapper>
    </>
  );
}
