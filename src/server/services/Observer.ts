import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
import {EventEmitter} from 'events';

class Observer extends EventEmitter {
  constructor() {
    super();
  }

  public watchFile(targetFile: string) {
    try {
      console.log(`[${new Date().toLocaleString()}] Watching for file changes on: ${targetFile}`);
      const watcher = chokidar.watch(targetFile, {persistent: true});

      watcher.on('add', function(filePath) {
        const filename = path.basename(filePath);
        const directory = path.dirname(filePath);

        const newPath = directory + '/processed/' + filename;
        fs.rename(filePath, newPath, function(err) {
          if (err) {
            console.warn(err);
          }
          console.log('Successfully renamed - AKA moved!');
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default Observer;
