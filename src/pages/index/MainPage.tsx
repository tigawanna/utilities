import React from 'react';
import { BillsView } from '../../components/bills/BillsView';
import { AppUser } from '../../state/types/base';

interface WelcomePageProps {
  user:AppUser
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ user }) => {
return (
    <div className="w-full h-full flex flex-col justify-start items center dark:bg-yellow-900">
    <BillsView/>
    </div>
  );
};
