# Eaysin Mia - Full Stack Engineer

**Rajshahi, Dhaka** • [meet.eaysin@gmail.com](mailto:meet.eaysin@gmail.com) • (+880) 1643-226078  
[GitHub](https://github.com/meet-eaysin) • [LinkedIn](https://www.linkedin.com/in/meet-eaysin/) • [Portfolio](https://meet-eaysin.vercel.app/)

---

## 🚀 Professional Summary

Full Stack Engineer with 2+ years of experience building scalable web applications and backend solutions. Expert in the MERN stack (MongoDB, Express, React, Node.js) and Next.js ecosystem. Proven track record in API design, modular architecture, containerization, and CI/CD practices. Experienced in developing ERP systems, healthcare platforms, and AI-powered reporting tools.

## 🛠 Skills & Technologies

- **Languages:** JavaScript (ES6+), TypeScript
- **Frontend:** React.js (19+), Next.js, Tailwind CSS, Shadcn UI, Tiptap Editor
- **Backend:** Node.js, Express.js, Nest.js
- **Databases:** MongoDB, PostgreSQL (Prisma)
- **State Management:** Redux, Zustand
- **DevOps & Tools:** Docker, RabbitMQ, Redis, Kong API Gateway, CI/CD (GitHub Actions), Git
- **Other:** RESTful APIs, JWT, Socket.io, Microservices

## 📝 Blog Platform Features

This portfolio includes a full-featured blog platform with:

### Content Management

- **Rich Text Editor**: Professional Tiptap-based WYSIWYG editor with:
  - Text formatting (Bold, Italic, Strikethrough, Inline Code)
  - Headings (H2, H3)
  - Lists (Bullet, Numbered)
  - Blockquotes and Code Blocks
  - Link and Image insertion
  - Undo/Redo functionality
  - Character counter
  - Live placeholder text

### Blog Features

- **Draft/Publish Workflow**: Save posts as drafts or publish them
- **Rich Metadata**: SEO-friendly with custom meta titles, descriptions, and keywords
- **Tags & Categories**: Organize content with tags and categories
- **Featured Posts**: Highlight important content
- **Table of Contents**: Auto-generated from headings
- **Reading Progress**: Visual progress indicator
- **Social Sharing**: Share to social platforms
- **Related Posts**: Automatic related content suggestions
- **Post Navigation**: Previous/Next post navigation
- **Responsive Design**: Mobile-first, fully responsive

### Admin Dashboard

- **Secure Authentication**: API key-based admin access
- **Post Management**: Create, edit, delete posts with confirmation modals
- **Subscriber Management**: Track and manage email subscribers
- **Analytics Dashboard**: View post statistics and engagement metrics
- **Real-time Stats**: Live updates on posts, subscribers, and views

### Technical Implementation

- **Database**: MongoDB with Mongoose ODM
- **API Routes**: RESTful API with Next.js Route Handlers
- **Server Components**: Optimized with Next.js App Router
- **Type Safety**: Full TypeScript implementation
- **Form Validation**: React Hook Form with Zod schemas
- **UI Components**: Shadcn UI component library
- **Styling**: Tailwind CSS with custom design system

## 💼 Professional Experience

### **Full Stack Engineer** | Next Level Media (Bangladesh Branch)

_Rajshahi, Bangladesh (On Site) | April 2025–Present_

Building "My Manager" - A large-scale ERP solution.

- Managed Google Ads integration via REST APIs
- Implemented Twilio A2P 10DLC SMS automation
- Optimized employee schedule management
- Built dynamic AI-powered reporting and analytics
- Developed Door-to-Door campaign management features

### **Software Engineer** | Blackrock IT Solutions

_Mesa, Arizona, US (Remote, Contract) | March 2024 – December 2024_

- **Hybrid Chart Evolve:** Led the report module for a real-time healthcare staff scheduling system
- **TechConnect:** Implemented employee timesheet management and file management modules

### **Frontend Developer** | Excel Technologies Ltd.

_Banani, Dhaka (On-site) | Jan 2023 – Feb 2024_

- **SmartCare Pro:** Contributed to comprehensive hospital management system
- **Tuso:** Implemented User Authentication, RBAC, and RDP modules

## 💻 Featured Projects

### **PFMS - Personal Finance Management System**

_[GitHub](https://github.com/meet-eaysin/pfms)_

- Scalable financial platform built with **NestJS**, **Express**, and **Next.js**
- Designed **14+ microservices** routed via **Kong API Gateway**
- Utilized **RabbitMQ** for event-driven communication
- Implemented secure authentication with **Better-Auth** (JWT/JWKS)
- Hybrid database: **PostgreSQL** for core data, **MongoDB** for analytics

## 🎓 Education

**M.Sc. in Geography & Environment**  
Ananda Mohan College, Mymensingh, Dhaka | May 2021  
_(GPA: 2.81/4.0)_

## 📦 Project Setup

To run this portfolio locally:

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your MongoDB URI and Admin API Key

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔐 Environment Variables

```env
MONGODB_URI=your_mongodb_connection_string
ADMIN_API_KEY=your_secure_admin_key
RESEND_API_KEY=your_resend_api_key (for email)
```

## 📚 Blog Workflow

1. **Access Admin**: Navigate to `/admin/login` and enter your API key
2. **Create Post**: Click "New Post" and use the rich text editor
3. **Add Metadata**: Fill in title, slug, excerpt, tags, category
4. **Save Draft**: Save as draft for later or publish immediately
5. **Edit Post**: Access `/admin/posts` to edit existing posts
6. **Manage**: View analytics and subscriber data from the dashboard

## 🚀 Deployment

Production-ready and tested for deployment on [Vercel](https://vercel.com)

```bash
# Build for production
npm run build

# Start production server
npm start
```
