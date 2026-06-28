import process from "node:process";

export const serviceConfig = {
    organizations: {
        url: process.env.ORGANIZATION_SERVICE_URL || 'http://localhost:3001',
        timeout: 10000,
    },
    users: {
        url: process.env.USERS_SERVICE_URL || 'http://localhost:3002',
        timeout: 10000,
    },
    products: {
        url: process.env.PRODUCTS_SERVICE_URL || 'http://localhost:3003',
        timeout: 10000,
    },
    checkouts: {
        url: process.env.CHECKOUTS_SERVICE_URL || 'http://localhost:3004',
        timeout: 10000,
    },
    payments: {
        url: process.env.PAYMENTS_SERVICE_URL || 'http://localhost:3005',
        timeout: 10000,
    },
    loggers: {
        url: process.env.LOGGERS_SERVICE_URL || 'http://localhost:3009',
        timeout: 10000,
    },
} as const;