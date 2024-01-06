import { constants } from "fs";
import { access, readFile, writeFile } from "fs/promises";
import fetch from "node-fetch";

const patterns = {
  comment: {
    once: false,
    filePath: (date) => `./public/comments/${date}.comment.md`,
    content: (date, content) => [
      {
        content: `今日の日付は ${date} です。私のやる気とモチベーションを上げるように50文字程度でめちゃくちゃ褒め散らかしてください。フレンドリーな感じでお願いします。`,
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
          content: `今日の日付は ${date} です。大アルカナだけでタロットを引きます。正位置、逆位置も必ず考慮してください。明日のタロット占いをしてください。50字程度でお願いします。`,
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
const PATTERN = process.argv[3];

async function generateComment() {
  const dates = await readFile("./changed_dates.txt", "utf8");
  for (const date of dates.split("\n")) {
    if (date.trim() === "") continue;

    const outputPath = patterns[PATTERN].filePath(date);

    try {
      await access(outputPath, constants.F_OK);
      if (patterns[PATTERN].once) {
        return;
      }
    } catch (_error) {}

    const blogContent = await readFile(`./public/blogs/${date}.md`, "utf8");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        messages: patterns[PATTERN].content(date, blogContent),
        model: "gpt-4",
      }),
    });

    const data = await response.json();
    const comment = data.choices[0].message.content;
    await writeFile(patterns[PATTERN].filePath(date), comment, "utf8");
  }
}

await generateComment();
