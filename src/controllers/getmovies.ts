import Axios from 'axios';
import { Movies, movieAcc } from '../types/movies';

const getCommentCount = async (id: number) => {
    // const count = await db.query(sql`SELECT count(id) FROM comments WHERE title=${id}`)
    // return count
    return 5
}

export const getMovies = async () => {
	try {
		const { data } = await Axios.get('https://swapi.dev/api/films');

		const copyData = JSON.parse(JSON.stringify(data.results));
		const getSort = copyData.sort((initial: Movies, later: Movies) => {
			const initialDate = new Date(initial.release_date).getTime();
			const laterDate = new Date(later.release_date).getTime();
			if (initialDate - laterDate > 1) {
				return initial;
			}
			return later;
		});

		const getComment = await getSort.reduce(async (acc: Promise<movieAcc[]>, val: Movies) => {
            //get movies id, query through sql for total comments
			const count = await getCommentCount(val.episode_id)
			const accum:movieAcc = {
				comment_count: await  count,
				name: val.title,
				opening_crawls: val.opening_crawl
			};
			return acc.then(res => {
				res.push(accum)
			})

			// return acc
		},Promise.resolve([]));
		return getComment;
    } catch (error) { }
    
};
