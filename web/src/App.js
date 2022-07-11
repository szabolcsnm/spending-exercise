import React, {useCallback, useState, useEffect} from 'react';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './layout/Layout';

export function filterFunction(spendingList, filterParameters) {
    console.log('render');
    const sortFunction = (list) => {
      let sortByAmountOrDate;
      if(filterParameters.select === '-amount_in_huf') {
        sortByAmountOrDate = list.sort((a,b) => {
          return b[1].amount - a[1].amount;
        });
      } 
      if(filterParameters.select === 'amount_in_huf') {
        sortByAmountOrDate = list.sort((a,b) => {
          return a[1].amount - b[1].amount;
        });
      }
      if(filterParameters.select === '-date') {
        sortByAmountOrDate = list.sort((a, b) => {
          return new Date(b[1].spent_at).getTime() - new Date(a[1].spent_at).getTime();
        });
      }
      if(filterParameters.select === 'date') {
        sortByAmountOrDate = list.sort((a, b) => {
          return new Date(a[1].spent_at).getTime() - new Date(b[1].spent_at).getTime();
        });
      }
      return sortByAmountOrDate;
    }
    
    const filteredResult = sortFunction(spendingList).filter((spending) => {
      const value = spending[1];
      const filterCurrency = filterParameters?.currency !== 'ALL' ? value?.currency.toString().toLowerCase().indexOf(filterParameters?.currency.toLowerCase()) > -1 : value?.currency;
      return filterCurrency;
    })

    return filteredResult;
  };

export default function App() {
  const [spendings, setSpendings] = useState([]);
  const [filteredSpendings, setFilteredSpendings] = useState([]);
  const [filterParams, setFilterParams] = useState({
    select: '-date',
    currency: 'ALL',
  });
  const [tempData, setTempData] = useState({});

  // const filterFunction = useCallback((spendingList, filterParameters) => {
    
  //   const sortFunction = (list) => {
  //     let sortByAmountOrDate;
  //     if(filterParameters.select === '-amount_in_huf') {
  //       sortByAmountOrDate = list.sort((a,b) => {
  //         return b[1].amount - a[1].amount;
  //       });
  //     } 
  //     if(filterParameters.select === 'amount_in_huf') {
  //       sortByAmountOrDate = list.sort((a,b) => {
  //         return a[1].amount - b[1].amount;
  //       });
  //     }
  //     if(filterParameters.select === '-date') {
  //       sortByAmountOrDate = list.sort((a, b) => {
  //         return new Date(b[1].spent_at).getTime() - new Date(a[1].spent_at).getTime();
  //       });
  //     }
  //     if(filterParameters.select === 'date') {
  //       sortByAmountOrDate = list.sort((a, b) => {
  //         return new Date(a[1].spent_at).getTime() - new Date(b[1].spent_at).getTime();
  //       });
  //     }
  //     return sortByAmountOrDate;
  //   }
    
  //   const filteredResult = sortFunction(spendingList).filter((spending) => {
  //     const value = spending[1];
  //     const filterCurrency = filterParameters?.currency !== 'ALL' ? value?.currency.toString().toLowerCase().indexOf(filterParameters?.currency.toLowerCase()) > -1 : value?.currency;
  //     return filterCurrency;
  //   })

  //   return filteredResult;
  // }, []);

  // useEffect(() => {
  //   const result = filterFunction(spendings, filterParams);
  //   // setFilteredSpendings(result);
  //   console.log(result);
  // }, [filterFunction, spendings, filterParams]);

  return (
    <>
      <Layout>
        <Form setTempData={setTempData} />

        <FiltersAndOrderings
          filterParams={filterParams}
          setFilterParams={setFilterParams}
        />

        <SpendingList
          spendings={spendings}
          setSpendings={setSpendings}
          tempData={tempData}
          filterParams={filterParams}
        />
        
      </Layout>
    </>
  );
}
