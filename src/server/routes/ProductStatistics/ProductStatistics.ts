import express, {Request, Response} from 'express';
import {productStatisticsController} from '../../controllers';

export const router = express.Router({
  strict: true
});

router.post('/', (req: Request, res: Response) => {
  productStatisticsController.create(req, res);
});

router.get('/', (req: Request, res: Response) => {
  productStatisticsController.read(req, res);
});

router.patch('/', (req: Request, res: Response) => {
  productStatisticsController.update(req, res);
});

router.delete('/', (req: Request, res: Response) => {
  productStatisticsController.delete(req, res);
});
