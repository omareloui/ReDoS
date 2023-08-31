import * as Express from "express";
import { __express as hbs } from "hbs";

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

const DB = [
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@omareloui.comm",
  "contact@omareloui.com",
  "contact@omareloui.com",
  "contact@omareloui.com",
  "nedaagehad@gmail",
  "nedaagehad@gmail",
  "nedaagehad@gmail",
  "nedaagehad@gmail",
];

app.set("view engine", "hbs");

function getEmailFromReq(req: Express.Request) {
  return req.body?.email;
}

app.get("/", (_req, res) => {
  return res.render("test");
});

app.post("/validate-email", (req, res) => {
  console.time("validating");
  const email = getEmailFromReq(req);
  const isValid = /^([a-z]+)+@[^.]*\.{2,3}$/i.test(email);
  console.timeEnd("validating");
  return res.send({ isValid });
});

app.post("/search-for-email", (req, res) => {
  console.time("searching");
  const email = getEmailFromReq(req);
  const found = DB.find((x) => x.match(new RegExp(email, "i")));
  console.timeEnd("searching");
  return res.send({ found: found || null });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
