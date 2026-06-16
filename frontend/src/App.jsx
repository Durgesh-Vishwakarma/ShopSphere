import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="page-shell">
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8 sm:py-10 lg:py-12">
          <div className="container">
            <Outlet />
          </div>
        </main>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#111827',
              color: '#fff',
              borderRadius: '8px',
            },
          }}
        />
      </div>
    </div>
  );
};

export default App;
