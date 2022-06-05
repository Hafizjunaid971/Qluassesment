import React from 'react'

export default function Item({text, remove, update}) {
    return (
        <div className="item">
            <div className="text">{text}</div>
            <div className="icons">
                <i className="update"  onClick={update}>update</i>
                <i className="delete" onClick={remove}>Delete</i>
            </div>
        </div>
    )
}
