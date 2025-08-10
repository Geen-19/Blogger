import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "../utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BlogPostCard } from "@/components/general/BlogPostCard";
import { resolve } from "path";
async function getData(userId: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000))

    const data = await prisma.blogPost.findMany({
        where: {
            authorId: userId, // Replace with actual logic to get the post ID
        },
        orderBy: {
            createdAt: "desc", // Order by creation date, most recent first
        },
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
}
export default async function Dashboard() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const data = await getData(user?.id as string);
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <Link href="/dashboard/create" className="text-blue-500 hover:underline">
                    <Button>Create Post</Button>
                </Link>
            </div>
            <div className="grid grid-cols-3">
            {data.map((item, index) => (

                <div key={index} className="border p-4 rounded-lg shadow-md">
                    <BlogPostCard data={item} key={item.id} ></BlogPostCard>
                </div>
            ))}
            </div>
        </div>
    );
}

