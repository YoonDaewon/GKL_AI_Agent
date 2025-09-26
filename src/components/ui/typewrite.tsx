"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";

export interface ITypewriterProps {
  delay?: number;
  texts: string[];
  baseText?: string;
  baseDuration?: number;
  textDuration?: number;
  onComplete?: () => void;
}

export function Typewriter({
  delay = 0,
  texts,
  baseText = "",
  baseDuration = 3,
  textDuration = 3,
  onComplete,
}: ITypewriterProps) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [mainTextComplete, setMainTextComplete] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest),
  );

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween",
      delay: 0,
      duration: baseDuration,
      ease: "easeInOut",
      onComplete: () => {
        setAnimationComplete(true);

        if (!texts[0]) {
          onComplete?.();
        }
      },
    });
    return () => {
      if (controls.stop) controls.stop();
    };
  }, [count, baseText.length, delay, baseDuration, onComplete, texts]);

  useEffect(() => {
    if (animationComplete && mainTextComplete) {
      onComplete?.();
    }
  }, [animationComplete, mainTextComplete, onComplete]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.span className="">{displayText}</motion.span>
      {animationComplete && (
        <SingleTextAnimation
          text={texts[0]}
          duration={textDuration}
          onComplete={() => setMainTextComplete(true)}
        />
      )}
      {!mainTextComplete && <BlinkingCursor />}
    </motion.span>
  );
}

export interface ISingleTextAnimationProps {
  delay?: number;
  text: string;
  duration?: number;
  onComplete?: () => void;
}

function SingleTextAnimation({
  delay = 0,
  text,
  duration = 1,
  onComplete,
}: ISingleTextAnimationProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const animation = animate(count, text.length, {
      type: "tween",
      delay: 0,
      duration,
      ease: "easeIn",
      onComplete: () => {
        onComplete?.();
      },
    });
    return () => {
      if (animation.stop) animation.stop();
    };
  }, [count, delay, text, duration, onComplete]);

  return (
    <motion.span className="inline min-w-[40px] whitespace-pre-wrap">
      {displayText}
    </motion.span>
  );
}

const cursorVariants: Variants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear" as const,
      times: [0, 0.5, 0.5, 1],
    },
  },
};

function BlinkingCursor() {
  return (
    <motion.div
      variants={cursorVariants}
      animate="blinking"
      className="inline-block h-5 w-px translate-y-1 bg-neutral-900"
    />
  );
}
