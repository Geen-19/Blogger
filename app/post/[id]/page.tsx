import { notFound } from 'next/navigation';
import { prisma } from '../../utils/db';
import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
async function getData(id: string) {
type Params = Promise<{ id: string }>;
async function getDats(id: string) {
    if (!process.env.DATABASE_URL) {
        return notFound();
    }
    const data = await prisma.blogPost.findUnique({
        where: {
            id: id
        },
    });
    if (!data) {
        return notFound();
    }
    return data;
}
export default async function IdPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await getData(id);

    return (
        <div className='p-6 max-w-3xl mx-auto'>
            <Link className={buttonVariants({ variant: "secondary" })} href="/">Back to posts</Link>

            <div className='mb-8 mt-6'>

                <h1 className='text-3xl font-bold tracking-tight mb-4'>{data.title}</h1>
                <div className='flex items-center space-x-4'>
                    <div className='flex items-center space-x-2'>
                        <div className='relative size-10 overflow-hidden rounded-full w-full h-[40px]'>
                            {/* <Image className='object-cover w-3xl' src={data.authorImage} alt={data.authorName} /> */}

                        </div>
                        <p className='font-medium'>{data.authorName}</p>
                    </div>
                    <p>{data.createdAt.toDateString()}</p>
                </div>
            </div>

            <div className='relative h-[400px] w-full mb-8 overflow-hidden rounded-lg'>
                <Image priority src={data.imageUrl} alt={data.title} fill />
            </div>

            <Card>
                <CardContent>
                    <p className='text-gray-700'>{data.content}</p>
                </CardContent>
            </Card>
        </div>
    )
}