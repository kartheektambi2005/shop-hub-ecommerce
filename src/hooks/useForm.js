import { useState } from 'react';

export function useForm(initialValues, validate, onValid) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => (previous[name] ? { ...previous, [name]: '' } : previous));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const foundErrors = validate(values);
    setErrors(foundErrors);

    const [firstInvalidField] = Object.keys(foundErrors);
    if (firstInvalidField) {
      event.currentTarget.elements[firstInvalidField]?.focus();
      return;
    }
    onValid(values);
  };

  return { values, errors, handleChange, handleSubmit };
}
