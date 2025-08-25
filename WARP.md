# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

PokéMemory is a React + TypeScript memory card game that uses the Pokémon API. Players must click on Pokémon cards without repeating previous selections. The game features a special "ghost" Pokémon (Marowak, ID 105) that serves as a winning condition when clicked after being seen.

## Development Commands

### Core Development

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production (TypeScript compile + Vite build)
npm run preview      # Preview production build locally
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run stylelint    # Lint CSS files
npm run stylelint:fix # Fix CSS linting issues
npm run prettier     # Check Prettier formatting
npm run prettier:fix # Apply Prettier formatting
npm run format       # Run all formatters (prettier + eslint + stylelint fixes)
```

## Project Architecture

### Game State Management

The application uses React's `useState` for state management with a clear game flow:

- **GameState**: `'start' | 'playing' | 'won' | 'lost'`
- **Core State**: Game pool (36 Pokémon), viewed Pokémon IDs, captured ghosts count

### Game Logic Flow

1. **Game Pool Generation**: Creates a pool of 36 Pokémon including 5 "Tower" Pokémon (IDs 92-94, 104-105)
2. **Round Pool Generation**: Selects 6 Pokémon for each round, ensuring unviewed Pokémon or ghost appears
3. **Win Condition**: Click the ghost Pokémon (Haunter, ID 105) after it has been viewed once
4. **Lose Condition**: Click any previously viewed non-ghost Pokémon

### API & Caching Strategy

- **External API**: Pokémon API (https://pokeapi.co/api/v2/pokemon/{id})
- **Caching**: Local storage caching system (`src/helpers/cache.ts`) to avoid redundant API calls
- **Error Handling**: 15-second timeout with retry functionality, graceful error modals
- **Data Flow**: API → Cache → UI transformation → Card rendering

### Component Architecture

```
App (root state management)
├── Modal components (WelcomeModal, WonGameModal, LostGameModal, ErrorModal)
├── Header (SfxToggleButton)
├── Main
│   └── Game (round management, data fetching)
│       ├── Loading
│       ├── ErrorModal
│       └── CardGrid
│           └── Card components
└── Footer (Scoreboard)
```

### Key Constants & Configuration

- **POKEMON_PER_GAME**: 36 total Pokémon in game pool
- **POKEMON_PER_ROUND**: 6 Pokémon displayed per round
- **GHOST_ID**: 105 (Marowak) - the special winning Pokémon
- **TOWER_IDS**: [92, 93, 94, 104, 105] - Always included in game pool

### Styling Architecture

- **CSS Modules**: Component-scoped styles (`.module.css` files)
- **Design System**: NES.css for retro gaming aesthetic
- **Typography**: Pixelify Sans font for pixel-perfect gaming feel
- **Responsive**: Grid-based card layout with CSS Grid

### Type System

- **API Types**: Complete Pokémon API response types (`src/types/api.ts`)
- **UI Types**: Card data, modal actions, game state (`src/types/ui.ts`)
- **Path Aliases**: `@/*` resolves to `src/*` for clean imports

### Build Configuration

- **Vite**: Modern build tool with React plugin and SVGR support
- **TypeScript**: Strict mode enabled with comprehensive linting rules
- **Code Quality**: ESLint, Stylelint, Prettier with pre-commit hooks (Husky + lint-staged)

## Development Notes

### Working with Game Logic

- Game pool generation uses Fisher-Yates shuffle algorithm for fair randomization
- Round pools are intelligently generated to ensure game progression (always include unviewed or ghost)
- The ghost Pokémon mechanic requires careful state tracking for win conditions

### API Integration

- All Pokémon data is fetched asynchronously with proper loading states
- Caching prevents redundant API calls and improves performance
- Error boundaries handle API failures gracefully with retry options

### Styling Approach

- Follow the retro gaming theme when adding new components
- Use CSS Modules for component isolation
- Maintain responsive design patterns for different screen sizes
