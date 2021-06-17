import { FC, ReactNode } from 'react';

import { DISPATCH_TYPES } from 'constants/index';
import useSubmit, { Options } from 'hooks/useSubmit';
import { useApp } from 'components/Provider';
import CancelButton from 'components/CancelButton';
import SubmitButton from 'components/SubmitButton';

interface Props {
  children: ReactNode;
  options: Options;
  resetForm?: () => void;
  title: string;
}

const Modal: FC<Props> = ({ children, options, resetForm, title }) => {
  const [state, dispatch] = useApp();

  function handleClose() {
    dispatch({
      type: DISPATCH_TYPES.CLOSE_MODAL,
    });

    if (resetForm) {
      resetForm();
    }
  }

  options.callbacks.push(handleClose);
  const { handleSubmit, isSubmitting } = useSubmit(options);

  return (
    <>
      {state.modal.isOpen ? (
        <>
          <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-11/12 lg:w-1/2 xl:w-1/3">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-gray-800">
                <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t dark:border-black">
                  <h3 className="text-2xl font-semibold dark:text-white">
                    {title}
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black text-2xl font-semibold outline-none focus:outline-none"
                    onClick={handleClose}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl outline-none focus:outline-none dark:text-white">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative flex-auto">
                  <form method="POST" onSubmit={handleSubmit}>
                    {children}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b dark:border-black">
                      <CancelButton onClick={handleClose} />
                      <SubmitButton isSubmitting={isSubmitting} />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </>
  );
};

export default Modal;
