import React from 'react';
import {getCheckedStarShipAC} from "../reducers/film5-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {InputComponent} from "./InputComponent";
import {StarshipType} from "../reducers/Types";

type PropsType = {
    url: string
    info: StarshipType
}
export const Ship = (props: PropsType) => {
    const dispatch = useDispatch()
    const oneLink = useSelector<AppRootStateType, any>(state => state.film5.starships)

    const setShipChecked = (urlAsID: string) => {
        dispatch(getCheckedStarShipAC(urlAsID))
    }

    if (!props.info) {
        return <>Loading...</>
    }

    return (
        <>
            <div>name: <b>{props?.info?.name}</b></div>
            <InputComponent value={props.info.shipHasBeenChecked} onChange={() => setShipChecked(props.info.url)}/>
        </>
    );
}