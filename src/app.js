import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())

const dadosUsuario = []
const tweet = []

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body
    if (!username || !avatar) {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }
    dadosUsuario.push(req.body)
    res.sendStatus(201)
})

app.post("/tweets", (req, res) => {
    const dados = dadosUsuario.find(intem => intem.username === req.headers.user)
    const user = req.headers.user
    const sms = req.body.tweet
    if(!sms){
        return res.status(400).send("Todos os campos são obrigatórios!")
    }
    if (dados) {
        let a = { tweet: sms, username: user, avatar: dados.avatar }
        tweet.push(a)
        res.sendStatus(201)
        return
    }
    res.status(401).send("UNAUTHORIZED")
})

app.get("/tweets", (req, res) => {
    const user = req.query.username
    if (user) {
        const dados = tweet.filter(item => item.username === user)
        return res.send(dados)
    }
    res.send(tweet.slice(-10))
})

const PORT = 5000

app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`));