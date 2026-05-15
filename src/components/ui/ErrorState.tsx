import { AlertCircle } from 'lucide-react';
import { ReactNode } from 'react';

interface ErrorStateProps {
  title?: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: ReactNode;
}

export const ErrorState = ({
  title = 'Error',
  message,
  action,
  icon,
}: ErrorStateProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 p-8 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-center"
      role="alert"
    >
      <div className="text-red-600 dark:text-red-400">
        {icon || <AlertCircle className="w-8 h-8 mx-auto" />}
      </div>
      <div>
        <h3 className="font-semibold text-red-900 dark:text-red-100">
          {title}
        </h3>
        <p className="text-sm text-red-700 dark:text-red-300 mt-1">
          {message}
        </p>
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
          aria-label={action.label}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default ErrorState;
