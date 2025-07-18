# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `yarn dev` - Start development server (automatically builds search index and date mappings)
- `yarn build` - Build for production (includes search and date generation)
- `yarn preview` - Preview production build
- `yarn format` - Format code using Prettier

### Database Commands
- `yarn generate` - Generate Drizzle database migrations
- `yarn studio` - Open Drizzle Studio for database management

### Build Scripts
- `yarn build_search` - Generate search index from database JSON files
- `yarn build_date` - Generate date-to-work-id mappings for daily poems
- `yarn remove-darkmode` - Remove dark mode components and reformat

### Astro Commands
- `yarn hide-toolbar` - Disable Astro dev toolbar
- `yarn show-toolbar` - Enable Astro dev toolbar

## Project Architecture

### Framework & Stack
- **Astro** - Static site generator with server-side rendering capability
- **React** - For interactive components (search, theme switching)
- **Tailwind CSS** - Utility-first CSS framework
- **Drizzle ORM** - Database ORM for SQLite
- **Vercel** - Deployment platform (serverless functions)

### Database Structure
The project uses SQLite with a comprehensive schema for Chinese poetry:

**Core Tables:**
- `table_dynasties` - Chinese dynasties (Tang, Song, etc.)
- `table_authors` - Poets and their biographical information
- `table_works` - Individual poems/literary works
- `table_quotes` - Notable quotes from works
- `table_collections` - Poetry collections/anthologies
- `table_collection_works` - Many-to-many relationship for collections and works
- `table_collection_quotes` - Featured quotes from collections

**Key Features:**
- Bilingual support (Simplified/Traditional Chinese)
- Comprehensive metadata (dynasty, author, work type, etc.)
- Search functionality with pre-built indexes
- Daily poem feature with date mappings

### Content Management
- **Database-driven content** - All poetry data stored in SQLite database
- **JSON data files** - Located in `src/database/json/` for data import/export
- **Content collections** - Using Astro's content collections for static pages
- **Dynamic routing** - Pages generated from database records

### Search System
- **Build-time indexing** - Search index generated during build process
- **Three content types** - Authors (詩人), Works (詩詞), Collections (詩集)
- **Search data** - Stored in `.json/search.json` after build

### Daily Poem Feature
- **Date mapping** - Each day mapped to a specific work ID
- **Starting date** - April 15, 2024
- **Build-time generation** - Mappings created during build process

## Development Workflow

### Database Changes
1. Modify JSON files in `src/database/json/`
2. Run `yarn generate` to create migration files
3. Update schema in `src/database/schema_sqlite.ts` if needed
4. Rebuild search index with `yarn build_search`

### Adding New Content
1. Update relevant JSON files in `src/database/json/`
2. Run build scripts to regenerate indexes
3. Test locally with `yarn dev`

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow existing component patterns in `src/components/`
- Responsive design with mobile-first approach
- Dark mode support via `next-themes`

## File Structure Notes

### Important Directories
- `src/pages/` - Astro pages with dynamic routing
- `src/components/` - Reusable UI components (Astro + React)
- `src/database/` - Database schema and JSON data files
- `src/layouts/` - Page layout templates
- `scripts/` - Build scripts for search and date generation

### Configuration Files
- `astro.config.mjs` - Astro configuration with integrations
- `src/config/config.json` - Site configuration and metadata
- `tailwind.config.js` - Tailwind CSS configuration
- `drizzle.config.ts` - Database configuration (if exists)

### Dynamic Routes
- `/authors/[id]` - Individual author pages
- `/works/[id]` - Individual work pages
- `/collections/[id]` - Collection pages
- `/dynasties/[name]` - Dynasty-based browsing

## Testing & Quality

### Code Quality
- **TypeScript** - Strict mode enabled
- **Prettier** - Code formatting configured
- **ESLint** - Available for additional linting

### Performance Considerations
- **Image optimization** - Using Squoosh image service
- **Static generation** - Most pages pre-rendered at build time
- **Lazy loading** - Images and components loaded on demand

## Deployment

### Vercel Configuration
- **Output** - Server-side rendering enabled
- **Build command** - Includes search and date generation
- **Environment** - Serverless functions for dynamic content

### Pre-deployment Checklist
1. Run `yarn build` to ensure clean build
2. Test search functionality
3. Verify database connections
4. Check image optimization
5. Validate SEO metadata