import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import { GetStaticProps } from "next";

const postsDir = path.join(process.cwd(), "_posts/blog");

export const getStaticPaths = async () => {
  const postSlugs = fs.readdirSync(postsDir);

  return {
    paths: postSlugs.map((slug) => slug.slice(0, -4)),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params!.slug;

  const postPath = path.join(postsDir, `${slug}.yml`);
  const postYml = fs.readFileSync(postPath, "utf-8");
  const post = yaml.load(postYml);

  return { props: { post } };
};

const Page: React.FC<{ post: { title: string } }> = ({ post }) => {
  return <div>{post.title}</div>;
};

export default Page;
