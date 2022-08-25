<template>
  <div id="home">
    <div class="well">
        <h4> Create User </h4>
        <div class="form-group">
          <label class="pull-left"> First Name </label>
          <input type="text" class="form-control" v-model="nCreate.first_name"></div><br>
        <div class="form-group">
          <label class="pull-left"> Last Name </label>
          <input type="text" class="form-control" v-model="nCreate.last_name"></div><br>
        
        <button id="create-btn" type="submit" class="btn btn-large btn-block btn-primary full-width" @click="addToAPI">Create</button><br><br>
      </div>
      
    <table id="table" class="table table-striped table-borderes">
      <thead>
        <tr>
          <th class="center">ID</th>
          <th class="center">First Name</th>
          <th class="center">Last Name</th>
        </tr>
      </thead>
      <tbody >
        <tr v-for="dbUser in nUser" :key="dbUser.id">
          <td class="center">{{ dbUser._id }}</td>
          <td class="center">{{ dbUser.first_name }}</td>
          <td class="center">{{ dbUser.last_name }}</td>
          <button id="update-btn" type="submit" class="btn btn-large btn-block btn-primary full-width" @click="updateToAPI(dbUser._id,nCreate.first_name,nCreate.last_name)">Update</button>
          <button id="delete-btn" type="submit" class="btn btn-large btn-block btn-primary full-width" @click="DeleteToAPI(dbUser._id)">Delete</button>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';

export default {
  name: 'HomeView',
  data() {
    return {
      nCreate:{
        first_name:"",
        last_name:"",
      },
      nUser:{
        _id:"",
        first_name:"",
        last_name:"",
      },
    }
  },
  mounted() {
    axios.get('http://localhost:3000/all')
      .then((response) => {
        console.log(response.data);
        this.nUser = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
  },
  methods:{
    
  DeleteToAPI(delID){
      axios.delete('http://localhost:3000/delete/'+ delID)
        .then((response)=>{
          console.log(response);
        })
        .catch((err)=>{
          console.log(err);
        });
        window.location.reload();
    },

  addToAPI(){
      let register={
        first_name:this.nCreate.first_name,
        last_name:this.nCreate.last_name,
      }
      axios.post('http://localhost:3000/create', register)
        .then((response)=>{
          console.log(response);
          })
        .catch((err)=>{
          console.log(err);
        });
        window.location.reload();
    },
  updateToAPI(theID,firstName,lastName){
    let LastUpdated={
      first_name:firstName,
      last_name:lastName,
    }
    axios.put('http://localhost:3000/update/'+ theID ,LastUpdated)
      .then((response)=>{
        console.log(response);
        })
      .catch((err)=>{
        console.log(err);
      });
      window.location.reload();
    },
  
  },
  


  
  
}
</script>

<style>
#table{
  padding-top: 15px;
  margin-left: 500px;
  text-align: center;
}
td { 
    padding-top: 10px;
    text-align: center;
}
th { 
    padding-left: 35px;
    text-align: center;
}
#delete-btn { 
    padding-top: 10px;
}
#create-btn { 
    padding-top: 10px;
}
#update-btn{
    padding-top: 10px;
}


</style>