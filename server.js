const http = require("http");


const server = http.createServer((req, res) => {
    res.end("Hello, World from the server!");
});

server.listen(4000, () => {
    console.log("Server is listening on port 4000");
})