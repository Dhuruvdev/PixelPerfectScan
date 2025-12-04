# Overview

HACKFIRST is a cybersecurity-themed portfolio website showcasing advanced cyberattack simulations and security projects. The application features a visually rich, scroll-based single-page design with smooth animations powered by GSAP and Framer Motion. The site includes an animated video loader intro, multiple pinned scroll sections with video backgrounds, and a project showcase highlighting various cybersecurity tools and applications.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React 18 with TypeScript and Vite for build tooling

**Routing**: Wouter for lightweight client-side routing
- Single-page application with main Home route
- Project detail pages at `/work/:id` for individual project showcases
- 404 fallback for undefined routes

**UI Component System**: Shadcn UI with Radix UI primitives
- Comprehensive component library using "new-york" style variant
- TailwindCSS v4 for styling with custom dark theme
- Custom color scheme with black background and white foreground
- Three custom font families: Inter (sans), Libre Baskerville (serif), Space Mono (mono)

**Animation Strategy**: Dual animation library approach
- GSAP with ScrollTrigger for scroll-based pinned sections and timeline animations
- Framer Motion for component-level animations and transitions
- Lenis for smooth scroll behavior
- Custom blur-to-focus video reveal animations on scroll

**State Management**: 
- TanStack Query (React Query) for server state with infinite stale time
- No complex client state management needed for current feature set

**Video Asset Management**:
- Multiple video assets stored in `attached_assets` directory
- Custom VideoLoader component with 6-second intro sequence
- Video backgrounds in scroll sections with programmatic playback control

## Backend Architecture

**Server Framework**: Express.js with TypeScript

**Development Setup**: 
- Vite dev server with HMR for development
- Custom middleware mode integration between Express and Vite
- Separate client and server build processes

**Storage Pattern**: 
- Abstract storage interface (`IStorage`) for data operations
- In-memory storage implementation (`MemStorage`) as default
- Designed for easy swap to database-backed storage

**API Structure**:
- RESTful API with `/api` prefix for all routes
- Custom logging middleware for request/response tracking
- Raw body preservation for webhook/payment processing

## Database & ORM

**ORM**: Drizzle ORM configured for PostgreSQL
- Schema defined in `shared/schema.ts` for type sharing between client/server
- Currently implements basic User model with username/password
- Zod integration for runtime validation via drizzle-zod
- Migration support through drizzle-kit

**Database Provider**: Configured for Neon serverless PostgreSQL
- Uses `@neondatabase/serverless` driver
- Connection via DATABASE_URL environment variable
- Schema designed to work with `gen_random_uuid()` for primary keys

## Build & Deployment

**Build Process**:
- Vite builds client to `dist/public`
- ESBuild bundles server with selective dependency bundling
- Allowlist approach for critical dependencies to reduce cold start times
- Production server serves static files from dist/public

**Static File Serving**:
- Client-side routing fallback to index.html
- Public assets served from client/public directory

**Replit Integration**:
- Custom Vite plugin for updating OpenGraph meta tags with Replit deployment URL
- Runtime error overlay plugin for development
- Cartographer and dev banner plugins in development mode

# External Dependencies

## UI & Component Libraries
- **Radix UI**: Comprehensive collection of accessible, unstyled UI primitives (accordion, dialog, dropdown, select, etc.)
- **Lucide React**: Icon library
- **class-variance-authority & clsx**: Utility-first styling with variant support
- **cmdk**: Command palette component
- **vaul**: Drawer component library

## Animation & Interaction
- **GSAP**: Professional-grade animation library with ScrollTrigger plugin
- **@gsap/react**: React integration for GSAP
- **Framer Motion**: React animation library
- **Lenis**: Smooth scroll library

## Data & Forms
- **TanStack React Query**: Server state management
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **@hookform/resolvers**: Validation resolver for React Hook Form

## Backend Services
- **Drizzle ORM**: Type-safe ORM for PostgreSQL
- **Neon Serverless**: Serverless PostgreSQL driver
- **Express**: Web server framework
- **Wouter**: Lightweight routing for React

## Development Tools
- **Vite**: Frontend build tool and dev server
- **TypeScript**: Type safety across the stack
- **TailwindCSS**: Utility-first CSS framework
- **PostCSS & Autoprefixer**: CSS processing

## Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Code navigation in Replit
- **@replit/vite-plugin-dev-banner**: Development environment indicator