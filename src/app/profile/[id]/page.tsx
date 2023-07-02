"use client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function userProfile({params}: any) {
    
    return (
        <div className="bg-black h-screen flex flex-col items-center justify-center">
            <h5 className="text-center text-white">Profile Page</h5>
            <div className="flex justify-center">
                <h3 className="text-center text-white text-2xl">
                    This is User profile - 
                    <span className="text-white text-1xl bg-orange-600 rounded"> {params.id} </span>
                </h3>
            </div>
        </div>
    )
}