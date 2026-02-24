// components/CountryCodeSelector.tsx
const CountryCodeSelector = () => {
  return (
    <div className="relative flex items-center">
      <select className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-8 font-medium text-[#113555] outline-none focus:border-[#113555] cursor-pointer">
        <option value="+20">+20</option>
        <option value="+966">+966</option>
        <option value="+971">+971</option>
      </select>
     
      <div className="absolute left-3 pointer-events-none">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="#113555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

export default CountryCodeSelector;
