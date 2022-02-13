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
function get20Controller(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        init_1.ModelsArray.get((_a = req.body) === null || _a === void 0 ? void 0 : _a.type).get20((_b = req.body) === null || _b === void 0 ? void 0 : _b.searchRequest, Number((_c = req.body) === null || _c === void 0 ? void 0 : _c.page)).then((result) => {
            res.json(result);
        });
    });
}
exports.default = get20Controller;
