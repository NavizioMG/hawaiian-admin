// src/App.tsx
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
import { BrowserRouter, Routes, Route, Outlet, useNavigate } from "react-router-dom";
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

function InnerApp() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data } = supabaseClient.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        navigate("/reset-password");
      }
    });

    return () => data?.subscription.unsubscribe();
  }, []);

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
            {/* Public Routes */}
            <Route element={<Outlet />}>
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* Protected Routes */}
            <Route
              element={
                <Authenticated fallback={<CatchAllNavigate to="/login" />} key="authenticated-routes">
                  <ModernLayout>
                    <Outlet />
                  </ModernLayout>
                </Authenticated>
              }
            >
              <Route index element={<NavigateToResource resource="tours" />} />
              <Route path="/tours">
                <Route index element={<TourList />} />
                <Route path="create" element={<TourCreate />} />
                <Route path="edit/:id" element={<TourEdit />} />
              </Route>
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>

          <RefineKbar />
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
        <DevtoolsPanel />
      </DevtoolsProvider>
    </RefineKbarProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <InnerApp />
    </BrowserRouter>
  );
}

export default App;
