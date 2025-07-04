import {
  Refine,
  Authenticated,
  ErrorComponent,
} from "@refinedev/core";
import {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import routerBindings from "@refinedev/react-router";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import authProvider from "./authProvider";
import { supabaseClient } from "./utility";
import { ModernLayout } from "./components/layout/ModernLayout";
import { TourList } from "./components/tours/TourList";
import { TourEdit } from "./components/tours/TourEdit";
import { TourCreate } from "./components/tours/TourCreate";
import { Login } from "./pages/auth/Login";
import { ResetPassword } from "./pages/auth/ResetPassword";
import "./App.css";

// Wrap with custom router component so we can access navigate
const RouterWithRecoveryHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Handles Supabase password recovery redirect
  useEffect(() => {
    const { data: listener } = supabaseClient.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        navigate("/reset-password");
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [navigate]);

  // Debug: Log current path
  useEffect(() => {
    console.log("Current path:", location.pathname);
  }, [location.pathname]);

  return (
    <RefineKbarProvider>
      <DevtoolsProvider>
        <Refine
          dataProvider={dataProvider(supabaseClient)}
          liveProvider={liveProvider(supabaseClient)}
          authProvider={authProvider}
          routerProvider={routerBindings}
          resources={[
            {
              name: "tours",
              list: "/tours",
              create: "/tours/create",
              edit: "/tours/edit/:id",
              meta: {
                canDelete: true,
                label: "Tours",
                icon: "🏝️",
              },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
          }}
        >
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <Authenticated key="authenticated-routes" fallback={<CatchAllNavigate to="/login" />}>
                  <ModernLayout>
                    <Outlet />
                  </ModernLayout>
                </Authenticated>
              }
            >
              <Route index element={<NavigateToResource resource="tours" />} />
              <Route path="tours" element={<TourList />} />
              <Route path="tours/create" element={<TourCreate />} />
              <Route path="tours/edit/:id" element={<TourEdit />} />
            </Route>
            
            {/* Catch all */}
            <Route path="*" element={<ErrorComponent />} />
          </Routes>

          <RefineKbar />
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
        <DevtoolsPanel />
      </DevtoolsProvider>
    </RefineKbarProvider>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <RouterWithRecoveryHandler />
    </BrowserRouter>
  );
}