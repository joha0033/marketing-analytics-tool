import express, {Request, Response} from 'express';
import {clickDataController} from '../../controllers';

export const router = express.Router({
  strict: true
});

router.post('/', (req: Request, res: Response) => {
  clickDataController.create(req, res);
});

router.get('/', (req: Request, res: Response) => {
  clickDataController.read(req, res);
});

router.patch('/', (req: Request, res: Response) => {
  clickDataController.update(req, res);
});

router.delete('/', (req: Request, res: Response) => {
  clickDataController.delete(req, res);
});
