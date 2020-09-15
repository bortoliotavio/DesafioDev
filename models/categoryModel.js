const db = require('../infra/db');

exports.insertCategory = category => {
    let connection = db.openConnection();
    let sql = `INSERT INTO category (name) VALUES ('${category.name}');`

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if(err){
                console.log(err);
                reject(err);
            }
            console.log(`Categoria ${category.name} inserida com sucesso!`);
            // console.log("Resultado:", results);
            resolve(results);
        });
        db.closeConnection(connection);
    });
}

exports.searchCategoryById = categoryId => {
    let connection = db.openConnection();
    let sql = `SELECT * FROM category WHERE id = '${categoryId}'`;

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if(err) reject(err);
            resolve(results);
        })
        db.closeConnection(connection);
    })
}

exports.searchCategoryByName = categoryName => {
    let connection = db.openConnection();
    let sql = `SELECT * FROM category WHERE name = '${categoryName}'`;

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if(err) reject(err);
            resolve(results);
        })
        db.closeConnection(connection);
    })
}

exports.listCategory = () => {
    let connection = db.openConnection();
    let sql = `SELECT * FROM category;`

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if(err) reject(err);
            console.log(`Categoria listada com sucesso!`);
            resolve(results);
        });
        db.closeConnection(connection);
    });
}

exports.checkProduct = categoryid => {
    let connection = db.openConnection();
    let sql = `select count(*) from product where category = ${categoryid};`

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if(err) reject(err);
            console.log(`Categoria checada com sucesso!`);
            if(results > 0){
                resolve(true);
            }
            else resolve(false);
        });
        db.closeConnection(connection);
    });
}


exports.deleteCategory = categoryId => {
    let connection = db.openConnection();
    let associaCategoria = this.checkProduct(categoryId);
    if(!associaCategoria){ 
        let sql = `DELETE FROM category WHERE id = ${categoryId}`;
        
        console.log(sql)
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, results, fields) => {
                if(err) reject(err);
                console.log(`Categoria deletada com sucesso!`);
                resolve(results);
            });
            db.closeConnection(connection);
        });
    }
    else{
        return false;
    };

}

exports.updateCategory = category => {
    let connection = db.openConnection();
    let sql = `UPDATE category set name = '${category.name}' where id = ${category.id}`;

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if(err){
                console.log(err);
                reject(err);
            }
            console.log(`Categoria ${category.name} inserida com sucesso!`);
            // console.log("Resultado:", results);
            resolve(results);
        });
        db.closeConnection(connection);
    });
}


exports.categoryExists = categoryid => {
    let connection = db.openConnection();
    let sql = `SELECT * FROM category WHERE id = '${categoryid}'`;

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if(err) reject(err);
            resolve(results);
        })
        db.closeConnection(connection);
    })
}
