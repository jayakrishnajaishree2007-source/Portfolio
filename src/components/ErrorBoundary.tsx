import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    message: '',
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    let display = error.message || 'An unexpected application error occurred.';
    try {
      const parsed = JSON.parse(display) as {
        error?: string;
        operationType?: string;
        path?: string;
      };
      if (parsed && typeof parsed.error === 'string') {
        display = `${parsed.error} (${parsed.operationType ?? 'operation'} on ${parsed.path ?? 'unknown'})`;
      }
    } catch {
      // keep original message
    }
    return { hasError: true, message: display };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application ErrorBoundary caught:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, message: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080A0E] text-[#F1F5F9] flex items-center justify-center p-6">
          <div className="w-full max-w-lg border border-white/15 bg-[#0C0F15] p-8 space-y-5 shadow-[0_24px_80px_rgba(0,0,0,0.8)]">
            <p className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#00D9FF]">
              System Recovery
            </p>
            <h2 className="font-display text-2xl font-bold text-white">
              Something interrupted the session
            </h2>
            <p className="text-sm text-[#94A3B8] leading-relaxed break-words">
              {this.state.message}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="px-4 py-2.5 bg-[#00D9FF] hover:bg-white text-[#080A0E] font-mono-tech text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Recover View
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-4 py-2.5 border border-white/20 bg-[#10131A] hover:border-[#00D9FF] text-white font-mono-tech text-xs uppercase tracking-wider transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
