# Eco-360 🌿

An immersive 360° virtual tour application for real estate and property showcasing. Experience properties through smooth panoramic views with professional branding and responsive design.

![Eco-360 Preview](public/logos/logo.png)

## ✨ Features

- **Interactive 360° Viewer**: Smooth drag-to-rotate panoramic experience
- **Asset Preloading**: Intelligent loading system for 120 rotation frames
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Professional UI**: Clean, modern interface with brand integration
- **Touch & Mouse Support**: Intuitive interaction across all devices
- **Modular Architecture**: Clean React component structure
- **SCSS Styling**: Professional styling with responsive breakpoints

## 🚀 Live Demo

Visit the live application: [Eco-360 Virtual Tour](https://your-demo-url.com)

## 🛠️ Technology Stack

- **React 19.2.0** - Modern React with hooks
- **Vite 7.2.2** - Lightning-fast build tool
- **SCSS/Sass** - Advanced styling with variables and mixins
- **Lucide React** - Beautiful, customizable icons
- **ESLint** - Code quality and consistency

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **npm** 8.x or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/VoAnhPhi/eco-360.git
cd eco-360
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Prepare Assets
Ensure your rotation images are in place:
```
public/rotation/
├── 1.jpg
├── 2.jpg
├── 3.jpg
├── ...
└── 120.jpg
```

### 4. Start Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
eco-360/
├── public/                    # Static assets
│   ├── icons/                # UI interaction icons
│   ├── images/               # Background images
│   ├── logos/                # Brand assets
│   └── rotation/             # 120 sequential rotation frames
├── src/
│   ├── components/           # React components
│   │   ├── LoadingScreen.jsx # Animated loading interface
│   │   ├── MenuBar.jsx       # Navigation sidebar
│   │   ├── UserGuide.jsx     # Interaction tutorial
│   │   └── Viewer360.jsx     # Core 360° viewer
│   ├── styles/scss/          # SCSS styling
│   │   ├── core/            # Base styles and utilities
│   │   ├── components/      # Component-specific styles
│   │   └── pages/           # Page-level styles
│   ├── App.jsx              # Root component
│   └── main.jsx             # Application entry point
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Core Components

### LoadingScreen
- Animated logo with rotating border
- Asset preloading progress
- Auto-advance or manual start

### MenuBar
- 6 navigation sections (Overview, Location, Zones, Facilities, Gallery, E-brochure)
- Collapsible interface
- Hash-based navigation

### Viewer360
- Interactive 360° rotation with 120 frames
- Mouse and touch drag support
- Smooth frame transitions
- Loop navigation

### UserGuide
- Interactive tutorial overlay
- Visual instruction icons
- Self-dismissing modal

## 🎨 Customization

### Brand Assets
Replace the following files with your own:
- `public/logos/logo.png` - Main brand logo
- `public/logos/logo1.png` - Loading screen logo
- `public/images/bgLoading.jpg` - Loading background

### Color Scheme
Edit `src/styles/scss/core/_variables.scss`:
```scss
$color-primary: #5fcd6f;        // Primary brand color
$color-surface: #111111;        // Background color
$color-text: #f5f5f5;          // Text color
```

### 360° Content
Replace images in `public/rotation/`:
- Use sequential numbering: `1.jpg`, `2.jpg`, ..., `120.jpg`
- Recommended resolution: 1920x1080 or higher
- Consider image compression for faster loading

## 📱 Responsive Breakpoints

- **XXL**: 1660px+ (Large monitors)
- **LG**: 1440px-1659px (Desktop)
- **MD**: 992px-1439px (Laptop/Tablet landscape)
- **SM**: 768px-991px (Tablet portrait)
- **XS**: <768px (Mobile)

## 🚀 Build & Deploy

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Code Quality Check
```bash
npm run lint
```

## 📦 Deployment Options

### Static Hosting
- **Netlify**: Drag & drop `dist/` folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3 + CloudFront**: Professional hosting

### Environment Setup
No environment variables required for basic functionality.

## 🔧 Performance Optimization

### Image Optimization
- Compress rotation images (recommend WebP format)
- Consider progressive loading for better performance
- Use CDN for faster asset delivery

### Bundle Analysis
```bash
npm run build -- --analyze
```

## 🌟 Features to Add

### Multiple Scenes
Add different 360° environments:
- Interior views
- Exterior shots
- Different property areas

### Interactive Hotspots
Clickable information points on the 360° view

### Audio Integration
Ambient sounds or narration

### VR/AR Support
WebXR integration for immersive experiences

## 🐛 Troubleshooting

### Common Issues

**Missing Rotation Images**
- Verify all 120 images exist in `public/rotation/`
- Check naming convention: `1.jpg`, `2.jpg`, etc.
- Ensure lowercase `.jpg` extension

**SCSS Deprecation Warnings**
- These warnings about `@import` are normal and don't affect functionality
- The project works fine with the current Sass version

**Performance Issues**
- Monitor Network tab in DevTools for loading issues
- Consider image compression for large assets
- Test on actual mobile devices for touch interactions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the lightning-fast build tool
- Lucide team for beautiful icons
- The open-source community for inspiration and tools

---

**Made with ❤️ for immersive property experiences**
