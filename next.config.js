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
    }
}