import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const user = await request.json();

  // Create user on database
  const createUser = await prisma.user.create({ data: user });

  console.log(createUser);
  console.log('createUser');

  // const res = await request.json();
  // console.log(res);
  // call bd

  return NextResponse.json({ createUser }, { status: 200 });
}
