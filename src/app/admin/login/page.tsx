"use client";

import * as React from "react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-paper px-6">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-3xl border border-line bg-white p-8"
      >
        <h1 className="text-xl font-semibold text-ink">Admin Login</h1>
        <p className="mt-1 text-sm text-body">
          Enter the staff password to manage reservations.
        </p>

        <div className="mt-6 grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoFocus
            required
          />
        </div>

        {state?.error && (
          <p className="mt-3 text-sm text-red-600">{state.error}</p>
        )}

        <Button type="submit" disabled={pending} className="mt-6 w-full">
          {pending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </section>
  );
}
