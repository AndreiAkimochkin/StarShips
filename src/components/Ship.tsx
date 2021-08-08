import React from 'react';
import ship from './Ship.module.css'
import {getCheckedStarShipAC} from "../reducers/film-reducer";
import {useDispatch} from "react-redux";
import {InputComponent} from "./InputComponent";
import {StarShipType} from "../reducers/Types";

type PropsType = {
    info: StarShipType
    mode: boolean
    isSortedValue: boolean
    index?: number
    optionValue?: string
}
export const Ship: React.FC<PropsType> = React.memo(({info, mode, isSortedValue, index, optionValue}) => {
    const dispatch = useDispatch()
    const setShipChecked = (urlAsID: string) => {
        dispatch(getCheckedStarShipAC(urlAsID))
    }

    if (!info) {
        return <>Loading...</>
    }

     const nameStyle = isSortedValue && index === 0 ? ship.firstName : ship.name;
        return (
        <div className={ship.wrapper}>
            <div><InputComponent value={info.shipHasBeenChecked} onChange={() => setShipChecked(info.url)}/>
                name: <b>{info?.name}</b>
            </div>
            {mode ? <div >
                    <div>crew: <b className={optionValue === "Crew" ? nameStyle : ''}>{info?.crew}</b></div>
                    <div>length: <b className={optionValue === "Length" ? nameStyle : ''}>{info?.length}</b></div>
                    <div>passengers: <b className={optionValue === "Passengers" ? nameStyle : ''}
                    >{info?.passengers}</b></div>
                    <div>max_atmosphering_speed: <b className={optionValue === "Max_speed" ? nameStyle : ''}
                    >{info?.max_atmosphering_speed}</b></div>
                </div>
                : ''}
        </div>
    );
})