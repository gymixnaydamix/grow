import React from 'react';
import Budget from './Budget';
import Invoices from './Invoices';
import Payroll from './Payroll';
import Reports from './Reports';

interface FinanceProps {
  activeSubPage: string;
}

export default function Finance({ activeSubPage }: FinanceProps) {
  switch (activeSubPage) {
    case 'Budget':
      return <Budget />;
    case 'Invoices':
      return <Invoices />;
    case 'Payroll':
      return <Payroll />;
    case 'Reports':
      return <Reports />;
    default:
      return <Budget />;
  }
}
