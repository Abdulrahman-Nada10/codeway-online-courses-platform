"use client"
import  { useState } from 'react';
import InputField from './components/InputField';
import PaymentTab from './components/PaymentTab';
import { IModalContent, IPaymentTabs, ITicketSummary, PaymentMethod } from '@/types';
import Image from 'next/image';
import Button from '../components/ui/Button';
import PaymentModal from './components/PaymentModal';
import CountryCodeSelector from './components/CountryCodeSelector';

interface IProps {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const paymentTabs: IPaymentTabs[] = [

    { 
      label: 'فوري',
      src: '/fawry.png',
      method: 'fawry',
    },
    { 
      label: 'الدفع عن طريق الفيزا',
      src: '/visa.png',
      method: 'card',
    },
    { 
      label: 'فودافون كاش',
      src: '/vodafone.png',
      method: 'vodafone',
    },
    { 
      label: 'PayPal',
      src: '/paypal.png',
      method: 'paypal',
    },
]



const PaymentPage = ({}: IProps) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [coupon, setCoupon] = useState(''); 

  const handlePayment = () => {
    const paymentData = {
      method: selectedMethod,
      coupon: coupon,
    };
    console.log("Ready to send to API:", paymentData);
  };

  return (

    <div className="min-h-screen text-[#113555] bg-[#FFF5EE] p-4 md:p-8 dir-rtl text-right" dir="rtl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-5">
          <div className="lg:col-span-1">
          <div className="w-full max-w-lg justify-self-center bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-5">
            <div className="flex gap-4 mb-6">
                <div className='space-y-2'>
                <h3 className="font-medium  ">معسكر تدريبي شامل لتطوير مواقع الويب 2026</h3>
                <p className="text-sm ">م. أحمد محمد</p>
              </div>
              <div className="w-24 h-16 bg-blue-900 rounded-md overflow-hidden">
                <Image src="/prog.jpg" alt="Code" width={100} height={100} 
                className="object-cover w-full h-full" />
              </div>
            </div>

            <hr className="my-4 border-[#00000040]" />
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-baseline gap-2 font-medium">
                  <span className="text-2xl  text-orange-600">900 EGP</span>
                  <span className="text-gray-400 line-through text-sm">1800 EGP</span>
              </div>
              <span className="bg-red-600 text-[#113555] text-xs px-2 py-1 rounded-md font-bold">خصم 50%</span>
            </div>
            <Button 
              onClick={handlePayment}
              className="w-full"
            >
              إتمام الدفع
            </Button>

            <hr className="my-6 border-[#00000040]" />
            <div className="flex justify-center gap-3 ">
               {paymentTabs.map((tab) => (
                <Image key={tab.method} src={tab.src} alt={tab.label} width={90} height={90} className="object-contain w-7 h-7 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6 w-full max-w-2xl justify-self-center">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {paymentTabs.map((tab) => (
              <PaymentTab 
                key={tab.method}
                active={selectedMethod === tab.method} 
                onClick={() => setSelectedMethod(tab.method)}
                label={tab.label}
                src={tab.src}
              />
            ))}
          </div>

          <div className="transition-all duration-300">
            {selectedMethod === 'card' && (
              <div className="space-y-4">
                <InputField label="رقم البطاقة" placeholder="1234 5678 9101 1121" />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="تاريخ الإصدار" placeholder="شهر / سنة" />
                  <InputField label="CVV" placeholder="123" />
                </div>
                <InputField label="الاسم المدون على البطاقة" placeholder="أحمد السيد أحمد" />
              </div>
            )}

            {(selectedMethod === 'fawry' || selectedMethod === 'vodafone') && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
          <div className="text-right space-y-1">
            <div className="flex gap-3">
                <div className="flex-1">
                <InputField 
                label="رقم الموبايل"
                placeholder="10X XXX XXX" 
                />
                </div>
            <CountryCodeSelector />
          </div>
          </div>
          {selectedMethod === 'fawry' ? (
            <InputField label="البريد الإلكتروني" placeholder="example@gmail.com" />
          ) : (
            <p className="text-sm text-gray-500 font-medium py-2">
              سيتم إرسال طلب تأكيد على محفظة فودافون كاش الخاصة بك.
            </p>
          )}
        </div>
      )}

            {selectedMethod === 'paypal' && (
            <div className="p-8 text-center border-2 border-dashed rounded-xl">
            <p className="text-gray-500 italic">سيتم توجيهك إلى صفحة PayPal لإتمام العملية...</p>
            </div>
            )}

          </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="mb-3 font-medium text-gray-700">هل لديك قسيمة خصم أو كوبون؟</p>
            <div className="flex gap-10">
              <input 
                type="text" 
                className="flex-1 border rounded-2xl px-4 py-2 border-[#113555] outline-none"
                placeholder="أدخل رمز الكوبون"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />

              <Button 
              variant='outline'
              size='sm'
              className="w-24"
              style={{ color: '#113555' }}>
                تقديم
              </Button>
            </div>
            <p className="mt-2 text-sm text-[#78808A]">جرب الرمز "save10" للحصول على خصم 10%</p>
          </div>

        </div>

      </div>
      <PaymentModal 

        isOpen={isModalOpen} 

        onClose={() => setIsModalOpen(false)} 
        type='paypal'
        status='error'
        phone='01287677534'
       

      />

    </div>

  );

};



export default PaymentPage;