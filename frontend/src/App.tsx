import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RideRequestForm } from "./pages";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from "@/components/ui/toaster"
import { RideProvider } from "./contexts/RideContext";
import RideOptions from "./pages/RideOptions";
const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RideProvider>
        <Router>
          <Routes>
            <Route path="/" element={<RideRequestForm />} />
            <Route path="/options" element={<RideOptions />} />
          </Routes>
        </Router>
        <Toaster />
      </RideProvider>
    </QueryClientProvider>
  );
};

export default App;
