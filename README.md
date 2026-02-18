# Todo Application

A comprehensive Todo application built with React 19, TypeScript, and modern web technologies. This application demonstrates frontend engineering skills including API integration, state management, routing, authentication, and real-time updates.

## Features

### Core Features (Required)

- **Todo List & Pagination**: Display todos from the API with pagination (10 items per page)
- **Todo Details**: Nested routes to display individual todo details with full information
- **Error Handling**: Error Boundary component with test route and custom 404 page
- **Search & Filtering**: Search todos by title and filter by completion status
- **Basic UI/UX**: Semantic HTML, accessibility attributes, responsive design, loading states

### Bonus Features

- **CRUD Operations**: Create, update, and delete todos with confirmation dialogs
- **Authentication**: Complete signup/login flow with protected routes and user profile
- **Real-time Updates**: WebSocket integration for live todo updates
- **Offline Capabilities**: Local storage caching for offline functionality

## Technology Stack

### Core Technologies

- **React 19+**: Functional components with hooks, Suspense, and ErrorBoundary
- **TypeScript**: Type-safe development with strict type checking
- **Vite**: Fast development and build tooling

### Routing & State Management

- **React Router**: Client-side routing with nested routes
- **Tanstack Query**: Server state management with caching and synchronization
- **Context API**: Authentication state management

### UI & Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **Responsive Design**: Mobile-first approach with breakpoints

### API & Real-time

- **Axios**: HTTP client with interceptors
- **WebSocket**: Real-time updates via WebSocket connection
- **REST API**: Integration with external todo API

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.tsx
│   ├── LoadingSpinner.tsx
│   ├── NotFound.tsx
│   ├── ProtectedRoute.tsx
│   ├── TodoForm.tsx
│   ├── TodoList.tsx
│   ├── TodoDetails.tsx
│   ├── SearchAndFilter.tsx
│   ├── UserMenu.tsx
│   ├── WebSocketProvider.tsx
│   └── Toast.tsx
├── hooks/              # Custom React hooks
│   ├── useAuth.ts
│   ├── useTodos.ts
│   ├── useToast.ts
│   └── useWebSocket.ts
├── lib/                # Utility libraries
│   ├── api.ts
│   ├── auth.ts
│   └── persist.ts
├── pages/              # Route components
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── ProfilePage.tsx
│   └── ErrorTestPage.tsx
├── types/              # TypeScript type definitions
│   ├── todo.ts
│   └── auth.ts
└── App.tsx             # Main application component
```

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Git for version control

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd todo-application
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development server:

   ```bash
   npm run dev
   ```

4. Open browser to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint checks

## API Integration

The application integrates with the external Todo API at `https://api.oluwasetemi.dev`:

### Endpoints Used

- `GET /todos` - List all todos with pagination
- `GET /todos/{id}` - Get single todo details
- `POST /todos` - Create new todo
- `PUT /todos/{id}` - Update existing todo
- `DELETE /todos/{id}` - Delete todo
- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `GET /auth/me` - Get current user
- `WS /ws/tasks` - Real-time updates

### Data Flow

1. Tanstack Query handles API calls with caching
2. WebSocket provides real-time updates
3. Local storage enables offline functionality
4. Error boundaries handle API failures gracefully

## Key Features Explained

### Authentication System

- JWT token-based authentication
- Protected routes with automatic redirects
- User profile management
- Persistent login state

### Real-time Updates

- WebSocket connection for live updates
- Automatic cache invalidation on changes
- Reconnection handling with exponential backoff

### Error Handling

- Global Error Boundary for React errors
- API error handling with user feedback
- Toast notifications for user actions
- Graceful degradation for network issues

### Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance (WCAG AA)

### Performance Optimizations

- Code splitting with React.lazy
- Image optimization
- Efficient re-renders with React.memo
- Query caching and background updates
- Debounced search functionality

## Known Issues

### Current Limitations

- WebSocket connection may fail in some network environments
- Offline mode has limited functionality
- No file upload support for todos
- Email verification not implemented in registration

### Future Improvements

- PWA capabilities for better offline support
- Advanced filtering and sorting options
- Todo categories and tags
- Collaborative features
- Mobile app development

## Development Notes

### Code Quality

- Strict TypeScript configuration
- ESLint with React-specific rules
- Component-based architecture
- Custom hooks for reusable logic
- Consistent naming conventions

### Testing Strategy

- Error boundary testing via dedicated route
- Component integration testing
- API response validation
- Accessibility testing with screen readers

### Security Considerations

- Input sanitization and validation
- XSS prevention
- Secure token storage
- HTTPS enforcement in production
- Rate limiting awareness

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with proper testing
4. Submit a pull request with description

## License

This project is licensed under the MIT License.
