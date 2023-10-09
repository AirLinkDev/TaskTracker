import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
var tasks = new Array();
/* Write your code here:
Step 1: Render the home page "/" index.ejs
*/
app.get("/", (req, res) => {

  res.render("index.ejs");
});
/*
Step 2: Make sure that static files are linked to and the CSS shows up.
*/
app.use(express.static("public")); 
/*

*/
app.get("/workTask", (req, res) => {
  res.render("workTask.ejs");
});

/*
The list of tasks created by the user has session lifespan
I've elected to maintain the array of task objects at the server
because i'm not sure if the locals.tasks would not be reset with every page reload
*/
app.post("/submit", (req, res) => {
  /* 
  Assemble incoming variables into task object
  */
 console.log("Received new task: ",req.body.Task);
 console.log("Received new deadline: ",req.body.DueDate);
  const task = {
    
    newTask : req.body.Task,
    dueDate : req.body.DueDate,
    isDone  : false
  };
  tasks.push(task);
  const data = {
    Tasks : tasks
  }
/*
Send all tasks up to the client 
*/
    res.render("index.ejs", data);  
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
