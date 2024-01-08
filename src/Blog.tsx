import { FunctionComponent } from "preact";
import { useBlogContent } from "~/hooks/useBlogContent";
import styles from "./Blog.module.css";

interface BlogProps {
  matches: {
    id: string;
  };
}

export const Blog: FunctionComponent<BlogProps> = ({ matches }) => {
  const content = useBlogContent(matches.id);
  const comment = useBlogContent(`${matches.id}.comment`, "/comments");
  const tarot = useBlogContent(`${matches.id}.tarot`, "/comments");

  return (
    <div className={styles.blogContainer}>
      <h2>{matches.id}</h2>
      <div className={styles.blogPost}>
        <div
          className={styles.blogContent}
          dangerouslySetInnerHTML={{ __html: content ?? "" }}
        />
      </div>
      {tarot && (
        <div className={styles.blogPost}>
          <h2>Fortune</h2>
          <div
            className={styles.blogTarot}
            dangerouslySetInnerHTML={{ __html: tarot }}
          />
        </div>
      )}
      {comment && (
        <div className={styles.blogPost}>
          <h2>Comment</h2>
          <div
            className={styles.blogComment}
            dangerouslySetInnerHTML={{ __html: comment }}
          />
        </div>
      )}
    </div>
  );
};
