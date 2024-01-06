import { useEffect } from "preact/hooks";
import { blogList } from "~/store";

export const useInitializer = () => {
  useEffect(() => {
    if (blogList.value.length > 0) return;
    fetch(`/blogList.txt?time=${Date.now()}`)
      .then((response) => response.text())
      .then((text) => {
        blogList.value = text.split("\n");
      })
      .catch((error) => console.error("Error loading blog list:", error));
  }, []);
};
