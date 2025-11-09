import { name } from "ejs";
import express from "express";
const port = 8000;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded());

const people = [
{
  name: "John",
  surname: "Doe",
}, 
{
  name: "Mateusz",
  surname: "Nowak",
}];

app.get("/", (req, res) => {
  res.render("home", {
    title: "Członkowie klubu:",
    people: people
  });
});

app.get("/form", (req, res) => {
  res.render("form", {
    title: "zapisz się do naszego klubu",
    people: people
  });
});

app.post("/form_validation", (req, res) => {
        addPeople({
          name: req.body.name,
          surname: req.body.surname,
        });
        console.log("added ", req.body.name, req.body.surname);
        res.redirect(`/`);
});

app.get("/about", (req, res) =>{
  res.render("about");
});

function addPeople(person){
  people.push(person);
};

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
