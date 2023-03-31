import React from 'react';
import { Outlet } from 'react-router-dom';

interface TestLayoutProps {
  user?:any
}

export const TestLayout: React.FC<TestLayoutProps> = () => (
  <div>
    <Outlet />
  </div>
);
