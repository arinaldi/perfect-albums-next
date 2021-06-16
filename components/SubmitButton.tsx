import { FC } from 'react';

interface Props {
  isSubmitting: boolean;
}

const SubmitButton: FC<Props> = ({ isSubmitting }) => {
  return (
    <button
      className="bg-gray-600 text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-gray-800"
      disabled={isSubmitting}
      type="submit"
    >
      {isSubmitting ? 'Saving...' : 'Save'}
    </button>
  );
};

export default SubmitButton;
