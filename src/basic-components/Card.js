import React from "react";
import '../../src/Style/Phonebook.css';

function Card(props) {
    const {  name, phone, isEditable, onChangeHandler, userDetails,edituserDetails ,filtercontactDetails} = props;
    return (
        <div className="card-wrapper">
                {isEditable ? <input value={edituserDetails.name} onChange={(e) => onChangeHandler("name", e)} /> : <p >{name}</p>}
                {isEditable ? <input value={edituserDetails.phone} onChange={(e) => onChangeHandler("phone", e)} /> : <p >{phone}</p>}
            </div>
    )
}

export default Card;
