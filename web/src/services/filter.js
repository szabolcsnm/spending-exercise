export function filterFunction(spendingList, filterParameters) {
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