"use client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function userProfile() {
    
    return (
        <div className="bg-black h-screen flex flex-col items-center justify-center">
            <h1 className="text-center text-white text-2xl">Profile Page</h1>
            <div className="flex justify-center">
                <h3 className="text-center text-white text-2xl">
                    This is User profile 
                </h3>
            </div>
        </div>
    )
}