import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Discovery from "./pages/Discovery";
import Watchlist from "./pages/Watchlist";

import { WatchlistProvider } from "./context/WatchlistContext";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <WatchlistProvider>
          <div className="app">
            <Header />

            <Routes>
              <Route path="/" element={<Discovery />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </div>
        </WatchlistProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}