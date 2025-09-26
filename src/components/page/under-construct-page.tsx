"use client";

import { motion } from "framer-motion";

export const UnderConstructPage = () => {
  return (
    <div className="relative size-full h-full overflow-hidden bg-gray-50 dark:bg-gray-900">
      {Array.from({ length: 7 }).map((_, i) => {
        const baseAngle = [35, -25, 45, -30][i];

        const yPosition = 80 + i * 160;
        return (
          <motion.div
            key={`tape-${i}`}
            className="absolute left-[-100px] w-[2000px] -translate-x-1/2 overflow-hidden"
            initial={{
              rotate: baseAngle,
              y: yPosition,
            }}
            animate={{
              rotate: baseAngle + (i % 2 === 0 ? 2 : -2),
              y: yPosition + 10,
            }}
            transition={{
              rotate: {
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              y: {
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.5,
              },
            }}
            style={{
              zIndex: 20 - i,
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              className="relative h-14 w-[200%] overflow-hidden"
              initial={{ x: i % 2 === 0 ? 0 : "-50%" }}
              animate={{ x: i % 2 === 0 ? "-50%" : 0 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
            >
              <div className="absolute inset-0 bg-yellow-400 shadow-lg">
                <div className="flex h-full items-center">
                  <div className="flex min-w-max items-center">
                    {Array.from({ length: 60 }).map((_, j) => (
                      <div
                        key={`text-${i}-${j}`}
                        className="mx-3 whitespace-nowrap font-bold tracking-wide text-black opacity-80"
                        style={{
                          textShadow: "0px 1px 1px rgba(0,0,0,0.1)",
                        }}
                      >
                        앗! 작업중
                      </div>
                    ))}
                  </div>

                  <div className="flex min-w-max items-center">
                    {Array.from({ length: 60 }).map((_, j) => (
                      <div
                        key={`text-dup-${i}-${j}`}
                        className="mx-3 whitespace-nowrap font-bold tracking-wide text-black opacity-80"
                        style={{
                          textShadow: "0px 1px 1px rgba(0,0,0,0.1)",
                        }}
                      >
                        앗! 작업중
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      <div className="relative z-30 flex size-full flex-col items-center justify-center px-4 py-16">
        <motion.div
          className="max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="sm:text-7xl mb-6 font-sans text-6xl font-black tracking-tight text-gray-900 dark:text-white">
            <span className="block" />
            <span className="block" />
            <motion.span
              className="relative inline-block"
              animate={{
                rotateX: [0, 10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              앗! 작업중
            </motion.span>
          </h1>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-gray-50 to-transparent opacity-70 dark:from-gray-900" />
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-gray-50 to-transparent opacity-70 dark:from-gray-900" />
    </div>
  );
};
