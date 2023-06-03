const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const {v4: uuidv4} = require('uuid')

const app = express()
const server = http.createServer(app)
const sockets = socketIO(server)

const port = 3000


app.use(express.static('chat'))

//
const pessoas = {}
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
    console.log(socket.id)


    socket.on('identificacao', (id) => {
        if (pessoas[id])
            pessoas[id].socketID = socket.id
        console.log(pessoas)
        
        sockets.emit('pessoas conectadas', pessoas)
    })

    socket.on('disconnect', () => {
        for (let i in pessoas) {
            if (pessoas[i].socketID === socket.id) {
                console.log(pessoas[i] + 'excluido')
                delete pessoas[i]
                sockets.emit('pessoas conectadas', pessoas)
            }
        }
    })
})


server.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}`)
})