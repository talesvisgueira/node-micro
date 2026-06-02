"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const Logger = (message) => {
    console.log(`${'Logger - ' + new Date().toISOString() + ': ' + message}`);
};
exports.Logger = Logger;
exports.default = exports.Logger;
