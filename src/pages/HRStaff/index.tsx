import React from 'react';
import Directory from './Directory';
import Attendance from './Attendance';
import Leave from './Leave';
import Recruitment from './Recruitment';

interface HRStaffProps {
  activeSubPage: string;
}

export default function HRStaff({ activeSubPage }: HRStaffProps) {
  switch (activeSubPage) {
    case 'Directory':
      return <Directory />;
    case 'Attendance':
      return <Attendance />;
    case 'Leave':
      return <Leave />;
    case 'Recruitment':
      return <Recruitment />;
    default:
      return <Directory />;
  }
}
