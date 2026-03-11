import React from 'react';
import Objectives from './Objectives';
import KPIs from './KPIs';
import Progress from './Progress';
import Milestones from './Milestones';

interface StrategicGoalsProps {
  activeSubPage: string;
}

export default function StrategicGoals({ activeSubPage }: StrategicGoalsProps) {
  switch (activeSubPage) {
    case 'Objectives':
      return <Objectives />;
    case 'KPIs':
      return <KPIs />;
    case 'Progress':
      return <Progress />;
    case 'Milestones':
      return <Milestones />;
    default:
      return <Objectives />;
  }
}
