import express from 'express';
import cors from 'cors';
import e from 'express';

const app = express();
app.use(express.json());
app.use(cors())

const dadosUsuario = []
const tweet = []

app.post("/sign-up", (req, res) => {
    dadosUsuario.push(req.body)
    res.send("Ok")
})

app.post("/tweets", (req, res) => {
    const dados = dadosUsuario.find(intem => intem.username === req.body.username)
    if (dados) {
        let a = {...req.body, avatar: dadosUsuario[0].avatar}
        tweet.push(a)
        res.send("Ok")
        return
    }
    res.send("UNAUTHORIZED")
})

app.get("/tweets", (_, res) => {
    const dados = tweet.slice(-10)
    res.send(dados)
})

const PORT = 5000

app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`));