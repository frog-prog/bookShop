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
class Book extends client_1.PrismaClient {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseBody = [];
            return this.book.findMany({
                where: {
                    id: id
                },
                include: {
                    author: true,
                    address: true,
                    pubHouse: true,
                    genres: { include: { genre: true } }
                }
            }).then((result) => {
                responseBody.push('success');
                responseBody.push(result);
                return responseBody;
            });
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseBody = [];
            let orderCount = yield this.order.count({
                where: {
                    bookId: id,
                    status: 'booked'
                }
            }).catch((e) => {
                responseBody.push('fail');
                responseBody.push(e);
                return responseBody;
            });
            let bookCount = yield this.book.findMany({
                where: {
                    id: id
                }
            }).catch((e) => {
                responseBody.push('fail');
                responseBody.push(e);
                return responseBody;
            });
            if (bookCount.length === 0) {
                responseBody.push('fail');
                responseBody.push('Книга не найдена');
                return responseBody;
            }
            if (bookCount[0].amount > orderCount) {
                if (bookCount[0].amount === 1) {
                    return this.genresOnBooks.deleteMany({
                        where: {
                            bookId: id
                        }
                    }).then((result) => __awaiter(this, void 0, void 0, function* () {
                        return this.order.deleteMany({
                            where: {
                                bookId: id
                            }
                        }).then((result) => __awaiter(this, void 0, void 0, function* () {
                            return this.book.delete({
                                where: {
                                    id: id
                                }
                            }).then((result) => {
                                responseBody.push('success');
                                responseBody.push(result);
                                responseBody.push('deleted');
                                return responseBody;
                            }).catch((e) => {
                                responseBody.push('fail');
                                responseBody.push(e);
                                return responseBody;
                            });
                        })).catch((e) => {
                            responseBody.push('fail');
                            responseBody.push(e);
                            return responseBody;
                        });
                    }));
                }
                else {
                    return this.book.update({
                        where: {
                            id: id
                        },
                        data: {
                            amount: (bookCount[0].amount - 1)
                        }
                    }).then((result) => {
                        responseBody.push('success');
                        responseBody.push(result);
                        responseBody.push('updated');
                        return responseBody;
                    }).catch((e) => {
                        responseBody.push('fail');
                        responseBody.push(e);
                        return responseBody;
                    });
                }
            }
            else {
                responseBody.push('fail');
                responseBody.push('Книга зарезервирована');
                return responseBody;
            }
        });
    }
    searchByName(searchRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseBody = [];
            return this.book.findMany({
                where: {
                    name: {
                        startsWith: searchRequest
                    }
                },
                select: {
                    name: true,
                    id: true
                },
                take: 15
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
    getBookBy(field, value, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseBody = [];
            let obj1 = 0;
            let obj2 = 0;
            let pageCount = 1;
            switch (field) {
                case "id":
                    obj1 = { where: { id: Number(value) }, include: { author: true, address: true, pubHouse: true, genres: { include: { genre: true } } } };
                    break;
                case "genre":
                    obj1 = { where: { genres: { some: { genre: { id: Number(value) }, }, }, }, take: 20, skip: (page - 1) * 20, include: { author: true, address: true, pubHouse: true, genres: { include: { genre: true } } } };
                    obj2 = { where: { genres: { some: { genre: { id: Number(value) }, }, }, } };
                    break;
                case "author":
                    obj1 = { where: { authorId: Number(value) }, take: 20, skip: (page - 1) * 20, include: { author: true, address: true, pubHouse: true, genres: { include: { genre: true } } } };
                    obj2 = { where: { authorId: Number(value) } };
                    break;
                case "address":
                    obj1 = { where: { addressId: Number(value), }, take: 20, skip: (page - 1) * 20, include: { author: true, address: true, pubHouse: true, genres: { include: { genre: true } } } };
                    obj2 = { where: { addressId: Number(value), } };
                    break;
                case "pubHouse":
                    obj1 = { where: { pubHouseId: Number(value) }, take: 20, skip: (page - 1) * 20, include: { author: true, address: true, pubHouse: true, genres: { include: { genre: true } } } };
                    obj2 = { where: { pubHouseId: Number(value) } };
                    break;
                case 'name':
                    console.log(value, typeof value);
                    if (typeof value === 'string') {
                        console.log(value, value.trim());
                        obj1 = { where: { name: { contains: value.trim(), mode: 'insensitive' } }, skip: (page - 1) * 20, take: 20, include: { author: true, address: true, pubHouse: true, genres: { include: { genre: true } } } };
                        obj2 = { where: { name: { contains: value.trim(), mode: 'insensitive' } } };
                    }
            }
            if (field !== 'id') {
                pageCount = yield this.book.count(obj2);
                pageCount = Math.ceil(pageCount / 20);
            }
            if (obj1 !== 0) {
                return this.book.findMany(obj1).then((result) => {
                    for (let i = 0; i < result.length; i++) {
                        result[i].endAt = result[i].endAt - Math.floor(Date.now() / 1000 / 3600 / 24);
                    }
                    responseBody.push('success');
                    responseBody.push(pageCount);
                    responseBody.push(result);
                    return responseBody;
                }).catch((e) => {
                    responseBody.push('fail');
                    responseBody.push(e);
                    return responseBody;
                });
            }
            else {
                responseBody.push('fail');
                responseBody.push('запрос не определен');
                return responseBody;
            }
        });
    }
    get20(searchRequest, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseBody = [];
            return this.book.findMany({
                where: {
                    name: {
                        contains: searchRequest.trim(),
                        mode: 'insensitive'
                    }
                },
                skip: (page - 1) * 20,
                take: 20,
                include: {
                    author: true,
                    address: true,
                    pubHouse: true,
                    genres: { include: { genre: true } }
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
    addNew(obj) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function* () {
            const responseBody = [];
            return this.book.create({
                data: {
                    endAt: (_a = obj.body) === null || _a === void 0 ? void 0 : _a.endAt,
                    name: (0, FirstLetterToUpperCase_1.default)((_b = obj.body) === null || _b === void 0 ? void 0 : _b.name),
                    genres: {
                        create: (_c = obj.body) === null || _c === void 0 ? void 0 : _c.genres.map(genre => ({
                            genre: {
                                connect: {
                                    id: genre
                                }
                            }
                        }))
                    },
                    amount: (_d = obj.body) === null || _d === void 0 ? void 0 : _d.amount,
                    price: (_e = obj.body) === null || _e === void 0 ? void 0 : _e.price,
                    authorId: (_f = obj.body) === null || _f === void 0 ? void 0 : _f.authorId,
                    addressId: (_g = obj.body) === null || _g === void 0 ? void 0 : _g.addressId,
                    pubHouseId: (_h = obj.body) === null || _h === void 0 ? void 0 : _h.pubHouse,
                    pubYear: (_j = obj.body) === null || _j === void 0 ? void 0 : _j.pubYear
                },
                include: {
                    author: true,
                    address: true,
                    pubHouse: true,
                    genres: { include: { genre: true } }
                }
            }).then((result) => {
                result.endAt = result.endAt - Math.floor(Date.now() / 1000 / 3600 / 24);
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
    changeRecordById(obj) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const responseBody = [];
            return this.genresOnBooks.deleteMany({
                where: {
                    bookId: (_a = obj.body) === null || _a === void 0 ? void 0 : _a.id
                }
            }).then(() => __awaiter(this, void 0, void 0, function* () {
                var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                return this.book.update({
                    where: {
                        id: (_b = obj.body) === null || _b === void 0 ? void 0 : _b.id
                    },
                    data: {
                        endAt: (_c = obj.body) === null || _c === void 0 ? void 0 : _c.endAt,
                        name: (0, FirstLetterToUpperCase_1.default)((_d = obj.body) === null || _d === void 0 ? void 0 : _d.name),
                        genres: {
                            create: (_e = obj.body) === null || _e === void 0 ? void 0 : _e.genres.map(genre => ({
                                genre: {
                                    connect: {
                                        id: genre
                                    }
                                }
                            }))
                        },
                        amount: (_f = obj.body) === null || _f === void 0 ? void 0 : _f.amount,
                        price: (_g = obj.body) === null || _g === void 0 ? void 0 : _g.price,
                        authorId: (_h = obj.body) === null || _h === void 0 ? void 0 : _h.authorId,
                        addressId: (_j = obj.body) === null || _j === void 0 ? void 0 : _j.addressId,
                        pubHouseId: (_k = obj.body) === null || _k === void 0 ? void 0 : _k.pubHouse,
                        pubYear: (_l = obj.body) === null || _l === void 0 ? void 0 : _l.pubYear
                    }
                }).then((result) => {
                    result.endAt = result.endAt - Math.floor(Date.now() / 1000 / 3600 / 24);
                    responseBody.push('success');
                    responseBody.push(result);
                    return responseBody;
                }).catch((e) => {
                    responseBody.push('fail');
                    responseBody.push(e);
                    return responseBody;
                });
            }));
        });
    }
    deleteManyById(field, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return 0;
        });
    }
}
exports.default = Book;
