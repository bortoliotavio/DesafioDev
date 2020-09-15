const productModel = require('../models/productModel');

class productController{
    constructor(){}


    async pesquisaProdutoById(productId){
        const resultado = await productModel.searchProductById(productId);
        return resultado;
    }

    async pesquisaProdutoByName(productName){
        const resultado = await productModel.searchProductByName(productName);
        return resultado;
    }

    async listarProdutos(){
        try{
            const resultado = await productModel.listProduct();
            return resultado;
        }catch(error){
            console.error('Erro ao pegar produto', error);
        }
    }
    
    async cadastraProduto(product){
        try{
            let produto = this.pesquisaProdutoByName(product.name);
            if(produto){
                const resultado = await productModel.insertProduct(product);
                if(resultado.affectedRows > 0){
                    console.log("Produto cadastrado com sucesso!");
                    return {
                        value: true,
                        message: "Produto cadastrado com sucesso!"
                    }
                }else{
                    console.log("Erro ao inserir produto");
                    return {
                        value: false,
                        message: "Erro ao inserir produto!"
                    }
                }
            }
        }catch(erro){
            
        }
    }


    async deletaProduto(productId){
        try{
            let produto = this.pesquisaProdutoById(productId);
            if(produto){
                const resultado = await productModel.deleteProduct(productId);
                if(resultado.affectedRows > 0){
                    console.log("Produto deletado com sucesso!");
                    return {
                        value: true, 
                        message: "Produto deletado com sucesso!"
                    }
                }else{
                    console.log("Erro ao deletar produto");
                    return {
                        value: false,
                        message: "Erro ao deletar produto!"
                    }
                }
            }
        }catch(erro){
            
        }
    }
}

module.exports = new productController();