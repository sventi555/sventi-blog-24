import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import { GetStaticProps } from "next";
import Link from "next/link";
import { Post, postsDir } from "@/utils/posts";

export const getStaticProps: GetStaticProps = async () => {
  if (!fs.existsSync(postsDir)) {
    return { props: { posts: [] } };
  }

  const postSlugs = fs.readdirSync(postsDir);
  const posts = postSlugs.map((slug) => {
    const post = yaml.load(
      fs.readFileSync(path.join(postsDir, slug), "utf-8"),
    ) as Post;
    return { slug: slug.slice(0, -4), title: post.title };
  });

  return { props: { posts } };
};

const Page: React.FC<{ posts: { slug: string; title: string }[] }> = ({
  posts,
}) => {
  return (
    <div>
      {posts.map((post) => (
        <Link key={post.slug} href={`/posts/${post.slug}`}>
          {post.title}
        </Link>
      ))}
    </div>
  );
};

export default Page;
