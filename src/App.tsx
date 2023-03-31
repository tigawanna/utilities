import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { RootLayout } from './pages/index/RootLayout';
import { WelcomePage } from './pages/index/WelcomePage';
import { TestLayout } from './components/test/TestLayout';
import { AuthLayout } from './pages/auth/AuthLayout';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { Test } from './components/test/Test';
import { ReactRouterError } from './shared/extra/ReactRouterError';
import { getUser } from './state/pb/config';
import { QueryStateWrapper } from './shared/wrappers/QueryStateWrapper';
import { LoaderElipse } from './shared/loaders/Loaders';

function App() {
  const query = useQuery({
    queryKey:['user'],
    queryFn:getUser
  }, );

  const user = query.data;

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout user={user} test_mode />,
      // loader:userLoader(queryClient),
      errorElement: <ReactRouterError />,
      children: [
        { index: true, element: <WelcomePage user={user} /> },

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
              element: <Signup user={user}/>,
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
    // {
    //   path: '/newsletter',
    //   action: newsletterAction,
    // },
  ]);

  return (
    <QueryStateWrapper 
      query={query}
      loader={<LoaderElipse />}
    >
      <div className=" dark:bg-slate-900 h-full max-h-screen
       dark:text-white dark:shadow-white"
      >
        <RouterProvider router={router} />
      </div>
    </QueryStateWrapper>
  );
}

export default App;
