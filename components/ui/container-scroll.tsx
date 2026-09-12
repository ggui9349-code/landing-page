"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

type ContainerScrollProps = {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
};

export function ContainerScroll({
  titleComponent,
  children,
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : isMobile ? [7, 0] : [16, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : isMobile ? [0.9, 1] : [1.025, 1],
  );
  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : isMobile ? [20, -35] : [45, -90],
  );

  return (
    <div className="container-scroll" ref={containerRef}>
      <div className="container-scroll__perspective">
        <ContainerScrollHeader translateY={translateY}>
          {titleComponent}
        </ContainerScrollHeader>
        <ContainerScrollCard rotate={rotate} scale={scale}>
          {children}
        </ContainerScrollCard>
      </div>
    </div>
  );
}

function ContainerScrollHeader({
  translateY,
  children,
}: {
  translateY: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="container-scroll__header"
      style={{ translateY }}
    >
      {children}
    </motion.div>
  );
}

function ContainerScrollCard({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="container-scroll__card"
      style={{ rotateX: rotate, scale }}
    >
      <div className="container-scroll__surface">{children}</div>
    </motion.div>
  );
}
// @ts-nocheck
