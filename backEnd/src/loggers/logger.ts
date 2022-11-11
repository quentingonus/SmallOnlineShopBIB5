import { format } from "winston";
var winston = require('winston');
require('winston-daily-rotate-file');


var userErrLevel1 = new winston.transports.DailyRotateFile({
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'user-info-%DATE%.log',
    dirname: './src/dailylog/user-error-log',
    maxFiles: 2,
    json: true,
    format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var userErrLevel2 = new winston.transports.DailyRotateFile({
    level: 'error',
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'user-error-%DATE%.log',
    dirname: './src/dailylog/user-error-log',
    maxFiles: 2,
    json: true,
    format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var userInfoLogger = winston.createLogger({
    level: 'info',
    transports: [
        userErrLevel1
    ]
});
var userErrorLogger = winston.createLogger({
    transports: [
        userErrLevel2
    ]
});

var productErrLevel1 = new winston.transports.DailyRotateFile({
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'product-info-%DATE%.log',
    dirname: './src/dailylog/product-error-log',
    maxFiles: 2,
    json: true,
    format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var productErrLevel2 = new winston.transports.DailyRotateFile({
    level: 'error',
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'product-error-%DATE%.log',
    dirname: './src/dailylog/product-error-log',
    maxFiles: 2,
    json: true,
    format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var productInfoLogger = winston.createLogger({
    level: 'info',
    transports: [
        productErrLevel1
    ]
});
var productErrorLogger = winston.createLogger({
    transports: [
        productErrLevel2
    ]
});

module.exports = { productInfoLogger, productErrorLogger, userInfoLogger, userErrorLogger }