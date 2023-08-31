import { join } from "node:path";
import { readdir, readFile } from "node:fs/promises";
import * as hbs from "hbs";

const partialsDir = join(__dirname, "..", "views/partials");

export async function setupHandlebars() {
  var filenames = await readdir(partialsDir);

  await Promise.all(
    filenames.map(async function (filename) {
      const matches = /^([A-Za-z\-_]+)\.hbs$/.exec(filename);
      if (!matches) return;

      const name = matches[1];
      const template = await readFile(join(partialsDir, filename), "utf8");
      hbs.registerPartial(name, template);
    }),
  );
}
