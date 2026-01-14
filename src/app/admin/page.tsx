"use client";

import { useEffect, useState } from "react";

import { Users, Eye, ThumbsUp } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    posts: 0,
    subscribers: 0,
    reactions: 0,
    views: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const key = sessionStorage.getItem("adminKey");
        if (!key) return;

        const res = await fetch("/api/admin/stats", {
          headers: { "x-api-key": key },
        });

        if (res.ok) {
          const data = await res.json();
          setStats({
            posts: data.posts,
            subscribers: data.subscribers,
            reactions: data.reactions,
            views: data.views,
          });
        }
      } catch {
        toast.error("Failed to fetch stats");
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.posts}</div>
            <p className="text-muted-foreground text-xs">Published posts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.subscribers}</div>
            <p className="text-muted-foreground text-xs">
              Confirmed subscribers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.views}</div>
            <p className="text-muted-foreground text-xs">
              +19% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reactions</CardTitle>
            <ThumbsUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reactions}</div>
            <p className="text-muted-foreground text-xs">
              Total reactions across posts
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Recent verified subscribers and new comments will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
