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
}
export const Ship: React.FC<PropsType> = React.memo(({info, mode, isSortedValue, index}) => {
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
            {mode ? <div className={nameStyle}>
                    <div>crew: <b>{info?.crew}</b></div>
                    <div>length: <b>{info?.length}</b></div>
                    <div>passengers: <b>{info?.passengers}</b></div>
                    <div>max_atmosphering_speed: <b>{info?.max_atmosphering_speed}</b></div>
                </div>
                : ''}
        </div>
    );
})