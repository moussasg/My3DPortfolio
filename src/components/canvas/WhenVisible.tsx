import { type ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** How far before the screen edge to start rendering (CSS margin syntax). */
  margin?: string;
};

/**
 * Renders its children only once its box comes near the screen, then keeps them.
 * Used for the 3D scenes at the bottom of the page: they no longer download, compile
 * and hold graphics memory while the visitor is still reading the top of the page.
 */
const WhenVisible = ({ children, className, margin = "400px" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { rootMargin: margin }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [visible, margin]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : null}
    </div>
  );
};

export default WhenVisible;
