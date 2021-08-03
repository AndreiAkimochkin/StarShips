import {Dispatch} from 'redux';
import {setAppErrorAC, SetAppErrorActionType} from "./app-reducer";
import {film5API, starShipsAPI} from "../api/api";
import {StarshipType} from "./Types";


const initialState = {
    // status: '',
    starships: [],
    starshipsInfo: [],
    starshipsChecked: []
}

type InitStateType = typeof initialState

export const film5Reducer = (state: InitStateType = initialState, action: ActionsType): any => {
    switch (action.type) {
        case 'GET_FILM5': {
            return {
                ...state,
                data: action.data
            }
        }
        case 'GET_STARSHIPS_LINKS': {
            return {
                ...state,
                starships: action.data
            }
        }
        case 'GET_ONE_STARSHIP': {
            const data = {
                MGLT: action.data.MGLT,
                cargo_capacity: action.data.cargo_capacity,
                consumables: action.data.consumables,
                cost_in_credits: action.data.cost_in_credits,
                created: action.data.created,
                crew: action.data.crew,
                edited: action.data.edited,
                films: action.data.films,
                hyperdrive_rating: action.data.hyperdrive_rating,
                length: action.data.length,
                manufacturer: action.data.manufacturer,
                max_atmosphering_speed: action.data.max_atmosphering_speed,
                model: action.data.model,
                name: action.data.name,
                passengers: action.data.passengers,
                pilots: action.data.pilots,
                starship_class: action.data.starship_class,
                url: action.data.url,
                shipHasBeenChecked: false
            }
            //точно можно порефакторить, просто мозги уже кипят.
            return {
                ...state,
                starshipsInfo: [
                    ...state.starshipsInfo,
                    data
                ]
            }
        }
        case 'GET_CHECKED_STARSHIP': {
            const data = state.starshipsInfo.map((el: StarshipType) => {
                return el.url === action.data ? { ...el, shipHasBeenChecked: !el.shipHasBeenChecked } : el
            })
            return {
                ...state,
                starshipsInfo: data
            }
        }
        //return state.map(ship => ship.name === action.name ? {...ship, filter: action.filter} : ship)
        default:
            return state
    }
}

// actions
export const getFilm5AC = (data: any) => ({type: 'GET_FILM5', data} as const);
export const getStarShipsLinksAC = (data: any) => ({type: 'GET_STARSHIPS_LINKS', data} as const);
export const getOneStarShipAC = (data: any) => ({type: 'GET_ONE_STARSHIP', data} as const);
export const getCheckedStarShipAC = (data: string) => ({type: 'GET_CHECKED_STARSHIP', data} as const);


// thunks
export const getFilm5TC = () => async (dispatch: ThunkDispatch) => {
    // dispatch(setAppStatusAC('loading'))
    await film5API.getFilm5API()
        .then((res) => {
            //debugger
            dispatch(getFilm5AC(res.data))

            // dispatch(setAppStatusAC('succeeded'))
        }).catch((error) => {
            dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
            // dispatch(setAppStatusAC('failed'))
        })
}
export const getStarShipsLinksTC = () => async (dispatch: ThunkDispatch) => {
    //debugger
    // dispatch(setAppStatusAC('loading'))
    await film5API.getFilm5API()
        .then((res) => {
            // @ts-ignore
            dispatch(getStarShipsLinksAC(res.data.starships))
        }).catch((error) => {
            dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
            // dispatch(setAppStatusAC('failed'))
        })
}

export const getOneStarShipTC = (url: string) => async (dispatch: ThunkDispatch) => {
    // dispatch(setAppStatusAC('loading'))
    try {
        const res = await starShipsAPI.getStarShips(url)

        // @ts-ignore
        dispatch(getCheckedStarShipAC(res))
        // dispatch(setAppStatusAC('succeeded'))
    }
    catch(error) {
        dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
        // dispatch(setAppStatusAC('failed'))
    }
}

export const getCheckedStarShipTC = (url: string) => async (dispatch: ThunkDispatch) => {
    // dispatch(setAppStatusAC('loading'))
    try {
        const res = await starShipsAPI.getStarShips(url)

        // @ts-ignore
        dispatch(getOneStarShipAC(res))
        // dispatch(setAppStatusAC('succeeded'))
    }
    catch(error) {
        dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
        // dispatch(setAppStatusAC('failed'))
    }
}



//types
type ActionsType =
    | ReturnType<typeof getFilm5AC>
    | ReturnType<typeof getStarShipsLinksAC>
    | ReturnType<typeof getOneStarShipAC>
    | ReturnType<typeof getCheckedStarShipAC>


type ThunkDispatch = Dispatch<ActionsType | SetAppErrorActionType>


// | SetAppStatusActionType | SetAppErrorActionType