
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { prisma } from "../../utils/db";
import { handleSubmission } from "@/app/actions";
import { SubmitButton } from "@/components/general/SubmitButton";

export default function createBlogRoute() {


    return (
        <div className="p-6 max-w-lg mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">Create Post</CardTitle>
                    <CardDescription>Create a post to share to the world</CardDescription>
                </CardHeader>

                <CardContent>
                    <form action={handleSubmission} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <Label>Title</Label>
                            <Input name="title" required type="text" placeholder="Title" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label>Content</Label>
                            <Textarea name="content" required placeholder="Content" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label>Image URL</Label>
                            <Input name="image" required type="url" placeholder="Image URL" />
                        </div>

                        <SubmitButton />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}