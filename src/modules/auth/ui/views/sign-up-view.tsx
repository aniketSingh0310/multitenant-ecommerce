"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormLabel,
    FormField,
    FormItem,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { z } from "zod";
import { registerSchema } from "./schema";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const poppins = Poppins({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
});

const SignUpView = () => {
    const router= useRouter();
    const trpc= useTRPC();
    const register= useMutation(trpc.auth.register.mutationOptions({
        onError:(error)=>{
            toast.error(error.message)
        },
        onSuccess:()=>{
            router.push("/")
        }
    }));

    const form = useForm<z.infer<typeof registerSchema>>({
        mode: "all",
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        register.mutate(values)
    };


    const username = form.watch("username");
    const usernameError = form.formState.errors.username;
    const showPreview = username && !usernameError;
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="h-screen w-full bg-[#F4F4F0] lg:col-span-3 overflow-y-auto">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4 p-8 lg:p-16"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <Link href={"/"}>
                                <span
                                    className={cn(
                                        "text-3xl tracking-tighter font-semibold pl-6",
                                        poppins.className
                                    )}
                                >
                                    MetaShopper.
                                </span>
                            </Link>
                            <Link prefetch href={"/sign-in"}>
                                <Button variant={"ghost"} size={"sm"}>
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                        <h2 className="text-4xl font-medium">
                            Join over 1000+ retailers, and start earning on MetaShopper.
                        </h2>
                        <FormField
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription
                                        className={cn("hidden", showPreview && "block")}
                                    >
                                        Your store will be available at&nbsp;
                                        <strong>{username}</strong>.shop.com
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={register.isPending} type="submit" className="bg-black text-white hover:bg-yellow-300 hover:text-primary" variant={"elevated"}>
                            Create Account
                        </Button>
                    </form>
                </Form>
            </div>
            <div
                className="h-screen w-full lg:col-span-2 hidden lg:block"
                style={{
                    backgroundImage: "url('/bg.jpg')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            />
        </div>
    );
};

export default SignUpView;
