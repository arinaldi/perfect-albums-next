import { FC } from 'react';

import { DISPATCH_TYPES, TOAST_TYPES } from 'constants/index';
import { useApp } from 'components/Provider';

function getToastColor(type: TOAST_TYPES) {
  switch (type) {
  case TOAST_TYPES.SUCCESS:
    return '#48BB78';
  case TOAST_TYPES.ERROR:
    return '#F56566';
  case TOAST_TYPES.INFO:
  default:
    return '#A0AEC0';
  }
}

const Toast: FC = () => {
  const [state, dispatch] = useApp();
  const { isOpen, message, type } = state.toast;

  function closeToast() {
    dispatch({ type: DISPATCH_TYPES.CLOSE_TOAST });
  }

  return (
    <>
      {isOpen ? (
        <div
          className="z-50 absolute bottom-4 left-4 min flex justify-between items-center text-white px-6 py-4 border-0 rounded"
          style={{
            backgroundColor: getToastColor(type),
            minWidth: '340px',
          }}
        >
          <div>{message}</div>
          <button
            className="bg-transparent text-2xl font-semibold leading-none outline-none focus:outline-none"
            onClick={closeToast}
          >
            <span>×</span>
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Toast;
