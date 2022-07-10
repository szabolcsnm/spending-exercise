import React, { useState } from 'react';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './layout/Layout';

export default function App() {
  const [spendings, setSpendings] = useState([]);
  const [tempData, setTempData] = useState({})

  return (
    <>
      <Layout>
        <Form setTempData={setTempData}/>
        <FiltersAndOrderings />
        <SpendingList
          spendings={spendings}
          setSpendings={setSpendings}
          tempData={tempData}
        />
      </Layout>
    </>
  );
}
