"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

export const EmailSubscription = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);

    // Simulate API call (placeholder for future backend integration)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO: Integrate with email service (SendGrid, Mailchimp, etc.)
    // await subscribeEmail(data.email);

    setIsLoading(false);
    setIsSubmitted(true);
    form.reset();

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className="py-16">
      <div className="container">
        <Card className="bg-muted/30 border-primary/20 mx-auto max-w-2xl">
          <CardContent className="p-8 text-center">
            <div className="bg-primary/10 mb-4 inline-flex rounded-full p-3">
              <Mail className="text-primary h-6 w-6" />
            </div>

            <h3 className="font-display mb-2 text-2xl font-bold">
              Stay Updated
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Get notified when I publish new content. No spam, unsubscribe
              anytime.
            </p>

            {isSubmitted ? (
              <div className="bg-primary/10 text-primary rounded-lg p-4">
                <p className="font-medium">
                  ✓ Thanks for subscribing! Check your email to confirm.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="sm:w-auto"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </form>
              </Form>
            )}

            <p className="text-muted-foreground mt-4 text-xs">
              By subscribing, you agree to receive emails.{" "}
              <a href="/privacy" className="hover:text-primary underline">
                Privacy Policy
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
