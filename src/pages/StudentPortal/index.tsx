import React from 'react';
import Academics from './Academics';
import Courses from './Courses';
import Grades from './Grades';
import Schedule from './Schedule';

interface StudentPortalProps {
  activeSubPage: string;
}

export default function StudentPortal({ activeSubPage }: StudentPortalProps) {
  switch (activeSubPage) {
    case 'Academics':
      return <Academics />;
    case 'Courses':
      return <Courses />;
    case 'Grades':
      return <Grades />;
    case 'Schedule':
      return <Schedule />;
    default:
      return <Academics />;
  }
}
