import Spinner from 'components/Spinner';

export default function InputSpinner() {
  return (
    <div className="absolute bottom-0 right-0 top-0 flex items-center justify-center">
      <Spinner className="mr-1.5 size-6 cursor-none p-1" />
    </div>
  );
}
