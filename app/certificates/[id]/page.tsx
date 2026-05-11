'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { DiplomaIcon, BackIcon, CalendarIconAlt, User as InstructorIcon, BadgeCheck as BadgeIcon, CheckCircle as CheckCircleIcon, Download as DownloadIconAlt, Share2 as ShareIconAlt } from '../../components/icons';

export const certificatesData = [
  {
    id: 1,
    title: 'تطوير تطبيقات الويب المتقدمة',
    instructor: 'أحمد محمد',
    day: 15,
    month: 'ديسمبر',
    year: 2023,
    certificateNumber: 'CERT - 2023 - WEB - 001',
    courseName: 'تطوير تطبيقات الويب المتقدمة',
    studentName: 'عمر محمد السيد',
    issueDate: '15 ديسمبر 2023',
    status: 'معتمدة',
    totalHours: 40,
    units: 12,
  },
  {
    id: 2,
    title: 'تصميم واجهات المستخدم UX/UI',
    instructor: 'سارة أحمد',
    day: 20,
    month: 'نوفمبر',
    year: 2023,
    certificateNumber: 'CERT - 2023 - UI - 002',
    courseName: 'تصميم واجهات المستخدم UX/UI',
    studentName: 'عمر محمد السيد',
    issueDate: '20 نوفمبر 2023',
    status: 'معتمدة',
    totalHours: 25,
    units: 8,
  },
  {
    id: 3,
    title: 'البرمجة بلغة بايثون',
    instructor: 'محمد علي',
    day: 10,
    month: 'أكتوبر',
    year: 2023,
    certificateNumber: 'CERT - 2023 - PY - 003',
    courseName: 'البرمجة بلغة بايثون',
    studentName: 'عمر محمد السيد',
    issueDate: '10 أكتوبر 2023',
    status: 'معتمدة',
    totalHours: 30,
    units: 10,
  },
  {
    id: 4,
    title: 'أساسيات التسويق الرقمي',
    instructor: 'خالد يوسف',
    day: 5,
    month: 'سبتمبر',
    year: 2023,
    certificateNumber: 'CERT - 2023 - MK - 004',
    courseName: 'أساسيات التسويق الرقمي',
    studentName: 'عمر محمد السيد',
    issueDate: '5 سبتمبر 2023',
    status: 'معتمدة',
    totalHours: 20,
    units: 6,
  },
];

