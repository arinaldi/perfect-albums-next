import { DISPATCH_TYPES, TOAST_TYPES } from '../constants';
import { useApp } from './Provider';

function getToastColor(type) {
  switch (type) {
  case TOAST_TYPES.SUCCESS:
    return 'green';
  case TOAST_TYPES.ERROR:
    return 'red';
  default:
    return 'gray';
  }
}

export default function Toast() {
  const [state, dispatch] = useApp();
  const { isOpen, message, type } = state.toast;
  const color = getToastColor(type);

  function closeToast() {
    dispatch({ type: DISPATCH_TYPES.CLOSE_TOAST });
  }

  return (
    <>
      {isOpen ? (
        <div
          className={`z-50 absolute bottom-4 left-4 min flex justify-between items-center text-white px-6 py-4 border-0 rounded bg-${color}-500`}
          style={{ minWidth: '400px' }}
        >
          <div>
            {message}
          </div>
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
}
