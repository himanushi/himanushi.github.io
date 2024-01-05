import { FunctionComponent } from "preact";
import { useBlogContent } from "~/hooks/useBlogContent";

interface BlogProps {
  matches: {
    id: string;
  };
}

export const Blog: FunctionComponent<BlogProps> = ({ matches }) => {
  const content = useBlogContent(matches.id);

  if (!content) return null;

  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};
