import axios from 'axios'


// Create instance
const instance = axios.create({
    baseURL: 'https://swapi.dev/api'
})


// API
export const starShipsAPI = {
    getStarShips(url: string): Promise<string>  {
        return axios.get<string>(url).then(res => {
          return res.data
        });
    }
}

export const film5API = {
    getFilm5API() {
        const promise = instance.get<ResponseFilmsType>('/films/5/');
        return promise;
    }
}

// types
export type ResponseFilmsType = {
    title: string,
    episode_id: number,
    opening_crawl: string,
    director: string,
    producer: string,
    release_date: string,
    characters: string[],
    planets: string[],
    starships: string[],
    vehicles: string[],
    species: string[],
    created: string,
    edited: string,
    url: string
}



