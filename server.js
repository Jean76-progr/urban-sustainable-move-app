// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router('db.json');

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware d'authentification
server.post('/auth/login', (req, res) => {
    const { email, password } = req.body;

    // Simuler une vérification
    if (email === "test@example.com" && password === "password123") {
        res.json({
            success: true,
            token: "mock_jwt_token_123",
            user: {
                id: 1,
                email: email,
                name: "Test User"
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });
    }
});

server.post('/auth/register', (req, res) => {
    const { email, password, name } = req.body;

    // Simuler un enregistrement
    res.json({
        success: true,
        token: "mock_jwt_token_456",
        user: {
            id: Date.now(),
            email,
            name
        }
    });
});

server.use(router);
server.listen(3001, () => {
    console.log('JSON Server is running on port 3001');
});