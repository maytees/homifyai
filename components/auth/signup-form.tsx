/** biome-ignore-all lint/a11y/noSvgWithoutTitle: goon */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const formSchema = z
  .object({
    fullName: z.string().min(1, "Name must be at least 1 character"),
    email: z
      .email({ error: "Enter a valid email!" })
      .min(5, "Bug title must be at least 5 characters.")
      .max(32, "Bug title must be at most 32 characters."),
    password: z.string().min(8, "Password must be 8 characters minumum"),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      fullName: "",
      password: "",
    },
  });

  function onSubmit(formData: z.infer<typeof formSchema>) {
    const { email, password, fullName } = formData;

    startTransition(async () => {
      await authClient.signUp.email(
        {
          email,
          name: fullName, // user password -> min 8 characters by default
          callbackURL: "/dashboard",
          image: `https://avatar.vercel.sh/${email}`,
          password,
        },
        {
          onSuccess: () => {
            // Redirect to verify-email page instead of dashboard
            router.push(`/verify-email?email=${encodeURIComponent(email)}`);
            posthog.identify(email);
            toast.success("Account created! Please verify your email.");
          },
          onError: (ctx) => {
            // display the error message
            toast.error("Error occurred during registration.", {
              description: (
                <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                  <code>{ctx.error.message}</code>
                </pre>
              ),
              position: "bottom-right",
            });
          },
        },
      );
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your details below to create your account
                </p>
              </div>
              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="form-rhf-input-name">
                      Full Name
                    </FieldLabel>
                    <Input
                      disabled={isPending}
                      {...field}
                      id="form-rhf-input-name"
                      aria-invalid={fieldState.invalid}
                      autoComplete="name"
                      type="text"
                      placeholder="John Doe"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="form-rhf-input-email">
                      Email
                    </FieldLabel>
                    <Input
                      disabled={isPending}
                      {...field}
                      id="form-rhf-input-email"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      type="email"
                      placeholder="you@example.com"
                    />
                    <FieldDescription>
                      We&apos;ll use this to contact you. We will not share your
                      email with anyone else.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="form-rhf-input-password">
                          Password
                        </FieldLabel>
                        <Input
                          disabled={isPending}
                          {...field}
                          id="form-rhf-input-password"
                          aria-invalid={fieldState.invalid}
                          type="password"
                          autoComplete="new-password"
                          placeholder="********"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="form-rhf-confirm-password">
                          Confirm Password
                        </FieldLabel>
                        <Input
                          disabled={isPending}
                          {...field}
                          id="form-rhf-confirm-password"
                          aria-invalid={fieldState.invalid}
                          placeholder="********"
                          type="password"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button disabled={isPending} type="submit">
                  Create Account
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  disabled={isPending}
                  onClick={async () => {
                    await authClient.signIn.social({
                      provider: "google",
                      callbackURL: "/dashboard",
                      fetchOptions: {
                        onSuccess: () => {
                          posthog.identify();
                        },
                      },
                    });
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Sign up with Google</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account? <Link href="/login">Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  );
}
