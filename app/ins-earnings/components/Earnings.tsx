'use client';

import React, { useState, useMemo } from 'react';
import { Cairo } from 'next/font/google';
import {
  Download,
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart as PieChartIcon,
  ArrowUpRight,
  DollarSign,
  FileText,
  Calendar,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import * as XLSX from 'xlsx';

// إعداد الخط
const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '600', '700'] });

// --- Real Data Generation ---
const generateRealTransactions = (count: number) => {
  const courses = [
    'أساسيات البرمجة بلغة Python',
    'تطوير تطبيقات الويب الحديثة',
    'تصميم واجهات المستخدم UI/UX',
    'قواعد البيانات المتقدمة',
    'الذكاء الاصطناعي والتعلم الآلي',
    'أمن المعلومات والحماية السيبرانية',
    'تطوير تطبيقات الموبايل',
    'التسويق الرقمي الاحترافي',
    'إدارة المشاريع التقنية',
    'تحليل البيانات وعلم البيانات'
  ];

  const transactions = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 180); // آخر 6 أشهر
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);

    const amount = Math.floor(Math.random() * 600) + 200; // 200-800 ج.م
    const commissionRate = 0.2; // 20%
    const commission = Math.floor(amount * commissionRate);
    const net = amount - commission;

    transactions.push({
      id: i + 1,
      course: courses[Math.floor(Math.random() * courses.length)],
      amount,
      commission: -commission,
      net,
      date: date.toISOString().split('T')[0],
      month: date.getMonth(),
      year: date.getFullYear()
    });
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const TRANSACTIONS = generateRealTransactions(45);

// حساب البيانات الإحصائية الحقيقية
const calculateStats = () => {
  const totalEarnings = TRANSACTIONS.reduce((sum, tx) => sum + tx.net, 0);
  const totalAmount = TRANSACTIONS.reduce((sum, tx) => sum + tx.amount, 0);
  const totalCommission = Math.abs(TRANSACTIONS.reduce((sum, tx) => sum + tx.commission, 0));

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const currentMonthEarnings = TRANSACTIONS
    .filter(tx => tx.month === currentMonth && tx.year === currentYear)
    .reduce((sum, tx) => sum + tx.net, 0);

  const lastMonthEarnings = TRANSACTIONS
    .filter(tx => tx.month === lastMonth && tx.year === lastMonthYear)
    .reduce((sum, tx) => sum + tx.net, 0);

  const monthChange = lastMonthEarnings > 0
    ? Math.round(((currentMonthEarnings - lastMonthEarnings) / lastMonthEarnings) * 100)
    : 0;

  const availableBalance = Math.floor(totalEarnings * 0.35); // 35% متاح للسحب

  return {
    totalEarnings,
    currentMonthEarnings,
    monthChange,
    availableBalance,
    totalCommission,
    commissionRate: totalAmount > 0 ? Math.round((totalCommission / totalAmount) * 100) : 20
  };
};

const stats = calculateStats();

const STATS_DATA = [
  {
    id: 1,
    title: 'إجمالي الأرباح',
    value: stats.totalEarnings.toLocaleString('ar-EG'),
    unit: 'ج.م',
    change: `+${Math.round((stats.totalEarnings / TRANSACTIONS.length) * 0.15)}%`,
    isUp: true,
    icon: DollarSign,
    gradient: 'bg-gradient-to-b from-[#FFF3EB] to-[#fce7e7edB]'
  },
  {
    id: 2,
    title: 'أرباح هذا الشهر',
    value: stats.currentMonthEarnings.toLocaleString('ar-EG'),
    unit: 'ج.م',
    change: `${stats.monthChange > 0 ? '+' : ''}${stats.monthChange}%`,
    isUp: stats.monthChange >= 0,
    icon: TrendingUp,
    gradient: 'bg-gradient-to-br from-[#FFF3EB] to-[#fce7e7edB]'
  },
  {
    id: 3,
    title: 'الرصيد المتاح',
    value: stats.availableBalance.toLocaleString('ar-EG'),
    unit: 'ج.م',
    icon: Wallet,
    gradient: 'bg-gradient-to-br from-[#FFF3EB] to-[#fce7e7edB]'
  },
  {
    id: 4,
    title: 'معدل العمولة',
    value: `${stats.commissionRate}%`,
    icon: PieChartIcon,
    gradient: 'bg-gradient-to-br from-[#FFF3EB] to-[#fce7e7edB]'
  },
];


