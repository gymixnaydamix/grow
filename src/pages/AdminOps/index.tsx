import React from 'react';
import Users from './Users';
import System from './System';
import Announcements from './Announcements';
import Facilities from './Facilities';
import Transportation from './Transportation';
import Inventory from './Inventory';

interface AdminOpsProps {
  activeSubPage: string;
}

export default function AdminOps({ activeSubPage }: AdminOpsProps) {
  switch (activeSubPage) {
    case 'Auth & Roles':
    case 'User Profiles':
      return <Users activeSubPage={activeSubPage} />;
    case 'Campuses':
      return <Facilities activeSubPage={activeSubPage} />;
    case 'Notifications':
      return <Announcements activeSubPage={activeSubPage} />;
    case 'Audit Logs':
    case 'Media Uploads':
    case 'Settings':
    case 'Support':
      return <System activeSubPage={activeSubPage} />;
    default:
      return <Users activeSubPage={activeSubPage} />;
  }
}
