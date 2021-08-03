import React from 'react';

export const InputComponent = ({value, onChange}: any) => {
    return (
        <input
            type="checkbox"
            checked={!!value}
            onChange={onChange}
            readOnly={false}
        />
    )
}
