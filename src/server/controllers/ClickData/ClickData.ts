import {Request, Response} from 'express';
import {CRUDController} from '../CRUDController';

import {ClickData} from '../../models/ClickData';

export class ClickDataController extends CRUDController {
  public async create(
    req: Request<import('express-serve-static-core').ParamsDictionary>,
    res: Response
  ): Promise<void> {
    const newData = new ClickData({
      product: req.body.product,
      createdAt: req.body.createdAt,
      source: req.body.source,
      clicks: req.body.clicks
    });

    await newData.save();
    res.json(newData);
  }

  public read(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): void {
    ClickData.find({}, (err, sources) => {
      res.json({
        clicks: Object.keys(sources).length > 0 ? sources : {}
      });
    });
  }

  public update(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): void {
    throw new Error('Method not implemented.');
  }

  public delete(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): void {
    throw new Error('Method not implemented.');
  }
}
