import { prisma } from "./utils/db";
import { BlogPostCard } from "@/components/general/BlogPostCard";
import { Suspense } from "react";

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true, // Assuming you have an image field
      authorImage: true, // Assuming you have an author image field
      authorName: true, // Assuming you have an author name fielda
      id: true, // Assuming you want to display the post ID
      createdAt: true, // Assuming you want to display the creation date
    }
  });
  return data;
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
    {data.map((item, index) => (
      <div key={index} className="border p-4 rounded-lg shadow-md">
        <BlogPostCard data={item} key={index} />
      </div>
    ))}

  </div>)
}