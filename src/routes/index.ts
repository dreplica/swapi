import { addComments } from './../controllers/getmovies';
import express, { Request, Response } from 'express';

import { getMovies } from '../controllers/getmovies';

const router = express.Router();

/* GET users listing. */
router.get('/', (_, res:Response)=> {
	res.status(200).send('Hello please check the github for documentations');
});

router.get('/movies', async (req: Request, res: Response) => {
  const response = await getMovies()
  console.log('response was here',response)
	res.status(200).json(response);
});

router.post('/comment', async (req: Request, res: Response) => {
  const { id, comment } = req.body
  
  const response = await addComments({ id, comment })
  
  console.log('response was here',response)
	res.status(200).json(response);
});


export default router;
