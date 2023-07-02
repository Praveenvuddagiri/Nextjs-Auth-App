"use client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function loginPage() {
    const [user, setUser] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const onLogin = async (event:any) => {
        try {
            event.preventDefault();
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            toast.success("Login Success");
            console.log(response.data);
            console.log("Login success", response.data);
            router.push("/profile/"+response.data.user._id);
            return
        } catch (error :any) {
            console.log(error.message);
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        console.log(user);
    }, [user]);
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
    return (
        <div className="bg-black h-screen flex flex-col items-center justify-center">
            <h1 className="text-center text-white text-2xl">{loading? "Processing": "Login"}</h1>
            <div className="flex justify-center">
                <form className="w-full">
                    <div className="flex flex-col mt-1">
                        <label className="text-white text-1xl">Username</label>
                        <input
                            className="p-1 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col mt-1">
                        <label className="text-white text-1xl">Password</label>
                        <input
                            className="p-1 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                    <div className="flex justify-center mt-3 mb-5">
                        <button
                            className="bg-white text-black p-2 rounded-lg w-1/2"
                            onClick={onLogin}>{buttonDisabled?"No Login":"Login Here"}</button>
                    </div>
                    <div className="flex justify-center mt-3 mb-5">
                        <Link href="/signup" className="text-white text-1xl">New User?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}