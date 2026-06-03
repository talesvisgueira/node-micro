import process from "node:process";

export const serviceConfig = {
    users: {
        url: process.env.PRODUCTS_SERVICE_URL || 'http://localhost:3001',
        timeout: 10000,
    },
    products: {
        url: process.env.PRODUCTS_SERVICE_URL || 'http://localhost:3002',
        timeout: 10000,
    },
    checkouts: {
        url: process.env.PRODUCTS_SERVICE_URL || 'http://localhost:3003',
        timeout: 10000,
    },
    payments: {
        url: process.env.PRODUCTS_SERVICE_URL || 'http://localhost:3004',
        timeout: 10000,
    },
} as const;