import { marked } from "marked";

const renderer = new marked.Renderer();
let isInTimeBlock = false; // 時間ブロック内かどうかの状態を保持するフラグ

renderer.paragraph = (text) => {
  const timePattern = /\b\d{2}:\d{2}\b/;
  if (timePattern.test(text)) {
    isInTimeBlock = true; // 時間ブロックの開始
    return `<div class="time-block"><span class="time-display">${text}</span>`;
  }

  if (isInTimeBlock) {
    isInTimeBlock = false; // 時間ブロックの終了
    return `<p>${text}</p></div>`; // 閉じタグをここで追加
  }

  return `<p>${text}</p>`;
};

renderer.list = (body, ordered, start) => {
  isInTimeBlock = false; // リストは時間ブロック外とする
  const type = ordered ? "ol" : "ul";
  const startAttr = ordered && start !== 1 ? ` start="${start}"` : "";
  return `<${type}${startAttr}>${body}</${type}>`;
};

marked.use({ renderer });

export const markdown = async (text: string) => marked(text);
