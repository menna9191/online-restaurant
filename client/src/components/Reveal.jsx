import { useEffect, useRef, useState } from "react";

/**
 * Wraps children and fades/slides them into view the first time they
 * scroll into the viewport. Respects prefers-reduced-motion via CSS.
 *
 * Usage: <Reveal><section>...</section></Reveal>
 * Optional stagger: <Reveal delay={120}>...</Reveal>
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  style = {},
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "in-view" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
