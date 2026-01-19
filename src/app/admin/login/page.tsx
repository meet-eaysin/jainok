"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const [key, setKey] = useState("");
  const router = useRouter();

  useEffect(() => {
    const existingKey = sessionStorage.getItem("adminKey");
    if (existingKey) {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key) return;

    try {
      const res = await fetch("/api/admin/stats", {
        headers: {
          "x-api-key": key,
        },
      });

      if (res.status === 401) {
        toast.error("Invalid API Key", {
          description: "Access denied. Please check your key.",
        });
        return;
      }

      sessionStorage.setItem("adminKey", key);
      router.push("/admin");
      toast.success("Logged in", {
        description: "Welcome to the admin dashboard.",
      });
    } catch {
      toast.error("Error", {
        description: "Something went wrong.",
      });
    }
  };

  return (
    <div className="flex h-[80vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Enter your Secure API Key to manage the blog.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter API Key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Access Dashboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
