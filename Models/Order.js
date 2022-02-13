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
const client_1 = require("@prisma/client");
const FirstLetterToUpperCase_1 = __importDefault(require("../Helpers/FirstLetterToUpperCase"));
class Order extends client_1.PrismaClient {
    add(obj) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const responseBody = [];
            let orderCount = yield this.order.count({
                where: {
                    bookId: Number((_a = obj.body) === null || _a === void 0 ? void 0 : _a.id),
                    status: 'booked'
                }
            });
            let book = yield this.book.findFirst({
                where: {
                    id: Number((_b = obj.body) === null || _b === void 0 ? void 0 : _b.id)
                }
            });
            if (book.amount === orderCount) {
                responseBody.push('fail');
                responseBody.push('Все книги зарезервированы');
                return responseBody;
            }
            else {
                return this.order.create({
                    data: {
                        bookId: Number((_c = obj.body) === null || _c === void 0 ? void 0 : _c.id),
                        customer: (0, FirstLetterToUpperCase_1.default)((_d = obj.body) === null || _d === void 0 ? void 0 : _d.name),
                        status: 'booked'
                    }
                }).then((result) => {
                    responseBody.push('success');
                    responseBody.push(result);
                    return responseBody;
                }).catch((e) => {
                    responseBody.push('fail');
                    responseBody.push(e);
                    return responseBody;
                });
            }
        });
    }
    complete(obj) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const responseBody = [];
            let test = yield this.order.count({
                where: {
                    id: Number((_a = obj.body) === null || _a === void 0 ? void 0 : _a.id),
                    status: 'booked'
                },
            }).catch((e) => {
                responseBody.push('fail');
                responseBody.push(e);
                return responseBody;
            });
            if (test === 0) {
                responseBody.push('fail');
                responseBody.push('Заказ не найден');
                return responseBody;
            }
            return this.order.update({
                where: {
                    id: Number((_b = obj.body) === null || _b === void 0 ? void 0 : _b.id)
                },
                data: {
                    status: 'completed'
                }
            }).then((result) => __awaiter(this, void 0, void 0, function* () {
                return this.book.findFirst({
                    where: {
                        id: result.bookId
                    }
                }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    if (result.amount === 1) {
                        return this.book.delete({
                            where: {
                                id: result.id
                            }
                        }).then(() => {
                            responseBody.push('success');
                            return responseBody;
                        }).catch((e) => {
                            responseBody.push('fail');
                            responseBody.push(e);
                            return responseBody;
                        });
                    }
                    else {
                        return this.book.update({
                            where: {
                                id: result.id
                            },
                            data: {
                                amount: (result.amount - 1)
                            }
                        }).then(() => {
                            responseBody.push('success');
                            return responseBody;
                        }).catch((e) => {
                            responseBody.push('fail');
                            responseBody.push(e);
                            return responseBody;
                        });
                    }
                })).catch((e) => {
                    responseBody.push('fail');
                    responseBody.push(e);
                    return responseBody;
                });
            })).catch((e) => {
                responseBody.push('fail');
                responseBody.push(e);
                return responseBody;
            });
        });
    }
    reject(obj) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const responseBody = [];
            return this.order.delete({
                where: {
                    id: Number((_a = obj.body) === null || _a === void 0 ? void 0 : _a.id)
                }
            }).then((result) => {
                responseBody.push('success');
                responseBody.push(result);
                return responseBody;
            }).catch((e) => {
                responseBody.push('fail');
                responseBody.push(e);
                return responseBody;
            });
        });
    }
    searchByBooker(obj) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const responseBody = [];
            let pageCount = yield this.order.count({ where: { customer: { startsWith: (0, FirstLetterToUpperCase_1.default)((_a = obj.body) === null || _a === void 0 ? void 0 : _a.name) } } });
            pageCount = Math.ceil(pageCount / 20);
            return this.order.findMany({
                where: {
                    customer: {
                        startsWith: (0, FirstLetterToUpperCase_1.default)((_b = obj.body) === null || _b === void 0 ? void 0 : _b.name)
                    }
                },
                include: {
                    book: true
                },
                skip: (((_c = obj.body) === null || _c === void 0 ? void 0 : _c.page) - 1) * 20,
                take: 20
            }).then((result) => {
                responseBody.push('success');
                responseBody.push(pageCount);
                responseBody.push(result);
                return responseBody;
            }).catch((e) => {
                responseBody.push('fail');
                responseBody.push(e);
            });
        });
    }
}
exports.default = Order;
