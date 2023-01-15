"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const bookRouter_1 = require("./routers/bookRouter");
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(bookRouter_1.router);
const CallbackFunction = (err) => {
    if (err == null) {
        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });
    }
    else {
        console.error("Database connection failed");
        process.exit();
    }
};
(0, db_1.connectToDB)(CallbackFunction);
