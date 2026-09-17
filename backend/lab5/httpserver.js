import http from 'http';

const port = 4000;

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/msg" && method === "GET") {
        res.write("Message received");
    }
    else if (url === "/hello" && method === "GET") {
        res.write("Hello World");
    }
    else if (url === "/time" && method === "GET") {
        res.write(`Current server time: ${new Date().toLocaleString()}`);
    }
    else if (url === "/about" && method === "GET") {
        res.write("This is a simple Node.js server");
    }
    else if (url === "/contact" && method === "GET") {
        res.write("Contact us at support@example.com");
    }
    else {
        res.statusCode = 404;
        res.write("Page not found");
    }

    res.end();
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
