import User from '@/models/User';
import bcrypt from 'bcryptjs'
import db from '@/lib/db'
import { NextResponse } from 'next/server';

export async function POST(req){
try{
    await db.connect()
const {email,password:pass } = await req.json()

const isExisting = await User.findOne({email})

if(isExisting){
    throw new Error("user already exists")
}
const hashedPassword  = await bcrypt.hash(pass,10)
const newUser = await User.create({email,password:hashedPassword})
const {password, ...user} = newUser.doc

return new NextResponse(JSON.stringify(user),{status:500})
}catch(error){
    console.log("error in creating user ",error.message)
}
}

