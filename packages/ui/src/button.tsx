import React from 'react'

interface button {
    text: string
}

function Button({ text }: button) {
    return (
        <button>{text}</button>
    )
}

export default Button
