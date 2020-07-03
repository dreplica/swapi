import { initialAcc } from './../types/movies';
import Axios from 'axios';
import { Movies, movieAcc } from '../types/movies';

export const getMovies = async () => {
	try {
        const { data } = await Axios.get('https://swapi/api/films');

        const getComment = data.reduce((acc:movieAcc, val:Movies) => {
            
        },{initialAcc})

	} catch (error) {}
};
