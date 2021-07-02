const http = require('http')
const { RECEIVE_JSON, RETURN_JSON } = require('./messageEvents')
const WebSocket = require('ws')

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello World!');
    res.end();
}).listen(8080)

const wss = new WebSocket.Server({
    server: server
})

wss.on('connection', (ws) => {
    console.log('connecté')
    ws.on('message', (message) => {
        const m = JSON.parse(message)
        switch (m.type) {
            case RECEIVE_JSON:
                ws.send(JSON.stringify({ type: RETURN_JSON, data: m.data }))
                break;
            default:
                break;
        }
    })
})