import React from 'react';
import { AppUser } from '../../state/types/base';

interface TestProps {
  user:AppUser
}

export const Test: React.FC<TestProps> = () => (
  <div className=" w-full   px-2 bg-slate-700  first-letter:text-white" />

);
