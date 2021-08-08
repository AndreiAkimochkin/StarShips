import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import style from './StarShip.module.css'
import {getOneStarShipTC, getStarShipsLinksTC} from "../reducers/film-reducer";
import {StarShipType} from "../reducers/Types";
import {Ship} from "./Ship";
import {RequestStatusType} from "../reducers/app-reducer";
import {Button, CircularProgress, NativeSelect, } from "@material-ui/core";

export const ShipsList = React.memo(() => {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const links = useSelector<AppRootStateType, string[]>(state => state.film5.starShips)
    const shipsInfoData = useSelector<AppRootStateType, StarShipType[]>(state => state.film5.starShipsInfo)
    const [runOnce, setRunOnce] = useState(true)
    const [comparisonMode, setComparisonMode] = useState(false)
    const [optionValue, setOptionValue] = useState("Crew")

    const shipsInfo = shipsInfoData.filter(el => {//Unpicked if value is unknown
        switch (optionValue) {
            case("Crew"):
                return el.crew !== 'unknown' && el.crew !== "n/a"
            case("Length"):
                return el.length !== 'unknown' && el.length !== "n/a"
            case("Passengers"):
                return el.passengers !== 'unknown' && el.passengers !== "n/a"
            case("Max_speed"):
                return el.max_atmosphering_speed !== 'unknown' && el.max_atmosphering_speed !== "n/a"
            default:
                return true
            }})
        
    useEffect(() => {
        dispatch(getStarShipsLinksTC())
    }, [dispatch])

    useEffect(() => {
        if (links.length && runOnce) {
            links.map((el) => {
                return dispatch(getOneStarShipTC(el))
            })
            return setRunOnce(false)
        }
    }, [links, dispatch, runOnce, setRunOnce])

    // Get unpicked StarShips
    const vehicle = shipsInfo?.map((el: StarShipType) => {
        return (
            <div key={el.created}>
                <Ship isSortedValue={false} info={el} mode={comparisonMode}/>
            </div>
        )
    })

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setOptionValue(e.target.value)
    }

    const sorted = (sortBy: string) => { // Get sorted StarSips`s characters from max to min value
        if (shipsInfo) {
            switch (sortBy) {
                case("Crew"):
                    return shipsInfo.sort((a: StarShipType, b: StarShipType) => +b.crew - +a.crew)
                case("Length"):
                    return shipsInfo.sort((a: StarShipType, b: StarShipType) => +b.length - +a.length)
                case("Passengers"):
                    return shipsInfo.sort((a: StarShipType, b: StarShipType) => +b.passengers - +a.passengers)
                case("Max_speed"):
                    return shipsInfo.sort((a: StarShipType, b: StarShipType) => +b.max_atmosphering_speed - +a.max_atmosphering_speed)
                default:
                    return shipsInfo
            }
        }
        return
    }
    // Get picked StarShips for comparison
    const selectedVehicle = sorted(optionValue)?.filter(el=>el.shipHasBeenChecked).map((el: StarShipType, index) => {
               return (
                <div key={el.created}>
                    <Ship isSortedValue index={index} optionValue={optionValue} info={el} mode={comparisonMode}/>
                </div>
            )
    })

    //Loading circle
    if (status === 'loading') {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div>
            <div className={style.p}>All StarShips from film №5</div>
            {comparisonMode ? selectedVehicle : vehicle}
            <Button variant="contained" color= {!comparisonMode ? "primary" : "secondary" }
                    onClick={() => setComparisonMode((prev: boolean) => !prev)}>
                {!comparisonMode ? "Compare picked StarShips by" : "Go Back"}
            </Button>
            <NativeSelect variant='filled' onChange={handleChange}>
                <option value="Crew">Crew</option>
                <option value="Length">Length</option>
                <option value="Passengers">Passengers</option>
                <option value="Max_speed">Max_speed</option>
            </NativeSelect>
        </div>
    )
})