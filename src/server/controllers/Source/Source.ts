import {Request, Response} from 'express';
import {CRUDController} from '../CRUDController';

import {Source} from '../../models/Source';

export class SourceController extends CRUDController {
  public create(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): void {
    throw new Error('Method not implemented.');
  }

  public read(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): void {
    Source.find({}, (err, sources) => {
      res.json({
        sources: Object.keys(sources).length > 0 ? sources : {}
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
