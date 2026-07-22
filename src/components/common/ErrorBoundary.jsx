import { Component } from 'react';
import ErrorPage from '../../pages/ErrorPage';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage onReset={() => window.location.assign('/')} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
