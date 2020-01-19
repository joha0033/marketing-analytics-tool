import express, {Request, Response} from 'express';
import {sourceController} from '../../controllers';

export const router = express.Router({
  strict: true
});

router.post('/', (req: Request, res: Response) => {
  sourceController.create(req, res);
});

router.get('/', (req: Request, res: Response) => {
  sourceController.read(req, res);
});

router.patch('/', (req: Request, res: Response) => {
  sourceController.update(req, res);
});

router.delete('/', (req: Request, res: Response) => {
  sourceController.delete(req, res);
});
