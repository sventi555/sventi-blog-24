import path from "path";

export interface Post {
  title: string;
  date: Date;
  body: string;
}

export const postsDir = path.join(process.cwd(), "_posts/blog");
