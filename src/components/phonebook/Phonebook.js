import React, { Component } from 'react';
import Contactform from './Contactform';
import ContactList from './ContactList';
import '../../Style/Phonebook.css';
import {getPhonebookData,postPhonebookData,putPhonebookData,deletePhonebookData} from '../../API/Phonebook';

class Phonebook extends Component {
    state = { contactList:[ ],

               backupContact:[ ],   
        
                 userDetails:{
                               name:"",
                               phone:""
                             },
                             edituserDetails:{
                                name:"",
                                phone:""
                              },

              filterContactList:[  ],

              editId:" "

             } 

    
    onchangeHandler(fieldName,event){
        const {userDetails} = this.state;
        userDetails[fieldName] = event.target.value;
        this.setState({userDetails:userDetails});
    }


    saveContactDetails(){
        const {contactList,userDetails,backupContact} = this.state;
        const initialdata = {name:"",phone:""}
        const regexforName = /^[a-zA-Z ]+$/;
        const regexforPhone = /^[0-9]{10}$/;
        const existingIndex = backupContact.findIndex(val=>val.phone===userDetails.phone);
        if(!(regexforName.test(userDetails.name) && regexforPhone.test(userDetails.phone) && existingIndex < 0)){
            return;
        }
        postPhonebookData(userDetails)
        .then(data=>{
            backupContact.push(data.result)
            this.setState({contactList:contactList, userDetails:initialdata, backupContact:backupContact});
        })
        
    }

   

    deleteContactDetails(id){
        const {contactList,backupContact} = this.state;
        deletePhonebookData(id).then(data=>{
        const updatedcontactlist = backupContact.filter((user)=>{ return user._id !== data.result._id});
        this.setState({contactList: updatedcontactlist,backupContact:updatedcontactlist});
        })
        
    }

    saveUpdatedContactDetails(){
        const{edituserDetails,editId,backupContact} = this.state;
        putPhonebookData(edituserDetails,editId).then(data=>{
            const updatedobj = {...data.result,...edituserDetails}
            const updatedIndex = backupContact.findIndex(val=>val._id===data.result._id)
            backupContact[updatedIndex] = updatedobj;
            this.setState({editId:" ",backupContact:backupContact,contactList:backupContact,edituserDetails:{name:"",phone:""}});
        })
        
    }

    updateContactDetails(fieldname,event){
        const{edituserDetails}=this.state;
        edituserDetails[fieldname] = event.target.value;
        this.setState({edituserDetails:edituserDetails})
    }

    editContactDetails(id,name,phone){
       
       let {edituserDetails} = this.state;
       edituserDetails = {
           name:name,
           phone:phone
       }
       this.setState({editId:id , edituserDetails:edituserDetails})

    }


    //search function
    filterContactList(event){
        const{ contactList ,backupContact } = this.state;
        let searchkey = event.target.value;
        const filterContactList = backupContact.filter((val)=>{ return (val.name).indexOf(searchkey)>=0 || String(val.phone).indexOf(searchkey)>=0});
        this.setState({contactList: filterContactList});
    }

    
    componentDidMount() {
        // fetch("http://localhost:5000/phonebook",{
        //     method:"GET",
        //     headers:{
        //         "Content-Type":"application/json"
        //     }
        // }).then((resp)=>resp.json())
        // .then(Phonebooklist=>{
        //     this.setState({backupContact:Phonebooklist.result , contactList:Phonebooklist.result});
        // }).catch(err=>{
        //     console.log(err)
        //     this.setState({backupContact:[],contactList:[]});
        // })


        getPhonebookData().then(Phonebooklist=>{
            this.setState({backupContact:Phonebooklist.result , contactList:Phonebooklist.result})
        }).catch(err=>{
            console.log(err)
            this.setState({ backupContact:[],contactList:[] })
        })
    }


    render() { 
        const {contactList ,userDetails ,editId, edituserDetails } = this.state;
       
        return (<div className='phonebook'>
            <Contactform userDetails={userDetails} onchangeHandler = {this.onchangeHandler.bind(this)}
            saveContactDetails={this.saveContactDetails.bind(this)}></Contactform>
            <ContactList contactList = {contactList} deleteContactDetails={this.deleteContactDetails.bind(this)}
           filterContactList = {this.filterContactList.bind(this)} editId={editId} editContactDetails={this.editContactDetails.bind(this)} 
           updateContactDetails={this.updateContactDetails.bind(this)} edituserDetails={edituserDetails} saveUpdatedContactDetails={this.saveUpdatedContactDetails.bind(this)} ></ContactList>
        </div>);
    }
}
 
export default Phonebook;