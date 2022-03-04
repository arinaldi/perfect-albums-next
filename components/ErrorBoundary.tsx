import { Component, ErrorInfo } from 'react';

import { Children } from 'utils/types';
import AppMessage from 'components/AppMessage';
import Button from 'components/Button';

interface State {
  hasError: boolean;
  error: string;
}

class ErrorBoundary extends Component<Children, State> {
  state = {
    hasError: false,
    error: '',
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error: error.message,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error); // eslint-disable-line
    console.error('Error Info:', errorInfo); // eslint-disable-line
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <div className="my-8 space-y-6 text-center">
          <AppMessage message={error} />
          <Button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
