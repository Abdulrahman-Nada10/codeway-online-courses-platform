"use client"

import { useRef, useState } from "react"
import { Upload } from "lucide-react"

export default function CourseThumbnail() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)

    // تحقق من النوع
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setError("الرجاء اختيار صورة بصيغة PNG أو JPG")
      return
    }

    // تحقق من الحجم (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("حجم الصورة يجب أن يكون أقل من 2MB")
      return
    }

    const imageUrl = URL.createObjectURL(file)
    setPreview(imageUrl)
  }

  return (
    <section aria-labelledby="thumbnail-heading">
      {/* العنوان */}
      <div className="mb-4">
        <h2
          id="thumbnail-heading"
          className="text-base font-bold text-stone-800"
        >
          صورة الدورة
        </h2>
        <p className="text-sm text-stone-500">
          صورة الغلاف التي ستظهر للطلاب
        </p>
      </div>

      {/* input الحقيقي */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* الكارد */}
      <div className="bg-white border border-stone-100 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-stone-200 rounded-xl p-6 sm:p-10 text-center hover:border-orange-300 hover:bg-orange-50/20 transition-all cursor-pointer group"
        >
          {!preview ? (
            <>
              <Upload
                size={28}
                className="mx-auto text-stone-300 group-hover:text-orange-400 mb-2 sm:mb-3 transition-colors"
                aria-hidden="true"
              />

              <p className="text-stone-500 text-sm mb-2">
                اسحب الصورة هنا أو أضفها للاختيار
              </p>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  fileInputRef.current?.click()
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-300 text-sm text-stone-600 hover:bg-stone-50 transition-all focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                <Upload size={14} aria-hidden="true" />
                تغيير الصورة
              </button>

              <p className="text-stone-400 text-xs mt-2">
                صيغة PNG أو JPG بحجم أقصى 2 MB
              </p>
            </>
          ) : (
            <>
              <img
                src={preview}
                alt="معاينة صورة الدورة"
                className="mx-auto max-h-40 sm:max-h-56 rounded-xl object-cover"
              />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  fileInputRef.current?.click()
                }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-300 text-sm text-stone-600 hover:bg-stone-50 transition-all"
              >
                <Upload size={14} aria-hidden="true" />
                تغيير الصورة
              </button>
            </>
          )}
        </div>

        {/* رسالة الخطأ */}
        {error && (
          <p className="mt-3 text-sm text-red-600 text-center">
            {error}
          </p>
        )}
      </div>
    </section>
  )
}
