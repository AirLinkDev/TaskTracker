import express from "express";

const app = express();
const port = 3000;

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
  Hint: Check the nav bar in the header.ejs to see the button hrefs
Step 4: Add the partials to the about and contact pages to show the header and footer on those pages. 

ans: I added <%- include(“header.ejs”)%> to the ejs of about and contact
*/

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
