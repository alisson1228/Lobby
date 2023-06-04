const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const {v4: uuidv4} = require('uuid')
const crypto = require('crypto')

const app = express()
const server = http.createServer(app)
const sockets = socketIO(server)

const port = 3000


app.use(express.static('chat'))

//
const pessoas = {}
const conversas = {}
//

//login
app.get('/', (req, res) => {
    res.redirect('/login')
})
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/chat/index.html')
})


app.use(express.json())

app.post('/login', (req, res) => {
    const er = /assent\/avatar\/avatar[1-4].png/
    req.body.avatar = req.body.avatar.match(er)[0]
    req.body.id = uuidv4()
    pessoas[req.body.id] = req.body

    res.redirect('/chat?id=' + req.body.id)
})

function verificacao(req,res,next) {
    const url = req.url
    const regex = /[?&]id=([^&#]*)/i
    const match = regex.exec(url)
    const id = match && match[1]

    if (pessoas[id])
        next()
    else 
        res.redirect('/login')
}

//

app.get('/chat',verificacao, (req, res) => {
    res.sendFile(__dirname + '/chat/chat.html')
})


sockets.on('connection', (socket) => {
    //console.log(socket.id)

    socket.on('identificacao', (id) => {
        if (pessoas[id])
            pessoas[id].socketID = socket.id
        console.log(pessoas)
        
        sockets.emit('pessoas conectadas', pessoas)
    })

    function gerarIDconversa({remetente:{ id:id1 }, destinatario:{ id:id2 }}) {
        const sortID = [id1 , id2].sort()
        const concatenacao = sortID.join()
        const hashID = crypto.createHash('md5').update(concatenacao).digest('hex')
        return hashID
    }

    socket.on('selecionar conversa', (data) => {
        if (!conversas[gerarIDconversa(data)]) {
            const {remetente:pessoa1, destinatario:pessoa2} = data
            conversas[gerarIDconversa(data)] = {entre:[pessoa1 , pessoa2], mensagens:[]}
        }
        
        socket.emit('historico de conversa', {
            mensagens: conversas[gerarIDconversa(data)].mensagens,
            hash: gerarIDconversa(data),
            destinatario: data.destinatario.id
        })
    })

    socket.on('enviar mensagem', ({mensagem, hash, remetente, nome}) => {
        const destinatario = conversas[hash].entre[0].id == remetente? conversas[hash].entre[1].id : conversas[hash].entre[0].id
        
        conversas[hash].mensagens.push({
            remetente: remetente,
            nome: nome,
            mensagem: mensagem
        })

        socket.emit('historico de conversa', {
            mensagens: conversas[hash].mensagens,
            hash: hash,
            destinatario: destinatario
        })

        socket.to(destinatario).emit('historico de conversa', {
            mensagens: conversas[hash].mensagens,
            hash: hash,
            destinatario: remetente
        })
    })

    socket.on('disconnect', () => {
        for (let i in pessoas) {
            if (pessoas[i].socketID === socket.id) {
                delete pessoas[i]
                sockets.emit('pessoas conectadas', pessoas)
            }
        }
        
        for (let i in conversas) {
            if (conversas[i].entre[0].socketID == socket.id ||
                conversas[i].entre[1].socketID == socket.id)
                delete conversas[i] 
        }
    })
})


server.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}`)
})