import argon2 from "argon2";
import {
  addUser,
  checkUser,
  getHash,
  update_attributes,
  get_attributes
} from "./db.js";

// const SECRET = process.env.SECRET;
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

async function createUser(username, password, isAdmin){
  let usernameLower = username.toLowerCase()
  let existing_user = checkUser.get(usernameLower);

  if (existing_user === null || existing_user === undefined) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if(regex.test(password)){
      const passhash = await argon2.hash(password, HASH_PARAMS);
      addUser.run(username, passhash, Date.now());

      let is_admin = { is_admin: isAdmin};
      update_attributes.run(JSON.stringify(is_admin), username);

      return "";
    } else {
      console.log(existing_user);
      return "The password must consist of numbers, lowercase and uppercase letters";
    }
  } else {
    return "This username is already taken!";
  }
}


async function login(username, password, req, res){
  const auth_data = getHash.get(username);
  let err = "";

  if(auth_data !== undefined){
    const valid = await argon2.verify(auth_data.passhash, password, HASH_PARAMS);

    if(valid){
      res.cookie("user", username, {
        maxAge: 604800000,
        httpOnly: true,
        signed: true,
      });
      console.log(`logged in as ${username}`)
      res.redirect(`/`);
    } else {
      err = "Wrong password";
      res.redirect(`/user_login?err=${encodeURIComponent(err)}`);
    }
  } else {
    err = "User not found";
    res.redirect(`/user_login?err=${encodeURIComponent(err)}`);
  }
}

function getAttributes(username) {
  let row = get_attributes.get(username);
  return {...JSON.parse(row.attributes)};
}

export {
  createUser,
  login,
  getAttributes
};