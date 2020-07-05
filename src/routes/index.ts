import { CharacterSort } from './../types/movies';
import { addComments, getComments, getCharacters } from '../controllers';
import express, { Request, Response } from 'express';

import { getMovies } from '../controllers';

const router = express.Router();

/* GET users listing. */
router.get('/', (_, res: Response) => {
	res.status(200).send('Hello please check the github for documentations');
});

router.get('/movies', async (_: Request, res: Response) => {
	const { data, error } = await getMovies();
	if (data) {
		return res.status(200).json(data);
	}
	return res.status(404).json(error);
});

router.get('/comment/:id', async (req: Request, res: Response) => {
	const { id } = req.params;
	const { data, error } = await getComments(id as string);
	if (data) {
		return res.status(200).json(data);
	}
	return res.status(404).json(error);
});

router.post('/comment', async (req: Request, res: Response) => {
	const { id, comment } = req.body;
	const ipAddress: string = req.ip as string;
	const { data, error } = await addComments({ id, comment, ipAddress });

	if (data) {
		return res.status(200).json(data);
	}
	return res.status(404).json(error);
});

router.get('/characters', async (req: Request, res: Response) => {
  const {movie,sort,filter} = req.query
  const {data,error} = await getCharacters({movie,sort,filter} as CharacterSort)

   if (data){
    return res.status(200).json(data);
    
  }
  return res.status(404).json(error);
});

export default router;
