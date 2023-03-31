import React from 'react';
import { Outlet} from 'react-router-dom';
import { Toolbar } from '../../components/toolbar/Toolbar';
import { AppUser } from '../../state/types/base';

interface RootLayoutProps {
  user: AppUser
  test_mode:boolean
}

export const RootLayout: React.FC<RootLayoutProps> = ({ user, test_mode }) => {



  return (
    <div className="w-full h-screen max-h-screen dark:bg-slate-900">
      <div className="h-14 w-full  bg-slate-700 dark:bg-slate-800
          bg-opacity-30 dark:bg-opacity-90 max-h-[50px] p-1
         sticky top-0 z-40"
      >
        <Toolbar user={user} />
      </div>
      <main className=" w-full h-full fixed top-12">
        <Outlet />
      </main>
    </div>
  );
};
