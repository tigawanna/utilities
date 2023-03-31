/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppUser } from '../../state/types/base';
interface AuthLayoutProps {
  user?: AppUser
}

export const AuthLayout: React.FC<AuthLayoutProps> = () =>
// const navigate = useNavigate()
// // console.log("user ===",user)
// React.useEffect(() => {
//     if (user) {
//         if (user?.email && (user?.bio === "" || user?.avatar === "")) {
//             navigate('/profile')
//         }
//         else {
//             navigate('/')
//         }
//     }

// }, [user])

  (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
