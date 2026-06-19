import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import AskThePlug from "./pages/AskThePlug";
import Delivery from "./pages/Delivery";
import SkinPlug from "./pages/SkinPlug";
import SkinPlugArticle from "./pages/SkinPlugArticle";
import AboutUs from "./pages/AboutUs";
import SubmitReview from "./pages/SubmitReview";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/shop"} component={Shop} />
      <Route path={"/ask-the-plug"} component={AskThePlug} />
      <Route path={"/delivery"} component={Delivery} />
      <Route path={"/skinplug"} component={SkinPlug} />
      <Route path={"/skinplug/:slug"} component={SkinPlugArticle} />
      <Route path={"/about"} component={AboutUs} />
      <Route path={"/submit-review"} component={SubmitReview} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
            <Navigation />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
