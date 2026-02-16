"use client";
import { NodeApi } from "@/api/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginBox() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formdata = new FormData(form);
    const { username, password } = Object.fromEntries(formdata.entries());
    try {
      await NodeApi.post("/login", { username, password });
    } catch (err) {
      console.error(err);
    }
    form.reset();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <div className="form-group">
        <label htmlFor="">Username</label>
        <input
          name="username"
          id="username"
          type="text"
          className="form-input"
          placeholder="admin"
        />
      </div>
      <div className="form-group">
        <label htmlFor="">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          className="form-input"
          placeholder="h*dai62k#..."
        />
      </div>
      <button type="submit" className="adm-btn-secondary mt-3">
        Submit
      </button>
      <Link href={"/forgot-password"}>
        <p className="text-sm text-center">Forgot password?</p>
      </Link>
    </form>
  );
}
