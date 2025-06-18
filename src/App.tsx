// App.tsx
import {
  Refine,
  Authenticated,
  AuthPage,
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

import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";

// Import our new tour components
import { TourList } from "./components/tours/TourList";
import { TourEdit } from "./components/tours/TourEdit";
import { TourCreate } from "./components/tours/TourCreate";
import { TourShow } from "./pages/tours"; // Keep the existing show component

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <DevtoolsProvider>
          <Refine
            dataProvider={dataProvider(supabaseClient, {
              defaultIdField: "id",
            })}
            liveProvider={liveProvider(supabaseClient)}
            authProvider={authProvider}
            routerProvider={routerBindings}
            resources={[
              {
                name: "tours",
                list: "/tours",
                create: "/tours/create",
                edit: "/tours/edit/:id",
                show: "/tours/show/:id",
                meta: { 
                  canDelete: true,
                  label: "Tours",
                  icon: "🏝️"
                },
              },
              {
                name: "blog_posts",
                list: "/blog-posts",
                create: "/blog-posts/create",
                edit: "/blog-posts/edit/:id",
                show: "/blog-posts/show/:id",
                meta: { 
                  canDelete: true,
                  label: "Blog Posts",
                  icon: "📝"
                },
              },
              {
                name: "categories",
                list: "/categories",
                create: "/categories/create",
                edit: "/categories/edit/:id",
                show: "/categories/show/:id",
                meta: { 
                  canDelete: true,
                  label: "Categories",
                  icon: "🏷️"
                },
              },
            ]}
            options={{
              projectId: "y0D8Tb-Yj3MjK-aZfCzT",
              syncWithLocation: true,
              useNewQueryKeys: true,
              warnWhenUnsavedChanges: true,
              breadcrumb: false, // Remove breadcrumbs
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
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
                  <Route path="show/:id" element={<TourShow />} />
                </Route>

                <Route path="/blog-posts">
                  <Route index element={<BlogPostList />} />
                  <Route path="create" element={<BlogPostCreate />} />
                  <Route path="edit/:id" element={<BlogPostEdit />} />
                  <Route path="show/:id" element={<BlogPostShow />} />
                </Route>

                <Route path="/categories">
                  <Route index element={<CategoryList />} />
                  <Route path="create" element={<CategoryCreate />} />
                  <Route path="edit/:id" element={<CategoryEdit />} />
                  <Route path="show/:id" element={<CategoryShow />} />
                </Route>

                <Route path="*" element={<ErrorComponent />} />
              </Route>

              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<AuthPage type="login" />} />
                <Route path="/register" element={<AuthPage type="register" />} />
                <Route path="/forgot-password" element={<AuthPage type="forgotPassword" />} />
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