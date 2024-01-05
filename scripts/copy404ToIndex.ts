import * as fs from "fs";
import * as path from "path";

export default function buildBlogList() {
  return {
    name: "copy-404-to-index",
    async closeBundle() {
      const projectRoot = process.cwd();
      const indexPath = path.join(projectRoot, "dist", "index.html");
      const targetPath = path.join(projectRoot, "dist", "404.html");
      fs.renameSync(indexPath, targetPath);
    },
  };
}
