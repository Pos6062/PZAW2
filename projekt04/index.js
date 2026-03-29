// import cookieParser from "cookie-parser";
// import { name } from "ejs";
// import { DatabaseSync } from "node:sqlite";
// import express from "express";
// import argon2 from "argon2";

// import settings from "./settings.js";
// import { isStringObject } from "node:util/types";
// import { cookie } from "express-validator";

// // const port = 8000;
// const port = process.env.PORT || 8000;
// const SECRET = process.env.SECRET;
// if (SECRET == null) {
//   console.error(
//     "SECRET environment variable missing. Please create an env file or provide SECRET via environment variables."
//   );
//   process.exit(1);
// }
// const PEPPER = process.env.PEPPER;
// if (PEPPER == null) {
//   console.error(
//     `PEPPER environment variable missing.
//      Please create an env file or provide PEPPER via environment variables.`,
//   );
//   process.exit(1);
// }

// const HASH_PARAMS = {
//   secret: Buffer.from(PEPPER, "hex"),
// };



// const app = express();
// app.set("view engine", "ejs");
// app.use(express.static("public"));
// app.use(express.urlencoded());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser(SECRET));
// app.use(settings.settingsHandler);


// const db_path = "./db.sqlite";
// const db = new DatabaseSync(db_path);

// console.log("Creating database tables");
// db.exec(
//   `CREATE TABLE IF NOT EXISTS hall (
//     id             INTEGER PRIMARY KEY,
//     fname          TEXT NOT NULL,
//     lname          TEXT NOT NULL,
//     author         TEXT REFERENCES users(username) ON DELETE NO ACTION
//   ) STRICT;
//    CREATE TABLE IF NOT EXISTS users (
//     id             INTEGER PRIMARY KEY,
//     username        TEXT UNIQUE,
//     passhash        TEXT,
//     created_at      INTEGER,
//     attributes      TEXT DEFAULT NULL
//   ) STRICT;`
// )


// ////////////////////////

// const insert = db.prepare('INSERT INTO hall (fname, lname, author) VALUES (?, ?, ?)');
// const update_query = db.prepare('UPDATE hall SET fname = ?, lname = ? WHERE id = ?');
// const remove_query = db.prepare('DELETE FROM hall WHERE id = ?;');
// const empty = db.prepare('DELETE FROM hall WHERE 1;');
// const populate = db.prepare("INSERT INTO hall (fname, lname) VALUES ('Oliwier', 'Bokemon'), ('Antoni', 'Chruściel'), ('Antoni', 'Jacko');");

// const addUser = db.prepare('INSERT INTO users (username, passhash, created_at) VALUES (?, ?, ?)');
// const checkUser = db.prepare('SELECT id, username, created_at, attributes FROM users WHERE LOWER(username) = ?');
// const getHash = db.prepare('SELECT passhash FROM users WHERE username = ?');
// const update_attributes = db.prepare('UPDATE users SET attributes = ? WHERE username = ?;');
// const get_attributes = db.prepare('SELECT attributes FROM users WHERE username = ?;');
// //;kvjksdfghjs


// const settingsRouter = express.Router();
// settingsRouter.use("/toggle-theme", settings.themeToggle);
// app.use("/settings", settingsRouter);

// // const authRouter = express.Router();
// // authRouter.get("/signup", auth.signup_get);
// // authRouter.post("/signup", auth.signup_post);
// // authRouter.get("/login", auth.login_get);
// // authRouter.post("/login", auth.login_post);
// // authRouter.get("/logout", auth.logout);
// // app.use("/auth", authRouter);

// function settingsLocals(req, res, next) {
//   res.locals.app = settings.getSettings(req);
//   res.locals.page = req.path;
//   next();
// }
// app.use(settingsLocals);

// //asudhjasdia

// app.get("/", (req, res) => {
//   const query = db.prepare('SELECT * FROM hall ORDER BY id');
//   const people = query.all();

// //----

// //     if (res.locals.app.cookie_consent && req.cookies[LAST_VIEWED_COOKIE]) {
// //     let last_viewed = req.cookies[LAST_VIEWED_COOKIE]?.split(",") || [];
// //     last_viewed_categories = last_viewed
// //       .map((x) => parseInt(x, 10))
// //       .filter((x) => !isNaN(x))
// //       .map((id) => flashcards.getCategorySummary(id));
// //   }

// // //----
//   let user = req.signedCookies["user"];
//   res.render("home", {
//     title: "The hall of fame",
//     people: people,
//     db: db,
//     user: user
//     // theme: "dark"
//   });
// });

// app.get("/form", (req, res) => {
//   res.render("form", {
//     title: "Add a person to the hall of fame"
//   });
// });

// app.get("/edit", (req, res) => {
  
//   const query = db.prepare('SELECT * FROM hall ORDER BY id');
//   const people = query.all();
//   const user = req.signedCookies["user"];
//   let attr = getAttributes(user);
//   res.render("edit", {
//     title: "Edytuj użytkowników",
//     people: people,
//     user,
//     attr
//   });
// });

