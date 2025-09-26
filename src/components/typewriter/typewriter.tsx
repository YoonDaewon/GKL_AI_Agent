import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

export const sentenceVariants = {
  hidden: {},
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export const letterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
};

interface Props {
  text: string;
  onTextChange: (text: string) => void;
}

export const Typewriter = ({ text, onTextChange, ...rest }: Props) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false);

  const baseTypingSpeed = 20;
  const minPauseDelay = 1000;
  const maxPauseDelay = 2500;

  const isParagraphEnd = (currentIndex: number, text: string) => {
    return text[currentIndex] === "\n" && text[currentIndex + 1] === "\n";
  };

  const countParagraphs = (text: string) => {
    const matches = text.match(/\n\n/g);
    return matches ? matches.length + 1 : 1;
  };

  const getRandomPauses = () => {
    return Math.floor(Math.random() * 2) + 1;
  };

  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const typeNextCharacter = useCallback(
    async (currentIndex: number, pausesRemaining: number, text: string) => {
      if (currentIndex >= text.length) {
        setIsAnimationCompleted(true);
        return;
      }

      setDisplayedText(text.substring(0, currentIndex + 1));

      if (pausesRemaining > 0 && isParagraphEnd(currentIndex, text)) {
        const pauseDuration = Math.floor(
          Math.random() * (maxPauseDelay - minPauseDelay) + minPauseDelay,
        );
        await sleep(pauseDuration);
        await typeNextCharacter(currentIndex + 1, pausesRemaining - 1, text);
      } else {
        await sleep(baseTypingSpeed);
        await typeNextCharacter(currentIndex + 1, pausesRemaining, text);
      }
    },
    [],
  );

  const animateText = useCallback(async () => {
    if (!text) return;

    setDisplayedText("");
    const paragraphCount = countParagraphs(text);
    const pausesCount = paragraphCount <= 1 ? 0 : getRandomPauses();

    await typeNextCharacter(0, pausesCount, text);
  }, [text, typeNextCharacter]);

  const modifyRecommendation = (text: string) => {
    setDisplayedText(text);
  };

  useEffect(() => {
    setIsAnimationCompleted(false);
    animateText();
  }, [text, animateText]);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.textarea
        className="md:text-sm flex min-h-[320px] w-full rounded-md border border-input bg-transparent px-3 py-2 font-emoji text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        value={displayedText}
        readOnly={!isAnimationCompleted}
        disabled={!isAnimationCompleted}
        onChange={(event) => modifyRecommendation(event.target.value)}
      />
    </motion.div>
  );
};
