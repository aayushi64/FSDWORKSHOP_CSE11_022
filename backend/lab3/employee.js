import http from 'http';

const port = 3000;

// Array of employee objects
const employees = [
    { id: 101, name: "Arisha", email: "arisha@example.com", department: "IT" },
    { id: 102, name: "Pihu", email: "rohan@example.com", department: "HR" },
    { id: 103, name: "Aditi", email: "priya@example.com", department: "Finance" },
    { id: 104, name: "Ujjwal", email: "amit@example.com", department: "Marketing" }
];

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    // Set response type to JSON for data endpoints
    res.setHeader("Content-Type", "application/json");

    if (url === "/msg" && method === "GET") {
        res.end(JSON.stringify({ message: "Message received" }));
    }
    else if (url === "/hello" && method === "GET") {
        res.end(JSON.stringify({ message: "Hello World" }));
    }
    else if (url === "/employees" && method === "GET") {
        // Send full employee list
        res.end(JSON.stringify(employees));
    }
    else if (url.startsWith("/employee/") && method === "GET") {
        // Extract ID from URL
        const empId = parseInt(url.split("/")[2]);
        const employee = employees.find(emp => emp.id === empId);

        if (employee) {
            res.end(JSON.stringify(employee));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Employee not found" }));
        }
    }
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Page not found" }));
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
