import chokidar from "chokidar";
import fs from "fs";
import path from "path";
import { EventEmitter } from "events";

import ClickDataParser from "./ClickDataParser";

class Observer extends EventEmitter {
  constructor() {
    super();
  }

  public watchFile(targetFile: string) {
    try {
      console.log(
        `[${new Date().toLocaleString()}] Watching for file changes on: ${targetFile}`
      );
      const watcher = chokidar.watch(targetFile, {
        persistent: true,
        depth: 0
      });

      watcher.on("add", function(filePath) {
        const filename = path.basename(filePath);
        const directory = path.dirname(filePath);

        // process file
        ClickDataParser.parseFile(filePath);
        // move file
        const newPath = directory + "/processed/" + filename;
        fs.rename(filePath, newPath, function(err) {
          if (err) {
            console.warn(err);
          }
          console.log(`Successfully parsed ${filename}`);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default Observer;
