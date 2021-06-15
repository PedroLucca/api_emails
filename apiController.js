const Mensagens = require('./models/messageModel');
const Users = require('./models/userModel');


async function Login(req, res) {
    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async() => {
            const {nome} = JSON.parse(body);

            user = {
                nome
            }
            const login = await Users.login(user);
            res.writeHead(201, {'Content-Type': 'application/json'})
            console.log(login)
            return res.end(JSON.stringify(login));
        })
    }catch(error){
        console.log(error)
    }
}

async function SendMessage(req, res) {
    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async() => {
            const {remetente, destinatario, assunto, conteudo} = JSON.parse(body);
            console.log(destinatario);
            delete require.cache[require.resolve('./dados/messages.json')];
            var messages_array = require('./dados/messages.json');

            var messages = messages_array.messages
            message = {
                id: messages.length+10,
                remetente,
                destinatario,
                assunto,
                conteudo,
                encaminhado: false
            }
            const sended = await Mensagens.send(message);
            res.writeHead(201, {'Content-Type': 'application/json'})
            console.log(sended)
            return res.end(JSON.stringify(sended));
        })
    }catch(error){
        console.log(error)
    }
}
async function getReceived(req, res) {
    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async() => {
            const {usuario} = JSON.parse(body);
            const received = await Mensagens.getRecebidas(usuario);
            res.writeHead(201, {'Content-Type': 'application/json'})
            console.log(received)
            return res.end(JSON.stringify(received));
        })
    }catch(error){
        console.log(error)
    }
}
async function getSended(req, res) {
    const Mensagens = require('./models/messageModel');
    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async() => {
            const {usuario} = JSON.parse(body);
            const sended = await Mensagens.getEnviadas(usuario);
            res.writeHead(201, {'Content-Type': 'application/json'})
            console.log(sended)
            return res.end(JSON.stringify(sended));
        })
    }catch(error){
        console.log(error)
    }
}
async function Delete(req, res) {
    const Mensagens = require('./models/messageModel');
    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async() => {
            const {id} = JSON.parse(body);
            const deleted = await Mensagens.apagar(id);
            res.writeHead(201, {'Content-Type': 'application/json'})
            console.log(deleted)
            return res.end(JSON.stringify(deleted));
        })
    }catch(error){
        console.log(error)
    }
}
async function Encaminhar(req, res) {
    const Mensagens = require('./models/messageModel');
    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async() => {
            const {id, remetente, destinatario} = JSON.parse(body);
            message = {id, 
                remetente, 
                destinatario, 
                encaminhado: true
            }
            const encaminhada = await Mensagens.encaminhar(message);
            res.writeHead(201, {'Content-Type': 'application/json'})
            console.log(encaminhada)
            return res.end(JSON.stringify(encaminhada));
        })
    }catch(error){
        console.log(error)
    }
}
async function getMessage(req, res) {
    const Mensagens = require('./models/messageModel');
    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async() => {
            const {id} = JSON.parse(body);
            const message = await Mensagens.getMensagem(id);
            res.writeHead(201, {'Content-Type': 'application/json'})
            console.log(message)
            return res.end(JSON.stringify(message));
        })
    }catch(error){
        console.log(error)
    }
}

module.exports = {Login, SendMessage, getReceived, getSended, Delete, Encaminhar, getMessage}