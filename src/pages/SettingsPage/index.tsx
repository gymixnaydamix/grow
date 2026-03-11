import React from 'react';
import General from './General';
import Security from './Security';
import Data from './Data';
import Localization from './Localization';

interface SettingsPageProps {
  activeSubPage: string;
}

export default function SettingsPage({ activeSubPage }: SettingsPageProps) {
  switch (activeSubPage) {
    case 'General':
      return <General />;
    case 'Security':
      return <Security />;
    case 'Data':
      return <Data />;
    case 'Localization':
      return <Localization />;
    default:
      return <General />;
  }
}
