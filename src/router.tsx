import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Test } from "./components/test/Test";
import { TestLayout } from "./components/test/TestLayout";
import { AuthLayout } from "./pages/auth/AuthLayout";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { RootLayout } from "./pages/index/RootLayout";
import { WelcomePage } from "./pages/index/WelcomePage";
import { ReactRouterError } from "./shared/extra/ReactRouterError";
import { LoaderElipse } from "./shared/loaders/Loaders";
import { AppUser } from "./state/types/base";

const Shops = lazy(() => import("./pages/shops/Shops"));
const ShopsLayout = lazy(() => import("./pages/shops/ShopsLayout"));

const Tenants = lazy(() => import("./pages/tenants/Tenants"));
const TenantsLayout = lazy(() => import("./pages/tenants/TenantsLayout"));


export function makeRouter(user:AppUser){
    return createBrowserRouter([
        {
            path: '/',
            element: <RootLayout user={user} />,
            // loader:userLoader(queryClient),
            errorElement: <ReactRouterError />,
            children: [
                { index: true, element: <WelcomePage user={user} /> },
                {
                    path: '/shops',
                    element: <Suspense fallback={<LoaderElipse />}><ShopsLayout user={user} /></Suspense>
                    ,
                    children: [
                        {
                            index: true,
                            element: <Suspense fallback={<LoaderElipse />}> <Shops user={user} /></Suspense>
                            ,
                            // loader: deferredBlogPostsLoader,
                        },

                    ],
                },
                {
                    path: '/tenants',
                    element: <Suspense fallback={<LoaderElipse />}><TenantsLayout user={user} /></Suspense>
                    ,
                    children: [
                        {
                            index: true,
                            element: <Suspense fallback={<LoaderElipse />}> <Tenants user={user} /></Suspense>
                            ,
                            // loader: deferredBlogPostsLoader,
                        },

                    ],
                },

                {
                    path: '/auth',
                    element: <AuthLayout user={user} />,
                    children: [
                        {
                            index: true,
                            element: <Login />,
                            // loader: deferredBlogPostsLoader,
                        },
                        {
                            path: '/auth/signup',
                            element: <Signup user={user} />,
                            // loader: blogPostLoader,
                        },
                    ],
                },

                {
                    path: '/test',
                    element: <TestLayout user={user} />,
                    children: [
                        {
                            index: true,
                            element: <Test user={user} />,
                            // loader: deferredBlogPostsLoader,
                        },

                    ],
                },

            ],
        },

    ]);
}


