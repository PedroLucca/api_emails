const http = require('http');
const api = require('./apiController');

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

        if(req.url === '/login' && req.method === 'POST') {
            api.Login(req, res);
        }else if(req.url === '/send' && req.method === 'POST') {
            console.log(req.body);
            api.SendMessage(req, res);
        }else if(req.url === '/recebidas' && req.method === 'POST') {
            api.getReceived(req, res);
        }else if(req.url === '/enviadas' && req.method === 'POST') {
            api.getSended(req, res);
        }else if(req.url === '/apagar' && req.method === 'DELETE') {
            api.Delete(req, res);
        }else if(req.url === '/encaminhar' && req.method === 'POST') {
            api.Encaminhar(req, res);
        }else if(req.url === '/mensagem' && req.method === 'POST') {
            api.getMessage(req, res);
        }else{
            error = {
                message: 'Pagina nao encontrada'
            }
            res.writeHead(201, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(error));
        }
})

server.listen(3080, () => {
    console.log('Servidor rodando!');
})