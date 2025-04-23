# Practice Radar v4

A modern medical practice management application built with Next.js and TypeScript. This application helps medical practices manage patient history, procedures, and billing information.

## Features

- Patient information management
- Procedure history tracking
- Medical billing integration
- Intelligent patient summary generation
- Responsive interface for desktop and mobile

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/jtcronje/practice_radarv4.git
cd practice_radarv4
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

- `/src/app` - Next.js app router pages and layouts
- `/src/components` - Reusable React components
- `/src/utils` - Utility functions and helpers
- `/public/data` - CSV data files for patients, procedures, and billing

## Data Management

The application uses CSV files for data storage, which are loaded and processed at runtime. The data structures are defined in TypeScript interfaces for type safety.

## License

This project is licensed under the MIT License - see the LICENSE file for details.