import { readFile, writeFile } from "fs/promises";

const OPENAI_API_KEY = process.argv[2];
const FILE_DATE = process.argv[3];
const BLOG_FILE_PATH = `./public/blog/${FILE_DATE}.md`;
const COMMENT_FILE_PATH = `./public/blog/${FILE_DATE}.comment.md`;

async function generateComment() {
  const blogContent = await readFile(BLOG_FILE_PATH, "utf8");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      messages: [
        {
          content: `次に送信する日記の感想をお願いします。今日の日付は ${FILE_DATE} です。私のやる気とモチベーションを上げるようにめちゃくちゃ褒め散らかしてください。端的にお願いします。`,
          role: "system",
        },
        { content: blogContent, role: "user" },
      ],
      model: "gpt-4",
    }),
  });

  const data = await response.json();
  const comment = data.choices[0].message.content;
  console.log(comment);
  await writeFile(COMMENT_FILE_PATH, comment, "utf8");
}

await generateComment();
