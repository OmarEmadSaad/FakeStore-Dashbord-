# Patient Directory - Next.js Application

A comprehensive Dashbord Admin system built with React.js 18, javaScript, and TailwindCSS.

## Features

- **Dual View Modes**: Switch between Dashbord , Add-Product
- **Advanced Search**: Search across Product names
- **Smart Filtering**: Filter by product title
- **Pagination**: Efficient data loading with customizable page sizes
- **Responsive Design**: Optimized for all device sizes
- **Loading States**: Skeleton loaders for better user experience
- **Error Handling**: Comprehensive error handling with user feedback

## Tech Stack

- **Framework**: React.js 18
- **Language**: javaScript
- **Styling**: TailwindCSS
- **UI Components**: Materila Taliwind
- **Icons**: Lucide React

## Project Structure

Admin-System/
├── public/
│ ├── 404-Andromo-AI-Design-2
├── src/
│ ├── components/
│ │ ├── admin
│ │ │ └──product
│ │ │ ├──AdminLayout.jsx
│ │ │ ├──Dashbord.jsx
│ │ │ └──ProtectedAdminRoute.jsx
│ │ ├── Auth
│ │ │ ├──Forbidden.jsx
│ │ │ ├──Login.jsx
│ │ └── Common
│ │ │ ├──Loading.jsx
│ │ │ ├──Pagination.jsx
│ │ │ └──Requesterro.jsx
│ │ └── Layout
│ │ │ └── Header.js
│ │ └── Page
│ │ │ └── SearchPage.js
│ │ └──Redux
│ │ └──authSlice.js
│ │ └──productSlice.js
│ │ └──store.js
│ └── App.jsx
│ └── index.css
│ └── main.jsx
│ └── NotFound.jsx
├── .gitignore
├── db.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vercel.json
└── eslint.config.js

# Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

   3. **Run the backend server**:

   ```bash
    json-server --watch db.json --port 5000
   ```

3. **Open your browser**:
   [http://localhost:5173] , [http://localhost:5000/users] -----db.json

**Response:**

## API Endpoints

### GET

```json
{
  "user": [...],
  "user": {
   {
      "id": 1,
      "name": "admin",
      "username": "admin",
      "password": "admin123",
      "role": "admin"
    },
    {...}
  }
}
```

### Responsive Design

- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly interface elements

## Features in Detail

### Search Functionality

- Real-time search with 300ms debouncing
- Searches across Product name and filtering

## Deployment

The application is configured for static export and can be deployed to:

- github

Build command:

```bash
npm run build
```

## Performance Optimizations

- Debounced search to reduce API calls
- Pagination to limit data transfer
- Skeleton loading states
- Optimized re-renders with React hooks
- Static export for faster loading

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
