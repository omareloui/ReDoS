import * as Express from "express";
import { setupHandlebars } from "./setup-hbs";

import { DB } from "./db";

async function main() {
  const app = Express();

  app.use(Express.json());
  app.use(Express.urlencoded({ extended: true }));
  app.use(Express.static("public"));

  app.set("view engine", "hbs");

  await setupHandlebars();

  function getEmailFromReq(req: Express.Request) {
    return req.body?.email;
  }

  app.get("/", (_req, res) => {
    return res.render("homepage");
  });

  app.post("/validate-email", (req, res) => {
    console.time("validating");
    const email = getEmailFromReq(req);
    const isValid = /^([a-z]+)+@[^.]+\..{2,3}$/i.test(email);
    console.timeEnd("validating");
    return res.render("validate-response", { response: isValid ? "valid" : "invalid" });
  });

  app.post("/search-for-email", (req, res) => {
    console.time("searching");
    const email = getEmailFromReq(req);
    const found = DB.find((x) => x.match(new RegExp(email, "i")));
    console.timeEnd("searching");
    return res.render("search-response", { email: found || null });
  });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}

main();
