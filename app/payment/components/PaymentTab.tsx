import Image from "next/image";
interface IProps{
    active: boolean,
    label: string,
    src: string,
    onClick: () => void
}
const PaymentTab = ({ active, label, src, onClick }: IProps) => (
  <button 
    onClick={onClick}
    className={`flex items-center justify-center gap-2 p-3 rounded-xl border border-[#113555] transition-all text-[#113555] ${
      active ? 'bg-[#1A304D] text-white' : '  '
    }`}
  >
   
    <Image src={src} alt={label} width={24} height={24}  
    className="w-6 h-6 rounded-lg object-cover" />
     <span className="text-sm font-medium">{label}</span>
  </button>
);
export default PaymentTab;
