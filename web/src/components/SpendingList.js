import React, {useState, useEffect} from 'react';
import {FiDollarSign} from 'react-icons/fi';
import {BiEditAlt} from 'react-icons/bi';
import {MdClear} from 'react-icons/md';
import {DateTime} from 'luxon';
import Loader from './Loader';
import {
  readSpending,
  readSpending2,
  deleteSpending,
} from '../services/crud';
import {filterFunction} from '../services/filter';

import {
  ErrorMessage,
  Spending,
  IconWrapper,
  TextWrapper,
  Amount,
  AmountWrapper,
  ModifyWrapper
} from '../styles/ComponentStyles';

export default function SpendingList({
  spendings,
  setSpendings,
  toggle,
  setToggle,
  filterParams,
  setFormValues,
  setIdToUpdate
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   const removeValueEvent = readSpending('spendings', async (snapshot) => {
  //     await setSpendings(Object.entries(snapshot.val()));
  //   });
  //   setLoading(false);
  //   return () => removeValueEvent();
  // }, [setSpendings]);

  useEffect(() => {
    setLoading(true);
    readSpending2('spendings')
      .then(async (snapshot) =>
        await setSpendings(filterFunction(Object.entries(snapshot.val() || []), filterParams))
      )
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setSpendings, toggle, filterParams]);

  const handleUpdate = (id) => {
    setIdToUpdate(id);
    const spendingToUpdate = spendings.filter((item) => item[0] === id);
    setFormValues({
      description: spendingToUpdate[0][1].description,
      amount: spendingToUpdate[0][1].amount,
      currency: spendingToUpdate[0][1].currency,
    });
  };

  const handleDelete = (id) => {
    deleteSpending('spendings', id)
    .then(() => {
      setToggle(prev => !prev);
      console.log('Data has been deleted!');
    })
    .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(`http://localhost:5000/spendings`, {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then(async (res) => {
  //       const body = await res.json();
  //       return {
  //         status: res.status,
  //         body,
  //       };
  //     })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setSpendings(response.body);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setError(true);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  //   setLoading(false);
  // }, []);

  if (loading) return <Loader />;

  return (
    <>
      {error && (
        <ErrorMessage>The server is probably down. Please try again later.</ErrorMessage>
      )}
      {!spendings.length && !error && (
        <h1 style={{textAlign: 'center', marginTop: '4rem'}}>
          Yay!{' '}
          <span role='img' aria-label='jsx-a11y/accessible-emoji'>
            🎉
          </span>{' '}
          No spendings!
        </h1>
      )}
      {spendings.length > 0 &&
        spendings.map((spending) => (
          <Spending key={`spending_${spending[0]}`}>
            <IconWrapper>
              <FiDollarSign color='var(--color-blue)' />
            </IconWrapper>
            <TextWrapper>
              <h3>{spending[1].description}</h3>
              <p>
                {DateTime.fromISO(spending[1].spent_at)
                  .setLocale('en')
                  .toFormat('t - MMMM dd, yyyy')}
              </p>
            </TextWrapper>
            <AmountWrapper>
              <Amount currency={spending[1].currency}>
                {spending[1].amount.toFixed(2)}
              </Amount>
            </AmountWrapper>
            <ModifyWrapper color='--color-green' onClick={() => handleUpdate(spending[0])}>
              <BiEditAlt />
            </ModifyWrapper>
            <ModifyWrapper color='--color-red' onClick={() => handleDelete(spending[0])}>
              <MdClear />
            </ModifyWrapper>
          </Spending>
        ))}
    </>
  );
}
