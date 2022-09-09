import { toast, Toaster, ToastBar } from 'react-hot-toast';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function Toast() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        success: {
          style: {
            background: '#A7F3D0',
            borderLeft: '4px solid #059669',
          },
        },
        error: {
          style: {
            background: '#FECACA',
            borderLeft: '4px solid #DC2626',
          },
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              <XMarkIcon
                className="ml-2 mr-1 h-5 w-5 cursor-pointer"
                onClick={() => toast.dismiss(t.id)}
              />
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}
