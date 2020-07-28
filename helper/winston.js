
import winston from "winston";

function log() {
    const { combine, printf, label, timestamp } = winston.format;
    const myFormat = printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] ${level}: ${message}`
    });

    const logger = winston.createLogger({
        level: "silly",
        transports: [
            new (winston.transports.Console)(),
            new (winston.transports.File)({ filename: "logs" })
        ],
        format: combine(
            label({ label: "Grade" }),
            timestamp(),
            myFormat
        )
    })
    return logger
}


export default log