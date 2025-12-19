# Superset Homepage Builder Demo

A homepage builder demo for Apache Superset that allows full customization of the landing page through a drag & drop editor.

## Tech Stack

- **React 19** - UI Framework
- **Vite 7** - Build tool and dev server
- **Ant Design 6** - UI component library
- **Emotion** - CSS-in-JS for dynamic styling
- **@ant-design/icons** - Icon set

## Key Features

### 3-Region Layout
- **Main Area** - 12-column grid for primary widgets
- **Sidebar** - Collapsible side panel for secondary widgets

### Edit Mode
- Toggle Edit mode to enable customization
- Drag & drop widgets between regions
- Individual widget configuration (gear icon)
- Remove widgets (X icon)
- Save / Cancel / Reset layout changes

### Available Widgets

**Data & Analytics:**
- Recents - Recently viewed items
- Dashboards - Dashboard list
- Charts - Chart list
- Saved Queries - Saved SQL queries
- Embedded Chart - Embedded chart display
- KPI Cards - Key performance indicators
- Data Quality Alerts - Data quality notifications
- Query Results Preview - Query results preview

**Content:**
- Welcome Banner - Customizable welcome banner
- Markdown - Custom markdown content

**Communication:**
- Announcements - Announcements and communications
- Changelog - Change log
- Team Activity Feed - Team activity feed

**Navigation & Productivity:**
- Quick Links - Customizable quick links
- Pinned Dashboards - Favorite dashboards
- Search Box - Global search
- Recent Databases - Recently accessed databases

**Organization:**
- Tag Cloud - Tag cloud visualization
- Reports Schedule - Report scheduling
- Certifications - Certified dashboards, charts, and datasets

**AI-Powered:**
- AI Suggestions - Personalized recommendations based on user activity
- Natural Language Query - Ask questions about data in natural language

### Themes
- Dark and Light theme support
- Superset-style color customization

## Quick Start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open http://localhost:5173

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Project Structure

```
demo-app/
├── src/
│   ├── App.jsx              # React entry point
│   ├── HomepageBuilder.jsx  # Main builder component
│   ├── main.jsx             # Application bootstrap
│   └── index.css            # Global styles
├── public/
│   └── superset-logo-horiz.png
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```
