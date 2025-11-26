# AscolIT - BIT Resource Hub

<div align="center">
  
![AscolIT Platform](https://raw.githubusercontent.com/919Umesh/bitAscolWeb/main/src/assets/svg/img1.png)

**A comprehensive digital platform built for BIT students at Amrit Science Campus**

[![Live Website](https://img.shields.io/badge/🌐_Live_Website-Visit_Site-6C63FF?style=for-the-badge)](https://bit-ascol-web-xhrs.vercel.app/)
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)](https://appwrite.io/)

</div>

## 📖 Overview

AscolIT is a feature-rich web application designed specifically for Bachelor in Information Technology (BIT) students at Amrit Science Campus. This platform serves as a centralized hub for academic resources, campus information, and student collaboration, providing easy access to study materials, notices, and campus details.

### 🎯 Live Application
**🌐 Visit the live website:** [https://bit-ascol-web-xhrs.vercel.app/](https://bit-ascol-web-xhrs.vercel.app/)

### 🚀 Key Features

- **📚 Academic Resources** - Complete collection of notes, syllabus, and past papers
- **📅 Semester-wise Organization** - Structured content from 1st to 6th semester
- **🔔 Live Notices** - Real-time updates and announcements
- **🏫 Campus Gallery** - Visual tour of campus facilities
- **📊 Course Details** - Comprehensive information about BIT program

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend Framework** | Angular 20.3.10 |
| **Backend & Database** | Appwrite |
| **Programming Language** | TypeScript |
| **Styling** | CSS3 with Custom Properties |
| **Deployment** | Vercel |
| **State Management** | Angular Services |
| **Build Tool** | Angular CLI |

## 📱 Application Preview

<div align="center">

### 🏠 Home Page
![Home Page](https://raw.githubusercontent.com/919Umesh/bitAscolWeb/main/src/assets/svg/img2.png)
*Welcome page with latest notices and quick navigation*

### 📚 Resources Section
![Resources](https://raw.githubusercontent.com/919Umesh/bitAscolWeb/main/src/assets/svg/img3.png)
*Semester-wise organized academic materials*

### 🖼️ Gallery
![Gallery](https://raw.githubusercontent.com/919Umesh/bitAscolWeb/main/src/assets/svg/img4.png)
*Campus photo collections and facilities*

### 📋 Course Details
![Course Details](https://raw.githubusercontent.com/919Umesh/bitAscolWeb/main/src/assets/svg/img5.png)
*BIT program information and affiliated colleges*

### 📄 Notices Section
![Notices](https://raw.githubusercontent.com/919Umesh/bitAscolWeb/main/src/assets/svg/img6.png)
*Real-time announcements and updates*

### 🎯 Subject Resources
![Subject View](https://raw.githubusercontent.com/919Umesh/bitAscolWeb/main/src/assets/svg/img7.png)
*Detailed subject-wise resources and materials*

</div>

## 📱 Application Structure

### 🏠 Home Page
- Welcome banner and introduction
- Latest notices with publication dates
- Quick access to main sections
- Institutional branding

### 📦 Resources Section
```
Resources/
├── First Semester/
├── Second Semester/
├── Third Semester/
├── Fourth Semester/
├── Fifth Semester/
└── Sixth Semester/
    ├── Database Administration
    ├── Multimedia Computing
    ├── Management Information System
    └── NET Centric Computing
```

### 🖼️ Gallery
- Photo collections of campus facilities
- Computer labs, gardens, and campus views
- Organized with timestamps and categories
- Visual documentation of campus life

### 📋 Course Details
- BIT program eligibility and structure
- Affiliated colleges information
- Campus locations and details
- TU affiliation information

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Angular CLI v20.3.10
- Appwrite account and project

### Installation & Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/919Umesh/bitAscolWeb.git
   cd bitAscolWeb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     appwrite: {
       endpoint: 'YOUR_APPWRITE_ENDPOINT',
       projectId: 'YOUR_PROJECT_ID',
       databaseId: 'YOUR_DATABASE_ID',
       collections: {
         notices: 'NOTICES_COLLECTION_ID',
         resources: 'RESOURCES_COLLECTION_ID',
         gallery: 'GALLERY_COLLECTION_ID'
       }
     }
   };
   ```

4. **Start development server**
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/`

### Building for Production

```bash
# Development build
ng build

# Production build
ng build --configuration=production
```

## 📁 Project Architecture

```
src/
├── app/
│   ├── components/
│   │   ├── notice-card/
│   │   ├── resource-grid/
│   │   └── gallery-view/
│   ├── pages/
│   │   ├── home/
│   │   ├── resources/
│   │   ├── gallery/
│   │   └── details/
│   ├── services/
│   │   ├── appwrite.service.ts
│   │   ├── notice.service.ts
│   │   └── resource.service.ts
│   └── models/
│       ├── notice.model.ts
│       └── resource.model.ts
├── assets/
│   ├── svg/
│   │   ├── img1.png
│   │   ├── img2.png
│   │   ├── img3.png
│   │   ├── img4.png
│   │   ├── img5.png
│   │   ├── img6.png
│   │   └── img7.png
│   └── images/
└── styles/
    └── global.css
```

## 🎨 UI/UX Features

- **Modern Card Design** - Hover effects with smooth transitions and border animations
- **Responsive Layout** - Mobile-first approach for all devices
- **Custom Color Scheme** - CSS variables for consistent theming
- **Interactive Elements** - Clickable notice cards and resource items
- **Clean Typography** - Readable content hierarchy and professional presentation

## 🔧 Core Services

### Notice Service
- Fetches and displays latest announcements in real-time
- Handles file downloads directly from Appwrite storage
- Manages publication dates with proper formatting

### Resource Service
- Organizes materials by semester and subject hierarchy
- Manages syllabus, notes, and question papers efficiently
- Provides structured content access with easy navigation

### Gallery Service
- Handles image uploads and displays with optimization
- Manages photo categories and metadata effectively
- Supports campus visual documentation with timestamps

## 🌐 Deployment

The application is deployed on **Vercel** for optimal performance and global accessibility:

**Live URL:** [https://bit-ascol-web-xhrs.vercel.app/](https://bit-ascol-web-xhrs.vercel.app/)

### Deployment Features:
- ✅ Automatic deployments from main branch
- ✅ SSL Certificate enabled
- ✅ Global CDN for fast loading
- ✅ Optimized asset delivery
- ✅ Environment variable management

## 🤝 Contributing

We welcome contributions from BIT students and developers! 

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Areas:
- 📚 Adding new academic resources
- 🎨 Improving UI/UX design
- 🔧 Enhancing functionality
- 🐛 Fixing bugs and issues
- 📝 Improving documentation

## 📄 License

This project is developed for educational purposes and the BIT student community at Amrit Science Campus. All rights reserved for the development team.

## 👥 Development Team

**Made by BIT students for BIT Students**

- **Frontend Development** - Angular & TypeScript expertise
- **Backend Integration** - Appwrite BaaS implementation
- **UI/UX Design** - Custom CSS with modern principles
- **Content Management** - Structured academic resources organization
- **Deployment & DevOps** - Vercel platform deployment

## 🔮 Future Enhancements

- [ ] User authentication and personalized profiles
- [ ] Discussion forums for student collaboration
- [ ] Assignment submission system
- [ ] Event calendar integration
- [ ] Mobile application version
- [ ] Admin dashboard for content management
- [ ] Resource rating and review system
- [ ] Advanced search functionality
- [ ] Offline access capability

---

<div align="center">

## 🌟 Live Application

[**Visit AscolIT Now**](https://bit-ascol-web-xhrs.vercel.app/)

**Empowering BIT Students with Digital Learning Resources**

*Built with ❤️ for Amrit Science Campus BIT Community*

</div>