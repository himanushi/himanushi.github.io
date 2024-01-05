import fs from "fs";
import path from "path";

const blogDirectory = "./public/blog";
const outputDirectory = "./dist/blog";

export default function buildBlogList() {
  return {
    name: "build-blog-list",
    async closeBundle() {
      try {
        if (!fs.existsSync(blogDirectory)) {
          console.error("Blog directory not found:", blogDirectory);
          return;
        }

        if (!fs.existsSync(outputDirectory)) {
          fs.mkdirSync(outputDirectory, { recursive: true });
        }

        const files = fs.readdirSync(blogDirectory).filter((file) => {
          return /^\d{4}-\d{2}-\d{2}\.md$/.test(path.basename(file));
        });
        const blogList: string[] = [];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          try {
            blogList.push(file.replace(".md", ""));
          } catch (err) {
            console.error("Error in marked:", err);
          }
        }

        fs.writeFileSync(
          path.join(blogDirectory, "blogList.txt"),
          blogList.join("\n"),
        );

        fs.writeFileSync(
          path.join(outputDirectory, "blogList.txt"),
          blogList.join("\n"),
        );
      } catch (error) {
        console.error("Error in convertMarkdownToHtml:", error);
      }
    },
  };
}
