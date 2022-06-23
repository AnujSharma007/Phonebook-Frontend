import React from "react";
import CustomImput from "../../basic-components/CustomInput";
import Phonebook from "./Phonebook";
import CustomButton from "../../basic-components/CustomButton";
import Card from "../../basic-components/Card";


export default function ContactList(props){

    const { contactList ,deleteContactDetails,filterContactList, editContactDetails, editId, updateContactDetails, saveUpdatedContactDetails, edituserDetails } = props;

    return(<div>
        <CustomImput placeholder="Search Contact" width="350px" onChangeHandler={filterContactList}/>
        <br/>
        <div className="wrapper-div">
        {contactList && contactList.length > 0 ? 
         contactList.map((val)=>{
           return (<div className="contact-details" key={val._id} >
                  <div key={val._id}>
                      <Card phone={val.phone} name={val.name}  isEditable={editId === val._id}  edituserDetails={edituserDetails}  onChangeHandler={updateContactDetails} editContactDetails={editContactDetails}/>
                  </div>
                  {editId===val._id
                  ?
                  <CustomButton btnName="Save" width="80px" bgcolor="rgb(101, 211, 101)" onClickHandler={saveUpdatedContactDetails}/>
                  :
                  <div>
                  <CustomButton btnName="Edit" width="80px" bgcolor="#044cd0" onClickHandler={()=>editContactDetails(val._id,val.name,val.phone)}/>
                  <CustomButton btnName="Delete" width="80px" bgcolor="#d72503" onClickHandler={()=>deleteContactDetails(val._id)}/>
                  </div>
                  }
                  <a href={`${val.phone}`}>call</a>          
                  </div>)
    })
    :
    <p>No details are available</p>    
    }
        </div>
        
    </div>)
}