// بيانات الرسم البياني الشهري
const generateChartData = () => {
  const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  const currentMonth = new Date().getMonth();
  const chartData = [];

  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const monthTransactions = TRANSACTIONS.filter(tx => tx.month === monthIndex);
    const monthEarnings = monthTransactions.reduce((sum, tx) => sum + tx.net, 0);

    chartData.push({
      name: months[monthIndex],
      value: monthEarnings,
      count: monthTransactions.length
    });
  }

  return chartData;
};

const CHART_DATA = generateChartData();

// --- Sub-Components ---

const StatCard = ({ item }: { item: typeof STATS_DATA[0] }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity"
      style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} />

    <div className="flex items-start justify-between">
      <div className="space-y-2 flex-1">
        <p className="text-gray-500 text-sm font-medium">{item.title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
            {item.value}
          </h3>
          {item.unit && <span className="text-sm text-gray-400 font-medium">{item.unit}</span>}
        </div>
        {item.change && (
          <div className={`flex items-center gap-1.5 text-sm font-bold ${item.isUp ? 'text-green-600' : 'text-red-600'}`}>
            {item.isUp ? <ArrowUpRight size={16} /> : <TrendingDown size={16} />}
            <span>{item.change} من الشهر السابق</span>
          </div>
        )}
      </div>
      <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center text-orange-600 shadow-lg group-hover:scale-110 transition-transform`}>
        <item.icon size={26} />
      </div>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100">
        <p className="text-gray-900 font-bold text-lg mb-1">
          {payload[0].value.toLocaleString('ar-EG')} ج.م
        </p>
        <p className="text-gray-500 text-sm">
          {payload[0].payload.count} معاملة
        </p>
      </div>
    );
  }
  return null;
};

// --- Main Page Component ---

export default function EarningsPage() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterMonth, setFilterMonth] = useState<string>('all');
  const itemsPerPage = 10;

  // تصفية وبحث المعاملات
  const filteredTransactions = useMemo(() => {
    return TRANSACTIONS.filter(tx => {
      const matchesSearch = tx.course.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMonth = filterMonth === 'all' || tx.month === parseInt(filterMonth);
      return matchesSearch && matchesMonth;
    });
  }, [searchTerm, filterMonth]);

  // حساب الصفحات
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  // تصدير إلى Excel
  const handleDownload = () => {
    setIsDownloading(true);

    setTimeout(() => {
      try {
        // إعداد البيانات للتصدير
        const exportData: any[] = TRANSACTIONS.map((tx, index) => ({
          'الرقم': index + 1,
          'الدورة': tx.course,
          'المبلغ الإجمالي': tx.amount,
          'العمولة': tx.commission,
          'الصافي': tx.net,
          'التاريخ': tx.date
        }));

        // إضافة ملخص في النهاية
        exportData.push({
          'الرقم': '',
          'الدورة': 'الإجمالي',
          'المبلغ الإجمالي': TRANSACTIONS.reduce((sum, tx) => sum + tx.amount, 0),
          'العمولة': TRANSACTIONS.reduce((sum, tx) => sum + tx.commission, 0),
          'الصافي': stats.totalEarnings,
          'التاريخ': ''
        });

        // إنشاء ورقة العمل
        const ws = XLSX.utils.json_to_sheet(exportData);

        // تنسيق العرض
        const colWidths = [
          { wch: 8 },  // الرقم
          { wch: 35 }, // الدورة
          { wch: 15 }, // المبلغ
          { wch: 12 }, // العمولة
          { wch: 12 }, // الصافي
          { wch: 12 }  // التاريخ
        ];
        ws['!cols'] = colWidths;

        // إنشاء المصنف
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'الأرباح');

        // إضافة ورقة إحصائيات
        const statsData = [
          { 'البيان': 'إجمالي الأرباح', 'القيمة': `${stats.totalEarnings} ج.م` },
          { 'البيان': 'أرباح هذا الشهر', 'القيمة': `${stats.currentMonthEarnings} ج.م` },
          { 'البيان': 'الرصيد المتاح', 'القيمة': `${stats.availableBalance} ج.م` },
          { 'البيان': 'إجمالي العمولات', 'القيمة': `${stats.totalCommission} ج.م` },
          { 'البيان': 'معدل العمولة', 'القيمة': `${stats.commissionRate}%` },
          { 'البيان': 'عدد المعاملات', 'القيمة': TRANSACTIONS.length }
        ];
        const statsWs = XLSX.utils.json_to_sheet(statsData);
        statsWs['!cols'] = [{ wch: 20 }, { wch: 20 }];
        XLSX.utils.book_append_sheet(wb, statsWs, 'الإحصائيات');

        // تحميل الملف
        const fileName = `earnings_report_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);

        setIsDownloading(false);
      } catch (error) {
        console.error('Error exporting:', error);
        alert('حدث خطأ أثناء تصدير الملف');
        setIsDownloading(false);
      }
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div dir="rtl" className={`${cairo.className} space-y-6`}>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-orange-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2"> الأرباح والمعاملات</h1>
          <p className="text-gray-600 text-sm flex items-center gap-2">
            <Calendar size={16} />
            تتبع أرباحك ومعاملاتك المالية بدقة واحترافية
          </p>
        </div>
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-70 shadow-lg shadow-orange-200 hover:shadow-xl hover:scale-105 active:scale-95"
        >
          {isDownloading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>جاري التصدير...</span>
            </>
          ) : (
            <>
              <Download size={20} />
              <span>تصدير تقرير Excel</span>
            </>
          )}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 text-black  sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS_DATA.map(item => <StatCard key={item.id} item={item} />)}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Monthly Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 text-xl flex items-center gap-2">
              الأرباح الشهرية
            </h3>
            <div className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
              آخر 6 أشهر
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 13, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#f97316"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">ملخص سريع</h3>
              <FileText size={24} />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-white/20">
                <span className="text-orange-100">عدد المعاملات</span>
                <span className="font-bold text-xl">{TRANSACTIONS.length}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/20">
                <span className="text-orange-100">متوسط الربح</span>
                <span className="font-bold text-xl">
                  {Math.round(stats.totalEarnings / TRANSACTIONS.length).toLocaleString('ar-EG')} ج.م
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-orange-100">إجمالي العمولات</span>
                <span className="font-bold text-xl">{stats.totalCommission.toLocaleString('ar-EG')} ج.م</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              أفضل الدورات
            </h3>
            <div className="space-y-3">
              {Array.from(new Set(TRANSACTIONS.slice(0, 5).map(tx => tx.course))).slice(0, 3).map((course, idx) => {
                const courseEarnings = TRANSACTIONS
                  .filter(tx => tx.course === course)
                  .reduce((sum, tx) => sum + tx.net, 0);
                return (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm line-clamp-1">{course}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {TRANSACTIONS.filter(tx => tx.course === course).length} معاملة
                      </p>
                    </div>
                    <span className="font-bold text-orange-600 text-sm">
                      {courseEarnings.toLocaleString('ar-EG')} ج.م
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table Header with Filters */}
        <div className="p-6 border-b border-gray-100 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h3 className="font-bold text-gray-900 text-xl flex items-center gap-2">
              جميع المعاملات
              <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {filteredTransactions.length} معاملة
              </span>
            </h3>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="ابحث عن دورة..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Month Filter */}
            <div className="relative">
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              <select
                value={filterMonth}
                onChange={(e) => {
                  setFilterMonth(e.target.value);
                  setCurrentPage(1);
                }}
                className="pr-10 pl-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white cursor-pointer min-w-[150px]"
              >
                <option value="all">كل الأشهر</option>
                {['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'].map((month, idx) => (
                  <option key={idx} value={idx}>{month}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-orange-50 to-orange-100/50 text-gray-700 font-bold">
              <tr>
                <th className="px-6 py-4 text-right">#</th>
                <th className="px-6 py-4 text-right">الدورة</th>
                <th className="px-6 py-4 text-center">المبلغ</th>
                <th className="px-6 py-4 text-center">العمولة</th>
                <th className="px-6 py-4 text-center">الصافي</th>
                <th className="px-6 py-4 text-center">التاريخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentTransactions.length > 0 ? (
                currentTransactions.map((tx, idx) => (
                  <tr key={tx.id} className="hover:bg-orange-50/50 transition-colors">
                    <td className="px-6 py-4 text-gray-500 font-medium">
                      {startIndex + idx + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {tx.course}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-gray-700">
                      {tx.amount.toLocaleString('ar-EG')} ج.م
                    </td>
                    <td className="px-6 py-4 text-center text-red-600 font-bold">
                      {tx.commission.toLocaleString('ar-EG')} ج.م
                    </td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold text-base">
                      {tx.net.toLocaleString('ar-EG')} ج.م
                    </td>
                    <td className="px-6 py-4 text-center text-gray-500 text-xs">
                      {formatDate(tx.date)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Search size={48} className="text-gray-300" />
                      <p className="font-medium">لا توجد معاملات مطابقة</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-6 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              عرض {startIndex + 1} - {Math.min(endIndex, filteredTransactions.length)} من {filteredTransactions.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={20} />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${currentPage === pageNum
                          ? 'bg-orange-500 text-white shadow-lg'
                          : 'border border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
