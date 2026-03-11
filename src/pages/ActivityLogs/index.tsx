import React from 'react';
import AllLogs from './AllLogs';
import Recent from './Recent';
import Filter from './Filter';
import Export from './Export';

interface ActivityLogsProps {
  activeSubPage: string;
}

export default function ActivityLogs({ activeSubPage }: ActivityLogsProps) {
  switch (activeSubPage) {
    case 'All Logs':
      return <AllLogs />;
    case 'Recent':
      return <Recent />;
    case 'Filter':
      return <Filter />;
    case 'Export':
      return <Export />;
    default:
      return <AllLogs />;
  }
}
