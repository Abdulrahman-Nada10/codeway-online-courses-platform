import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '@/libs/api-client';

/* ────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────── */

export type SearchContext =
  | 'courses'
  | 'liveSession'
  | 'favorites'
  | 'certificates'
  | 'profile'
  | null;

export interface SearchCacheEntry {
  results: unknown[];
  timestamp: number;
}

export interface SearchState {
  query: string;
  context: SearchContext;
  results: unknown[];
  suggestions: string[];
  loading: boolean;
  error: string | null;
  cache: Record<string, SearchCacheEntry>;
}

/* ────────────────────────────────────────────────
   Initial State
   ──────────────────────────────────────────────── */

const initialState: SearchState = {
  query: '',
  context: null,
  results: [],
  suggestions: [],
  loading: false,
  error: null,
  cache: {},
};

/* ────────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────────── */

function buildCacheKey(context: SearchContext, query: string): string {
  return `${context ?? 'global'}_${query.toLowerCase().trim()}`;
}

function getApiEndpoint(context: SearchContext): string | null {
  switch (context) {
    case 'courses':
      return '/api/courses';
    case 'liveSession':
      return '/api/lessons';
    case 'favorites':
      return '/api/favorites';
    case 'certificates':
      return '/api/certificates';
    default:
      return null;
  }
}

/* ────────────────────────────────────────────────
   Async Thunk — searchThunk
   ──────────────────────────────────────────────── */

interface SearchThunkArgs {
  query: string;
  context: SearchContext;
}

export const searchThunk = createAsyncThunk<
  unknown[],
  SearchThunkArgs,
  { rejectValue: string }
>('search/searchThunk', async ({ query, context }, { rejectWithValue }) => {
  const trimmedQuery = query.trim();

  if (!trimmedQuery || !context) {
    return [];
  }

  const endpoint = getApiEndpoint(context);

  if (!endpoint) {
    // No API for this context — return empty and let pages filter locally
    return [];
  }

  try {
    const data = await apiClient<unknown[]>(
      `${endpoint}?search=${encodeURIComponent(trimmedQuery)}`
    );
    return data ?? [];
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'فشل في البحث. حاول مرة أخرى.';
    return rejectWithValue(message);
  }
});

/* ────────────────────────────────────────────────
   Slice
   ──────────────────────────────────────────────── */

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.error = null;
    },

    setContext: (state, action: PayloadAction<SearchContext>) => {
      state.context = action.payload;
      // Reset transient state when context changes
      state.results = [];
      state.suggestions = [];
      state.error = null;
      state.loading = false;
    },

    setResults: (state, action: PayloadAction<unknown[]>) => {
      state.results = action.payload;
    },

    setSuggestions: (state, action: PayloadAction<string[]>) => {
      state.suggestions = action.payload.slice(0, 10);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearSearch: (state) => {
      state.query = '';
      state.results = [];
      state.suggestions = [];
      state.loading = false;
      state.error = null;
    },

    addToCache: (
      state,
      action: PayloadAction<{ key: string; results: unknown[] }>
    ) => {
      state.cache[action.payload.key] = {
        results: action.payload.results,
        timestamp: Date.now(),
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchThunk.pending, (state, action) => {
        const { query, context } = action.meta.arg;
        const cacheKey = buildCacheKey(context, query);

        // Cache-first check
        if (state.cache[cacheKey]) {
          state.results = state.cache[cacheKey].results;
          state.loading = false;
          return;
        }

        state.loading = true;
        state.error = null;
      })

      .addCase(searchThunk.fulfilled, (state, action) => {
        const { query, context } = action.meta.arg;
        const cacheKey = buildCacheKey(context, query);

        state.results = action.payload;
        state.loading = false;

        // Save to cache
        state.cache[cacheKey] = {
          results: action.payload,
          timestamp: Date.now(),
        };

        // Build suggestions from result titles (if objects have title)
        const titles = action.payload
          .map((item) => {
            if (typeof item === 'object' && item !== null && 'title' in item) {
              return String((item as Record<string, unknown>).title);
            }
            return null;
          })
          .filter((t): t is string => Boolean(t))
          .slice(0, 10);

        state.suggestions = titles;
      })

      .addCase(searchThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'حدث خطأ غير متوقع';
      });
  },
});

/* ────────────────────────────────────────────────
   Exports
   ──────────────────────────────────────────────── */

export const {
  setQuery,
  setContext,
  setResults,
  setSuggestions,
  setLoading,
  setError,
  clearSearch,
  addToCache,
} = searchSlice.actions;

export default searchSlice.reducer;

