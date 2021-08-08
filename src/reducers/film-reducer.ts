import {Dispatch} from 'redux';
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {film5API, starShipsAPI} from "../api/api";
import {StarShipType} from "./Types";

const initialState = {
    status: '',
    data: '',
    starShips: [] as string[],
    starShipsInfo: [] as StarShipType[]
}

type InitStateType = typeof initialState

export const film5Reducer = (state: InitStateType = initialState, action: ActionsType): InitStateType  => {
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
                starShips: action.data
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
            return {
                ...state,
                starShipsInfo: [
                    ...state.starShipsInfo,
                    data
                ]
            }
        }
        case 'GET_CHECKED_STARSHIP': {
            const data = state.starShipsInfo.map((el: StarShipType) => {
                return el.url === action.data ? {...el, shipHasBeenChecked: !el.shipHasBeenChecked} : el
            })
            return {
                ...state,
                starShipsInfo: data
            }
        }
        default:
            return state
    }
}

// actions
export const getFilm5AC = (data: string) => ({type: 'GET_FILM5', data} as const);
export const getStarShipsLinksAC = (data: string[]) => ({type: 'GET_STARSHIPS_LINKS', data} as const);
export const getOneStarShipAC = (data: any) => ({type: 'GET_ONE_STARSHIP', data} as const);
export const getCheckedStarShipAC = (data: string) => ({type: 'GET_CHECKED_STARSHIP', data} as const);

// thunks
export const getStarShipsLinksTC = () => async (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res= await film5API.getFilm5API()
            dispatch(getStarShipsLinksAC(res.data.starships))
            dispatch(setAppStatusAC('succeeded'))
        } catch(error) {
            dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
            dispatch(setAppStatusAC('failed'))
        }
}

export const getOneStarShipTC = (url: string) => async (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await starShipsAPI.getStarShips(url)
        dispatch(getOneStarShipAC(res))
        dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
        dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
        dispatch(setAppStatusAC('failed'))
    }
}

//types
type ActionsType =
    | ReturnType<typeof getFilm5AC>
    | ReturnType<typeof getStarShipsLinksAC>
    | ReturnType<typeof getOneStarShipAC>
    | ReturnType<typeof getCheckedStarShipAC>

type ThunkDispatch = Dispatch<ActionsType | SetAppErrorActionType  | SetAppStatusActionType >