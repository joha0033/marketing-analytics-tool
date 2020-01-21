import {Request, Response} from 'express';
import {CRUDController} from '../CRUDController';
import {ClickData} from '../../models/ClickData';

export class ProductStatisticsController extends CRUDController {
  public create(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): void {
    throw new Error('Method not implemented.');
  }

  public read(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): void {
    ClickData.aggregate(
      [
        {
          $group: {
            _id: {
              product: '$product',
              source: '$source'
            },
            totalClicksBySource: {$sum: '$clicks'}
          }
        },
        {$project: {_id: 1, totalClicksBySource: 1}}
      ],
      (err, stats) => {
        res.json({
          productstatistics: Object.keys(stats).length > 0 ? stats : {}
        });
      }
    );
  }

  public update(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): void {
    throw new Error('Method not implemented.');
  }

  public delete(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): void {
    throw new Error('Method not implemented.');
  }
}
