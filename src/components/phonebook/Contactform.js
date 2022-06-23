import React from "react";
import CustomImput from "../../basic-components/CustomInput";
import CustomButton from "../../basic-components/CustomButton";
import '../../Style/Phonebook.css';

export default function Contactform(props){

       const {userDetails,onchangeHandler,saveContactDetails} = props;

    return (<div>
        <h1>PhoneBook Application</h1>
        <CustomImput placeholder="Type Name" value={userDetails.name} onChangeHandler={(e)=>{onchangeHandler("name",e)}}/>
        <br/><br/>
        <CustomImput placeholder="Type Number" value={userDetails.phone} onChangeHandler={(e)=>{onchangeHandler("phone",e)}}/>
        <br/><br/>
        <CustomButton width="100px" btnName="Add Contact" onClickHandler={saveContactDetails}/>
           </div>)
}