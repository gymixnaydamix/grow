import React from 'react';
import Certificates from './Certificates';
import Verification from './Verification';
import Badges from './Badges';
import Approvals from './Approvals';

interface CredentialsProps {
  activeSubPage: string;
}

export default function Credentials({ activeSubPage }: CredentialsProps) {
  switch (activeSubPage) {
    case 'Certificates':
      return <Certificates />;
    case 'Verification':
      return <Verification />;
    case 'Badges':
      return <Badges />;
    case 'Approvals':
      return <Approvals />;
    default:
      return <Certificates />;
  }
}
