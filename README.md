# API DOCUMENTATION 
link to api http://starwpi.herokuapp.com/api/
###
This is an API that uses https://swapi.dev/api to provide Star Wars characters, films and comment. The work is done using :
- Node (Express)
- Typescript
- Postgresql
- node-pg-migrate

###
To test the API, you can clone this repo, you need to have npm/yarn, node, installed on your computer and setup pgadmin to run the application.
Install all dependencies using `yarn` then run `yarn start` and you're all good

### or 

if you have docker installed on your computer, run `docker-compose up`


## END POINTS - /api/ (base endpoint url)
- `GET /movies`: it returns all movies with their name.
- `GET /comment/:id`: it returns particular comment by providing a params `:id` which indicates the `episode_id` for a particular movie.
- `POST /comment`: it takes in a JSON body which include `{"id":"string"|"number","comment":"string"}`
  - `id`: it represents the particular movie episode_id you want to comment on.
  - 'comment`: it represents the comment text, its length should not exceed 500.
- `GET /characters/?movie=1&sort=asc&filter=female`: it provides characters from a particular movie, with the total amount of characters and their 
height specified in measurement of cm and ft
   #### `/characters` query object
    - `movie`: it takes the episode_id for a movie.
    - `filter`: it filters gender  for `male or female` if not specified it returns random gender.
    - `sort`: it sorts the returned value by `character name` can be specified `asc` for ascending and `desc` for descending
    
## RESPONSE
- `GET /movies`: 
  `{
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
}`
- `GET /comment/:id`: 
`{
	id: string;
	comment: string;
	ipAddress: string;
}`

- `POST /comment`: 
`{
	id: string;
  episodeid:string;
	comment: string;
	ipAddress: string;
}`

- `GET /characters/?movie=1&sort=asc&filter=female`: 
`{
    birth_year?: string;
    eye_color?: string;
    films?: string [];
    gender: string;
    hair_color?: string;
    height: {
    cm:string;
    feet:string;
    };
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
}`

### Thank you
