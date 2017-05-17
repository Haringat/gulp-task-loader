"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const assert_1 = require("assert");
const os_1 = require("os");
function doesNotThrowAsync(block, errorOrMessage, message) {
    return __awaiter(this, void 0, void 0, function* () {
        let thrown;
        try {
            yield block();
        }
        catch (error) {
            thrown = error;
        }
        if (thrown) {
            let error = new assert_1.AssertionError({ message: (message ? message : "Block execution threw an error.") + os_1.EOL + "Error:" + os_1.EOL + thrown.stack, stackStartFunction: block });
            if (!message) {
                throw error;
            }
            else if (errorOrMessage instanceof RegExp) {
                if (errorOrMessage.test(thrown.message)) {
                    throw error;
                }
            }
            else if (errorOrMessage && errorOrMessage.prototype instanceof Error) {
                if (thrown instanceof errorOrMessage) {
                    throw new assert_1.AssertionError(`Block execution threw an error which is not an instance of ${errorOrMessage.name}`);
                }
            }
            else if (errorOrMessage instanceof Function) {
                if (errorOrMessage.apply(undefined, thrown)) {
                    throw error;
                }
            }
            else {
                new assert_1.AssertionError({ message: "Block execution threw an error." + os_1.EOL + "Error:" + os_1.EOL + thrown.stack, stackStartFunction: block });
            }
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = doesNotThrowAsync;
//# sourceMappingURL=doesNotThrowAsync.js.map