//for movies query
export interface Movies {
	characters: string[];
	created: string;
	director: string;
	edited: string;
	episode_id: number;
	opening_crawl: string;
	planets: string[];
	producer: string;
	release_date: string;
	species: string[];
	starships: string[];
	title: string;
	url: string;
	vehicles: string[];
}


export interface movieAcc {
	name: string;
	episode_id: number;
	opening_crawls: string;
	comment_count: number;
}

export const initialAcc: movieAcc = {
	name: '',
	opening_crawls: '',
	episode_id: 0,
	comment_count: 0
};

//for adding comment
export interface Comment {
	id: string;
	comment: string;
	ipAddress: string;
}



//for characters
export interface Character {
    birth_year?: string;
    eye_color?: string;
    films?: string [];
    gender: string;
    hair_color?: string;
    height: number;
    homeworld?: string;
    mass?: number;
    name: string;
    skin_color?: string;
    created?: string;
    edited?: string;
    species?: string[];
    starships?: string[];
    url?: string;
    vehicles?: string[];
}

export interface CharacterSort {
	movie: string;
	filter: string;
	sort: string;
}
