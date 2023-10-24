"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTextContentController = void 0;
const openai_1 = require("../configs/openai");
async function checkTextContentController(req, res) {
    try {
        const { input } = req.body;
        const response = await openai_1.openAiConfig.moderations.create({
            input,
        });
        const flagged = response.results[0].flagged;
        return res.json({ inappropriate: flagged });
    }
    catch (err) {
        return res.status(500).json(err);
    }
}
exports.checkTextContentController = checkTextContentController;
