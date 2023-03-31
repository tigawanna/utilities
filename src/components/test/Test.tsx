import React from 'react';
import { User } from '../../utils/types';

interface TestProps {
  user?: User
}

export const Test: React.FC<TestProps> = () => (
  <div className=" w-full   px-2 bg-slate-700  first-letter:text-white" />

);
