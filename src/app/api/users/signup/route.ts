import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        if(!username || !email || !password) {
            return NextResponse.json({error: "Please fill all the fields"}, {status: 400});
        }

        const user = await User.findOne({email});
        if(user) {
            return NextResponse.json({error: "User already exists!!"}, {status: 400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = await new User({
            username,
            email,
            password: hashedPassword
        }).save();
        

        const savedUser = await newUser.save()
        console.log(savedUser);
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error:any) {
        return NextResponse.json({error: error.message},{ status: 500});
    }
}