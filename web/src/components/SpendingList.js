import React, {useState, useEffect} from 'react';
import {FiDollarSign} from 'react-icons/fi';
import {DateTime} from 'luxon';
import Loader from './Loader';
import {readSpending, readSpending2} from '../service/crud';
import { filterFunction } from '../App';

import {
  ErrorMessage,
  Spending,
  IconWrapper,
  TextWrapper,
  Amount,
  AmountWrapper,
} from '../styles/ComponentStyles';

export default function SpendingList({spendings, setSpendings, tempData, filterParams}) {
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
      .then((snapshot) => setSpendings(filterFunction(Object.entries(snapshot.val() || []), filterParams)))
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [setSpendings, tempData, filterParams]);

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
                {DateTime.fromISO(spending[1].spent_at).toFormat('t - MMMM dd, yyyy')}
              </p>
            </TextWrapper>
            <AmountWrapper>
              <Amount currency={spending[1].currency}>
                {(spending[1].amount).toFixed(2)}
              </Amount>
            </AmountWrapper>
          </Spending>
        ))}
    </>
  );
}
