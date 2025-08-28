# 🎮 PokéMemory

[![Play on Vercel](https://vercel.com/button)](https://odin-memory-card-pi.vercel.app/)

A nostalgic Pokémon-themed memory card game built with modern web technologies. Test your memory skills while avoiding the tricky ghost Pokémon in this retro-styled gaming experience!

## 🌟 About

PokéMemory combines the classic memory game mechanics with the beloved Pokémon universe. Players must click on different Pokémon cards without repeating previous selections, while navigating a special ghost Pokémon mechanic that adds an exciting twist to the traditional gameplay.

The game features a pixel-perfect retro aesthetic inspired by classic Game Boy games, complete with authentic sound effects and background music that transport you back to the golden age of Pokémon gaming.

## ✨ Features

### Core Gameplay

- 🎯 **Memory Challenge**: Click on different Pokémon cards without repeating previous selections
- 👻 **Ghost Pokémon Mechanic**: Special winning condition with Marowak (ID 105) as the ghost Pokémon
- 🎲 **Dynamic Pool Generation**: 36 Pokémon total with 6 displayed per round, including guaranteed Tower Pokémon
- 🏆 **Progressive Difficulty**: Intelligent round generation ensures unviewed Pokémon always appear

### UI/UX Design

- 🎨 **Retro Pokémon-Inspired UI**: Authentic NES.css styling with custom CSS Modules
- 📱 **Mobile-First Responsive Design**: Optimized for all screen sizes and devices
- ⌨️ **Keyboard Navigation**: Full accessibility support with arrow keys and Enter/Space
- 🎭 **State-Driven Modals**: Welcome, victory, defeat, and error screens with smooth transitions

### Audio Experience

- 🎵 **Dynamic Background Music**: Battle, victory, and defeat themes with fade transitions
- 🔊 **Rich Sound Effects**: UI interactions, error alerts, and authentic Pokémon battlecries
- 🎧 **Centralized Audio Management**: React Context + Howler.js for seamless sound control
- 🔇 **Sound Toggle**: Easy on/off switching for all audio elements

### Technical Features

- ⚡ **Smooth Animations**: Framer Motion for card interactions and transitions
- 💾 **Smart Caching System**: Local storage prevents redundant API calls and improves performance
- 🌐 **Pokémon API Integration**: Real-time data fetching with 15-second timeout and retry functionality
- 🎯 **Type Safety**: Full TypeScript implementation with comprehensive type definitions

## 🛠️ Tech Stack

### Frontend Framework

- **React 19** - Modern React with concurrent features
- **TypeScript** - Type-safe development with strict mode enabled
- **Vite** - Lightning-fast build tool and development server

### Styling & Design

- **NES.css** - Pixel-perfect retro gaming aesthetic
- **CSS Modules** - Component-scoped styling for maintainable code
- **Framer Motion** - Smooth animations and transitions
- **Modern Normalize** - Consistent cross-browser styling

### Audio & Media

- **Howler.js** - Robust audio management and playback
- **React Howler** - React integration for seamless audio control

### Development Tools

- **ESLint** - Code quality and consistency enforcement
- **Prettier** - Automatic code formatting
- **Stylelint** - CSS/SCSS linting and style validation
- **Husky + Lint-staged** - Pre-commit hooks for code quality
- **SVGR** - SVG component generation

### API & Data

- **PokéAPI** - Comprehensive Pokémon data source
- **Local Storage** - Client-side caching for improved performance

## 🚀 Installation & Usage

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd odin-memory-card
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The game will be available at `http://localhost:5173`

### Available Scripts

#### Development

```bash
npm run dev          # Start development server with hot reload
npm run preview      # Preview production build locally
```

#### Building

```bash
npm run build        # Build for production (TypeScript compile + Vite build)
```

#### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run stylelint    # Lint CSS files
npm run stylelint:fix # Fix CSS linting issues
npm run prettier     # Check Prettier formatting
npm run prettier:fix # Apply Prettier formatting
npm run format       # Run all formatters (prettier + eslint + stylelint fixes)
```

## 📁 Project Structure

```
src/
├── App/                    # Root application component
├── components/             # Reusable UI components
│   ├── Card/              # Individual Pokémon card
│   ├── CardGrid/          # Grid layout for cards
│   ├── Modal/             # Base modal component
│   ├── Game/              # Main game logic component
│   ├── Loading/           # Loading state component
│   ├── Scoreboard/        # Score display component
│   └── [Modals]/          # Various modal implementations
├── contexts/              # React Context providers
│   ├── SfxContext.ts      # Sound effects context
│   └── SfxProvider.tsx    # Audio management provider
├── helpers/               # Utility functions
│   ├── api.ts            # Pokémon API integration
│   ├── cache.ts          # Local storage caching
│   └── game.ts           # Game logic utilities
├── hooks/                 # Custom React hooks
│   └── useKeyboardNavigation.ts # Keyboard accessibility
├── assets/               # Static assets
│   ├── sounds/           # Audio files (MP3 format)
│   └── icons/            # SVG icons and graphics
├── types/                # TypeScript type definitions
│   ├── api.ts           # API response types
│   └── ui.ts            # UI component types
└── constants.ts          # Game configuration constants
```

### Key Directories

- **`/components`**: Modular React components with co-located CSS Modules
- **`/contexts`**: Centralized state management for audio and game state
- **`/helpers`**: Pure utility functions for API, caching, and game logic
- **`/assets`**: Static resources including sound effects and SVG icons

## 🎯 Game Mechanics

### Core Rules

1. **Objective**: Click on different Pokémon cards without repeating previous selections
2. **Ghost Mechanic**: The ghost Pokémon (Marowak) must be clicked a second time to win
3. **Loss Condition**: Clicking any previously selected non-ghost Pokémon ends the game
4. **Pool Composition**: 36 total Pokémon including 5 guaranteed "Tower" Pokémon (IDs: 92-105)

### Special Features

- **Intelligent Round Generation**: Always includes unviewed Pokémon or the ghost to ensure progression
- **Fisher-Yates Shuffle**: Fair randomization for game pool generation
- **Progressive Revelation**: Ghost Pokémon appears strategically to create engaging gameplay

## 🔮 Future Improvements

### Performance & Optimization

- [ ] **Service Worker Implementation** - Offline caching for improved performance
- [ ] **Image Lazy Loading** - Optimize initial load times for large Pokémon sprite collections
- [ ] **Low-End Device Optimization** - Reduced animation complexity and memory usage options
- [ ] **Bundle Splitting** - Code splitting for faster initial page loads

### Testing & Quality

- [ ] **Unit Test Suite** - Comprehensive testing with Jest and React Testing Library
- [ ] **E2E Testing** - Playwright or Cypress integration for full user journey testing
- [ ] **Performance Monitoring** - Real User Monitoring (RUM) and Core Web Vitals tracking

### Enhanced Features

- [ ] **Difficulty Levels** - Adjustable pool sizes and time constraints
- [ ] **Leaderboard System** - Local and online high score tracking
- [ ] **More Animations** - Enhanced card flip animations and particle effects
- [ ] **Additional Game Modes** - Time attack, survival mode, and themed challenges
- [ ] **Pokémon Generations** - Expandable to include Pokémon from different generations

### Accessibility & UX

- [ ] **Enhanced A11y** - Screen reader optimizations and color contrast improvements
- [ ] **Internationalization** - Multi-language support for global accessibility
- [ ] **Advanced Settings** - Customizable audio levels, animation speeds, and visual preferences

## 📄 License

This project is for educational purposes only (The Odin Project). Not affiliated with or endorsed by Nintendo/Creatures Inc./GAME FREAK.

---

<div align="center">

**Built with ❤️ for Pokémon fans and retro gaming enthusiasts**

_Gotta catch 'em all... but only once!_ 🎮👻

</div>
