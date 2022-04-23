import { AppDataSource } from "./data-source";
import axios from "axios";
import { Menu } from "./entity/Menu";
import * as fs from "fs";
import kuromoji from "kuromoji";
import Path from "path";

let passed = "number,position,value\n";
let pIndex = 0;

AppDataSource.initialize()
  .then(async (connection) => {
    // ANCHOR Load Kuromoji
    kuromoji
      .builder({ dicPath: Path.join(__dirname, "..", "dict") })
      .build(async function (_, tokenizer) {
        // tokenizer is ready
        // const path = tokenizer.tokenize("一般");

        const { data: menus } = await axios({
          method: "get",
          url: "https://katsuo.herokuapp.com/api?menu",
        });

        await connection.getRepository(Menu).clear();

        let i = 0;
        while (i < menus.length - 1) {
          if (/^[ぁ-んー()　]*$/.test(menus[i])) {
            console.log("passing: ", menus[i]);
            pIndex++;
            passed += `\n${pIndex},${i},${menus[i]}`;
          } else {
            let arrFurigana = tokenizer
              .tokenize(menus[i])
              .map((w) => w.pronunciation || "");
            let furigana = arrFurigana.reduce((prev, current) => {
              return prev + current;
            }, "");
            const newMenu = new Menu();
            newMenu.name = menus[i].trim();
            newMenu.altName = furigana;
            newMenu.country = "jp";

            await connection.getRepository(Menu).save(newMenu);
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
