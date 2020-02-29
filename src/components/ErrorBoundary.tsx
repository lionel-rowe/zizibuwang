import React from 'react';

interface ErrorInfoObject {
    componentStack: any;
}

interface ErrorBoundaryState { error?: Error; errorInfo?: ErrorInfoObject }

class ErrorBoundary extends React.Component {
    constructor(props: any) {
        super(props);

        const state: ErrorBoundaryState = {
            error: undefined,
            errorInfo: undefined,
        };

        this.state = state;
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfoObject) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
    }

    render() {
        const { error, errorInfo } = this.state as ErrorBoundaryState;
        const { children } = this.props;

        if (error) {
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {error?.toString()}
                        <br />
                        {errorInfo?.componentStack}
                    </details>
                </div>
            );
        }
        return children;
    }
}

export default ErrorBoundary;
