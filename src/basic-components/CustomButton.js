import React from "react";
import '../../src/Style/Phonebook.css';

export default function CustomImput(props){
    const {btnName , onClickHandler , bgcolor , width} = props;

    return (<div>
        <button className="add-btn" onClick={onClickHandler} style={{backgroundColor:bgcolor , width:width}}>{btnName}</button>
    </div>)

}