// src/utils/logger.js
/**
 * @file logger.js
 * @module devLog
 * @description Lightweight development logger with environment and log level filtering.
 *
 * @responsibilities
 * - Outputs timestamped logs to the console
 * - Filters logs by allowed levels and environment
 *
 * @behavior
 * - Supports `debug`, `info`, `warn`, and `error` levels
 *
 * @usage
 * - `devLog("info", "Message")`
 * - `devLog("error", "Something went wrong:", error)`
 *
 * @auditTag logger-util-v1
 * @lastReviewed 2025-11-01
 *
 * @todo
 * - Write unit tests for environment and level-based filtering
 */

const allowedLevels = ["debug", "info", "warn", "error"];
const levelPriority = { debug: 0, info: 1, warn: 2, error: 3 };
const currentLevel = process.env.REACT_APP_LOG_LEVEL || "info";

export const devLog = (level = "info", ...args) => {
  if (process.env.NODE_ENV !== "development") return;
  if (!allowedLevels.includes(level)) return;
  if (levelPriority[level] < levelPriority[currentLevel]) return;

  const timestamp = new Date().toISOString();
  const label = `[${timestamp}] [${level.toUpperCase()}]`;

  console[level](label, ...args);
};
