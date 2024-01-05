import { marked } from "marked";
import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

interface BlogProps {
  matches: {
    id: string;
  };
}

export const Blog: FunctionComponent<BlogProps> = ({ matches }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const postId = matches.id;
    fetch(`/blog/${postId}.md`)
      .then((response) => response.text())
      .then(async (text) => {
        const content = await marked(text);
        setContent(content);
      })
      .catch((error) => console.error("Error loading blog post:", error));
  }, [matches.id]);

  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};
