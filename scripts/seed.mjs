import { PrismaClient } from "../lib/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.blogPost.create({
    data: {
      title: "Hello World",
      content: "This is a seeded blog post.",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
      authorId: "seed-user-1",
      authorName: "Seed User",
      authorImage: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=120",
    },
  });
  console.log("Seeded:", result.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });