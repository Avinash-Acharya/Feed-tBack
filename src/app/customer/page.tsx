"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});

const Page = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    router.push("/customer/acknowledge");
    try {
      const response = await axios.post("api/customer", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting customer data:", error);
    }
    // console.log(data);
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-bl from-purple-400 to-purple-900 flex-col items-center justify-around sm:p-24">
      <h1 className="text-4xl sm:text-5xl font-bold shadow-2xl text-white">
        {"{"} <span className="underline underline-offset-2">Company Name</span>{" "}
        {"}"}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-800 text-base">
                  FeedBack
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about how you feel about our service/product."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-slate-400">
                  Please be respectful and provide us with your honest feedback.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
