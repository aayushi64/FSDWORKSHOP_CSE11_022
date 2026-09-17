import http from 'http';
import fs from 'fs';

const port = 5000;
const filePath = "employees.json";

// Helper: read file
function readEmployees() {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

// Helper: write file
function writeEmployees(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Initialize file if not exists
if (!fs.existsSync(filePath)) {
    writeEmployees([]);
}

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    res.setHeader("Content-Type", "application/json");

    if (url === "/employee" && method === "POST") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            try {
                const parsedData = JSON.parse(body);
                const employees = readEmployees();

                employees.push(parsedData);
                writeEmployees(employees);

                res.statusCode = 201;
                res.end(JSON.stringify({ message: "Employee saved", employee: parsedData }));
            } catch {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "Invalid JSON" }));
            }
        });
    }
    else if (url.startsWith("/employee/") && method === "GET") {
        // Fetch by ID
        const id = url.split("/")[2];
        const employees = readEmployees();
        const emp = employees.find(e => e.id == id);

        if (emp) {
            res.end(JSON.stringify(emp));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Employee not found" }));
        }
    }
    else if (url === "/employees" && method === "GET") {
        res.end(JSON.stringify(readEmployees()));
    }
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Page not found" }));
    }
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
