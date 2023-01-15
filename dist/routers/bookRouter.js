"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const mongodb = __importStar(require("mongodb"));
const db_1 = require("../db");
const mongodb_1 = require("mongodb");
exports.router = express_1.default.Router();
exports.router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = (yield db_1.collections.find({}).toArray());
        res.status(200).send(books);
    }
    catch (error) {
        res.status(500).send(error === null || error === void 0 ? void 0 : error.message);
    }
}));
// Paginated books
exports.router.get("/paginatedBooks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageNo = req.query.page;
    const final = pageNo ? pageNo * 2 : 0;
    console.log(pageNo);
    try {
        const books = (yield db_1.collections.find({}).sort({ title: 1 }).skip(final).limit(2).toArray());
        res.status(200).send(books);
    }
    catch (error) {
        res.status(500).send(error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.router.get("/books/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    if (mongodb.ObjectId.isValid(id)) {
        try {
            const books = (yield db_1.collections.find({ _id: new mongodb_1.ObjectId(id) }).toArray());
            res.status(200).send(books);
        }
        catch (error) {
            res.status(500).send(error === null || error === void 0 ? void 0 : error.message);
        }
    }
    else {
        res.status(500).json({ error: "not a valid doc id" });
    }
}));
exports.router.post("/books", (req, res) => {
    let book = req.body;
    console.log({ book: book });
    try {
        db_1.collections.insertOne(book)
            .then(result => {
            res.status(200).json(result);
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ err1: "could not create a document", err: error });
    }
});
exports.router.patch("/books/:id", (req, res) => {
    let updates = req.body;
    if (mongodb_1.ObjectId.isValid(req.params.id)) {
        try {
            db_1.collections.updateOne({ _id: new mongodb_1.ObjectId(req.params.id) }, { $set: updates })
                .then(result => {
                res.status(201).json(result);
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ err1: "could not update a document", err: error });
        }
    }
    else {
        res.status(500).json({ error: "Invalid ID" });
    }
});
exports.router.delete("/books/:id", (req, res) => {
    if (mongodb_1.ObjectId.isValid(req.params.id)) {
        try {
            db_1.collections.deleteOne({ _id: new mongodb_1.ObjectId(req.params.id) })
                .then(result => {
                res.status(200).json(result);
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ err1: "could not update a document", err: error });
        }
    }
    else {
        res.status(500).json({ error: "Invalid ID" });
    }
});
