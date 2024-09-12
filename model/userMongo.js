const mongodb = require('mongodb');
const ClienteMongo = mongodb.MongoClient;
let cliente;


const conexao_bd = async () => {
    if (!cliente)
        cliente = await ClienteMongo.connect('mongodb://127.0.0.1:27017');
}

const bd = () => {
    return cliente.db('usuario');
}

class UserMongo {
    async close() {
        if (cliente)
            cliente.close();
        cliente = undefined;
    }

    async cadUsu(nome, avatar) {
        await conexao_bd();
        const colecao = bd().collection("usuario");
        await colecao.insertOne({ nome, avatar });
    }

    async alteraUsu(id, nome, avatar) {
        await conexao_bd();
        const colecao = bd().collection("usuario");
        await colecao.updateOne({ _id: new mongodb.ObjectId(id) }, { $set: {nome, avatar }});
    }

    async consultaUsu(id) {
        await conexao_bd();
        const colecao = bd().collection("usuario");
        const usuario = await colecao.findOne({ _id: new mongodb.ObjectId(id) });
        return usuario
    }

    async listaU() {
        await conexao_bd();
        const colecao = bd().collection("usuario");
        const usuario = await colecao.find({}).toArray();
        return usuario;
    }
}

module.exports = new UserMongo();