export interface ExperienceItem {
  title: string;
  details: string;
  period: string;
  company: string;
  logo: string;
  description: string;
}

export const experiences: ExperienceItem[] = [
  {
    title: "Full Stack Engineer",
    details: "Full-Time • Onsite • Rajshahi, Bangladesh",
    period: "April 2025 - Present",
    company: "Next Level Media (Bangladesh Branch)",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFRqB7VmCSbiA/company-logo_200_200/company-logo_200_200/0/1631368475046/nextlevelmedia1_logo?e=1763596800&v=beta&t=Sj2-CurarlFYAqlKw5o_oHscB-lhd6_Z3LtXMqDJIio",
    description:
      "Contributing to 'My Manager', a large-scale ERP solution built with MERN Stack. Primary responsibilities include Google Ads Manager integration via REST APIs, Twilio A2P 10DLC SMS automation, and employee scheduling system development. Designed the complete database schema and API architecture for the Seating & Ticketing module (now in staging). Also supporting workflow automation and AI-powered dynamic reporting modules.",
  },
  {
    title: "Software Engineer",
    details: "Contract • Remote • Mesa, Arizona, US",
    period: "March 2024 - December 2024",
    company: "Blackrock IT Solutions",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQG9F7Bk0c0IQQ/company-logo_200_200/company-logo_200_200/0/1689275603535?e=1763596800&v=beta&t=yBH7B-3Abuh787b8ycekLHK2rxGTXlEAmEACCE-x6Sk",
    description:
      "Led the report module for 'Hybrid Chart Evolve', a real-time healthcare staff scheduling system. Managed provider schedules, patient flow, and permission systems across multiple facilities. For 'TechConnect', implemented employee timesheet management, record-keeping, and file management modules.",
  },
  {
    title: "Frontend Developer",
    details: "Full-Time • Onsite • Banani, Dhaka-1213",
    period: "Jan 2023 - Feb 2024",
    company: "Excel Technologies Ltd.",
    logo: "https://media.licdn.com/dms/image/v2/C510BAQGszHiLyap5Dg/company-logo_200_200/company-logo_200_200/0/1630571920833?e=1763596800&v=beta&t=h6yZafAi-X6O4WAabNcl2RsrqoeaNwaoo41mdsBxFa4",
    description:
      "Contributed to 'SmartCare Pro' (Healthcare Platform), specifically for ANC, Vitals, PEP, PrEP, Family Planning, and TB modules. For 'Tuso', implemented User Authentication/Management and Ticket systems with rule-based access control and Remote Desktop Protocol (RDP) integration.",
  },
];
