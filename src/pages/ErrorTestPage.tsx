export const ErrorTestPage = () => {
  // This component is designed to throw an error to test the ErrorBoundary
  const throwError = () => {
    throw new Error('This is a test error to demonstrate the ErrorBoundary component');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Boundary Test</h1>
        <p className="text-gray-600 mb-6">
          This page is used to test the ErrorBoundary component. Click the button below to trigger an error.
        </p>
        <button
          onClick={throwError}
          className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Trigger Test Error
        </button>
      </div>
    </div>
  );
};
