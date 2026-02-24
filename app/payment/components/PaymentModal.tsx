import Button from "@/app/components/ui/Button";
import { CheckIcon, CircleAlert, CircleCheckBig, Loader, Loader2 } from "lucide-react";
import Image from "next/image";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'fawry' | 'vodafone' | 'paypal' | 'visa';
  status: 'loading' | 'success' | 'error';
  phone?: string;
  onAction?: () => void;
}

const PaymentModal = ({
  isOpen,
  onClose,
  type,
  status,
  phone,
  onAction,
}: IModalProps) => {
  if (!isOpen) return null;

  const config = {
    fawry: {
      loading: {
        title: 'سيتم إرسال رسالة علي رقم الموبايل الذي ادخلته او علي البريد الإلكتروني  تحتوي علي كود الدفع توجة إلي أقرب فرع fawery وقم بالسداد.',
        desc: '',
      },
      success: {
        title: 'تم الدفع بنجاح',
        desc: '',
      },
      error: {
        title: 'فشلت العملية تحقق من اتصالك بالنترنت او الشبكة',
        desc: '',
      },
      logo: '/fawry.png',
    },

    vodafone: {
      loading: {
        title: 'جاري تأكيد عملية الدفع',
        desc: 'يرجى تأكيد العملية من محفظة فودافون كاش.',
      },
      success: {
        title: 'تم الدفع بنجاح',
        desc:  `تم خصم المبلغ من محفظة فودافون كاش ${phone ?? ''}`,
      },
      error: {
        title: 'فشلت العملية لم يتم تأكيد العمليه من محفظه فودافون حاول مره أخري.',
        desc: '',
      },
    },

    paypal: {
      loading: {
        title: 'اضغط متابعة للدفع عبر paypal',
        desc: '',
      },
      success: {
        title: 'تم الدفع بنجاح',
        desc: '',
      },
      error: {
        title: 'فشلت العملية تحقق من اتصالك بالنترنت او الشبكة',
        desc: '',
      },
      logo: '/paypal.png',
    },

    visa: {
      loading: {
        title: 'جاري تحويلك للدفع',
        desc: '',
      },
      success: {
        title: 'تم الدفع بنجاح',
        desc: '',
      },
      error: {
        title: 'فشلت العملية',
        desc: 'حدث خطأ أثناء الدفع.',
      },
    },
  };

  const current = config[type][status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30  " onClick={() => onClose()}>
      <div className=" bg-white/20 backdrop-blur-md sm:backdrop-blur-sm rounded-lg p-5 max-w-xs sm:max-w-md md:max-w-lg w-full shadow-xl border border-[#113555] text-center relative -z-60 overflow-hidden"
      onClick={(e) => e.stopPropagation()}>
      <div className="absolute bg-gray-300/20 inset-0  pointer-events-none" />

        {status === 'loading' && type === "fawry" && (
          
        <div className="flex justify-center gap-3 items-center mt-5">
          <Image 
          src={'/logo.png'} 
          alt="payment logo" 
          width={120} 
          height={120} 
          className="object-contain "
          />

          <Image 
              src= {config[type].logo} 
                alt={type} 
                width={100} 
                height={100} 
                className="w-12 h-12 object-contain rounded-lg"
          />  
        </div>
          
        )}
        {
          status === 'loading' && type === "vodafone" && (
            <Loader className="w-14 h-14 text-gray-500 mx-auto animate-spin" />
          )
        }

        {status === 'loading' && type === "paypal" && (
          
        <div className="flex justify-center  items-center mt-5 ">

          <Image 
              src= {config[type].logo} 
                alt={type} 
                width={100} 
                height={100} 
                className="w-12 h-12 object-contain rounded-lg shadow-md"
          />  
        </div>
          
        )}

        {status === 'success' && (
          <CircleCheckBig className="w-14 h-14 text-green-500 mx-auto mt-3" />
        )}

        {status === 'error' && (
          <CircleAlert className="w-14 h-14 text-red-500 mx-auto" />
        )}


        <h2 className="text-base sm:text-lg font-bold mt-4 text-[#113555]">
          {current.title}
        </h2>

        {current.desc && (
          <p className="text-[#113555] mt-2 font-bold text-base sm:text-lg max-w-sm mx-auto">
            {current.desc}
          </p>
        )}

        <div className="flex gap-3 mt-9 justify-center">

          {status === 'loading' && type==="vodafone" && (
            <div className="w-45">
              <Button style={{color:"#113555"}} className="w-full" onClick={onClose}>إلغاء العملية</Button>
            </div>  
          )}

          {status === 'loading' && type==="paypal" && (
             <div className="flex flex-col sm:flex-row items-center gap-2 w-100">
             
              <Button 
              style={{color:"#113555"}}
              variant="outline" className="w-full">
                متابعة الدفع
              </Button>
                <Button  className="w-full">
                إلغاء
              </Button>
             
            </div>  
          )}

          {status === 'success' && (
            <div className="flex flex-col sm:flex-row items-center gap-2 w-100">
               <Button  className="w-full">
                ابدأ التعلم
              </Button>
              <Button 
              style={{color:"#113555"}}
              variant="outline" className="w-full" onClick={() => console.log('Hello')}>
                الذهاب الي كورساتي
              </Button>
             
            </div>  
          )}

          {status === 'error' && (
            <div className="w-50">
              <Button 
              style={{color:"#113555"}} variant="outline" className="w-full" >الذهاب الي كورساتي </Button>
            </div>  
          )}

        </div>
      </div>
    </div>
  );
};
export default PaymentModal;


