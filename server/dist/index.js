"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const todoItems_1 = __importDefault(require("./routes/todoItems"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Use express.json() to parse JSON requests
app.use(express_1.default.json());
// Port
const PORT = parseInt(process.env.PORT, 10) || 5500;
// import routes
// Use routes 
app.use('/api', todoItems_1.default);
// Connect to MongoDB
mongoose_1.default
    .connect(process.env.DB_CONNECT)
    .then(() => console.log('Database connected'))
    .catch((err) => console.error(err));
// Connect to the server
app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
