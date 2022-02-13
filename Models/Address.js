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
class Address extends client_1.PrismaClient {
    addNew(obj) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const responseBody = [];
            return this.address.create({
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
    changeRecordById(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            return 0;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseBody = [];
            return this.address.delete({
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
    deleteManyById(field, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return 0;
        });
    }
    findManyById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.address.findMany({
                where: {
                    id: id
                }
            });
        });
    }
    get20(searchRequest, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseBody = [];
            return this.address.findMany({
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
    searchByName(searchRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseBody = [];
            return this.address.findMany({
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
}
exports.default = Address;
