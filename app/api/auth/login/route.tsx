import User from '@/database/user.model';
import { connectToDatabase } from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import { compare } from 'bcrypt';
import { useState } from 'react';

export async function POST(req: Request) {
  try {
    await connectToDatabase()
    const { email, password } = await req.json();

    const existUser = await User.findOne({ email });
    if (!existUser) {
      return NextResponse.json({ message: "Email not found" }, { status: 400 });
    }

    const isPasswordMatch = await compare(password, existUser.password);
    if (!isPasswordMatch) {
      return NextResponse.json({ message: "Invalid password" }, { status: 400 });
    }

    return NextResponse.json({ success: true, user: existUser })
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
