import React from 'react';

export default function PlayApp(props) {
    return (
        <div className="PlayApp">
            <h2>{props.App}</h2>
            <div>{props.Category}</div>
            <div>{props.Rating}</div>
            <div>{props.Price}</div>
        </div>
    )
}