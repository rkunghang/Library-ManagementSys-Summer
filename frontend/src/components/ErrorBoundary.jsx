import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-paper px-6 text-center">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mb-3">
                        Something tore
                    </p>
                    <h1 className="font-display text-5xl mb-4">A page fell apart</h1>
                    <p className="font-body text-ink-soft mb-8 max-w-sm">
                        Reload the page — if this keeps happening, something's wrong upstream.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-ink text-paper py-3 px-8 font-mono text-xs uppercase tracking-[0.2em] hover:bg-black transition-colors"
                    >
                        Reload
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;