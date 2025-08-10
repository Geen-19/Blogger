"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { use } from "react";
export async function handleSubmission(formData: FormData) {

    const {getUser} = getKindeServerSession();
    const user = await getUser();


    if(!user) {
        return redirect("/api/auth/register")
    }

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const imageUrl = formData.get("image") as string;
    const data = await prisma.blogPost.create({
        data: {
            title: title as string,
            content: content as string,
            imageUrl: imageUrl as string,
            authorId: user?.id as string,
            authorImage: user?.picture as string,
            authorName: user?.given_name as string,
            
        }
    });

    return redirect("/dashboard");
}

