const db = require('../infra/db');

exports.insertUser = user => {
    let connection = db.openConnection();
    let sql = `INSERT INTO User (name, email, password) VALUES ('${user.name}', '${user.email}', '${user.password}');`

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if(err){
                console.log(err);
                reject(err);
            }
            console.log(`User ${user.name} inserido com sucesso!`);
            // console.log("Resultado:", results);
            resolve(results);
        });
        db.closeConnection(connection);
    });
}

exports.listUsers = () => {
    let connection = db.openConnection();
    let sql = `SELECT * FROM User;`

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if(err) reject(err);
            console.log(`Users listados com sucesso!`);
            resolve(results);
        });
        db.closeConnection(connection);
    });
}

exports.deleteUser = userId => {
    let connection = db.openConnection();
    let sql = `DELETE FROM User WHERE User.id = ${userId};`

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if(err) reject(err);
            console.log(`User deletado inserido com sucesso!`);
            resolve(results);
        });
        db.closeConnection(connection);
    });
}

exports.userExists = user => {
    let connection = db.openConnection();
    let sql = `SELECT * FROM User WHERE email = '${user.email}' AND password = '${user.password}';`;

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if(err) reject(err);
            resolve(results);
        });
        db.closeConnection(connection);
    });
}

exports.emailExists = email => {
    let connection = db.openConnection();
    let sql = `SELECT * FROM User WHERE email = '${email}'`;

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if(err) reject(err);
            resolve(results);
        })
        db.closeConnection(connection);
    })
}
