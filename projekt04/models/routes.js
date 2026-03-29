import express from "express";
import settings from "./settings.js";
import {
  db,
  insert,
  update_query,
  remove_query
} from "./db.js";

import { createUser, login, getAttributes } from "./auth.js";

const app = express.Router();

function settingsLocals(req, res, next) {
  res.locals.app = settings.getSettings(req);
  res.locals.page = req.path;
  next();
}

app.use(settingsLocals);

app.use("/settings/toggle-theme", settings.themeToggle);

app.get("/", (req, res) => {
  const query = db.prepare('SELECT * FROM hall ORDER BY id');
  const people = query.all();
  let user = req.signedCookies["user"];

  res.render("home", {
    title: "The hall of fame",
    people,
    db,
    user
  });
});

app.get("/form", (req, res) => {
  res.render("form", { title: "Add a person" });
});

app.get("/edit", (req, res) => {
  const people = db.prepare('SELECT * FROM hall ORDER BY id').all();
  const user = req.signedCookies["user"];
  let attr = getAttributes(user);

  res.render("edit", {
    title: "Edytuj użytkowników",
    people,
    user,
    attr
  });
});

app.post("/form_validation", (req, res) => {
  insert.run(req.body.name, req.body.surname, req.signedCookies["user"]);
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
  res.render("about", { title: "About us" });
});

app.get("/user_signup", (req, res) =>{
  res.render("signup", { title: "Sign in", err: req.query.err });
});

app.get("/user_login", (req, res) =>{
  res.render("login", { title: "Log in", err: req.query.err });
});

app.post("/auth/signup", async (req, res) =>{
  const err = await createUser(req.body.username, req.body.password, false);

  if(err === ""){
    login(req.body.username, req.body.password, req, res);
  } else {
    console.log(err);
    res.redirect(`/user_signup?err=${encodeURIComponent(err)}`);
  }
});

app.post("/auth/login", async (req, res) =>{
  login(req.body.username, req.body.password, req, res);
});

app.get("/user_logout", (req, res) =>{
  res.clearCookie("user", { signed: true, httpOnly: false, path: "/" });
  res.redirect("/");
});

export default app;