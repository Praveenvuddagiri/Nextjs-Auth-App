"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function signupPage() {
    const [user, setUser] = useState({ username: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const onSignup = async (event: any) => {
        try {
            event.preventDefault();
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            toast.success("Signup Success");
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message);
            console.log(error.message);
            
        }
        finally {
            setLoading(false);   
        }
    }
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    useEffect(() => {
        console.log(user);
    }, [user]);
    
    return (
        <div className="bg-black h-screen flex flex-col items-center justify-center">
            <h1 className="text-center text-white text-2xl">{loading? "Processing": "Signup"}</h1>
            <div className="flex justify-center">
                <form className="w-full">
                    <div className="flex flex-col mt-1">
                        <label className="text-white text-1xl">Username</label>
                        <input
                            className="p-1 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                            type="text"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col mt-1">
                        <label className="text-white text-1xl">Email</label>
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
                            onClick={onSignup}>{buttonDisabled? "No Signup": "Signup Here"}</button>
                    </div>

                    <div className="flex justify-center mt-3 mb-5">
                        <Link href="/login" className="text-white text-1xl">Already Have Account?</Link>
                    </div>

                </form>
            </div>
        </div>
    )
}