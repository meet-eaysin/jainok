"use client";

import { useEffect, useState } from "react";

import { Trash2, CheckCircle } from "lucide-react";
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

interface Subscriber {
  _id: string;
  email: string;
  confirmed: boolean;
  createdAt: string;
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const key = sessionStorage.getItem("adminKey");
      const res = await fetch("/api/admin/subscribers", {
        headers: { "x-api-key": key || "" },
      });

      if (res.ok) {
        const data = await res.json();
        setSubscribers(data.subscribers || []);
      } else {
        setSubscribers([]);
      }
    } catch {
      toast.error("Failed to fetch subscribers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Subscribers</h2>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : subscribers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No subscribers found.
                </TableCell>
              </TableRow>
            ) : (
              subscribers.map((sub) => (
                <TableRow key={sub._id}>
                  <TableCell className="font-medium">{sub.email}</TableCell>
                  <TableCell>
                    {sub.confirmed ? (
                      <Badge
                        variant="outline"
                        className="border-green-200 bg-green-50 text-green-700"
                      >
                        <CheckCircle className="mr-1 h-3 w-3" /> Confirmed
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-amber-200 bg-amber-50 text-amber-700"
                      >
                        Unconfirmed
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-50 hover:text-red-700"
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
