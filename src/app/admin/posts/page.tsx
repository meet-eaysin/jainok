"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Edit, Trash2, Plus, ExternalLink } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BlogPost } from "@/lib/blog-types";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blog/posts");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch {
      toast.error("Error", {
        description: "Failed to fetch posts",
      });
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const key = sessionStorage.getItem("adminKey");
      const res = await fetch(`/api/blog/posts/${slug}`, {
        method: "DELETE",
        headers: {
          "x-api-key": key || "",
        },
      });

      if (res.ok) {
        toast.success("Success", {
          description: "Post deleted successfully",
        });
        fetchPosts(); // Refresh list
      } else {
        throw new Error("Failed to delete");
      }
    } catch {
      toast.error("Error", {
        description: "Failed to delete post",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No posts found.
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    {post.title}
                    {post.featured && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Featured
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Published</Badge>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                      {/* Edit functionality to be implemented */}
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-50 hover:text-red-700"
                      onClick={() => deletePost(post.slug)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
