import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home";
import { RedirectPage } from "./pages/redirect";
import { NotFoundPage } from "./pages/not-found";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/:shortUrl" element={<RedirectPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
