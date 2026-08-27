import http from 'http';
import fs from 'fs';

const port = 3000;

// Array of employee objects
const employees = [
    { id: 101, name: "Arisha", email: "arisha@example.com", department: "IT" },
    { id: 102, name: "Pihu", email: "rohan@example.com", department: "HR" },
    { id: 103, name: "Aditi", email: "priya@example.com", department: "Finance" },
    { id: 104, name: "Ujjwal", email: "amit@example.com", department: "Marketing" }
];

// Write employees data into a file once at startup
fs.writeFileSync("employees.json", JSON.stringify(employees, null, 2));

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/file" && method === "GET") {
        // Return the file itself
        res.setHeader("Content-Type", "application/json");
        const readStream = fs.createReadStream("employees.json");
        readStream.pipe(res);
    }
    else if (url === "/msg" && method === "GET") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Message received" }));
    }
    else if (url === "/hello" && method === "GET") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Hello World" }));
    }
    else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Page not found" }));
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
