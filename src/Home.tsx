import { blogList } from "~/store";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1>Himanushi Lifelog</h1>
      <ul className={styles.blogList}>
        {blogList.value.map((post) => (
          <li key={post}>
            <a href={`/blogs/${post}`}>{post}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
