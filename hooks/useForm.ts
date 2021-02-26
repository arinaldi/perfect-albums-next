import { ChangeEvent, useEffect, useState } from 'react';

export interface AlbumInput {
  artist: string;
  title: string;
  year: string;
  cd: boolean;
  aotd: boolean;
  favorite: boolean;
}

interface Payload {
  values: AlbumInput;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
}

export default function useForm(initialState: AlbumInput): Payload {
  const [values, setValues] = useState(initialState);
  const initialValues = Object.values(initialState).join('');

  useEffect(() => {
    setValues(initialState);
  }, [initialValues]);

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
