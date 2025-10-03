import { AuthProvider, useAuth } from "./context/AuthContext";
import SinglePageApp from "./components/SinglePageApp";
import LandingPage from "./components/LandingPage";

function AppContent() {
  const { user } = useAuth();

  return user ? <SinglePageApp /> : <LandingPage />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
