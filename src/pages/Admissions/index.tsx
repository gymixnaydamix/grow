import React from 'react';
import Applications from './Applications';
import Documents from './Documents';
import Enrollment from './Enrollment';
import Inquiries from './Inquiries';

interface AdmissionsProps {
  activeSubPage: string;
}

export default function Admissions({ activeSubPage }: AdmissionsProps) {
  switch (activeSubPage) {
    case 'Inquiries':
      return <Inquiries activeSubPage={activeSubPage} />;
    case 'Applicants':
    case 'Guardians':
    case 'Stages':
    case 'Interviews':
    case 'Decisions':
      return <Applications activeSubPage={activeSubPage} />;
    case 'Documents':
      return <Documents activeSubPage={activeSubPage} />;
    case 'Enrollment':
    case 'Seat Availability':
      return <Enrollment activeSubPage={activeSubPage} />;
    default:
      return <Inquiries activeSubPage={activeSubPage} />;
  }
}