export default function CertificateDetail() {
  const params = useParams();
  const id = params?.id ? parseInt(params.id as string) : 1;
  
  const certificateData = certificatesData.find(cert => cert.id === id) || certificatesData[0];

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1200;
    canvas.height = 900;
    
    if (ctx) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#FF6400');
      gradient.addColorStop(1, '#F59F00');
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 25;
      ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);
      
      ctx.strokeStyle = '#FFE0C2';
      ctx.lineWidth = 3;
      ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
      
      const centerX = canvas.width / 2;
      const iconY = 100;
      
      const iconGradient = ctx.createLinearGradient(centerX - 60, iconY - 60, centerX + 60, iconY + 60);
      iconGradient.addColorStop(0, '#FF6400');
      iconGradient.addColorStop(1, '#F59F00');
      ctx.fillStyle = iconGradient;
      ctx.beginPath();
      ctx.arc(centerX, iconY, 55, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(centerX - 25, iconY - 35);
      ctx.lineTo(centerX + 25, iconY - 35);
      ctx.lineTo(centerX + 25, iconY + 20);
      ctx.lineTo(centerX, iconY + 30);
      ctx.lineTo(centerX - 25, iconY + 20);
      ctx.closePath();
      ctx.fill();
      
      ctx.strokeStyle = '#FF6400';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX - 15, iconY - 10);
      ctx.lineTo(centerX + 15, iconY - 10);
      ctx.moveTo(centerX - 15, iconY + 5);
      ctx.lineTo(centerX + 5, iconY + 5);
      ctx.stroke();
      
      ctx.fillStyle = '#666666';
      ctx.font = 'bold 28px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('شهادة إتمام', centerX, 195);
      
      ctx.fillStyle = '#113555';
      ctx.font = 'bold 40px Arial';
      ctx.fillText(certificateData.courseName, centerX, 255);
      
      ctx.strokeStyle = '#FF6400';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX - 80, 275);
      ctx.lineTo(centerX + 80, 275);
      ctx.stroke();
      
      ctx.fillStyle = '#666666';
      ctx.font = 'bold 26px Arial';
      ctx.fillText('تم منحها إلى', centerX, 325);
      
      ctx.fillStyle = '#113555';
      ctx.font = 'bold 36px Arial';
      ctx.fillText(certificateData.studentName, centerX, 370);
      
      ctx.fillStyle = '#666666';
      ctx.font = '20px Arial';
      ctx.fillText(`لإتمامه بنجاح دورة "${certificateData.courseName}"`, centerX, 415);
      ctx.fillText(`بإجمالي ${certificateData.totalHours} ساعة تعليمية و ${certificateData.units} وحدات دراسية`, centerX, 445);
      
      const cardWidth = 260;
      const cardHeight = 80;
      const cardY1 = 490;
      const cardY2 = 585;
      const startX = 220;
      const gap = 30;
      
      ctx.fillStyle = '#FFF3EB';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 8;
      ctx.fillRect(startX, cardY1, cardWidth, cardHeight);
      ctx.fillRect(startX + cardWidth + gap, cardY1, cardWidth, cardHeight);
      ctx.fillRect(startX, cardY2, cardWidth, cardHeight);
      ctx.fillRect(startX + cardWidth + gap, cardY2, cardWidth, cardHeight);
      ctx.shadowBlur = 0;
      
      ctx.fillStyle = '#888888';
      ctx.font = '14px Arial';
      ctx.fillText('تاريخ الإصدار', startX + cardWidth/2, cardY1 + 25);
      ctx.fillStyle = '#113555';
      ctx.font = 'bold 16px Arial';
      ctx.fillText(certificateData.issueDate, startX + cardWidth/2, cardY1 + 50);
      
      ctx.fillStyle = '#888888';
      ctx.font = '14px Arial';
      ctx.fillText('المدرب', startX + cardWidth + gap + cardWidth/2, cardY1 + 25);
      ctx.fillStyle = '#113555';
      ctx.font = 'bold 16px Arial';
      ctx.fillText(certificateData.instructor, startX + cardWidth + gap + cardWidth/2, cardY1 + 50);
      
      ctx.fillStyle = '#888888';
      ctx.font = '14px Arial';
      ctx.fillText('رقم الشهادة', startX + cardWidth/2, cardY2 + 25);
      ctx.fillStyle = '#113555';
      ctx.font = 'bold 12px Arial';
      ctx.fillText(certificateData.certificateNumber, startX + cardWidth/2, cardY2 + 50);
      
      ctx.fillStyle = '#888888';
      ctx.font = '14px Arial';
      ctx.fillText('الحالة', startX + cardWidth + gap + cardWidth/2, cardY2 + 25);
      ctx.fillStyle = '#FF6400';
      ctx.font = 'bold 18px Arial';
      ctx.fillText(certificateData.status, startX + cardWidth + gap + cardWidth/2, cardY2 + 50);
      
      const sigY = 720;
      ctx.strokeStyle = '#FFC6A1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(280, sigY);
      ctx.lineTo(520, sigY);
      ctx.moveTo(680, sigY);
      ctx.lineTo(920, sigY);
      ctx.stroke();
      
      ctx.fillStyle = '#666666';
      ctx.font = '16px Arial';
      ctx.fillText('إدارة المنصة', 400, sigY - 10);
      ctx.fillText('المدرب', 800, sigY - 10);
      ctx.fillStyle = '#113555';
      ctx.font = 'bold 18px Arial';
      ctx.fillText('التوقيع', 400, sigY + 30);
      ctx.fillText(certificateData.instructor, 800, sigY + 30);
      
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `certificate-${certificateData.certificateNumber.replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF3EB]">
      <Sidebar />
      <div className="lg:mr-70 xl:mr-70 md:mr-0">
        <Navbar />
        <div className="p-3 sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <Link href="/certificates" className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.1752 8.575L7.27516 13.475C7.07516 13.675 6.97916 13.9083 6.98716 14.175C6.99516 14.4417 7.09949 14.675 7.30016 14.875C7.50016 15.0583 7.73349 15.1543 8.00016 15.163C8.26682 15.1717 8.50016 15.0757 8.70016 14.875L15.3002 8.275C15.4002 8.175 15.4712 8.06667 15.5132 7.95C15.5552 7.83333 15.5755 7.70833 15.5742 7.575C15.5728 7.44167 15.5518 7.31667 15.5112 7.2C15.4705 7.08333 15.3998 6.975 15.2992 6.875L8.69916 0.275C8.51582 0.0916663 8.28649 0 8.01116 0C7.73582 0 7.49849 0.0916663 7.29916 0.275C7.09916 0.475 6.99916 0.712667 6.99916 0.988C6.99916 1.26333 7.09916 1.50067 7.29916 1.7L12.1752 6.575H1.00016C0.716824 6.575 0.479158 6.671 0.287158 6.863C0.0951576 7.055 -0.000509262 7.29233 0.000157356 7.575C0.000823975 7.85767 0.0968237 8.09533 0.288157 8.288C0.479491 8.48067 0.716824 8.57633 1.00016 8.575H12.1752Z" fill="#FF6400"/>
              </svg>
            </Link>
            <span className="font-cairo text-sm text-[#113555]">العودة للشهادات</span>
          </div>

        <div className="w-full rounded-2xl overflow-hidden p-1.25 bg-[linear-gradient(109.45deg,#FF6400_0.67%,#F59F00_99.65%)]">
            <div className="w-full bg-white rounded-xl px-6 py-10">
              <div className="flex flex-col items-center gap-8">
                <div className="w-30 h-30 rounded-full flex items-center justify-center bg-linear-to-b from-[#FF6400] to-[#F5A00F] p-3">
                  <DiplomaIcon className="w-full h-full text-white" />
                </div>

                <div className="text-center">
                  <p className="font-cairo text-sm text-gray-500 mb-2">شهادة إتمام</p>
                  <h1 className="font-cairo font-bold text-xl sm:text-2xl text-[#113555]">{certificateData.courseName}</h1>
                  <div className="w-45 h-1 rounded-full mx-auto mt-3 bg-linear-to-r from-[#FF6400] to-[#F59F00]"></div>
                </div>

                <div className="text-center">
                  <p className="font-cairo text-sm text-gray-500 mb-1">تم منحها إلى</p>
                  <h2 className="font-cairo font-bold text-lg sm:text-xl text-[#113555]">{certificateData.studentName}</h2>
                  <p className="font-cairo text-sm text-gray-600 mt-2 max-w-md mx-auto">
                    لإتمامه بنجاح دورة "{certificateData.courseName}" بإجمالي {certificateData.totalHours} ساعة تعليمية و {certificateData.units} وحدات دراسية.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 w-full max-w-3xl">
                  <div className="flex-1 min-w-35 h-22.5 rounded-lg bg-[#FFF3EB] flex flex-col items-center justify-center gap-1 p-3 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 4H7V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2C8.26522 2 8.51957 2.10536 8.70711 2.29289C8.89464 2.48043 9 2.73478 9 3V4H15V3C15 2.73478 15.1054 2.48043 15.2929 2.29289C15.4804 2.10536 15.7348 2 16 2C16.2652 2 16.5196 2.10536 16.7071 2.29289C16.8946 2.48043 17 2.73478 17 3V4H19C19.7956 4 20.5587 4.31607 21.1213 4.87868C21.6839 5.44129 22 6.20435 22 7V19C22 19.7956 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7956 22 19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V7C2 6.20435 2.31607 5.44129 2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4ZM4 19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V12H4V19ZM4 10H20V7C20 6.73478 19.8946 6.48043 19.7071 6.29289C19.5196 6.10536 19.2652 6 19 6H17V7C17 7.26522 16.8946 7.51957 16.7071 7.70711C16.5196 7.89464 16.2652 8 16 8C15.7348 8 15.4804 7.89464 15.2929 7.70711C15.1054 7.51957 15 7.26522 15 7V6H9V7C9 7.26522 8.89464 7.51957 8.70711 7.70711C8.51957 7.89464 8.26522 8 8 8C7.73478 8 7.48043 7.89464 7.29289 7.70711C7.10536 7.51957 7 7.26522 7 7V6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7V10Z" fill="#FF6400"/>
                    </svg>
                    <p className="font-cairo text-xs text-gray-500">تاريخ الإصدار</p>
                    <p className="font-cairo font-bold text-xs text-[#113555]">{certificateData.issueDate}</p>
                  </div>
                  
                  <div className="flex-1 min-w-35 h-22.5 rounded-lg bg-[#FFF3EB] flex flex-col items-center justify-center gap-1 p-3 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.75 3.9375H20.25C20.5981 3.9375 20.9319 4.07578 21.1781 4.32192C21.4242 4.56806 21.5625 4.9019 21.5625 5.25V18.75C21.5625 19.0981 21.4242 19.4319 21.1781 19.6781C20.9319 19.9242 20.5981 20.0625 20.25 20.0625H18.9947C18.8882 20.0625 18.784 20.0322 18.694 19.9753C18.6041 19.9184 18.5322 19.8371 18.4866 19.7409C18.1067 18.9387 17.5069 18.2609 16.7569 17.7862C16.0069 17.3115 15.1376 17.0595 14.25 17.0595C13.3624 17.0595 12.4931 17.3115 11.7431 17.7862C10.9931 18.2609 10.3933 18.9387 10.0134 19.7409C9.96784 19.8371 9.8959 19.9184 9.80595 19.9753C9.71601 20.0322 9.61176 20.0625 9.50531 20.0625H3.75C3.4019 20.0625 3.06806 19.9242 2.82192 19.6781C2.57578 19.4319 2.4375 19.0981 2.4375 18.75V5.25C2.4375 4.9019 2.57578 4.56806 2.82192 4.32192C3.06806 4.07578 3.4019 3.9375 3.75 3.9375ZM16.6875 13.5C16.6875 13.0179 16.5445 12.5466 16.2767 12.1458C16.0089 11.745 15.6282 11.4325 15.1828 11.248C14.7374 11.0636 14.2473 11.0153 13.7745 11.1093C13.3016 11.2034 12.8673 11.4355 12.5264 11.7764C12.1855 12.1173 11.9534 12.5516 11.8593 13.0245C11.7653 13.4973 11.8136 13.9874 11.998 14.4328C12.1825 14.8782 12.495 15.2589 12.8958 15.5267C13.2966 15.7945 13.7679 15.9375 14.25 15.9375C14.8965 15.9375 15.5165 15.6807 15.9736 15.2236C16.4307 14.7665 16.6875 14.1465 16.6875 13.5Z"  stroke="#FF6400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="font-cairo text-xs text-gray-500">المدرب</p>
                    <p className="font-cairo font-bold text-xs text-[#113555]">{certificateData.instructor}</p>
                  </div>
                  
                  <div className="flex-1 min-w-35 h-22.5 rounded-lg bg-[#FFF3EB] flex flex-col items-center justify-center gap-1 pr-1 pl-12shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.00138 17V21L12.0014 19L15.0014 21V17M13.9584 4.27498L13.6354 3.83098C13.4477 3.57354 13.2019 3.36409 12.918 3.21968C12.634 3.07527 12.3199 3 12.0014 3C11.6828 3 11.3688 3.07527 11.0848 3.21968C10.8008 3.36409 10.555 3.57354 10.3674 3.83098L10.0444 4.27498L9.50138 4.18998C9.18672 4.14036 8.86479 4.16586 8.56186 4.2644C8.25894 4.36294 7.98361 4.53172 7.75837 4.75697C7.53312 4.98221 7.36434 5.25754 7.2658 5.56046C7.16726 5.86339 7.14176 6.18532 7.19138 6.49998L7.27638 7.04298L6.83238 7.36598C6.57457 7.55336 6.36475 7.79909 6.22008 8.08308C6.07542 8.36707 6 8.68126 6 8.99998C6 9.3187 6.07542 9.63289 6.22008 9.91688C6.36475 10.2009 6.57457 10.4466 6.83238 10.634L7.27638 10.957L7.19138 11.499C7.14158 11.8137 7.16695 12.1358 7.26541 12.4388C7.36387 12.7419 7.53262 13.0173 7.75789 13.2427C7.98316 13.4681 8.25856 13.637 8.56157 13.7355C8.86458 13.8341 9.18662 13.8596 9.50138 13.81L10.0444 13.725L10.3674 14.169C10.555 14.4264 10.8008 14.6359 11.0848 14.7803C11.3688 14.9247 11.6828 15 12.0014 15C12.3199 15 12.634 14.9247 12.918 14.7803C13.2019 14.6359 13.4477 14.4264 13.6354 14.169L13.9584 13.725L14.5004 13.81C14.8151 13.8598 15.1372 13.8344 15.4402 13.736C15.7433 13.6375 16.0187 13.4687 16.2441 13.2435C16.4695 13.0182 16.6384 12.7428 16.7369 12.4398C16.8355 12.1368 16.861 11.8147 16.8114 11.5L16.7264 10.957L17.1704 10.634C17.4278 10.4463 17.6373 10.2005 17.7817 9.91656C17.9261 9.63261 18.0014 9.31855 18.0014 8.99998C18.0014 8.68141 17.9261 8.36735 17.7817 8.0834C17.6373 7.79944 17.4278 7.55363 17.1704 7.36598L16.7264 7.04298L16.8114 6.50098C16.8612 6.18625 16.8358 5.8642 16.7374 5.56114C16.6389 5.25808 16.4701 4.98262 16.2449 4.75725C16.0196 4.53188 15.7442 4.363 15.4412 4.26441C15.1382 4.16582 14.8161 4.14032 14.5014 4.18998L13.9584 4.27498Z" stroke="#FF6400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="font-cairo text-xs text-gray-500">رقم الشهادة</p>
                    <p className="font-cairo font-bold text-xs text-[#113555]">{certificateData.certificateNumber}</p>
                  </div>
                  
                  <div className="flex-1 min-w-35 h-22.5 rounded-lg bg-[#FFF3EB] flex flex-col items-center justify-center gap-1 p-3 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 10L12.258 12.444C12.4598 12.5954 12.7114 12.6649 12.9624 12.6385C13.2133 12.6122 13.445 12.492 13.611 12.302L20 5" stroke="#FF6400" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M21 12C21 13.8805 20.411 15.7138 19.3157 17.2424C18.2203 18.771 16.6736 19.918 14.8929 20.5225C13.1122 21.127 11.1868 21.1585 9.3873 20.6125C7.58776 20.0666 6.00442 18.9707 4.85967 17.4788C3.71492 15.9868 3.06627 14.1738 3.00481 12.2943C2.94335 10.4147 3.47218 8.56317 4.51702 6.99962C5.56187 5.43607 7.07023 4.23908 8.83027 3.57678C10.5903 2.91447 12.5136 2.82011 14.33 3.30696" stroke="#FF6400" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <p className="font-cairo text-xs text-gray-500">الحالة</p>
                    <p className="font-cairo font-bold text-xs text-[#000000]">{certificateData.status}</p>
                  </div>

                <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-2">

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-45 h-0.5 rounded-[20px] bg-[rgba(255,198,161,1)]"></div>
                    <p className="font-cairo font-bold text-md text-black">م.{certificateData.instructor}</p>
                    <p className="font-cairo font-semibold text-gray-600">المدرب</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-45 h-0.5 rounded-[20px] bg-[rgba(255,198,161,1)]"></div>
                    <p className="font-cairo text-md text-black font-bold">إدارة المنصة</p>
                    <p className="font-cairo font-semibold text-md text-gray-600">التوقيع</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button onClick={handleDownload} className="flex items-center gap-2 py-3 px-6 rounded-lg font-cairo font-semibold text-sm bg-[#FF6400] text-white hover:bg-[#E55A00] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.001 15.5C19.1562 15.4996 19.2646 15.5469 19.3594 15.6416C19.4541 15.7363 19.5007 15.8443 19.5 15.998V18C19.5 18.4163 19.3579 18.7606 19.0596 19.0596C18.7616 19.358 18.4176 19.5004 18.001 19.5H6C5.58354 19.5 5.23963 19.3578 4.94141 19.0596C4.68039 18.7986 4.53854 18.5021 4.50684 18.1523L4.5 17.999V16C4.5 15.8431 4.54766 15.7354 4.64062 15.6426C4.73479 15.5487 4.84403 15.5004 5.00098 15.5C5.15618 15.4996 5.26463 15.5469 5.35938 15.6416C5.45407 15.7363 5.50073 15.8443 5.5 15.998V18.5H18.5V16C18.5 15.8431 18.5477 15.7354 18.6406 15.6426C18.7348 15.5487 18.844 15.5004 19.001 15.5ZM12.001 4.5C12.1562 4.49963 12.2646 4.54686 12.3594 4.6416C12.4541 4.73629 12.5007 4.84425 12.5 4.99805V13.3574L15.2285 10.6289C15.3341 10.5234 15.4397 10.4825 15.5732 10.4863C15.714 10.4904 15.8287 10.5385 15.9385 10.6465C16.0374 10.7576 16.0833 10.8751 16.0879 11.0166C16.0917 11.1353 16.0564 11.2369 15.9473 11.3457L12.3467 14.9463C12.2915 15.0015 12.2443 15.0292 12.2061 15.043C12.1486 15.0636 12.0819 15.0755 12.0029 15.0752H12C11.9192 15.0752 11.851 15.0629 11.792 15.042C11.7557 15.0291 11.7092 15.0025 11.6543 14.9473L8.05371 11.3467C7.94459 11.2376 7.90851 11.1345 7.91211 11.0146C7.91641 10.8735 7.96246 10.7568 8.0625 10.6455C8.17238 10.539 8.28733 10.4914 8.42773 10.4873C8.56177 10.4835 8.66696 10.5244 8.77148 10.6289L11.5 13.3574V5C11.5 4.84307 11.5477 4.73538 11.6406 4.64258C11.7348 4.54874 11.844 4.50041 12.001 4.5Z" fill="black" stroke="white"/>
                </svg>

              تحميل الشهادة
            </button>
            <button className="flex items-center gap-2 py-3 px-6 rounded-lg font-cairo font-semibold text-sm bg-[#FF6400] text-white hover:bg-[#E55A00] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.499 2.75H16.5C16.9677 2.74984 17.4281 2.86851 17.8369 3.0957C18.2458 3.32293 18.59 3.65148 18.8369 4.04883C19.0837 4.4461 19.2254 4.90004 19.248 5.36719C19.2706 5.83436 19.1731 6.29948 18.9658 6.71875C18.7585 7.1381 18.4475 7.49798 18.0625 7.76367C17.6775 8.02924 17.2312 8.19229 16.7656 8.2373C16.3 8.28233 15.8302 8.2075 15.4014 8.02051C14.9729 7.83358 14.5992 7.5405 14.3154 7.16895L14.0234 6.78711L13.6309 7.0625L9.15039 10.1982L8.80469 10.4404L8.98633 10.8223C9.15508 11.1775 9.25 11.5766 9.25 11.999C9.25 12.4212 9.1544 12.8191 8.98535 13.1758L8.80469 13.5576L9.15039 13.7998L13.6299 16.9365L14.0225 17.2119L14.3145 16.8301C14.71 16.3123 15.2765 15.9515 15.9131 15.8125C16.5501 15.6736 17.2165 15.766 17.792 16.0723C18.3673 16.3786 18.8152 16.8796 19.0557 17.4854C19.296 18.0911 19.3132 18.7625 19.1045 19.3799C18.8958 19.9973 18.4747 20.5207 17.916 20.8564C17.3572 21.1921 16.697 21.3186 16.0537 21.2129C15.4104 21.1071 14.8253 20.7762 14.4033 20.2793C13.9814 19.7824 13.7501 19.1518 13.75 18.5L13.7598 18.2529C13.7668 18.1719 13.778 18.092 13.792 18.0137L13.8477 17.6992L13.5859 17.5166L8.86621 14.2109L8.8125 14.168L8.50391 13.9238L8.19336 14.166C7.78737 14.4833 7.30054 14.6804 6.78809 14.7344C6.27562 14.7883 5.75812 14.6975 5.29492 14.4717C4.8317 14.2458 4.4411 13.894 4.16797 13.457C3.89483 13.02 3.75 12.5144 3.75 11.999C3.75009 11.4838 3.89491 10.9789 4.16797 10.542C4.44111 10.105 4.83169 9.7532 5.29492 9.52734C5.75812 9.30155 6.27562 9.21068 6.78809 9.26465C7.30054 9.31863 7.78737 9.51568 8.19336 9.83301L8.50098 10.0732L8.80859 9.83301L8.85645 9.7959L13.5859 6.4834L13.8486 6.2998L13.792 5.98535C13.721 5.58942 13.7376 5.18271 13.8408 4.79395C13.9441 4.40515 14.1315 4.04387 14.3896 3.73535C14.6479 3.42679 14.9704 3.17803 15.335 3.00781C15.6994 2.83768 16.0969 2.74992 16.499 2.75Z" fill="white"/>
              </svg>
              مشاركة الشهادة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
