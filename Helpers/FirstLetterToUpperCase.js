"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firstLetterToUpperCase = (value) => {
    if (value !== '') {
        value = value.replace(/\s+/g, ' ').trim();
        value = value[0].toUpperCase() + value.slice(1);
        return value;
    }
    else {
        return '';
    }
};
exports.default = firstLetterToUpperCase;
