var fs = require('fs');

 const login = ({nome}) => {
    var users_array = require("../dados/users.json");
    var users = users_array.users

    var obj = {
        users: []
     };

     if(users.includes(nome)){
        return {nome};
    }else{
        const data = fs.readFileSync('./dados/users.json', 'utf8');
            
        obj = JSON.parse(data);
        obj.users.push(nome);
        json = JSON.stringify(obj);
        
        fs.writeFileSync('./dados/users.json', json, 'utf8')
        return {nome};
            // write it back 
        
    }
 }

 module.exports = {login}