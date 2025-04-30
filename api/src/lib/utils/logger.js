import winston from "winston";
import "winston-daily-rotate-file";

const errorTransport = new winston.transports.DailyRotateFile({
    level: "error",
    filename: "./logs/error-%DATE%.log",
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxFiles: "31d",
});

const logger = winston.createLogger({
    transports: [errorTransport],
});

export default logger;
