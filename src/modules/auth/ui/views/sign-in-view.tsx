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
    FormMessage
} from "@/components/ui/form";
import { z } from "zod";
import { loginSchema } from "./schema";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const poppins = Poppins({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
});

const SignInView = () => {
    const router = useRouter();
    const trpc = useTRPC();
    const queryClient= useQueryClient();
    const login = useMutation(trpc.auth.login.mutationOptions({
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess:async () => {
            await queryClient.invalidateQueries(trpc.auth.session.queryFilter())
            router.push("/")
        }
    }));

    const form = useForm<z.infer<typeof loginSchema>>({
        mode: "all",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        login.mutate(values)
    };


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
                            <Link prefetch href={"/sign-up"}>
                                <Button variant={"ghost"} size={"sm"}>
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                        <h2 className="text-4xl font-medium">
                            Welcome to MetaShopper
                        </h2>

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
                        <Button disabled={login.isPending} type="submit" className="bg-black text-white hover:bg-yellow-300 hover:text-primary" variant={"elevated"}>
                            Log In
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

export default SignInView;
