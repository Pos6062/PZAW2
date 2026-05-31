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