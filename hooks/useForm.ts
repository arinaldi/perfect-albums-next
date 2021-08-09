import { ChangeEvent, useEffect, useState } from 'react';

interface Payload {
  values: any;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
}

export default function useForm<T>(initialState: T): Payload {
  const [values, setValues] = useState(initialState);
  const initialValues = Object.values(initialState).join('');

  useEffect(() => {
    setValues(initialState);
  }, [initialValues]); // eslint-disable-line

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    let newValue: string | boolean = value;

    if (name === 'year') {
      newValue = value.replace(/\D/, '');
    }

    if (['aotd', 'cd', 'favorite'].includes(name)) {
      newValue = value === 'true';
    }

    setValues({ ...values, [name]: newValue });
  }

  function resetForm() {
    setValues(initialState);
  }

  return {
    values,
    handleChange,
    resetForm,
  };
}
