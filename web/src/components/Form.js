import React, {useEffect, useState} from 'react';
import {createSpending, updateSpending} from '../services/crud';

import {InputStyles, InputWrapperStyles} from '../styles/InputStyles';
import {SelectStyles} from '../styles/SelectStyles';
import {FormStyles} from '../styles/ComponentStyles';
import {FormErrorStyles} from '../styles/FormErrorStyles';

export default function Form({
  formValues,
  setFormValues,
  setToggle,
  idToUpdate,
  setIdToUpdate,
}) {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  function handleChange(e) {
    const {name, value} = e.target;
    if (name === 'amount') {
      setFormValues({
        ...formValues,
        [name]: Number(value),
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  }

  const validateInput = (values) => {
    const errors = {};
    if (!values.description) {
      errors.description = 'Description is required!';
    }
    if (values.amount === '') {
      errors.amount = 'Amount is required!';
    } else if (values.amount === 0) {
      errors.amount = 'Value cannot be zero!';
    }
    return errors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateInput(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const currentDate = new Date(Date.now()).toISOString();
      if (idToUpdate) {
        updateSpending('spendings', idToUpdate, {...formValues, spent_at: currentDate})
        .then(() => console.log('Data has been updated!'))
        .catch((err) => console.log(err))
        .finally(() => setIdToUpdate(''));
      } else {
        createSpending('spendings', {...formValues, spent_at: currentDate})
          .then(() => console.log('Data has been saved!'))
          .catch((err) => console.log(err));
      }
      setFormValues({
        description: '',
        amount: '',
        currency: formValues.currency,
      });
      setToggle(prev => !prev);
    }
  }, [formErrors, isSubmit]);

  return (
    <>
      <FormStyles onSubmit={handleFormSubmit}>
        <InputWrapperStyles type='description'>
          <InputStyles
            type='text'
            placeholder='description'
            name='description'
            value={formValues.description}
            onChange={handleChange}
            error={formErrors.description}
          />
          {formErrors.description && (
            <FormErrorStyles>{formErrors.description}</FormErrorStyles>
          )}
        </InputWrapperStyles>
        <InputWrapperStyles type='amount'>
          <InputStyles
            type='number'
            placeholder='amount'
            name='amount'
            value={formValues.amount}
            onChange={handleChange}
            min='0.00'
            step={formValues.currency === 'HUF' ? '1' : '0.1'}
            error={formErrors.amount}
          />
          {formErrors.amount && <FormErrorStyles>{formErrors.amount}</FormErrorStyles>}
        </InputWrapperStyles>
        <SelectStyles name='currency' value={formValues.currency} onChange={handleChange}>
          <option value='HUF'>HUF</option>
          <option value='USD'>USD</option>
        </SelectStyles>
        <InputStyles type='submit' value={idToUpdate ? 'Update' : 'Save'} />
      </FormStyles>
    </>
  );
}
