const mysql = require('mysql');

const connConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "consys",
    database: "devteste"
}


exports.openConnection = () => {
    let connection = mysql.createConnection(connConfig);
    connection.connect(err => {
        if (err) return console.log(err);
        console.log('Conexão estabelecida com sucesso!');
    });
    return connection;
}

exports.closeConnection = connection => {
    connection.end(err => {
        if (err) return console.log(err);
        console.log("Conexão encerrada com sucesso!");
    });
}
