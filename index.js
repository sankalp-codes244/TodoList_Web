import express  from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded ({extended:true}));
app.use("/public",express.static("public"));
// function validateForm() {
//     inputToDo  = toDos.length +1;
//     inputTask = "abc"
// }

let toDos = [
];

app.get("/", (req, res) => {
    res.render("index.ejs", {data : toDos });
});
app.post("/", (req, res) => {
    const inputTask = req.body["taskName"];
    const inputDescription = req.body["taskDescription"];
    toDos.push({
            toDoTask : inputTask,
            toDoDescrption : inputDescription,
    });
    res.render("index.ejs", { data : toDos});
});

app.post("/delete", (req, res) => {
    const requestedToDoId = req.body["toDoId"];
    
    // Find the index of the task with the given ID
    const indexToRemove = toDos.findIndex(todo => todo.id === requestedToDoId);
    
    // If the task is found, remove it from the array
    if (indexToRemove !== -1) {
        toDos.splice(indexToRemove, 1);
    }

    // Redirect to the home page
    res.redirect("/");
});


app.post("/clear", (req, res) => {
    toDos = []
    res.render("index.ejs");
    res.redirect("/")
});


app.listen(port, () => {
    console.log(`Listening on port  number ${port}`);
})