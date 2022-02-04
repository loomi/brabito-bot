export interface LoggerLocal {
  logInfo(message: string): void;
  logError(error: Error): void;
}
