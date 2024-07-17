import { Service } from "typedi";
import {
  createLogger,
  format,
  transports,
  Logger as WinstonLogger,
} from "winston";

@Service("logger")
export class Logger {
  private logger: WinstonLogger;

  constructor() {
    const logFormat = format.combine(
      format.colorize(),
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      )
    );

    const logTransports = [
      new transports.Console({
        format: format.combine(format.colorize({ all: true }), logFormat),
      }),
    ];

    this.logger = createLogger({
      format: logFormat,
      transports: logTransports,
    });
  }

  public log(level: string, message: string) {
    this.logger.log(level, message);
  }

  public error(message: string) {
    this.log("error", message);
  }

  public warn(message: string) {
    this.log("warn", message);
  }

  public info(message: string) {
    this.log("info", message);
  }

  public debug(message: string) {
    this.log("debug", message);
  }
}
