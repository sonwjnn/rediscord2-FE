"use client"

import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation"
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { currentUser, isAuthenticated } = useAuth();

  if (!currentUser) {
    redirect("/auth/login");
  }

  useEffect(() => {setMounted(true)},[])

  if(!mounted) return null
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome {JSON.stringify(currentUser)}</h1>
      <p className="mt-4 text-xl text-gray-600">You are logged in!</p>
    </div>
  )
}
