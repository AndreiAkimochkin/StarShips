import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {Ship} from "./ship";
import {getOneStarShipAC, getStarShipsLinksTC} from "../reducers/film5-reducer";
import {StarshipType} from "../reducers/Types";
import axios from "axios";
import {ResponseDataType} from "../api/api";

export const ShipsList = () => {
    const dispatch = useDispatch()
    const links = useSelector<AppRootStateType, any>(state => state.film5.starships)
    const shipsInfo = useSelector<AppRootStateType, any>(state => state.film5.starshipsInfo)
    const [runOnce, setRunOnce] = useState(true)
    const [comparationMode, setComparationMode] = useState(false)
    useEffect(() => {
        dispatch(getStarShipsLinksTC())
    }, [])

    useEffect(() => {
        if (links.length && runOnce) {
            links.map((el: any) => {
                return axios.get<ResponseDataType>(el).then(res => {
                    // @ts-ignore
                    dispatch(getOneStarShipAC(res.data))
                })
            })
            setRunOnce(false)
        }
    }, [links])

    const vehicle = shipsInfo?.map((el: StarshipType) => {
        return (
            <div key={el.url}>
                <Ship url={el.url} info={el} />
            </div>
        )
    })
    const selectedVehicle = shipsInfo?.map((el: StarshipType) => {
        if (el.shipHasBeenChecked) {
            return (
                <div key={el.url}>
                    <Ship url={el.url} info={el} />
                </div>
            )
        }
    })
    return (
        <>
            {comparationMode ? selectedVehicle : vehicle}
            <button onClick={() => setComparationMode((prev: boolean) => !prev)}>
                {selectedVehicle ? "Compare picked StarShips" : "Go Back"}
            </button>
        </>
    )
}