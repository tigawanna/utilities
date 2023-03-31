/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
// import { useNavigate, Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AppUser } from '../../state/types/base';


interface LoginProps {
  user?: AppUser
}

export const Login: React.FC<LoginProps> = () =>

// const navigate = useNavigate()
// React.useEffect(() => {
//   if (user?.email) {
//     navigate('/')
//   }
// }, [user?.email])

  (
    <div className="w-full  h-[70%] flex flex-col items-center
  justify-center

  "
    >
      <div className="w-[80%] md:w-[60%]  m-2 p-2 flex flex-col
    items-center justify-start "
      />
      <Link
        className="text-blue-500"
        to="/auth/signup"
      >
        Create new account
      </Link>
    </div>
  );
