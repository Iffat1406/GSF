'use client';

import React, { ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800"
            role="alert"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              <div>
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
                  Something went wrong
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  {this.state.error?.message || 'An unexpected error occurred'}
                </p>
              </div>
            </div>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              aria-label="Try again"
            >
              <RotateCcw className="w-4 h-4" />
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
