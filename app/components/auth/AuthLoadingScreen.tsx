"use client";

import { Loader2 } from "lucide-react";

export default function AuthLoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF3EB]">
      <Loader2 className="w-10 h-10 text-[#FF6400] animate-spin" />
    </div>
  );
}

