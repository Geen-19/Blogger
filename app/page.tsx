import { prisma } from "./utils/db";
import { BlogPostCard } from "@/components/general/BlogPostCard";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  try {
    if (!process.env.DATABASE_URL) {
      return [] as Awaited<ReturnType<typeof prisma.blogPost.findMany>>;
    }
    const data = await prisma.blogPost.findMany({
      select: {
        title: true,
        content: true,
        imageUrl: true,
        authorImage: true,
        authorName: true,
        id: true,
        createdAt: true,
      }
    });
    return data;
  } catch {
    return [] as Awaited<ReturnType<typeof prisma.blogPost.findMany>>;
  }
}

export default function Home() {

  return (
    <div className="py-6">
      <h1 className="text-3xl mb-8 font-bold tracking-tight">Latest Posts</h1>
      <Suspense fallback={<p>Hello Waiting</p>}>
        <BlogPosts />
      </Suspense>
    </div>
  );
}

async function BlogPosts() {
  const data = await getData();
  return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {data.map((item) => (
      <div key={item.id} className="border p-4 rounded-lg shadow-md">
        <BlogPostCard data={item} />
      </div>
    ))}

  </div>)
}