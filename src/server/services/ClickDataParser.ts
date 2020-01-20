import {EventEmitter} from 'events';
import fs from 'fs';
import {parse} from 'fast-csv';
import {ClickData} from 'server/models/ClickData';

class ClickDataParser {
  static parseFile(targetFile: string) {
    try {
      let stream = fs.createReadStream(targetFile);
      let csvData: string[] = [];
      let csvStream = parse()
        .on('data', data => {
          csvData.push(data);
        })
        .on('end', function() {
          // remove the first line: header
          csvData.shift();

          csvData.forEach(row => {
            console.log(row);
            /*             const newData = new ClickData({
              product: row.foo,
              createdAt: req.body.createdAt,
              source: req.body.source,
              clicks: req.body.clicks
            }); */
          });
        });

      stream.pipe(csvStream);
    } catch (error) {
      console.log(error);
    }
  }
}

export default ClickDataParser;
