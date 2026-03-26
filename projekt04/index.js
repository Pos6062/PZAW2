
import cookieParser from "cookie-parser";
import { name } from "ejs";
import { DatabaseSync } from "node:sqlite";
import express from "express";

import settings from "./settings.js";
// import session from "./models/session.js";
// import auth from "./controllers/auth.js";

 const port = process.env.PORT || 8000;
// const SECRET = process.env.SECRET;
// if (SECRET == null) {
//   console.error(
//     "SECRET environment variable missing. Please create an env file or provide SECRET via environment variables."
//   );
//   process.exit(1);
// }

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(settings.settingsHandler);

const db_path = "./db.sqlite";
const db = new DatabaseSync(db_path);

console.log("Creating database tables");
db.exec(
  `CREATE TABLE IF NOT EXISTS czlonkowie (
    id             INTEGER PRIMARY KEY,
    fname          TEXT NOT NULL,
    lname          TEXT NOT NULL
  ) STRICT;`
);

/////////////////////////

const usersDB = new DatabaseSync(db_path);
console.log("Creating users db")
usersDB.exec(
  `CREATE TABLE IF NOT EXISTS users (
    id             INTEGER PRIMARY KEY,
    fname          TEXT NOT NULL,
    lname          TEXT NOT NULL
  ) STRICT;`
)

////////////////////////

const insert = db.prepare('INSERT INTO czlonkowie (fname, lname) VALUES (?, ?)');
const update_query = db.prepare('UPDATE czlonkowie SET fname = ?, lname = ? WHERE id = ?');
const remove_query = db.prepare('DELETE FROM czlonkowie WHERE id = ?;');
const empty = db.prepare('DELETE FROM czlonkowie WHERE 1;')
const populate = db.prepare("INSERT INTO czlonkowie (fname, lname) VALUES ('Oliwier', 'Bokemon'), ('Antoni', 'Chruściel'), ('Antoni', 'Jacko');");


//;kvjksdfghjs


const settingsRouter = express.Router();
settingsRouter.use("/toggle-theme", settings.themeToggle);
app.use("/settings", settingsRouter);

// const authRouter = express.Router();
// authRouter.get("/signup", auth.signup_get);
// authRouter.post("/signup", auth.signup_post);
// authRouter.get("/login", auth.login_get);
// authRouter.post("/login", auth.login_post);
// authRouter.get("/logout", auth.logout);
// app.use("/auth", authRouter);

function settingsLocals(req, res, next) {
  res.locals.app = settings.getSettings(req);
  res.locals.page = req.path;
  next();
}
app.use(settingsLocals);

//asudhjasdia

app.get("/", (req, res) => {
  const query = db.prepare('SELECT * FROM czlonkowie ORDER BY id');
  const people = query.all();

//----

//     if (res.locals.app.cookie_consent && req.cookies[LAST_VIEWED_COOKIE]) {
//     let last_viewed = req.cookies[LAST_VIEWED_COOKIE]?.split(",") || [];
//     last_viewed_categories = last_viewed
//       .map((x) => parseInt(x, 10))
//       .filter((x) => !isNaN(x))
//       .map((id) => flashcards.getCategorySummary(id));
//   }

// //----

  res.render("home", {
    title: "Członkowie klubu:",
    people: people,
    db: db
    // theme: "dark"
  });
});

app.get("/form", (req, res) => {
  res.render("form", {
    title: "zapisz się do naszego klubu"
  });
});

app.get("/edit", (req, res) => {
  const query = db.prepare('SELECT * FROM czlonkowie ORDER BY id');
  const people = query.all();
  res.render("edit", {
    title: "Edytuj użytkowników",
    people: people
  });
});

app.post("/form_validation", (req, res) => {
          var name = req.body.name;
          var surname = req.body.surname;
          insert.run(name, surname);
        console.log("added ", req.body.name, req.body.surname);
        res.redirect(`/`);
});
app.post("/edit/values", (req, res) => {
          var name = req.body.fname;
          var surname = req.body.lname;
          var id = Number(req.body.id);
          var update = req.body.update;
          var remove = req.body.delete;
          if(update){
            update_query.run(name, surname, id);
            console.log("updated ", req.body.fname, req.body.lname);
          }
          if(remove){
            remove_query.run(id);
            console.log("removed ", req.body.fname, req.body.lname);
          }
        res.redirect(`/`);
});

app.get("/about", (req, res) =>{
  res.render("about");
});

app.get("/populate",  (req, res) =>{
  res.render()
  });

app.get("/user_signup", (req, res) =>{
  res.render("signup", {
    title: "aaaaaaaaaaaaaaaaaaaaaaaaaaa"
  });
})
app.get("/user_login", (req, res) =>{
  res.render("login", {
    title: "hentai"
  });
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

if (process.env.POPULATE_DB) {
  console.log("Populating db...");
  empty.run();
  populate.run();
}

