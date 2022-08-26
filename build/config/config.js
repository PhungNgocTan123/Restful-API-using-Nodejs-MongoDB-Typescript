"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var MONGO_USERNAME = process.env.MONGO_USERNAME || '';
var MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
var MONGO_URL = "mongodb+srv://".concat(MONGO_USERNAME, ":").concat(MONGO_PASSWORD, "@cluster0.f5adhlf.mongodb.net/?retryWrites=true&w=majority");
var SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
exports.config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
