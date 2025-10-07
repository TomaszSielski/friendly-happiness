// src/utils/logger.js
const allowedLevels = ["info", "debug", "error"];
const currentLevel = process.env.REACT_APP_LOG_LEVEL || "info";

export const devLog = (level = "info", ...args) => {
  if (process.env.NODE_ENV !== "development") return;
  if (!allowedLevels.includes(level)) return;

  const timestamp = new Date().toISOString();
  const label = `[${timestamp}] [${level.toUpperCase()}]`;

  console[level](label, ...args);
};
