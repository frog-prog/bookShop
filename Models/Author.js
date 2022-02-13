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
class Author extends client_1.PrismaClient {
    findManyById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.author.findMany({
                where: {
                    id: id
                }
            });
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseBody = [];
            return this.author.delete({
                where: {
                    id: id
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
    searchByName(searchRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseBody = [];
            return this.author.findMany({
                where: {
                    name: {
                        startsWith: searchRequest
                    }
                },
                select: {
                    name: true,
                    id: true
                },
                // include:{genres:{include: {genre: true}},
                //     address:true,
                //     author:true
                // },
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
    addNew(obj) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const responseBody = [];
            return this.author.create({
                data: {
                    name: (0, FirstLetterToUpperCase_1.default)((_a = obj.body) === null || _a === void 0 ? void 0 : _a.name)
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
    get20(searchRequest, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseBody = [];
            return this.author.findMany({
                skip: (page - 1) * 20,
                take: 20
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
            return 0;
        });
    }
    changeRecordById(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            return 0;
        });
    }
    deleteManyById(field, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return 0;
        });
    }
}
exports.default = Author;
