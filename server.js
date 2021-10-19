const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {
    
    const file = req.url === '/' ? 'index.html' : req.url
    const filePath = path.join(__dirname, 'public', file)
    const extname = path.extname(filePath)
    console.log(req.url)
    const allowedFileTypes = ['.html','.css','.js']
    const allowed = allowedFileTypes.find((item) => {return item == extname})
    
    if(!allowed) return

    fs.readFile(filePath, (err, content) => {
        if(err){
            throw err
        } else {
            res.end(content)
        }
    })
    
}).listen(5000, () => console.log('Server is running!'))