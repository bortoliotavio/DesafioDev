const userModel = require('../models/userModel');

class userController{
    constructor(){}


    async logarUsuario(user){
        const resultado = await userModel.userExists(user);
        return resultado;
    }

    async listarUsuarios(){
        try{
            const resultado = await userModel.listUsers();
            return resultado;
        }catch(error){
            console.error('Erro ao pegar usuários', error);
        }
    }
    
    async registrarUsuario(user){
        try{
            const resultado = await userModel.insertUser(user);
            if(resultado.affectedRows > 0){
                console.log("Usuário inserido com sucesso!");
                return {
                    value: true,
                    message: "Usuário inserido com sucesso!"
                }
            }else{
                console.log("Erro ao inserir usuário");
                return {
                    value: false,
                    message: "Erro ao inserir usuário!"
                }
            }
        }catch(erro){
            
        }
    }
}

module.exports = new userController();