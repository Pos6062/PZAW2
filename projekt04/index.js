import cookieParser from "cookie-parser";
import { name } from "ejs";
import { DatabaseSync } from "node:sqlite";
import express from "express";
import argon2 from "argon2";

import settings from "./settings.js";
import { isStringObject } from "node:util/types";
import { cookie } from "express-validator";
// import session from "./models/session.js";
// import auth from "./controllers/auth.js";

// const port = 8000;
const port = process.env.PORT || 8000;
const SECRET = process.env.SECRET;
if (SECRET == null) {
  console.error(
    "SECRET environment variable missing. Please create an env file or provide SECRET via environment variables."
  );
  process.exit(1);
}
const PEPPER = process.env.PEPPER;
if (PEPPER == null) {
  console.error(
    `PEPPER environment variable missing.
     Please create an env file or provide PEPPER via environment variables.`,
  );
  process.exit(1);
}

const HASH_PARAMS = {
  secret: Buffer.from(PEPPER, "hex"),
};



const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(SECRET));
app.use(settings.settingsHandler);


const db_path = "./db.sqlite";
const db = new DatabaseSync(db_path);

console.log("Creating database tables");
db.exec(
  `CREATE TABLE IF NOT EXISTS hall (
    id             INTEGER PRIMARY KEY,
    fname          TEXT NOT NULL,
    lname          TEXT NOT NULL,
    author         TEXT 
  ) STRICT;`
);

/////////////////////////

const usersDB = new DatabaseSync(db_path);
console.log("Creating users db");
usersDB.exec(
  `CREATE TABLE IF NOT EXISTS users (
    id             INTEGER PRIMARY KEY,
    username        TEXT UNIQUE,
    passhash        TEXT,
    created_at      INTEGER
  ) STRICT;`
)


////////////////////////

const insert = db.prepare('INSERT INTO hall (fname, lname, author) VALUES (?, ?, ?)');
const update_query = db.prepare('UPDATE hall SET fname = ?, lname = ? WHERE id = ?');
const remove_query = db.prepare('DELETE FROM hall WHERE id = ?;');
const empty = db.prepare('DELETE FROM hall WHERE 1;')
const populate = db.prepare("INSERT INTO hall (fname, lname) VALUES ('Oliwier', 'Bokemon'), ('Antoni', 'Chruściel'), ('Antoni', 'Jacko');");

const addUser = usersDB.prepare('INSERT INTO users (username, passhash, created_at) VALUES (?, ?, ?)')
const checkUser = usersDB.prepare('SELECT * FROM users WHERE username = ?')
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
  const query = db.prepare('SELECT * FROM hall ORDER BY id');
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
  let user = req.signedCookies["user"];
  res.render("home", {
    title: "The hall of fame",
    people: people,
    db: db,
    user: user
    // theme: "dark"
  });
});

app.get("/form", (req, res) => {
  res.render("form", {
    title: "Add a person to the hall of fame"
  });
});

app.get("/edit", (req, res) => {
  const query = db.prepare('SELECT * FROM hall ORDER BY id');
  const people = query.all();
  const user = req.signedCookies["user"];
  res.render("edit", {
    title: "Edytuj użytkowników",
    people: people,
    user
  });
});

app.post("/form_validation", (req, res) => {
          var name = req.body.name;
          var surname = req.body.surname;
          insert.run(name, surname, req.signedCookies["user"]);
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
  res.render();
  });



////////////////////////////////////////



app.get("/user_signup", (req, res) =>{
  res.render("signup", {
    title: "Sign in",
        err: "test",
  });
})

app.get("/user_login", (req, res) =>{
  res.render("login", {
    title: "Log in",

  });
})

app.post("/auth/signup", async (req, res) =>{
  const username = req.body.username;
  const password = req.body.password;

  let existing_user = checkUser.get(username);
  console.log(existing_user);

  if (existing_user === null || existing_user === undefined) {
    const passhash = await argon2.hash(password, HASH_PARAMS);
    addUser.run(username, passhash, Date.now());
    res.redirect(`/`);
  }
})

app.post("/auth/login", async (req, res) =>{
  const username = req.body.username;
  const password = req.body.password;

  const auth_data = checkUser.get(username);
  if(auth_data !== undefined){
    const valid = await argon2.verify(auth_data.passhash, password, HASH_PARAMS)
    if(valid){
      res.cookie("user", username, 
        {
          maxAge: 3600000, 
          httpOnly: true, 
          signed: true,
        });
      console.log("logged in");
      res.redirect(`/`);
    
    }
    else{
      console.log("bledne hasło lub nazwa")
    }
  }
  else{
      res.redirect(`/user_login`);
  }
  
})

app.get("/user_login", (req, res) =>{
  res.render("login", {
    title: "login"
  });
})

app.get("/user_logout", (req, res) =>{
  res.clearCookie("user", { signed: true, httpOnly: false, path: "/" });
  res.redirect("/");
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

if (process.env.POPULATE_DB) {
  console.log("Populating db...");
  empty.run();
  populate.run();
}

