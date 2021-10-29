import React, { useState } from "react";

const ToggleButton = () => {

    const [state, setState] = useState(false)
    return (
        <button onClick={() => { setState(prevState => !prevState)}}>{state ? "true" : "false"}</button>
    )
}

export default ToggleButton