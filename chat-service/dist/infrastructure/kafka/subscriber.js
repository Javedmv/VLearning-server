"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscriber = void 0;
const createSubscriber = () => {
    return {
        hello: () => {
            console.log("Hello from subscriber");
        }
    };
};
exports.createSubscriber = createSubscriber;
