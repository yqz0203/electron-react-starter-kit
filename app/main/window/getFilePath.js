const path = require('path')

module.exports = (file) => {
    if (process.env.NODE_ENV === 'development') {
        return path.join(__renderer_path, file)
    } else {
        return path.join(`file://${path.join(__renderer_path, file)}`)
    }
}