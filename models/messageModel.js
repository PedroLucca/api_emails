var fs = require('fs');

 const send = ({id, remetente, destinatario, assunto, conteudo, encaminhado}) => {
    delete require.cache[require.resolve("../dados/users.json")];
    var users_array = require("../dados/users.json");
    var users = users_array.users
    
    var obj = {
        messages: []
     };

     if(users.includes(remetente) && users.includes(destinatario)){
        
        const data = fs.readFileSync('./dados/messages.json', 'utf8');
            
            obj = JSON.parse(data);
            
            obj.messages.push({id, remetente, destinatario, assunto, conteudo, encaminhado});
            json = JSON.stringify(obj);
            
            fs.writeFileSync('./dados/messages.json', json, 'utf8');
            return {id, remetente, destinatario, assunto, conteudo, encaminhado};
            

     }else{
        return {message: 'Destinatario nao existe!'};
     }
}

const getEnviadas = (usuario) => {
    var obj = {
        messages: []
     };
     delete require.cache[require.resolve('../dados/messages.json')];
     var messages_array = require('../dados/messages.json');
    var messages = messages_array.messages
    for(i=0; i < messages.length; i++){
        if(messages[i].remetente == usuario){
            
            obj.messages.push(messages[i])
        }
    }
    //console.log(obj)
    return obj
}

const getRecebidas = (usuario) => {
    var obj = {
        messages: []
     };
    console.log(usuario);
    delete require.cache[require.resolve('../dados/messages.json')];
    var messages_array = require('../dados/messages.json');
    var messages = messages_array.messages
    for(i=0; i < messages.length; i++){
        if(messages[i].destinatario == usuario){
            obj.messages.push(messages[i])
        }
    }
    return obj
}

const apagar = (id) => {
    var obj = {
        messages: []
     };

    const data = fs.readFileSync('./dados/messages.json', 'utf8');
        
    obj = JSON.parse(data);
    delete require.cache[require.resolve('../dados/messages.json')];
    var messages_array = require('../dados/messages.json');
    var messages = messages_array.messages;
    for(i=0; i < obj.messages.length; i++){
        if(messages[i].id == id){
            obj.messages.splice(i, 1);
        }
    }
    json = JSON.stringify(obj);
    
    fs.writeFileSync('./dados/messages.json', json, 'utf8')
    return {message: 'Mensagem apagada!'};
}

const encaminhar = ({id, remetente, destinatario, encaminhado}) => {
    var obj = {
        messages: []
     };

    const data = fs.readFileSync('./dados/messages.json', 'utf8');
    delete require.cache[require.resolve('../dados/messages.json')];
    var messages_array = require('../dados/messages.json');
    var messages = messages_array.messages;
    obj = JSON.parse(data);
    for(i=0; i < obj.messages.length; i++){
        if(messages[i].id == id){
            var assunto = messages[i].assunto;
            var conteudo = messages[i].conteudo;
        }
    }
    id = obj.messages.length+10;
    obj.messages.push({id, remetente, destinatario, assunto, conteudo, encaminhado});
    json = JSON.stringify(obj);
    
    fs.writeFileSync('./dados/messages.json', json, 'utf8');
    return {id, remetente, destinatario, assunto, conteudo, encaminhado};
    
}

const getMensagem = (id) => {

    const data = fs.readFileSync('./dados/messages.json', 'utf8');
    delete require.cache[require.resolve('../dados/messages.json')];
    var messages_array = require('../dados/messages.json');
    var messages = messages_array.messages;
    obj = JSON.parse(data);
    for(i=0; i < obj.messages.length; i++){
        if(messages[i].id == id){
            var remetente = messages[i].remetente;
            var destinatario = messages[i].destinatario;
            var assunto = messages[i].assunto;
            var conteudo = messages[i].conteudo;
            var encaminhado = messages[i].encaminhado;
        }
    }
    //id = obj.messages.length;
    //obj.messages.push({id, remetente, destinatario, assunto, conteudo, encaminhado});
    //json = JSON.stringify(obj);
    
    //fs.writeFileSync('./dados/messages.json', json, 'utf8');
    return {id, remetente, destinatario, assunto, conteudo, encaminhado};
    
}

module.exports = {send, getEnviadas, getRecebidas, apagar, encaminhar, getMensagem}
