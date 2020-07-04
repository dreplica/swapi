
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

export const initialMovies:Movies = {
    characters: [""],
    created: "",
    director: "",
    edited: "",
    episode_id: 0,
    opening_crawl: "",
    planets: [""],
    producer: "",
    release_date: "",
    species: [""],
    starships: [""],
    title: "",
    url:"",
    vehicles: ["" ]
}

export interface movieAcc{
    name: string;
    episode_id: number;
    opening_crawls: string;
    comment_count: number;
}

export const initialAcc:movieAcc = {
    name: "",
    opening_crawls: "",
    episode_id:0,
    comment_count: 0
}


//for adding comment
export interface Comment{
    id: string,
    comment: string;
    ipAddress: string;
}

export const comment: Comment = {
    id: "",
    comment: "",
    ipAddress:""
}