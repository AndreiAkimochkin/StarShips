import React from 'react';
import {Checkbox} from "@material-ui/core";

type PropsType = {
    value: string | boolean
    onChange: () => void
}

export const InputComponent: React.FC<PropsType> = React.memo(({value, onChange}) => {
    return (
        <Checkbox
            color="primary"
            checked={!!value}
            onChange={onChange}
            readOnly={false}
        />
    )
})
