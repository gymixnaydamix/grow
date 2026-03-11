import React from 'react';
import Classes from './Classes';
import Assignments from './Assignments';
import Grading from './Grading';
import Messages from './Messages';

interface TeacherCockpitProps {
  activeSubPage: string;
}

export default function TeacherCockpit({ activeSubPage }: TeacherCockpitProps) {
  switch (activeSubPage) {
    case 'Classes':
      return <Classes />;
    case 'Assignments':
      return <Assignments />;
    case 'Grading':
      return <Grading />;
    case 'Messages':
      return <Messages />;
    default:
      return <Classes />;
  }
}
