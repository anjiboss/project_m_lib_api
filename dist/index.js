"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const axios_1 = __importDefault(require("axios"));
const Menu_1 = require("./entity/Menu");
const fs = __importStar(require("fs"));
const kuromoji_1 = __importDefault(require("kuromoji"));
const path_1 = __importDefault(require("path"));
let passed = "number,position,value\n";
let pIndex = 0;
data_source_1.AppDataSource.initialize()
    .then(async (connection) => {
    kuromoji_1.default
        .builder({ dicPath: path_1.default.join(__dirname, "..", "dict") })
        .build(async function (_, tokenizer) {
        const { data: menus } = await (0, axios_1.default)({
            method: "get",
            url: "https://katsuo.herokuapp.com/api?menu",
        });
        await connection.getRepository(Menu_1.Menu).clear();
        let i = 0;
        while (i < menus.length - 1) {
            if (/^[ぁ-んー()　]*$/.test(menus[i])) {
                console.log("passing: ", menus[i]);
                pIndex++;
                passed += `\n${pIndex},${i},${menus[i]}`;
            }
            else {
                let arrFurigana = tokenizer
                    .tokenize(menus[i])
                    .map((w) => w.pronunciation || "");
                let furigana = arrFurigana.reduce((prev, current) => {
                    return prev + current;
                }, "");
                const newMenu = new Menu_1.Menu();
                newMenu.name = menus[i].trim();
                newMenu.altName = furigana;
                newMenu.country = "jp";
                await connection.getRepository(Menu_1.Menu).save(newMenu);
            }
            i = i + 1;
        }
        fs.writeFile("passes.csv", passed, () => {
            console.log("saved");
        });
        connection.destroy();
    });
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map