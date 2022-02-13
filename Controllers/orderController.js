"use strict";
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
const Order_1 = __importDefault(require("../Models/Order"));
const orderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const a = new Order_1.default();
    switch ((_a = req.body) === null || _a === void 0 ? void 0 : _a.type) {
        case 'add':
            a.add(req).then((result) => {
                res.json(result);
            });
            break;
        case 'complete':
            a.complete(req).then((result) => {
                res.json(result);
            });
            break;
        case 'reject':
            a.reject(req).then((result) => {
                res.json(result);
            });
            break;
        case 'search':
            a.searchByBooker(req).then((result) => {
                res.json(result);
            });
            break;
    }
});
exports.default = orderController;
