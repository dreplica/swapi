import express, { Request, Response } from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', (_, res:Response)=> {
	res.status(200).send('Hello please check the github for documentations');
});

router.get('/movies', (req:Request, res:Response)=> {
	res.status(200).send('Hello please check the github for documentations');
});


export default router;
