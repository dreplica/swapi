import { DB_COMMENT } from './../controllers/index';
import dbase from '../pgmodel';
import { Character, CharacterSort } from '../types/movies';

const { db, sql } = dbase;

interface ACCUM extends Omit<Character, 'height'> {
	height: { cm: string; feet: string };
}

export const getCommentCount = async (id: number) => {
	const count = await db.query(sql`SELECT count(episodeid) FROM comments WHERE episodeid=${id}`);
	return count[0].count;
};

export const arrangeComments = (comments: DB_COMMENT[]) => {
	const copyComment: DB_COMMENT[] = JSON.parse(JSON.stringify(comments));

	return copyComment.sort((initial: DB_COMMENT, later: DB_COMMENT) => {
		const initialDate = new Date(initial.created).getTime();
		const laterDate = new Date(later.created).getTime();

		if (initialDate - laterDate > 0) {
			return -1;
		}
		return 1;
	});
};

export const arrangeCharacters = (movie: Character[], sort: CharacterSort) => {
	const copyComment: Character[] = JSON.parse(JSON.stringify(movie));

	const filter = copyComment.filter((character) => {
		if (sort.filter) {
			return character.gender.toLowerCase() === sort.filter.toLowerCase();
		}
		return true;
	});

	const sortXtics = (accum: ACCUM[]) =>
		accum.sort((initial: ACCUM, later: ACCUM) => {
			switch (sort.sort) {
				case 'asc':
					if (initial.name > later.name) return 1;
					return -1;
				case 'desc':
					if (initial.name > later.name) return -1;
					return 1;
				default:
					return 1;
			}
		});

	const result = filter.reduce((acc: ACCUM[], val) => {
		const person = {
			...val,
			height: {
				cm: val.height + 'cm',
				feet: Math.floor(val.height * 0.0328084) + 'ft'
			}
		};
		return sortXtics(acc.concat(person));
	}, []);

	return { totalCharacters: filter.length, result };
};
