
import React, { useState, useEffect, useRef } from "react";

interface CounterAnimationProps {
  targetValue: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
}

const CounterAnimation = ({
  targetValue,
  prefix = "",
  suffix = "",
  duration = 2000,
  decimals = 0
}: CounterAnimationProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const isInView = useRef(false);
  const counterRef = useRef<HTMLDivElement>(null);

  const formatValue = (value: number) => {
    return value.toFixed(decimals);
  };

  const animate = (timestamp: number) => {
    if (!startTime.current) {
      startTime.current = timestamp;
    }

    const progress = timestamp - startTime.current;
    const percentage = Math.min(progress / duration, 1);
    const currentValue = percentage * targetValue;

    setDisplayValue(currentValue);

    if (percentage < 1) {
      animationFrameId.current = requestAnimationFrame(animate);
    }
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting && !isInView.current) {
      isInView.current = true;
      startTime.current = null;
      animationFrameId.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [targetValue]);

  return (
    <div ref={counterRef} className="inline-block">
      {prefix}
      {formatValue(displayValue)}
      {suffix}
    </div>
  );
};

export default CounterAnimation;
