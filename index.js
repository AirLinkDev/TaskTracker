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

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]
  });
const List = mongoose.model("List",listSchema);

const item1 = new Item({
  task: "Welcome to your todo list!",
  date: new Date()
});

const item2 = new Item({
  task: "Hit the + button to add a new item",
  date: new Date()
});

const item3 = new Item({
  task: "<-- Hit this to delete an item>",
  date: new Date()
});

const defaultItems = [item1,item2,item3];
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
  //console.log("DB retreived tasks: "+JSON.stringify(data));
  res.render("index.ejs",data);
});
//My Router:
app.get("/:customListName", async(req, res) => {
  console.log("Route: "+req.params.customListName);
  const tempList = await List.findOne({name : req.params.customListName});
  if(tempList){
  console.log("we found a "+req.params.customListName+" list: ");
  }else{
    console.log("we created a "+req.params.customListName+" list: ");
  const list = new List({
    name: req.params.customListName,
    items: defaultItems
  })
  list.save();

}
const tasks = await List.findOne({name : req.params.customListName});
const data = {
  Tasks: tasks.items
}
console.log("DB retreived task.items: "+JSON.stringify(data));
res.render("index.ejs",data);
  /*
  const tasks = await Item.find();
  const data = {
    Tasks: tasks
  }
  console.log("DB retreived tasks: "+JSON.stringify(data));
  res.render("index.ejs",data);
  */
});
/*
Step 2: Make sure that static files are linked to and the CSS shows up.
*/

/*

*/


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
    //Could also have used <ModelName>.findByIdAndRemove(<Id>)
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
