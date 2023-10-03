"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const item_1 = __importDefault(require("../models/item")); // Import your Mongoose model here
const router = express_1.default.Router();
// Create a new item
router.post('/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, shortDescription, date, time } = req.body;
        if (!name || !shortDescription || !date || !time) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        const newItem = new item_1.default({
            name,
            shortDescription,
            date,
            time,
        });
        const savedItem = yield newItem.save();
        res.status(201).json(savedItem);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Get all items
router.get('/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield item_1.default.find();
        res.status(200).json(items);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
