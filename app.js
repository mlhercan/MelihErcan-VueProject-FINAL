const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./model/blogs')
const app = express()
app.use(express.json());
var cors = require('cors')

app.use(cors())

const dbURL= 'mongodb+srv://melih:melih@cluster0.hnx2xy2.mongodb.net/myDatabase?retryWrites=true&w=majority'
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })

app.get('/', (req, res) => { 
  console.log("Working")
  res.send('This is homepage. Use this directions to make some operations [/all , /create , /single , /update , /delete ] For example ---> http://localhost:3000/all')
})

app.post('/create', async(req, res) => { 
  try{
    const post = req.body
    const createdPost=await Blog.create(post)
    res.status(201).json(createdPost)
  } catch(err) {
      console.log("Creation failed!")
      console.log(err)
      }
  })

app.get('/all', (req, res) => { 
  Blog.find()                 
      .then((result) => {
        console.log("Showing all the data!") 
        res.send(result)
      })
      .catch((err) => {
        console.log("Cannot show all data!")
        console.log(err)
      })
})

app.get('/single/:id', async(req,res)=>{
  try{
    const {id} = req.params
    const post = await Blog.findById(id)

    if(!post)return 
    res.status(200).json(post)

  } catch(err){
      console.log(err)
  }
})

app.put('/update/:id', async (req,res)=>{
  try{
    const {id} = req.params
    const {first_name, last_name} = req.body

    if(!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send('Post not found.')

    const updatedPost = {first_name, last_name, _id:id}
    await Blog.findByIdAndUpdate(id,updatedPost,{new:true})
    res.json(updatedPost)
  } catch(err){
      console.log(err)
  }
})

app.delete('/delete/:id', async (req, res) => {
  try{
    const {id} = req.params
    const post = await Blog.findByIdAndRemove(id)
    res.json('Post deleted.')

  } catch(err){
      console.log(err)
  }
})

app.listen(3000)