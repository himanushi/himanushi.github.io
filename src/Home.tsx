import { signal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";

const cacheTime = signal(Date.now());

export const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/blog/blogList.txt?time=${cacheTime.value}`)
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((error) => console.error("Error loading blog list:", error));
  }, []);

  const blogPosts = content.split("\n").map((post) => (
    <li key={post}>
      <a href={`/blog/${post}`}>{post}</a>
    </li>
  ));

  return (
    <div>
      <h1>Himanushi 雑記</h1>
      <ul>{blogPosts}</ul>
    </div>
  );
};
