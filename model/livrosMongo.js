const mongodb = require('mongodb');
const ClienteMongo = mongodb.MongoClient;
let cliente;

const conexao_bd = async () => {
    if (!cliente)
        cliente = await ClienteMongo.connect('mongodb://127.0.0.1:27017');
}

const bd = () => {
    return cliente.db('livros');
}

class LivroMongo {
    async close() {
        if (cliente)
            cliente.close();
        cliente = undefined;
    }

    async cadLivro(titulo, data, genero, texto, autor, editora, progresso = 0) {
        await conexao_bd();
        const colecao = bd().collection("livros");
        await colecao.insertOne({ titulo, data, genero, texto, autor, editora, progresso });
    }

    async atualizarProgresso(id, percentual, comentario) {
        await conexao_bd();
        const colecao = bd().collection("livros");
        const livro = await colecao.findOne({ _id: new mongodb.ObjectId(id) });

        if (!livro) {
            throw new Error('Livro não encontrado');
        }

        if (percentual < livro.progresso) {
            throw new Error('O percentual não pode ser menor do que o progresso atual');
        }

        if (percentual > 100) {
            throw new Error('O progresso não pode exceder 100%');
        }

        try {
            const resultado = await colecao.updateOne(
                { _id: new mongodb.ObjectId(id) },
                {
                    $set: { progresso: percentual }, 
                    $push: {
                        progressoHistorico: { 
                            percentual,
                            comentario,
                            data: new Date()
                        }
                    }
                }
            );

            return resultado;
        } catch (erro) {
            console.error('Erro ao adicionar progresso:', erro);
            throw erro;
        }
    }

    async consulta(id) {
        await conexao_bd()
        const colecao = bd().collection("livros")
        const livro = await colecao.findOne({ _id: new mongodb.ObjectId(id) })
        return livro
    }

    async deleta(id) {
        await conexao_bd()
        const colecao = bd().collection("livros")
        const doc = await colecao.findOne({
            _id: new mongodb.ObjectId(id)
        })
        if (!doc) {
            throw new Error(`Este livro não exite`)
        } else {
            await colecao.findOneAndDelete({ _id: new mongodb.ObjectId(id) })
        }
    }

    async lista() {
        await conexao_bd();
        const colecao = bd().collection("livros");
        const livros = await colecao.find({}).toArray();
        return livros;
    }

    async criarResenha(id, titulo_resenha, resenha, estrela, ) {
        await conexao_bd();
        const colecao = bd().collection("livros");
        const livro = await colecao.updateOne(
            { _id: new mongodb.ObjectId(id) },
            {
                $set: { progresso: 100 }, 
                $push: {
                    resenha: { 
                        titulo_resenha,
                        resenha,
                        estrela,
                        dataFim: new Date()
                    }
                }
            }
        );
    }
}

module.exports = new LivroMongo();
