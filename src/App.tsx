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
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import authProvider from "./authProvider";
import { supabaseClient } from "./utility";
import { ModernLayout } from "./components/layout/ModernLayout";
import { TourList } from "./components/tours/TourList";
import { TourEdit } from "./components/tours/TourEdit";
import { TourCreate } from "./components/tours/TourCreate";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
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
                  icon: "🏝️"
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
              <Route
                element={
                  <Authenticated key="authenticated-routes" fallback={<CatchAllNavigate to="/login" />}>
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
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                {/* Add your login/register pages here if needed */}
              </Route>
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
          <DevtoolsPanel />
        </DevtoolsProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;