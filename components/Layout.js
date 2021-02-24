export default function Layout({ children, title, titleAction }) {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          {title}
        </h1>
        {titleAction}
      </div>
      <div className="relative flex-auto">
        {children}
      </div>
    </div>
  );
}
