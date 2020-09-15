const categoryModel = require('../models/categoryModel');

class categoryController{
    constructor(){}


    async pesquisaCategoriaById(categoryId){
        const resultado = await categoryModel.searchCategoryById(categoryId);
        return resultado;
    }

    async pesquisaCategoriaByName(categoryName){
        const resultado = await categoryModel.searchCategoryByName(categoryName);
        return resultado;
    }

    async listarCategorias(){
        try{
            const resultado = await categoryModel.listCategory();
            return resultado;
        }catch(error){
            console.error('Erro ao pegar categoria', error);
        }
    }
    
    async cadastraCategoria(category){
        try{
            let categoria = this.pesquisaCategoriaByName(category.name);
            if(categoria){

                const resultado = await categoryModel.insertCategory(category);
                if(resultado.affectedRows > 0){
                    console.log("Categoria cadastrada com sucesso!");
                    return {
                        value: true, 
                        message: "Categoria cadastrada com sucesso!"
                    }
                }else{
                    console.log("Erro ao inserir categoria");
                    return {
                        value: false,
                        message: "Erro ao inserir categoria!"
                    }
                }
            }
        }catch(erro){
            
        }
    }

    async deletaCategoria(categoryId){
        try{
            let categoria = this.pesquisaCategoriaById(categoryId);
            if(categoria){

                const resultado = await categoryModel.deleteCategory(categoryId);
                if(resultado.affectedRows > 0){
                    console.log("Categoria deletada com sucesso!");
                    return {
                        value: true, 
                        message: "Categoria deletada com sucesso!"
                    }
                }else{
                    console.log("Erro ao deletar categoria");
                    return {
                        value: false,
                        message: "Erro ao deletar categoria!"
                    }
                }
            }
        }catch(erro){
            
        }
    }

    async atualizaCategoria(category){
        try{
            let categoria = this.pesquisaCategoriaById(category.id);
            if(categoria){

                const resultado = await categoryModel.updateCategory(category);
                if(resultado.affectedRows > 0){
                    console.log("Categoria atualizada com sucesso!");
                    return {
                        value: true, 
                        message: "Categoria atualizada com sucesso!"
                    }
                }else{
                    console.log("Erro ao atualizar categoria");
                    return {
                        value: false,
                        message: "Erro ao atualizar categoria!"
                    }
                }
            }
        }catch(erro){
            
        }
    }
}
module.exports = new categoryController();