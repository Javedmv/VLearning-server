"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const chatController_1 = require("../../presentation/chatController");
const routes = (dependencies) => {
    const {} = (0, chatController_1.chatControllers)(dependencies);
    const router = (0, express_1.Router)();
    return router;
};
exports.routes = routes;
