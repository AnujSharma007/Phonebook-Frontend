import React from "react";
import '../../src/Style/Phonebook.css';

export default function CustomInput(props){
    const {value , onChangeHandler , placeholder , width} = props;

    return (<div>
        <input className="custom-input" placeholder={placeholder} value={value} onChange={onChangeHandler} style={{width:width}}/>
    </div>)

}