// app.post("/form_validation", (req, res) => {
//           var name = req.body.name;
//           var surname = req.body.surname;
//           insert.run(name, surname, req.signedCookies["user"]);
//         console.log("added ", req.body.name, req.body.surname);
//         res.redirect(`/`);
// });
// app.post("/edit/values", (req, res) => {
//           var name = req.body.fname;
//           var surname = req.body.lname;
//           var id = Number(req.body.id);
//           var update = req.body.update;
//           var remove = req.body.delete;
//           if(update){
//             update_query.run(name, surname, id);
//             console.log("updated ", req.body.fname, req.body.lname);
//           }
//           if(remove){
//             remove_query.run(id);
//             console.log("removed ", req.body.fname, req.body.lname);
//           }
//         res.redirect(`/`);
// });

// app.get("/about", (req, res) =>{
//   res.render("about", {
//     title: "About us"
//   });
// });

// app.get("/populate",  (req, res) =>{
//   res.render();
//   });



// ////////////////////////////////////////



// app.get("/user_signup", (req, res) =>{
//   res.render("signup", {
//     title: "Sign in",
//      err: req.query.err
//   });
// })

// app.get("/user_login", (req, res) =>{
//   res.render("login", {
//     title: "Log in",
//     err: req.query.err
//   });
// })

// app.post("/auth/signup", async (req, res) =>{
//   const username = req.body.username;
//   const password = req.body.password;

//     const err = await createUser(username, password, false);
//     console.log("error:");
//     console.log(err);
//     if(err === ""){
//     login(username, password, req, res);
//     console.log("account created!")
//     }
//     else{
//     res.redirect(`/user_signup?err=${encodeURIComponent(err)}`);
//     }
  
// })

// app.post("/auth/login", async (req, res) =>{
//   const username = req.body.username;
//   const password = req.body.password;
//   login(username, password, req, res);
  
  
// })

// app.get("/user_logout", (req, res) =>{
//   res.clearCookie("user", { signed: true, httpOnly: false, path: "/" });
//   res.redirect("/");
// })



// async function createUser(username, password, isAdmin){
//   let usernameLower = username.toLowerCase()
//   let existing_user = checkUser.get(usernameLower);
//   console.log(existing_user);

//   if (existing_user === null || existing_user === undefined) {
//     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
//     if(regex.test(password)){
//       const passhash = await argon2.hash(password, HASH_PARAMS);
//       addUser.run(username, passhash, Date.now());
//       let is_admin = { is_admin: isAdmin};
//       update_attributes.run(JSON.stringify(is_admin), username);
//       return "";
//     }
//     else{
//       return "The password must consist of numbers, lowercase and uppercase letters";
//     }
//   }
//   else{
//     return "This username is already taken!";
//   }
// }

// async function login(username, password, req, res){
//   const auth_data = getHash.get(username);
//   let err = ""
//   if(auth_data !== undefined){
//     const valid = await argon2.verify(auth_data.passhash, password, HASH_PARAMS)
//     if(valid){
//       res.cookie("user", username, 
//         {
//           maxAge: 3600000, 
//           httpOnly: true, 
//           signed: true,
//         });
        
//       console.log("logged in");
//       res.redirect(`/`);
    
//     }
//     else{
//       err = "Wrong password"
//       console.log(err)
//       res.redirect(`/user_login?err=${encodeURIComponent(err)}`);
//     }
//   }
//   else{
//     err = "User not found"
//     console.log(err)
//     res.redirect(`/user_login?err=${encodeURIComponent(err)}`);
//   }
// }

// function getAttributes(username) {
//   let row = get_attributes.get(username);
//   console.log(row);
//   console.log(row.attributes);
//   return {...JSON.parse(row.attributes)};
// }

// const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
// const ADMIN_NAME = process.env.ADMIN_NAME;

// if(ADMIN_PASSWORD && ADMIN_NAME){
// const check = checkUser.get(ADMIN_NAME);
// // console.log(check);
//   if(check === undefined || check === null){
//     createUser(ADMIN_NAME, ADMIN_PASSWORD, true);
//     console.log("Admin account created");
//   }
// }

// app.listen(port, () => {
//   console.log(`Server listening on http://localhost:${port}`);
// });

// if (process.env.POPULATE_DB) {

//   console.log("Populating db...");
//   empty.run();
//   populate.run();
// }

import express from "express";
import cookieParser from "cookie-parser";
import routes from "./models/routes.js";
import { empty, populate, checkUser } from "./models/db.js";
import { createUser } from "./models/auth.js";

// const port = 8000;
const port = process.env.PORT || 8000;
const SECRET = process.env.SECRET;
if (SECRET == null) {
  console.error(
    "SECRET environment variable missing. Please create an env file or provide SECRET via environment variables."
  );
  process.exit(1);
}


const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(SECRET));

app.use("/", routes);

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_NAME = process.env.ADMIN_NAME;

if(ADMIN_PASSWORD && ADMIN_NAME){
  const check = checkUser.get(ADMIN_NAME);
  if(check === undefined || check === null){
    createUser(ADMIN_NAME, ADMIN_PASSWORD, true);
    console.log("Admin account created");
  }
  else{
    console.log("This user already exists:");
    console.log(check);
  }
}

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

if (process.env.POPULATE_DB) {
  console.log("Populating db...");
  empty.run();
  populate.run();
}