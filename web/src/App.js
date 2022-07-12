import React, {useState} from 'react';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './layout/Layout';

const defaultValues = {
  description: '',
  amount: '',
  currency: 'USD',
};

export default function App() {
  const [spendings, setSpendings] = useState([]);
  const [formValues, setFormValues] = useState(defaultValues);
  const [filterParams, setFilterParams] = useState({
    select: '-date',
    currency: 'ALL',
  });
  const [toggle, setToggle] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState('');

  return (
    <>
      <Layout>
        <Form
          formValues={formValues}
          setFormValues={setFormValues}
          setToggle={setToggle}
          idToUpdate={idToUpdate}
          setIdToUpdate={setIdToUpdate}
        />

        <FiltersAndOrderings
          filterParams={filterParams}
          setFilterParams={setFilterParams}
        />

        <SpendingList
          spendings={spendings}
          setSpendings={setSpendings}
          toggle={toggle}
          setToggle={setToggle}
          filterParams={filterParams}
          setFormValues={setFormValues}
          setIdToUpdate={setIdToUpdate}
        />
      </Layout>
    </>
  );
}
