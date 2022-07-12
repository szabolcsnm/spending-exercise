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
  const [idToUpdate, setIdToUpdate] = useState('');
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Layout>
        <Form
          formValues={formValues}
          setFormValues={setFormValues}
          idToUpdate={idToUpdate}
          setIdToUpdate={setIdToUpdate}
          setToggle={setToggle}
        />

        <FiltersAndOrderings
          filterParams={filterParams}
          setFilterParams={setFilterParams}
        />

        <SpendingList
          spendings={spendings}
          setSpendings={setSpendings}
          setFormValues={setFormValues}
          filterParams={filterParams}
          setIdToUpdate={setIdToUpdate}
          toggle={toggle}
          setToggle={setToggle}
        />
      </Layout>
    </>
  );
}
