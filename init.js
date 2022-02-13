"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.ModelsArray = void 0;
const express_1 = __importDefault(require("express"));
const Book_1 = __importDefault(require("./Models/Book"));
const Address_1 = __importDefault(require("./Models/Address"));
const Genre_1 = __importDefault(require("./Models/Genre"));
const PubHouse_1 = __importDefault(require("./Models/PubHouse"));
const Author_1 = __importDefault(require("./Models/Author"));
exports.ModelsArray = new Map([
    ["book", new Book_1.default()],
    ["address", new Address_1.default()],
    ["genre", new Genre_1.default()],
    ["pubHouse", new PubHouse_1.default()],
    ["author", new Author_1.default()],
]);
exports.app = (0, express_1.default)();
