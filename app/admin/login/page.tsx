"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/lib/validations/forms.schema";
import { signIn } from "@/lib/actions/auth.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    const result = await signIn(values.email, values.password);
    if (result?.error) {
      setServerError(
        result.error === "Invalid login credentials"
          ? "Email atau password salah."
          : result.error
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 border-2 border-foreground mb-4">
            <Lock className="h-4 w-4" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#737373] mb-1">Admin Access</p>
          <h1 className="text-lg font-bold uppercase tracking-wide">RIFAT HAKIM</h1>
        </div>

        {/* Form card */}
        <div className="bg-white border border-[#e5e5e5] p-6">
          <div className="border-t-2 border-foreground mb-6" />

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              required
              placeholder="admin@example.com"
              {...form.register("email")}
              error={form.formState.errors.email?.message}
            />

            <Input
              label="Password"
              type="password"
              required
              placeholder="••••••••"
              {...form.register("password")}
              error={form.formState.errors.password?.message}
            />

            {serverError && (
              <div className="bg-red-50 border border-red-200 px-3 py-2">
                <p className="text-xs text-red-700 font-medium">{serverError}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              loading={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>

        <p className="text-center text-[10px] text-[#a3a3a3] mt-6 uppercase tracking-widest">
          Muhammad Rifat Hakim Portfolio
        </p>
      </div>
    </div>
  );
}
