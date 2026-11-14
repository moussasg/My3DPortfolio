import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** What to show instead of the 3D scene if it fails. Nothing by default. */
  fallback?: ReactNode;
};

type State = { hasError: boolean };

/**
 * Keeps the rest of the page usable when a 3D scene fails, for example when a
 * model cannot be downloaded or the browser has no WebGL support. Without it,
 * React unmounts the whole app and the visitor sees a blank page.
 */
export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("3D scene could not be displayed:", error, info.componentStack);
  }

  render() {
    return this.state.hasError ? this.props.fallback ?? null : this.props.children;
  }
}
