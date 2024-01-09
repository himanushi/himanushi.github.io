import { marked } from "marked";

let isInTimeBlock = false; // 現在時間ブロック内かどうかのフラグ

const renderer = {
  paragraph(text: string) {
    const timePattern = /^\d{2}:\d{2}$/;
    if (timePattern.test(text)) {
      if (!isInTimeBlock) {
        // 新しい時間ブロックの開始
        isInTimeBlock = true;
        return `<div class="time-block"><span class="time-display">${text}</span>`;
      }
      // 前の時間ブロックの終了と新しい時間ブロックの開始
      return `</div><div class="time-block"><span class="time-display">${text}</span>`;
    }
    // 時間ブロック内のテキスト
    return `<p>${text}</p>`;
  },
  // 他のタイプのMarkdown要素に対するレンダリングもここに追加する
};

marked.use({ renderer });

export const markdown = async (text: string) => {
  const result = marked(text);
  if (isInTimeBlock) {
    isInTimeBlock = false; // フラグをリセット
    return `${result}</div>`; // 閉じタグを追加
  }
  return result;
};
