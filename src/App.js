import logo from './logo.svg';
import './App.css';
import {Button, Table ,Modal, Input} from 'antd'
import React, { useState } from 'react'
import {EditOutlined,DeleteOutlined} from'@ant-design/icons'
function App() {

const [editing, setEditing] = useState(false);
const [editingUser, setEditingUser] = useState(null)
const[dataSource , setDataSource] = useState([
{
  id:'1',
  name:'Riya',
  email:'riya@gmail.com',
  address:'ahmedabad'
},
{
  id:'2',
  name:'Vishwa',
  email:'vishwa@gmail.com',
  address:'ahmedabad'
},
{
  id:'3',
  name:'Saxi',
  email:'saxi@gmail.com',
  address:'ahmedabad'
},
{
  id:'4',
  name:'Het',
  email:'het@gmail.com',
  address:'ahmedabad'
},
])

  const columns = [{
    key:"1",
    title : 'Id',
    dataIndex:'id'
  },
  {
    key:"2",
    title : 'Name',
    dataIndex:'name'
  },
  {
    key:"3",
    title : 'Email',
    dataIndex:'email'
  },
  {
    key:"4",
    title : 'Address',
    dataIndex:'address'
  }, 
{
id:'5',
title : "Actions",
render: (record)=>{
 return (<>
<EditOutlined style={{color:'blue'}} onClick={()=>handleEdit(record)}/>
<DeleteOutlined style={{color:'red',marginLeft:'12px'}} onClick={()=> handledelete(record)}/>
  </>)
}
}
]

const handleEdit =(record)=> {
setEditing(true);
setEditingUser({...record})
}

const handledelete =(record) => {
  Modal.confirm({
    title:'Sure, you want to delete this record?',
    okText:'Yes',
    okType:'danger',
    onOk:()=> {
      setDataSource((pre) =>  {return pre.filter((id) => id.id !== record.id)})
    },
  })
}

const handleAddUser = () => {
  const randomNumber = parseInt(Math.random()*1000)
  const newUser = {
    id:randomNumber,
  name:'Name'+ randomNumber,
  email:randomNumber+ '@gmail.com',
  address:'address'+randomNumber
  }
  setDataSource(pre => {
    return [...pre,newUser]
  })
}

const resetEditing = ()=>{
  setEditing(false)
  setEditingUser(null)
}
  return (
    <div className="App">
      <Button onClick={handleAddUser}>Add user</Button>
     <Table
      columns = {columns}
      dataSource={dataSource}
     />
   <Modal
   title="Edit user"
   visible={editing}
   okText="Save"
   onCancel={()=>{
     resetEditing()
    }
  }
   onOk={() => {
    setDataSource(pre => {
      return pre.map(user => {
        if(user.id === editingUser.id){
          return editingUser;
        }
        else{
         return user;
        }
      })
    }) 
    resetEditing()}}
   >
<Input value={editingUser?.name} onChange={(e)=>{
  setEditingUser(pre=>{
    return {...pre, name:e.target.value}
  })
}}/>
<Input value={editingUser?.email} onChange={(e)=>{
  setEditingUser(pre=>{
    return {...pre, email:e.target.value}
  })
}} />
<Input value={editingUser?.address} onChange={(e)=>{
  setEditingUser(pre=>{
    return {...pre, address:e.target.value}
  })
}}/>
    </Modal>
    </div>
  );
}

export default App;
