import * as fs from "fs";
import * as path from "path";

export default function copyIndexToDates() {
  return {
    name: "copy-index-to-dates",
    async closeBundle() {
      const projectRoot = process.cwd();
      const blogListPath = path.join(projectRoot, "dist", "blogList.txt");
      const indexPath = path.join(projectRoot, "dist", "index.html");

      try {
        // blogList.txtから日付のリストを読み込み
        const dates = fs
          .readFileSync(blogListPath, "utf8")
          .split("\n")
          .filter(Boolean);

        // 各日付に対してindex.htmlのコピーを作成
        for (const date of dates) {
          const destPath = path.join(
            projectRoot,
            "dist",
            "blogs",
            `${date}.html`,
          );
          fs.copyFileSync(indexPath, destPath);
        }

        // 404.htmlにもindex.htmlをコピー
        const notFoundPath = path.join(projectRoot, "dist", "404.html");
        fs.copyFileSync(indexPath, notFoundPath);
      } catch (err) {
        console.error("コピー処理中にエラーが発生しました:", err);
      }
    },
  };
}
