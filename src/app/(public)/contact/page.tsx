"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Get in{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Touch
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Have a question, feedback, or need support? We would love to
                hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
            {/* Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold">Contact Information</h2>
              <p className="mt-3 text-muted-foreground">
                Fill out the form and our team will get back to you within 24
                hours.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="inline-flex rounded-lg bg-primary/10 p-3">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      support@amaia.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="inline-flex rounded-lg bg-primary/10 p-3">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">FAQ</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Check our{" "}
                      <Link
                        href="/faq"
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        FAQ page
                      </Link>{" "}
                      for quick answers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader className="px-6">
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    We will respond to your inquiry as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6">
                  {submitted ? (
                    <div className="py-8 text-center">
                      <div className="mx-auto mb-4 inline-flex rounded-full bg-green-100 p-3">
                        <Send className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold">
                        Message Sent!
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        Thank you for reaching out. We will get back to you
                        within 24 hours.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-6"
                        onClick={() => setSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="What is this about?"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us how we can help..."
                          rows={5}
                          required
                        />
                      </div>
                      <Button type="submit" size="lg" className="w-full">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
