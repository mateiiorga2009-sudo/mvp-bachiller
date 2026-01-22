"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginClient() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const errorMessage =
    errorParam === "OAuthAccountNotLinked"
      ? "Este correo ya está asociado a otra cuenta."
      : errorParam
        ? "Error al iniciar sesión con Google. Inténtalo nuevamente."
        : "";

  return (
    <>
      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="mt-8 w-full rounded-2xl bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/40 transition hover:scale-[1.01]"
      >
        Continuar con Google
      </button>
      {errorMessage && (
        <p className="mt-4 text-sm text-amber-600 dark:text-amber-200">
          {errorMessage}
        </p>
      )}
    </>
  );
}
