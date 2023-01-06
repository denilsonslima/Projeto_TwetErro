import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())

const dadosUsuario = []
const tweet = []
app.post("/sign-up", (req, res) => {
    const dados = (req.body)
    dadosUsuario.push(dados)
    res.send("Ok")
})

app.post("/tweets", (req, res) => {
    const dados = dadosUsuario.find(intem => intem.username === req.body.username)
    console.log(dadosUsuario)
    if (dados) {
        tweet.push(req.body)
        res.send("Ok")
        return
    }
    res.send("UNAUTHORIZED")
})

app.get("/tweet", (_, res) => {
    res.send(tweet)
})

const PORT = 5000

app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`));