const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.UPLOAD_FOLDER)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 500000 },
    fileFitler: (req, file, cb) => {
        if (file.mimetype.includes('image')) {
            return cb(null, true)
        }
        cb(new Error('Only images are allowed'))
    } });

module.exports = upload;