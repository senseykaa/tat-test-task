# 🌍 Tour Search App

A client-side tour search service built as a technical assessment for a Senior Frontend Engineer position.

**🔗 Live Demo:** [https://tour-search-app.vercel.app](https://tour-search-app.vercel.app)

---

## 🚀 Getting Started

### Requirements

- Node.js `v23.9.0` (see `.nvmrc`)

### Installation & Run

```bash
nvm use        # switch to correct Node version
pnpm install    # install dependencies
pnpm run dev    # start dev server at http://localhost:5173
```

### Build

```bash
pnpm run build  # production build
pnpm run preview # preview production build
```

---

## ✅ Implemented Features

### Task 1 — Search Form

- Destination input with dropdown (combobox)
- On focus — shows list of countries with flags
- On typing — shows geo search results (countries, cities, hotels) via `searchGeo()`
- Each option has an icon indicating its type (country flag / city / hotel)
- Keyboard navigation: `ArrowUp`, `ArrowDown`, `Enter`, `Escape`
- Re-click behavior: if country selected → shows countries list; if city/hotel → shows search results
- Clear button (`×`) to reset selection
- Submit on button click or `Enter`
- Search button disabled until destination is selected

### Task 2 — Search Logic

- Starts search via `startSearchPrices(countryID)` → receives token + `waitUntil`
- Polls `getSearchPrices(token)` after `waitUntil` delay
- Handles `425 Too Early` — waits and retries
- Retry logic — up to 2 retries on other errors
- UI states: **Loading**, **Error**, **Empty**, **Success**

### Task 3 — Tour Cards

- Displays search results as hotel cards sorted by lowest price
- Each card shows: hotel image, name, country flag + location, start date, price, "Open price" button
- Responsive grid: 2 columns (min 250px each) → 1 column on narrow screens
- Hotels data fetched via `getHotels(countryID)` and aggregated with prices in service layer

### Task 4 — Search Management (Optional)

- Search button disabled during active search (prevents spam clicks)
- Button re-enables when destination changes during active search
- Changing destination during active search → cancels current search via `stopSearchPrices()` and starts a new one
- Race condition protection — responses from cancelled searches are ignored via `token.cancelled` flag

---

## 🏗️ Architecture

### Layer Structure

```
src/
├── api/              # API layer — typed wrappers around mock functions
│   ├── geo/          # getCountries, searchGeo
│   ├── hotels/       # getHotels, getHotel
│   ├── prices/       # startSearchPrices, getSearchPrices, stopSearchPrices
│   ├── client.ts     # axios instance with response interceptor
│   └── mock/         # axios-mock-adapter bridging api.js → axios
├── services/
│   ├── search/       # polling logic, retry, token management, cancel
│   └── tours/        # aggregateTours — merges prices + hotels + countries
├── store/
│   └── search/       # Zustand store — destination, status, tours, error
├── hooks/
│   ├── useSearchTours.ts   # orchestrates search flow
│   ├── useGeoSearch.ts     # geo search with debounce
│   └── useDebounce.ts      # reusable debounce hook
├── components/
│   ├── ui/           # generic UI primitives (Button, Input, Popover, Combobox)
│   ├── SearchDestinationForm/ # renders a Search Destination form
│   ├── SearchResults/ # renders the result of Search Destination
│   ├── TourCard/      # renders a Tour card
├── pages/
│   └── Home/
├── types/
│   └── tours.ts     # domain types (TourOffer, GeoOption)
```

### Key Design Decisions

**Generic Combobox with `renderOption`**
The `Combobox` component is fully generic (`<TOption>`) and knows nothing about business logic. It accepts a `renderOption` render prop for full control over option rendering. This allows reuse across any domain.

**Service layer for aggregation**
`aggregateTours(prices, hotels, countries)` lives in `services/tours` — not in components or hooks. Components receive ready-to-render `TourOffer[]` with no knowledge of how data was merged.

**Search token for race condition protection**
Instead of using React state for the active token, a `ref` holds a mutable `SearchToken` object. When a new search starts, the previous token is marked as `cancelled = true` before any async operations complete, ensuring stale responses are silently discarded.

**TanStack Query for caching**

- `getCountries()` — `staleTime: Infinity` (never refetched)
- `getHotels(countryId)` — `staleTime: Infinity` per country (cached per search)
- `searchGeo(query)` — debounced 300ms, cached per query string

**Zustand for search state**
Search status, results and errors live in a Zustand store with individual selectors to prevent unnecessary re-renders.

---

## 📦 Libraries & Rationale

| Library                 | Purpose                                                             |
| ----------------------- | ------------------------------------------------------------------- |
| **Vite**                | Fast dev server and build tool                                      |
| **React 19**            | UI framework                                                        |
| **TypeScript**          | Type safety across all layers                                       |
| **Zustand**             | Lightweight state management for search store                       |
| **TanStack Query**      | Server state, caching, and deduplication of API calls               |
| **Axios**               | HTTP client with interceptor support for centralized error handling |
| **axios-mock-adapter**  | Bridges the mock `api.js` functions to axios without modifying them |
| **@floating-ui/dom**    | Precise dropdown positioning for the Combobox Popover               |
| **SASS**                | CSS variables + nested selectors for component styles               |
| **ESLint + Prettier**   | Code quality and consistent formatting                              |
| **Husky + lint-staged** | Pre-commit hooks to enforce quality gates                           |

> No UI component libraries were used. All components (Button, Input, Popover, Combobox, cards) are implemented from scratch per task requirements.

---

## 🔧 Code Quality

```bash
pnpm run lint      # ESLint
pnpm run format    # Prettier
pnpm run tsc       # TypeScript check
```

Pre-commit hook runs `lint-staged` automatically on every commit.
