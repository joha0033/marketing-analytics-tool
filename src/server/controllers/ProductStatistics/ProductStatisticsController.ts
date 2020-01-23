import {Request, Response} from 'express';
import {CRUDController} from '../CRUDController';
import {ClickData} from '../../models/ClickData';

export class ProductStatisticsController extends CRUDController {
  public create(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): void {
    throw new Error('Method not implemented.');
  }

  public read(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): void {
    let query = new RegExp('.*');

    if (!!req.query.keyword) {
      query = new RegExp('.*' + req.query.keyword + '.*', 'i');
    }

    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);

    console.warn(endDate);

    ClickData.aggregate(
      [
        {$match: {$and: [{productName: query}, {createdAt: {$gte: startDate, $lte: endDate}}]}},
        {
          $group: {
            _id: {
              product: '$product',
              productName: '$productName',
              source: '$source'
            },
            totalClicksBySource: {$sum: '$clicks'}
          }
        },
        {
          $project: {
            doc: {
              _id: {
                product: '$_id.product',
                productName: '$_id.productName',
                source: '$_id.source'
              },
              totalClicksBySource: '$totalClicksBySource'
            }
          }
        },
        {
          $group: {
            _id: {
              product: '$_id.product',
              productName: '$_id.productName'
            },
            result: {
              $push: {
                source: '$doc._id.source',
                clicks: '$doc.totalClicksBySource'
              }
            }
          }
        },
        {
          $project: {
            result: 1
          }
        }
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
