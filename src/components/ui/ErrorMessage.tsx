export const ErrorMessage = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) => (
  <div className="text-center py-12">
    <p className="text-red-500 text-xl mb-4">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-red-500 text-white px-6 py-2 rounded-lg"
      >
        Try again
      </button>
    )}
  </div>
);
