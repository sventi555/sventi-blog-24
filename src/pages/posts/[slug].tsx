import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import { GetStaticProps } from "next";
import { Post, postsDir } from "@/utils/posts";

type ClientPost = Omit<Post, "date"> & { date: string };

export const getStaticPaths = async () => {
  if (!fs.existsSync(postsDir)) {
    return { paths: [], fallback: "blocking" };
  }

  const postSlugs = fs.readdirSync(postsDir);

  return {
    paths: postSlugs.map((slug) => ({ params: { slug: slug.slice(0, -4) } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params!.slug;

  const postPath = path.join(postsDir, `${slug}.yml`);
  const post = yaml.load(fs.readFileSync(postPath, "utf-8")) as Post;

  return { props: { post: { ...post, date: post.date.toLocaleString() } } };
};

const Page: React.FC<{ post: ClientPost }> = ({ post }) => {
  return (
    <div>
      <div>{post.title}</div>
      <div>{post.date}</div>
      <div>{post.body}</div>
    </div>
  );
};

export default Page;
