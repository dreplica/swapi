import Axios from 'axios';

import dbase from '../pgmodel';
import { Movies, movieAcc, Comment } from '../types/movies';

const {db,sql} = dbase

const getCommentCount = async (id: number) => {
	const count = await db.query(sql`SELECT count(id) FROM comments WHERE id=${id}`);
	return count[0].count
};

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
			const count = await getCommentCount(val.episode_id);
			const accum: movieAcc = {
				comment_count: await count,
				episode_id:val.episode_id,
				name: val.title,
				opening_crawls: val.opening_crawl
			};
			acc.then((res) => {
				res.push(accum);
			});
			return acc;
		}, Promise.resolve([]));

		return { data: getComment };
	} catch (error) {
		return { error: error.message };
	}
};

export const addComments = async (body: Comment) => {
	try {
		const comment = await db.query(sql`INSERT INTO comments
		VALUES(${body.id},${body.comment},${body.ipAddress},current_timestamp) returning *`);

		return { data: comment };

	} catch (error) {
		return { error: "sorry couldn't add comment, please try again. Thanks" };
	}
};


export const getComments = async (id:string) => {
	try {
		const comments = await db.query(sql``)
		
	} catch (error) {
		return {error:"sorry that comment was not added, try again or check connection"}
	}
}