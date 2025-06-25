"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Artist } from "@/types/artist"

/**
 * Application state interface
 */
interface AppState {
  favorites: Artist[]
  searchHistory: string[]
  user: {
    isAuthenticated: boolean
    name?: string
    email?: string
  }
}

/**
 * Application context interface
 */
interface AppContextType {
  state: AppState
  addToFavorites: (artist: Artist) => void
  removeFromFavorites: (artistId: number) => void
  isFavorite: (artistId: number) => boolean
  addToSearchHistory: (query: string) => void
  clearSearchHistory: () => void
  setUser: (user: AppState["user"]) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

/**
 * Custom hook to use app context
 */
export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

/**
 * Application provider component for global state management
 */
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    favorites: [],
    searchHistory: [],
    user: {
      isAuthenticated: false,
    },
  })

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("artistly-app-state")
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        setState(parsedState)
      } catch (error) {
        console.error("Failed to parse saved state:", error)
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("artistly-app-state", JSON.stringify(state))
  }, [state])

  /**
   * Add artist to favorites
   */
  const addToFavorites = (artist: Artist) => {
    setState((prev) => ({
      ...prev,
      favorites: [...prev.favorites.filter((a) => a.id !== artist.id), artist],
    }))
  }

  /**
   * Remove artist from favorites
   */
  const removeFromFavorites = (artistId: number) => {
    setState((prev) => ({
      ...prev,
      favorites: prev.favorites.filter((a) => a.id !== artistId),
    }))
  }

  /**
   * Check if artist is in favorites
   */
  const isFavorite = (artistId: number) => {
    return state.favorites.some((a) => a.id === artistId)
  }

  /**
   * Add search query to history
   */
  const addToSearchHistory = (query: string) => {
    if (!query.trim()) return

    setState((prev) => ({
      ...prev,
      searchHistory: [query, ...prev.searchHistory.filter((q) => q !== query)].slice(0, 10),
    }))
  }

  /**
   * Clear search history
   */
  const clearSearchHistory = () => {
    setState((prev) => ({
      ...prev,
      searchHistory: [],
    }))
  }

  /**
   * Set user authentication state
   */
  const setUser = (user: AppState["user"]) => {
    setState((prev) => ({
      ...prev,
      user,
    }))
  }

  const contextValue: AppContextType = {
    state,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    addToSearchHistory,
    clearSearchHistory,
    setUser,
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}
