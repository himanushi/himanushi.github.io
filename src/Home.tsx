import { blogList } from "~/store";

export const Home = () => {
  return (
    <div>
      <h1>Himanushi Lifelog</h1>
      <ul>
        {blogList.value.reverse().map((post) => (
          <li key={post}>
            <a href={`/blogs/${post}`}>{post}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
