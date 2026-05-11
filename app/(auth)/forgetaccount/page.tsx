"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Smartphone, Upload, Linkedin, Facebook, Youtube, Instagram } from "lucide-react";
import Input from "@/app/components/Input";

export default function AccountRecoveryPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phoneType, setPhoneType] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setScreenshot(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phoneType || !screenshot) {
      setError("يرجى إكمال جميع الحقول ورفع لقطة الشاشة");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("phoneType", phoneType);
      formData.append("screenshot", screenshot);

      const res = await fetch("/api/account-recovery", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("حدث خطأ أثناء الإرسال");

      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto mt-10  space-y-6"
    >

      {/* Logo */}
       <div className="pb-3 sm:pb-4  flex items-center justify-center">
             <div className="w-20 h-14 sm:w-22 sm:h-16 flex items-center justify-center overflow-hidden">
               <Image
                 src="/logo.png"
                 alt="شعار الموقع"
                 width={64}
                 height={64}
                 className="w-full h-full object-contain"
               />
             </div>
           </div>

      {/* Title */}
      <div className="text-center">
        <h2 className="text-xl font-bold" style={{ color: "var(--primary)" }}>
          بيانات استرجاع الحساب
        </h2>
      </div>

      

        <Input
          type="text"
          placeholder="اسم عائلتك"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          icon={<User size={18} style={{ color: "var(--primary)" }} />}
        />

        <Input
          type="text"
          placeholder="نوع تلفونك"
          value={phoneType}
          onChange={(e: any) => setPhoneType(e.target.value)}
          icon={<Smartphone size={18} style={{ color: "var(--primary)" }} />}
        />

        {/* Screenshot Upload */}
        <label
          className="flex items-center justify-center rounded-lg py-3 cursor-pointer transition"
          style={{
            border: "1px dashed var(--primary)",
            backgroundColor: "var(--input-bg)",
          }}
        >
         
          {screenshot ? screenshot.name : "خذ لقطة شاشة"}
           <Upload size={20} style={{ color: "var(--primary)", marginRight: "0.5rem" }} />
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>

        {error && !screenshot && (
          <p className="text-red-500 text-sm text-right">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-medium transition duration-300 disabled:opacity-60"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--background)",
          }}
        >
          {loading ? "جاري الإرسال..." : "ارسال"}
        </button>
      

      {/* Footer Links */}
      <div className="text-center text-sm space-y-1" style={{ color: "var(--secondary)" }}>
        <p>
          لديك حساب بالفعل؟{" "}
          <span
            onClick={() => router.push("/login")}
            style={{ color: "var(--primary)", cursor: "pointer" }}
            className="hover:underline"
          >
            تسجيل الدخول
          </span>
        </p>
        
      </div>

      {/* Social Icons */}
     <div className="flex justify-center gap-4 mt-6">
 
        <a href="#" className="text-[var(--primary)] hover:brightness-90 transition">
    <Instagram size={24} />
  </a>
        <a href="#" className="text-[var(--primary)] hover:brightness-90 transition">
    <Youtube size={24} />
  </a>

  <a href="#" className="text-[var(--primary)] hover:brightness-90 transition">
    <Facebook size={24} />
  </a>

   <a href="#" className="text-[var(--primary)] hover:brightness-90 transition">
    <Linkedin size={24} />
  </a>

  
 
 


</div>
    
    </form>
  );
}