import React from 'react';
import { BillsView } from '../../components/bills/BillsView';
import { useBillsPeriod } from '../../components/bills/bill_utils';
import { AppUser } from '../../state/types/base';

interface WelcomePageProps {
  user:AppUser
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ user }) => {
  const {period,setPeriod}=useBillsPeriod()
return (
    <div className="w-full h-full flex flex-col justify-start items center dark:bg-yellow-900">
    {/* <div className="sticky top-[10%] bg-slate-900 bg-opacity-80 w-full flex items-center justify-center">
      <PeriodPicker period={period} setPeriod={setPeriod} />
  </div>   */}
     <BillsView period={period} setPeriod={setPeriod}/>
    </div>
  );
};
