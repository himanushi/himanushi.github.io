import { useEffect, useState } from "preact/hooks";
import { markdown } from "~/lib/markdown";
import { blogContents } from "~/store";

export const useBlogContent = (blogId: string, path = "/blogs") => {
  const [blogContent, setBlogContent] = useState<string | null>(null);

  useEffect(() => {
    const currentContent = blogContents.value[blogId]?.content;
    if (currentContent || currentContent === null) {
      setBlogContent(currentContent);
      return;
    }

    fetch(`${path}/${blogId}.md?time=${Date.now()}`)
      .then((response) => {
        if (response.ok) {
          return response.text();
        }

        blogContents.value[blogId] = { content: null };
        return Promise.reject(response);
      })
      .then(async (text) => {
        const content = await markdown(text);
        blogContents.value[blogId] = { content: content };
        setBlogContent(content);
      })
      .catch((error) => console.error("Error loading blog content:", error));
  }, [blogId]);

  return blogContent;
};
