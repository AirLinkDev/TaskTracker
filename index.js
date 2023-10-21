import express from "express";
import bodyParser from "body-parser";
import { mongoose } from "mongoose";
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); 


const uri = "mongodb://127.0.0.1:27017/todolistDB";
mongoose.connect(uri);
const itemsSchema = new mongoose.Schema({
      task: String,
      date: Date,
      isDone: Boolean
});
const Item = mongoose.model("Item",itemsSchema);
/*
const laundry = new Item({
  task: "laundry",
  date: new Date()
});

const filter = new Item({
  task: "change filter",
  date: new Date()
});

const breakfast = new Item({
  task: "make breakfast",
  date: new Date()
});
*/
/*
await Item.insertMany([
 laundry,filter,breakfast
]);*/

/* Write your code here:
Step 1: Render the home page "/" index.ejs
*/
app.get("/", async(req, res) => {
  const tasks = await Item.find();
  const data = {
    Tasks: tasks
  }
  console.log("DB retreived tasks: "+JSON.stringify(data));
  res.render("index.ejs",data);
});
/*
Step 2: Make sure that static files are linked to and the CSS shows up.
*/

/*

*/
app.get("/workTask", async (req, res) => {
  data = await Item.find();
  console.log("DB retreived tasks: "+JSON.stringify(data.Tasks));
  res.render("index.ejs",data);
});

/*
The list of tasks created by the user has session lifespan
I've elected to maintain the array of task objects at the server
because i'm not sure if the locals.tasks would not be reset with every page reload
*/
app.post("/submit",async (req, res) => {
  /* 
  Assemble incoming variables into task object
  */
 console.log("Received new task: ",req.body.Task);
 console.log("Received new deadline: "+req.body.DueDate+"T"+req.body.DueTime);
 const myDate = req.body.DueDate+"T"+req.body.DueTime;
  const task = new Item({
    
    task : req.body.Task,
    date : myDate,
    isDone  : false
  });
  
  await task.save();

  const tasks = await Item.find();
  
  const data = {
    Tasks: tasks
  }
  console.log("DB retreived tasks: "+JSON.stringify(data));
  res.render("index.ejs",data); 
  });

  app.post("/delete",async (req, res) => {
    await Item.deleteOne({_id : req.body.checkbox});
    const tasks = await Item.find();
  
    const data = {
      Tasks: tasks
    }
   console.log("Req.body.checkbox: ",req.body+" deletd");
   res.render("index.ejs",data); 
    });

app.listen(port, () => {
  
  console.log(`Server running on port ${port}`);
});
