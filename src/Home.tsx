import { blogList } from "~/store";

export const Home = () => {
  return (
    <div>
      <h1>Himanushi 雑記</h1>
      <ul>
        {blogList.value.map((post) => (
          <li key={post}>
            <a href={`/blogs/${post}`}>{post}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
