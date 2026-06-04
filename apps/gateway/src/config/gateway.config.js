"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceConfig = void 0;
const node_process_1 = __importDefault(require("node:process"));
exports.serviceConfig = {
    users: {
        url: node_process_1.default.env.PRODUCTS_SERVICE_URL || 'http://localhost:3001',
        timeout: 10000,
    },
    products: {
        url: node_process_1.default.env.PRODUCTS_SERVICE_URL || 'http://localhost:3002',
        timeout: 10000,
    },
    checkouts: {
        url: node_process_1.default.env.PRODUCTS_SERVICE_URL || 'http://localhost:3003',
        timeout: 10000,
    },
    payments: {
        url: node_process_1.default.env.PRODUCTS_SERVICE_URL || 'http://localhost:3004',
        timeout: 10000,
    },
};
//# sourceMappingURL=gateway.config.js.map