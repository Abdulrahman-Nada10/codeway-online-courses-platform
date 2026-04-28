import type { TFunction } from "i18next";

export interface UserCertificate {
  id: number;
  title: string;
  instructor: string;
  day: number;
  month: string;
  year: number;
  certificateNumber: string;
  courseName: string;
  studentName: string;
  issueDate: string;
  status: string;
  totalHours: number;
  units: number;
}

export function getUserCertificates(t: TFunction): UserCertificate[] {
  return [
    {
      id: 1,
      title: t("certificates.records.1.title"),
      instructor: t("certificates.records.1.instructor"),
      day: 15,
      month: t("certificates.months.december"),
      year: 2023,
      certificateNumber: "CERT - 2023 - WEB - 001",
      courseName: t("certificates.records.1.courseName"),
      studentName: t("certificates.studentName"),
      issueDate: t("certificates.records.1.issueDate"),
      status: t("certificates.approved"),
      totalHours: 40,
      units: 12,
    },
    {
      id: 2,
      title: t("certificates.records.2.title"),
      instructor: t("certificates.records.2.instructor"),
      day: 20,
      month: t("certificates.months.november"),
      year: 2023,
      certificateNumber: "CERT - 2023 - UI - 002",
      courseName: t("certificates.records.2.courseName"),
      studentName: t("certificates.studentName"),
      issueDate: t("certificates.records.2.issueDate"),
      status: t("certificates.approved"),
      totalHours: 25,
      units: 8,
    },
    {
      id: 3,
      title: t("certificates.records.3.title"),
      instructor: t("certificates.records.3.instructor"),
      day: 10,
      month: t("certificates.months.october"),
      year: 2023,
      certificateNumber: "CERT - 2023 - PY - 003",
      courseName: t("certificates.records.3.courseName"),
      studentName: t("certificates.studentName"),
      issueDate: t("certificates.records.3.issueDate"),
      status: t("certificates.approved"),
      totalHours: 30,
      units: 10,
    },
    {
      id: 4,
      title: t("certificates.records.4.title"),
      instructor: t("certificates.records.4.instructor"),
      day: 5,
      month: t("certificates.months.september"),
      year: 2023,
      certificateNumber: "CERT - 2023 - MK - 004",
      courseName: t("certificates.records.4.courseName"),
      studentName: t("certificates.studentName"),
      issueDate: t("certificates.records.4.issueDate"),
      status: t("certificates.approved"),
      totalHours: 20,
      units: 6,
    },
  ];
}

export function getUserCertificateById(id: number, t: TFunction) {
  const certificates = getUserCertificates(t);
  return certificates.find((certificate) => certificate.id === id) ?? certificates[0];
}
