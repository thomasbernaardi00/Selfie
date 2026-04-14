"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, ".env") });
console.log("Variabili caricate:", process.env);
const app = (0, express_1.default)();
const PORT = process.env.PORT || "8000";
const MONGO_URI = process.env.MONGO_URI;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Controllo della variabile MONGO_URI prima di usarla
console.log("MONGO_URI:", process.env.MONGO_URI);
if (!MONGO_URI) {
    console.error("Errore: MONGO_URI non è definito nel file .env");
    process.exit(1);
}
// Connessione a MongoDB 
mongoose_1.default.connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
    console.error("Errore connessione MongoDB:", err);
    process.exit(1);
});
app.use("/api/auth", auth_1.default);
app.use(express_1.default.static(__dirname));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "index.html"));
});
// Avvio del server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
