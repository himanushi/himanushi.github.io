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

  return (
    <div>
      <h2>{matches.id}</h2>
      {content && (
        <div>
          {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}
      {comment && (
        <div>
          <h2>Comment</h2>
          {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
          <div dangerouslySetInnerHTML={{ __html: comment }} />
        </div>
      )}
    </div>
  );
};
