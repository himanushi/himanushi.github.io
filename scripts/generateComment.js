import { constants } from "fs";
import { access, readFile, writeFile } from "fs/promises";

const patterns = {
  comment: {
    once: false,
    filePath: (date) => `./public/comments/${date}.comment.md`,
    content: (date, content) => [
      {
        content: `今日の日付は ${date} です。私のやる気とモチベーションを上げるように100文字程度でめちゃくちゃ褒め散らかしてください。フレンドリーな感じでお願いします。`,
        role: "system",
      },
      { content: content, role: "user" },
    ],
  },
  tarot: {
    once: true,
    filePath: (date) => `./public/comments/${date}.tarot.md`,
    content: (date, _content) => {
      const tarot = Math.floor(Math.random() * 22) + 1;
      const direction =
        Math.floor(Math.random() * 2) === 0 ? "正位置" : "逆位置";
      return [
        {
          content: `今日の日付は ${date} です。大アルカナだけでタロットを引きます。正位置、逆位置も必ず考慮してください。明日のタロット占いをしてください。100字程度でお願いします。`,
          role: "system",
        },
        {
          content: `${tarot}番のカードで${direction}で引きました。引いたカードで明日の運勢を占います。`,
          role: "assistant",
        },
      ];
    },
  },
};

const OPENAI_API_KEY = process.argv[2];
const FILE_DATE = process.argv[3];
const PATTERN = process.argv[4];
const BLOG_FILE_PATH = `./public/blogs/${FILE_DATE}.md`;

async function generateComment() {
  const outputPath = patterns[PATTERN].filePath(FILE_DATE);

  try {
    await access(outputPath, constants.F_OK);
    if (patterns[PATTERN].once) {
      return;
    }
  } catch (_error) {}

  const blogContent = await readFile(BLOG_FILE_PATH, "utf8");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      messages: patterns[PATTERN].content(FILE_DATE, blogContent),
      model: "gpt-4",
    }),
  });

  const data = await response.json();
  const comment = data.choices[0].message.content;
  console.log(comment);
  await writeFile(patterns[PATTERN].filePath(FILE_DATE), comment, "utf8");
}

await generateComment();
