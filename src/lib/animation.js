export const springConfig = { type: "spring", stiffness: 60, damping: 20 };

export const revealVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: springConfig },
};

export const revealVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};
