const db = require('../infra/db');

exports.insertProduct = product => {
    let connection = db.openConnection();
    let sql = `INSERT INTO product (name, category_id) VALUES ('${product.name}', '${product.category}');`

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if(err){
                console.log(err);
                reject(err);
            }
            console.log(`Produto ${product.name} inserido com sucesso!`);
            // console.log("Resultado:", results);
            resolve(results);
        });
        db.closeConnection(connection);
    });
}

exports.listProduct= () => {
    let connection = db.openConnection();
    let sql = `SELECT id, name as product_name, (select name from category where category.id = product.category_id) as category_name from product;`

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if(err) reject(err);
            console.log(`Produtos listados com sucesso!`);
            console.log(results);
            resolve(results);
        });
        db.closeConnection(connection);
    });
}

exports.deleteProduct = productId => {
    let connection = db.openConnection();
    let sql = `DELETE FROM product WHERE product.id = ${productId};`
    
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if(err) reject(err);
            console.log(`Produto deletado com sucesso!`);
            resolve(results);
        });
        db.closeConnection(connection);
    });
}


exports.searchProductById = productId => {
    let connection = db.openConnection();
    let sql = `SELECT * FROM product WHERE id = '${productId}'`;

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if(err) reject(err);
            resolve(results);
        })
        db.closeConnection(connection);
    })
}

exports.searchProductByName = productName => {
    let connection = db.openConnection();
    let sql = `SELECT * FROM product WHERE name = '${productName}'`;

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if(err) reject(err);
            resolve(results);
        })
        db.closeConnection(connection);
    })
}