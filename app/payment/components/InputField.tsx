const InputField = ({ label, placeholder }: { label: string, placeholder: string }) => (
  <div className="space-y-1 text-right text-[#113555]">
    <label className="block text-sm font-semibold ">{label}</label>
    <input 
      type="text" 
      className="w-full bg-[#F9FBFF] border border-[#113555] rounded-xl px-4 py-2 outline-none  transition-colors text-right"
      placeholder={placeholder}
    />
  </div>
);
export default InputField;
