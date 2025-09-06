import { MaterialSymbols } from '../MaterialSymbols/MaterialSymbols';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  showRetryButton?: boolean;
  className?: string;
}

export const ErrorMessage = ({ 
  message, 
  onRetry, 
  showRetryButton = true,
  className
}: ErrorMessageProps) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 p-8 backdrop-blur-[2px] backdrop-filter bg-surface-alpha rounded-lg border border-gray-variant ${className}`}>
      <MaterialSymbols size={48} className='text-red'>error</MaterialSymbols>
      <p className="text-red">{message}</p>
      {showRetryButton && onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center hover:bg-surface p-2 rounded"
        >
          再試行
        </button>
      )}
    </div>
  );
};
