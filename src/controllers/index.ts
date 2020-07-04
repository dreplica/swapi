import { character } from './../types/movies';
import Axios from 'axios';

import dbase from '../pgmodel';
import { Movies, movieAcc, Comment, Character, CharacterSort } from '../types/movies';
import { getCommentCount, arrangeCharacters, arrangeComments } from '../functions';

export type DB_COMMENT = Comment & { created: string };

const { db, sql } = dbase;

export const getMovies = async () => {
	try {
		const { data } = await Axios.get('https://swapi.dev/api/films');

		const copyData = JSON.parse(JSON.stringify(data.results));

		console.log(copyData);
		const getSort = copyData.sort((initial: Movies, later: Movies) => {
			const initialDate = new Date(initial.release_date).getTime();
			const laterDate = new Date(later.release_date).getTime();
			if (initialDate - laterDate > 0) {
				return 1;
			}
			return -1;
		});

		const getComment = await getSort.reduce(async (acc: Promise<movieAcc[]>, val: Movies) => {
			const count = await getCommentCount(val.episode_id);
			const accum: movieAcc = {
				comment_count: await count,
				episode_id: val.episode_id,
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

export const addComments = async (comment: Comment) => {
	try {
		const commentResponse = await db.query(sql`INSERT INTO comments
		VALUES(${comment.id},${comment.comment},${comment.ipAddress},current_timestamp) 
		returning *`);

		return { data: commentResponse };
	} catch (error) {
		return { error: "sorry couldn't add comment, please try again. Thanks" };
	}
};

export const getComments = async (id: string) => {
	try {
		const comments: DB_COMMENT[] = await db.query(sql`SELECT ipaddress,comment,id,created 
		FROM comments
		WHERE id=${id}`);

		const orderedComments = arrangeComments(comments);
		return { data: orderedComments };
	} catch (error) {
		return { error: 'sorry that comment was not found, try again or check connection' };
	}
};

export const getCharacters = async (sort: CharacterSort) => {
	console.log("whats hapening man",sort)
	try {
		const { data:response } = await Axios.get(`https://swapi.dev/api/films/${sort.movie}`);

		console.log(response.characters) 

		const getAllCharacters = await response.characters.reduce(
			async (acc: Promise<Character[]>, val: string) => {
				const {data} = await Axios.get(val)
				// console.log('accval has come to stay :>> ', data);
				acc.then((person) => {
					person.push(data)
				})
				return acc
			},
			Promise.resolve([])
		);

		const character = arrangeCharacters(getAllCharacters,sort);

		return { data: character };
	} catch (error) {
		return { error: 'Sorry we couldnt get this movie characters, can you try searching again \n'+error.message };
	}
};
