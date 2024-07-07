import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  // console.error('Uncaught error:', error, errorInfo);
  // }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>BOOM DA BA BOOM</h1>;
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
