import prisma from "@/prisma";
import Prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function main() {
  try {
    await Prisma.$connect();
  } catch (error) {
    return Error("database nonnection failed");
  }
}

// =============== GET Route ===================

export const GET = async (req: Request, res: NextResponse) => {
  console.log("get");
  try {
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "success", posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// =============== POST Route ===================

export const POST = async (req: Request, res: NextResponse) => {
  console.log("post");

  try {
    const { title, description } = await req.json();
    await main();
    const post = await prisma.post.create({ data: { title, description } });
    return NextResponse.json(
      { message: "insertion successfull", post },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
