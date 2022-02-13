"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = exports.updateRoute = exports.removeRoute = exports.getBookByRoute = exports.get10Route = exports.searchRoute = exports.addRoute = void 0;
const init_1 = require("../../init");
const addController_1 = __importDefault(require("../../Controllers/addController"));
const getBookByController_1 = __importDefault(require("../../Controllers/getBookByController"));
const get20Controller_1 = __importDefault(require("../../Controllers/get20Controller"));
const searchController_1 = __importDefault(require("../../Controllers/searchController"));
const removeController_1 = __importDefault(require("../../Controllers/removeController"));
const updateController_1 = __importDefault(require("../../Controllers/updateController"));
const orderController_1 = __importDefault(require("../../Controllers/orderController"));
const addRoute = () => {
    return init_1.app.post('/add', (req, res) => (0, addController_1.default)(req, res));
};
exports.addRoute = addRoute;
const searchRoute = () => {
    return init_1.app.post('/search', (req, res) => (0, searchController_1.default)(req, res));
};
exports.searchRoute = searchRoute;
const get10Route = () => {
    return init_1.app.post('/get', (req, res) => (0, get20Controller_1.default)(req, res));
};
exports.get10Route = get10Route;
const getBookByRoute = () => {
    return init_1.app.post('/getBy', (req, res) => (0, getBookByController_1.default)(req, res));
};
exports.getBookByRoute = getBookByRoute;
const removeRoute = () => {
    return init_1.app.get('/remove/:type/:id', (req, res) => (0, removeController_1.default)(req, res));
};
exports.removeRoute = removeRoute;
const updateRoute = () => {
    return init_1.app.post('/update', (req, res) => (0, updateController_1.default)(req, res));
};
exports.updateRoute = updateRoute;
const orderRoute = () => {
    return init_1.app.post('/order', (req, res) => (0, orderController_1.default)(req, res));
};
exports.orderRoute = orderRoute;
