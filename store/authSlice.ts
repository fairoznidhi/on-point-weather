import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_BASE_URL = 'http://localhost:5000/api/auth';

export interface AuthUser {
  name: string;
  email: string;
}

export interface AuthState {
  user: AuthUser | null;
  isGuest: boolean;
  loading: boolean;
  error: string | null;
  hasSeenLogin: boolean;
}

const initialState: AuthState = {
  user: null,
  isGuest: false,
  loading: false,
  error: null,
  hasSeenLogin: false,
};

// Async Thunks
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message || 'Registration failed');
      return (data.user || data) as AuthUser;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Something went wrong');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message || 'Login failed');
      return (data.user || data) as AuthUser;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Something went wrong');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      state.user = null;
      state.isGuest = false;
      state.error = null;
      // Note: We might want to keep or reset hasSeenLogin here depending on UX.
      // If we want them to see login again after signout:
      // state.hasSeenLogin = false;
    },
    continueAsGuest(state) {
      state.user = null;
      state.isGuest = true;
      state.error = null;
      state.hasSeenLogin = true;
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isGuest = false;
        state.hasSeenLogin = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isGuest = false;
        state.hasSeenLogin = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { signOut, continueAsGuest, clearError } = authSlice.actions;
export default authSlice.reducer;
