/* globals __dirname, module */
const path = require('path')


module.exports = {
    webpack: config => {
        config.resolve.alias = {
            ...config.resolve.alias,
            'components': path.join(__dirname, 'src', 'components'),
            'layouts': path.join(__dirname, 'src', 'layouts'),
            'utils': path.join(__dirname, 'src', 'utils'),
        }
        return config
    },
    env: {
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
        API_ENDPOINT: process.env.API_ENDPOINT
    }
}