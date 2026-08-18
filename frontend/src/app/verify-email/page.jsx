"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { login } = useAuth();

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/auth/verify-email?token=${encodeURIComponent(token)}`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || "Email verification failed"
          );
        }

        // Login user after successful verification
        login(data);

        setStatus("success");
        setMessage("Email verified successfully!");

        setTimeout(() => {
          router.push("/");
        }, 1500);

      } catch (error) {
        console.error("Email verification error:", error);

        setStatus("error");
        setMessage(
          error.message || "Something went wrong while verifying your email."
        );
      }
    };

    verifyEmail();
  }, [searchParams, login, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F5EE] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">

        {status === "verifying" && (
          <>
            <div className="mx-auto mb-5 h-10 w-10 border-4 border-[#5E6B58] border-t-transparent rounded-full animate-spin" />

            <h1
              className="text-3xl text-[#5E6B58]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Verifying Email
            </h1>

            <p className="mt-3 text-gray-500">
              Please wait while we verify your email address...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-5xl mb-4">
              ✓
            </div>

            <h1
              className="text-3xl text-[#5E6B58]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Email Verified!
            </h1>

            <p className="mt-3 text-gray-500">
              {message}
            </p>

            <p className="mt-2 text-sm text-gray-400">
              Redirecting you to Odhira...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-5xl mb-4">
              ✕
            </div>

            <h1
              className="text-3xl text-red-600"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Verification Failed
            </h1>

            <p className="mt-3 text-gray-500">
              {message}
            </p>

            <button
              onClick={() => router.push("/")}
              className="mt-6 px-6 py-3 bg-[#5E6B58] text-white rounded-lg hover:bg-[#4F5B49] transition"
            >
              Go to Home
            </button>
          </>
        )}

      </div>
    </div>
  );
}