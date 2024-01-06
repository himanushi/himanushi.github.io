import { FunctionComponent } from "preact";
import { useBlogContent } from "~/hooks/useBlogContent";

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
    <div>
      <h2>{matches.id}</h2>
      {content && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}
      {tarot && (
        <div>
          <h2>Fortune</h2>
          <div dangerouslySetInnerHTML={{ __html: tarot }} />
        </div>
      )}
      {comment && (
        <div>
          <h2>Comment</h2>
          <div dangerouslySetInnerHTML={{ __html: comment }} />
        </div>
      )}
    </div>
  );
};
