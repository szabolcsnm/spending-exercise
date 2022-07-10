import React, {useEffect, useState} from 'react';
import {InputStyles, InputWrapperStyles} from '../styles/InputStyles';
import {SelectStyles} from '../styles/SelectStyles';
import {FormStyles} from '../styles/ComponentStyles';
import {FormErrorStyles} from '../styles/FormErrorStyles';
import {createSpending} from '../service/crud';

const defaultValues = {
  description: '',
  amount: '',
  currency: 'USD',
};

export default function Form({setTempData}) {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [formValues, setFormValues] = useState(defaultValues);

  function handleChange(e) {
    const {name, value} = e.target;
    console.log(e.target.value);
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

  function handleFormSubmit(e) {
    e.preventDefault();
    setFormErrors(validateInput(formValues));
    setIsSubmit(true);
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const currentDate = new Date(Date.now()).toISOString();

      createSpending('spendings', {...formValues, spent_at: currentDate})
        .then(() => console.log('Data saved successfully'))
        .catch((err) => console.log(err));

      setFormValues({
        description: '',
        amount: '',
        currency: formValues.currency,
      });
      setTempData(formValues);
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
            min='0'
            error={formErrors.amount}
          />
          {formErrors.amount && <FormErrorStyles>{formErrors.amount}</FormErrorStyles>}
        </InputWrapperStyles>
        <SelectStyles name='currency' value={formValues.currency} onChange={handleChange}>
          <option value='HUF'>HUF</option>
          <option value='USD'>USD</option>
        </SelectStyles>
        <InputStyles type='submit' value='Save' />
      </FormStyles>
    </>
  );
}
