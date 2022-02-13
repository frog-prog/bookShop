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
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("../init");
function getBookByController(req, res) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __awaiter(this, void 0, void 0, function* () {
        if (((_a = req.body) === null || _a === void 0 ? void 0 : _a.type) === 'id' || ((_b = req.body) === null || _b === void 0 ? void 0 : _b.type) !== 'name') {
            if ('type' in req.body && 'id' in req.body && 'page' in req.body) {
                if (typeof req.body.type === "string" && typeof req.body.id === "number" && typeof req.body.page === "number") {
                    init_1.ModelsArray.get('book').getBookBy((_c = req.body) === null || _c === void 0 ? void 0 : _c.type, Number((_d = req.body) === null || _d === void 0 ? void 0 : _d.id), Number((_e = req.body) === null || _e === void 0 ? void 0 : _e.page)).then((result) => {
                        res.json(result);
                    });
                }
                else {
                    res.json(['fail', 'Запрос неверен']);
                }
            }
            else {
                res.json(['fail', 'Запрос неверен']);
            }
        }
        else {
            if ('type' in req.body && 'name' in req.body && 'page' in req.body) {
                if (typeof req.body.type === "string" && typeof req.body.name === "string" && typeof req.body.page === "number") {
                    init_1.ModelsArray.get('book').getBookBy((_f = req.body) === null || _f === void 0 ? void 0 : _f.type, (_g = req.body) === null || _g === void 0 ? void 0 : _g.name, Number((_h = req.body) === null || _h === void 0 ? void 0 : _h.page)).then((result) => {
                        res.json(result);
                    });
                }
                else {
                    res.json(['fail', 'Запрос неверен']);
                }
            }
            else {
                res.json(['fail', 'Запрос неверен']);
            }
        }
    });
}
exports.default = getBookByController;
