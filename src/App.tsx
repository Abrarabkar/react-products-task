import AppProvider from "./components/providers/AppProvider";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";

export default function App() {
  return (
    <AppProvider>
      <Navbar />
      <Home />
      <Footer />
    </AppProvider>
  );
}
