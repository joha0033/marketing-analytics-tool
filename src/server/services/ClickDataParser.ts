import {EventEmitter} from 'events';
import fs from 'fs';
import {parse} from 'fast-csv';
import {ClickData} from '../models/ClickData';

import path from 'path';
import Mapper from './Mapper';

class ClickDataParser {
  static parseFile(targetFile: string) {
    // derive global per-file variables
    const fileParts = path.basename(targetFile, '.csv').split('_');
    const source = fileParts[0];
    const month = parseInt(fileParts[1]);
    const day = parseInt(fileParts[2]);
    const year = parseInt(fileParts[3]);

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

          csvData.forEach(async row => {
            // todo: this works with sample data...
            // a more scalable solution would be to provide a UI
            // and the ability for maps of file definitions
            const product = row[0];
            const clicks = row[1];

            const mappingData = Mapper.mapProduct(product);

            const newData = new ClickData({
              productName: mappingData.productName,
              product: product,
              createdAt: new Date(year, month, day),
              source: source,
              clicks: clicks
            });

            await newData.save();
          });
        });

      stream.pipe(csvStream);
    } catch (error) {
      console.log(error);
    }
  }
}

export default ClickDataParser;
