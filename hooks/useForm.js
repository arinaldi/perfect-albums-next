import { useEffect, useState } from 'react';

export default function useForm(initialState = {}) {
  const [values, setValues] = useState(initialState);
  const initialValues = Object.values(initialState).join('');

  useEffect(() => {
    setValues(initialState);
  }, [initialValues]);

  function handleChange(event) {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
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
