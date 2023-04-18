const express = require('express')
const multer = require('multer')
const crypto = require('crypto')
const app = express()

const PORT = process.env.PORT || 3001

app.use('/image', express.static(__dirname + "/images"))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next()
})

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        let parts = file.originalname.split(".")
        let last = parts[parts.length-1]
        cb(null, `${crypto.randomUUID()}.${last}`)
    }
})
const filter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/"))
        cb(null, true)
    else cb(null, false)
}
const single = multer({storage:storageConfig, fileFilter: filter}).single("image");

app.post('/upload', single, (req, res) => {
    let fd = req.file

    if (!fd) {
        res.send({ type: "error", message: "Must be an image." })
        return
    }

    res.send({ type: "success", file: fd.filename })
})

app.listen(PORT)