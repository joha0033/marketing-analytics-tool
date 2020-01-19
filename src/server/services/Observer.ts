import chokidar from 'chokidar';
import {EventEmitter} from 'events';

class Observer extends EventEmitter {
  constructor() {
    super();
  }

  watchFile(targetFile: string) {
    try {
      console.log(`[${new Date().toLocaleString()}] Watching for file changes on: ${targetFile}`);

      var watcher = chokidar.watch(targetFile, {persistent: true});

      watcher
        .on('add', function(path) {
          console.log('File', path, 'has been added');
        })
        .on('change', function(path) {
          console.log('File', path, 'has been changed');
        })
        .on('unlink', function(path: string) {
          console.log('File', path, 'has been removed');
        })
        .on('error', function(error: Error) {
          console.error('Error happened', error);
        });
    } catch (error) {
      console.log(error);
    }
  }
}

export default Observer;
