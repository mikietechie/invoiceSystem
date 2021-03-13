import React from "react";

const ButtonComponent = props => {
    return(
        <button className={props.classes} onClick={()=>{props.clickHandler()}}>{props.text}</button>
    )
}
export default ButtonComponent