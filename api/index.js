const http = require('http') // Importado para iniciar servidor
const URL = require('url') 
const data = require('./urls.json') // JSON importado 
const fs = require('fs')// arquivos
const path = require('path')


//Cria um novo server na porta 3000, e que ao inicializar, executa a função que está como segundo parâmetro de "listen()"
http.createServer((req, res) => {
    //extraí as queryStrings da url
    const { name, url, del } = URL.parse(req.url, true).query

    //permite o acesso da api para qualquer um que quiser acessar
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    })

    //se não tiver os parametros nas queryStrings
    if(!name || !url)
        //ele mostra os dados
        return res.end(JSON.stringify(data))

    //se tiver del na queryString
    if(del){
        //retorna delete
        data.urls = data.urls.filter(item => String(item.url) !== String(url))
        //writeFile(caminho, dados, callback)
        return fs.writeFile(
            path.join(__dirname, 'urls.json'),
            JSON.stringify(data,null,2),
            err => {
                if(err) throw err

                res.end(JSON.stringify(data))
            }
        )
        
    }
    //se tiver os parametros nas queryStrings, mas não o del, retorna create
    data.urls.push({ name, url })

    fs.writeFile(
        path.join(__dirname, 'urls.json'),
        JSON.stringify(data,null,2),
        err => {
            if(err) throw err
        }
    )
    return res.end(JSON.stringify(data))
    
}).listen(3000, () => console.log('Api is running!'))