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

var authErrLevel1 = new winston.transports.DailyRotateFile({
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'auth-info-%DATE%.log',
    dirname: './src/dailylog/auth-error-log',
    maxFiles: 2,
    json: true,
    format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var authErrLevel2 = new winston.transports.DailyRotateFile({
    level: 'error',
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'auth-error-%DATE%.log',
    dirname: './src/dailylog/auth-error-log',
    maxFiles: 2,
    json: true,
    format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var authInfoLogger = winston.createLogger({
    level: 'info',
    transports: [
        authErrLevel1
    ]
});
var authErrorLogger = winston.createLogger({
    transports: [
        authErrLevel2
    ]
});

var cartErrLevel1 = new winston.transports.DailyRotateFile({
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'cart-info-%DATE%.log',
    dirname: './src/dailylog/cart-error-log',
    maxFiles: 2,
    json: true,
    format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var cartErrLevel2 = new winston.transports.DailyRotateFile({
    level: 'error',
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'cart-error-%DATE%.log',
    dirname: './src/dailylog/cart-error-log',
    maxFiles: 2,
    json: true,
    format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var cartInfoLogger = winston.createLogger({
    level: 'info',
    transports: [
        cartErrLevel1
    ]
});
var cartErrorLogger = winston.createLogger({
    transports: [
        cartErrLevel2
    ]
});

var categoryErrLevel1 = new winston.transports.DailyRotateFile({
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'category-info-%DATE%.log',
    dirname: './src/dailylog/category-error-log',
    maxFiles: 2,
    json: true,
    format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var categoryErrLevel2 = new winston.transports.DailyRotateFile({
    level: 'error',
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'category-error-%DATE%.log',
    dirname: './src/dailylog/category-error-log',
    maxFiles: 2,
    json: true,
    format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var categoryInfoLogger = winston.createLogger({
    level: 'info',
    transports: [
        categoryErrLevel1
    ]
});
var categoryErrorLogger = winston.createLogger({
    transports: [
        categoryErrLevel2
    ]
});

var contactusErrLevel1 = new winston.transports.DailyRotateFile({
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'contactus-info-%DATE%.log',
    dirname: './src/dailylog/contactus-error-log',
    maxFiles: 2,
    json: true,
    format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var contactusErrLevel2 = new winston.transports.DailyRotateFile({
    level: 'error',
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'contactus-error-%DATE%.log',
    dirname: './src/dailylog/contactus-error-log',
    maxFiles: 2,
    json: true,
    format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var contactusInfoLogger = winston.createLogger({
    level: 'info',
    transports: [
        contactusErrLevel1
    ]
});
var contactusErrorLogger = winston.createLogger({
    transports: [
        contactusErrLevel2
    ]
});

var PopularProductErrLevel1 = new winston.transports.DailyRotateFile({
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'PopularProduct-info-%DATE%.log',
    dirname: './src/dailylog/PopularProduct-error-log',
    maxFiles: 2,
    json: true,
    format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var PopularProductErrLevel2 = new winston.transports.DailyRotateFile({
    level: 'error',
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'PopularProduct-error-%DATE%.log',
    dirname: './src/dailylog/PopularProduct-error-log',
    maxFiles: 2,
    json: true,
    format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var PopularProductInfoLogger = winston.createLogger({
    level: 'info',
    transports: [
        PopularProductErrLevel1
    ]
});
var PopularProductErrorLogger = winston.createLogger({
    transports: [
        PopularProductErrLevel2
    ]
});

var purchaseErrLevel1 = new winston.transports.DailyRotateFile({
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'purchase-info-%DATE%.log',
    dirname: './src/dailylog/purchase-error-log',
    maxFiles: 2,
    json: true,
    format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var purchaseErrLevel2 = new winston.transports.DailyRotateFile({
    level: 'error',
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'purchase-error-%DATE%.log',
    dirname: './src/dailylog/purchase-error-log',
    maxFiles: 2,
    json: true,
    format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var purchaseInfoLogger = winston.createLogger({
    level: 'info',
    transports: [
        purchaseErrLevel1
    ]
});
var purchaseErrorLogger = winston.createLogger({
    transports: [
        purchaseErrLevel2
    ]
});

module.exports = { productInfoLogger, productErrorLogger, userInfoLogger, userErrorLogger,
    authInfoLogger,authErrorLogger,cartInfoLogger,cartErrorLogger,categoryInfoLogger,categoryErrorLogger,
    contactusInfoLogger,contactusErrorLogger,PopularProductInfoLogger,PopularProductErrorLogger,
    purchaseInfoLogger,purchaseErrorLogger}