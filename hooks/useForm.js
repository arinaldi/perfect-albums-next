import { useEffect, useState } from 'react';

export default function useForm(initialState = {}) {
  const [values, setValues] = useState(initialState);
  const initialValues = Object.values(initialState).join('');

  useEffect(() => {
    setValues(initialState);
  }, [initialValues]);

  function handleChange(event) {
    const { name, value } = event.target;
    let newValue = value;

    if (name === 'year') {
      newValue = value.replace(/\D/, '');
    }

    if (['aotd', 'cd', 'favorite'].includes(name)) {
      newValue = value === 'true';
    }

    setValues({ ...values, [name]: newValue });
  }

  function resetForm() {
    setValues(initialValues);
  }

  return {
    values,
    handleChange,
    resetForm,
  };
}
