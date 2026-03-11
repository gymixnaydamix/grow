import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, Bell, ChevronDown, User, Settings, Building, Bus, Package, 
  ShieldCheck, UserPlus, TrendingUp, LayoutDashboard, CheckCircle2, 
  Wallet, Users, GraduationCap, MonitorPlay, FileBadge, Target, List, 
  ChevronUp, ChevronRight, ChevronLeft, Minus, Grid, Headphones, Trophy, ShoppingBag, PersonStanding, Heart,
  Contact, Menu, X, Plus,
  Activity, Receipt, DollarSign, PieChart, UserCheck, Calendar, Briefcase, FileText, CheckSquare, Inbox, BookOpen, Award, Clock, Book, ClipboardList, MessageSquare, Shield, CheckCircle, BarChart, Flag, Filter, Download, Database, Globe
} from 'lucide-react';

import Dashboard from './pages/Dashboard';
import AdminOps from './pages/AdminOps';
import Finance from './pages/Finance';
import HRStaff from './pages/HRStaff';
import Admissions from './pages/Admissions';
import StudentPortal from './pages/StudentPortal';
import TeacherCockpit from './pages/TeacherCockpit';
import Credentials from './pages/Credentials';
import StrategicGoals from './pages/StrategicGoals';
import ActivityLogs from './pages/ActivityLogs';
import SettingsPage from './pages/SettingsPage';
import ConciergeAI from './pages/ConciergeAI';
import LoginPage from './pages/Login';

const pageToPathMap: Record<string, string> = {
  'Dashboard': 'dashboard',
  'Platform Core': 'platform',
  'Finance': 'finance',
  'HR & Staff': 'hr',
  'Admissions': 'admissions',
  'Student Portal': 'student',
  'Teacher Cockpit': 'teacher',
  'Credentials': 'credentials',
  'Strategic Goals': 'strategic',
  'Activity Logs': 'logs',
  'Settings': 'settings',
  'Concierge AI': 'ai',
};

const headerButtonsConfig: Record<string, { icon: any, label: string }[]> = {
  'Dashboard': [
    { icon: LayoutDashboard, label: 'Overview' },
    { icon: Activity, label: 'Real-time' },
    { icon: BarChart, label: 'Analytics' },
  ],
  'Platform Core': [
    { icon: ShieldCheck, label: 'Auth & Roles' },
    { icon: Contact, label: 'User Profiles' },
    { icon: Building, label: 'Campuses' },
    { icon: Bell, label: 'Notifications' },
    { icon: List, label: 'Audit Logs' },
    { icon: FileText, label: 'Media Uploads' },
    { icon: Settings, label: 'Settings' },
    { icon: Headphones, label: 'Support' },
  ],
  'Finance': [
    { icon: Wallet, label: 'Budget' },
    { icon: Receipt, label: 'Invoices' },
    { icon: DollarSign, label: 'Payroll' },
    { icon: PieChart, label: 'Reports' },
  ],
  'HR & Staff': [
    { icon: Users, label: 'Directory' },
    { icon: UserCheck, label: 'Attendance' },
    { icon: Calendar, label: 'Leave' },
    { icon: Briefcase, label: 'Recruitment' },
  ],
  'Admissions': [
    { icon: Inbox, label: 'Inquiries' },
    { icon: UserPlus, label: 'Applicants' },
    { icon: Users, label: 'Guardians' },
    { icon: Target, label: 'Stages' },
    { icon: Calendar, label: 'Interviews' },
    { icon: FileText, label: 'Documents' },
    { icon: CheckSquare, label: 'Decisions' },
    { icon: GraduationCap, label: 'Enrollment' },
    { icon: Building, label: 'Seat Availability' },
  ],
  'Student Portal': [
    { icon: GraduationCap, label: 'Academics' },
    { icon: BookOpen, label: 'Courses' },
    { icon: Award, label: 'Grades' },
    { icon: Clock, label: 'Schedule' },
  ],
  'Teacher Cockpit': [
    { icon: MonitorPlay, label: 'Classes' },
    { icon: Book, label: 'Assignments' },
    { icon: ClipboardList, label: 'Grading' },
    { icon: MessageSquare, label: 'Messages' },
  ],
  'Credentials': [
    { icon: FileBadge, label: 'Certificates' },
    { icon: Shield, label: 'Verification' },
    { icon: Award, label: 'Badges' },
    { icon: CheckCircle, label: 'Approvals' },
  ],
  'Strategic Goals': [
    { icon: Target, label: 'Objectives' },
    { icon: TrendingUp, label: 'KPIs' },
    { icon: BarChart, label: 'Progress' },
    { icon: Flag, label: 'Milestones' },
  ],
  'Activity Logs': [
    { icon: List, label: 'All Logs' },
    { icon: Clock, label: 'Recent' },
    { icon: Filter, label: 'Filter' },
    { icon: Download, label: 'Export' },
  ],
  'Settings': [
    { icon: Settings, label: 'General' },
    { icon: ShieldCheck, label: 'Security' },
    { icon: Database, label: 'Data' },
    { icon: Globe, label: 'Localization' },
  ],
  'Concierge AI': [
    { icon: MessageSquare, label: 'Chat' },
    { icon: FileText, label: 'Documents' },
    { icon: BarChart, label: 'Insights' },
  ],
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('Platform Core');
  const [activeSubPage, setActiveSubPage] = useState('Auth & Roles');
  const [showBottomIcons, setShowBottomIcons] = useState(false);

  const isAuthenticated = !!localStorage.getItem('auth_token');

  // Sync activePage and activeSubPage with URL
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') return;

    const parts = path.split('/').filter(Boolean);
    if (parts.length > 0) {
      // Find active page by slug
      const pageEntry = Object.entries(pageToPathMap).find(([_, p]) => p === parts[0]);
      if (pageEntry) {
        setActivePage(pageEntry[0]);
        if (parts.length > 1) {
          // Find subpage by slug
          const subPageLabel = parts[1].replace(/-/g, ' ');
          const formattedSubPage = subPageLabel.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          setActiveSubPage(formattedSubPage);
        } else {
          setActiveSubPage(headerButtonsConfig[pageEntry[0]]?.[0]?.label || '');
        }
      }
    }
  }, [location.pathname]);

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  const handlePageChange = (pageLabel: string) => {
    setActivePage(pageLabel);
    const subPageLabel = headerButtonsConfig[pageLabel]?.[0]?.label || '';
    setActiveSubPage(subPageLabel);

    const pagePath = pageToPathMap[pageLabel];
    const subPath = subPageLabel.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${pagePath}/${subPath}`);
  };

  const handleSubPageChange = (subPageLabel: string) => {
    setActiveSubPage(subPageLabel);
    const pagePath = pageToPathMap[activePage];
    const subPath = subPageLabel.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${pagePath}/${subPath}`);
  };

  return (
    <div className="flex h-screen bg-[#F4F5F7] font-sans overflow-hidden text-sm md:text-base">
      {/* Left/Main Area */}
      <div className="flex-1 flex flex-col relative min-w-0 pb-16 lg:pb-0">
        
        {/* Top Header Area */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-4 md:p-6 pb-2 md:pb-4 gap-4">
          
          {/* Mobile Header Top Row */}
          <div className="flex justify-end items-center w-full lg:hidden">
            {/* Search & User (Mobile) */}
            <div className="flex items-center gap-4">
              <button className="relative text-gray-500 hover:text-gray-700">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F4F5F7]"></span>
              </button>
              <div className="flex items-center gap-2 cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Admin User" 
                  className="w-8 h-8 rounded-full object-cover shadow-sm" 
                />
              </div>
            </div>
          </div>

          {/* Top Nav Pill */}
          <div className="flex bg-[#5C548E] rounded-xl md:rounded-2xl text-white/70 overflow-x-auto no-scrollbar shadow-sm w-full lg:w-auto shrink-0">
            {headerButtonsConfig[activePage]?.map((btn, idx) => {
              const isActive = activeSubPage === btn.label || (!activeSubPage && idx === 0);
              return (
                <button 
                  key={idx} 
                  onClick={() => handleSubPageChange(btn.label)}
                  className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 xl:px-5 py-2 md:py-2.5 transition-colors whitespace-nowrap ${isActive ? 'bg-white/10 text-white font-medium' : 'hover:bg-white/5'}`}
                >
                  <btn.icon className="w-4 h-4" />
                  <span className="text-xs md:text-sm">{btn.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search & User (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5 xl:w-4 xl:h-4" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-8 xl:pl-10 pr-3 py-1.5 xl:py-2 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-36 xl:w-56 text-xs xl:text-sm shadow-sm transition-all" 
              />
            </div>
            {/* Bell */}
            <button className="relative text-gray-500 hover:text-gray-700">
              <Bell className="w-4 h-4 xl:w-5 xl:h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 xl:w-2 xl:h-2 bg-red-500 rounded-full border-2 border-[#F4F5F7]"></span>
            </button>
            {/* Profile */}
            <div className="flex items-center gap-2 cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Admin User" 
                className="w-7 h-7 xl:w-8 xl:h-8 rounded-full object-cover shadow-sm" 
              />
              <span className="text-xs xl:text-sm font-medium text-gray-700 hidden xl:block">Admin User</span>
              <ChevronDown className="w-3 h-3 xl:w-4 xl:h-4 text-gray-500 hidden xl:block" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/overview" replace />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/platform/*" element={<AdminOps activeSubPage={activeSubPage} />} />
          <Route path="/finance/*" element={<Finance activeSubPage={activeSubPage} />} />
          <Route path="/hr/*" element={<HRStaff activeSubPage={activeSubPage} />} />
          <Route path="/admissions/*" element={<Admissions activeSubPage={activeSubPage} />} />
          <Route path="/student/*" element={<StudentPortal activeSubPage={activeSubPage} />} />
          <Route path="/teacher/*" element={<TeacherCockpit activeSubPage={activeSubPage} />} />
          <Route path="/credentials/*" element={<Credentials activeSubPage={activeSubPage} />} />
          <Route path="/strategic/*" element={<StrategicGoals activeSubPage={activeSubPage} />} />
          <Route path="/logs/*" element={<ActivityLogs activeSubPage={activeSubPage} />} />
          <Route path="/settings/*" element={<SettingsPage activeSubPage={activeSubPage} />} />
          <Route path="/ai/*" element={<ConciergeAI />} />
          <Route path="*" element={<div className="p-8">Page Not Found</div>} />
        </Routes>

        {/* Bottom Bar */}
        <div className="px-4 md:px-6 pb-4 md:pb-6 xl:pb-8 pt-4 md:pt-6 xl:pt-8 shrink-0 z-20">
          <div className="bg-white rounded-2xl md:rounded-[2rem] shadow-sm p-2 md:p-3 xl:p-4 flex flex-row items-center justify-between gap-2 md:gap-4 w-full">
            <div className="flex items-center gap-2 md:gap-4 xl:gap-8 overflow-x-auto no-scrollbar max-w-[60%] md:max-w-none">
              {/* Blue square button */}
              <button 
                onClick={() => setShowBottomIcons(!showBottomIcons)}
                className="w-8 h-8 md:w-10 md:h-10 xl:w-12 xl:h-12 bg-[#4F46E5] rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-md hover:bg-indigo-700 transition-colors shrink-0"
              >
                {showBottomIcons ? <Minus className="w-4 h-4 md:w-5 md:h-5 xl:w-6 xl:h-6" /> : <Plus className="w-4 h-4 md:w-5 md:h-5 xl:w-6 xl:h-6" />}
              </button>
              
              {/* Bottom Icons */}
              <div className={`flex items-center overflow-hidden transition-all duration-500 ease-in-out ${showBottomIcons ? 'max-w-4xl opacity-100' : 'max-w-0 opacity-0'}`}>
                <div className="flex gap-2 md:gap-4 xl:gap-6 min-w-max px-1 md:px-2">
                  {[
                    { icon: Grid, label: 'Media' },
                    { icon: Headphones, label: 'Studio' },
                    { icon: Trophy, label: 'Gamification' },
                    { icon: ShoppingBag, label: 'Market' },
                    { icon: PersonStanding, label: 'Leisure' },
                    { icon: Heart, label: 'Lifestyle' },
                  ].map((item, i) => (
                    <button key={i} className="flex flex-col items-center gap-1 group shrink-0">
                      <div className="w-8 h-8 md:w-10 md:h-10 xl:w-12 xl:h-12 rounded-full flex items-center justify-center text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 xl:w-5 xl:h-5" />
                      </div>
                      <span className="text-[8px] md:text-[9px] xl:text-[11px] font-medium text-gray-500 group-hover:text-indigo-600 transition-colors">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Button */}
            <button className="bg-[#4F46E5] text-white px-3 py-2 md:px-5 md:py-3 xl:px-8 xl:py-4 rounded-lg md:rounded-xl xl:rounded-2xl font-semibold text-xs md:text-sm xl:text-lg shadow-md hover:bg-indigo-700 transition-colors whitespace-nowrap shrink-0">
              <span className="hidden sm:inline">{activePage}</span>
              <span className="sm:hidden">{activePage}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation (Bottom on Mobile, Right on Desktop) */}
      <div className={`
        fixed bottom-0 left-0 right-0 h-16 bg-[#3E3874] flex flex-row items-center justify-start sm:justify-around px-2 z-50 shadow-xl overflow-x-auto no-scrollbar
        lg:relative lg:inset-y-0 lg:right-0 lg:h-auto lg:w-20 xl:w-24 lg:rounded-l-3xl xl:rounded-l-[2.5rem] lg:flex-col lg:py-6 lg:justify-start lg:overflow-visible
        transition-all duration-300 ease-in-out text-white/60 shrink-0
        ${desktopSidebarOpen ? 'lg:translate-x-0 lg:mr-0' : 'lg:translate-x-full lg:-mr-20 xl:-mr-24'}
      `}>
        {/* Mobile Close Button (Removed since it's now a bottom bar) */}
        
        {/* Toggle Button (Desktop) */}
        <button 
          onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
          className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 w-6 h-6 xl:w-8 xl:h-8 bg-white rounded-full shadow-md items-center justify-center text-gray-500 hover:text-gray-800 transition-all duration-300 ease-in-out z-50 ${
            desktopSidebarOpen ? '-left-3 xl:-left-4' : '-left-[calc(100%+2rem)] xl:-left-[calc(100%+2.5rem)]'
          }`}
        >
          {desktopSidebarOpen ? <ChevronRight className="w-4 h-4 xl:w-5 xl:h-5" /> : <ChevronLeft className="w-4 h-4 xl:w-5 xl:h-5" />}
        </button>
        
        {/* Top Logo/Icon (Desktop only) */}
        <div className="hidden lg:flex w-10 h-10 xl:w-12 xl:h-12 items-center justify-center text-white mb-4 xl:mb-6 shrink-0">
          <TrendingUp className="w-6 h-6 xl:w-8 xl:h-8" />
        </div>

        {/* Nav Items */}
        <div className="flex flex-row lg:flex-col justify-between lg:justify-start flex-1 w-full px-2 xl:px-3 min-h-0 lg:pb-2 gap-2 lg:gap-2 lg:overflow-y-auto no-scrollbar">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', color: 'text-sky-400' },
            { icon: CheckCircle2, label: 'Platform Core', color: 'text-purple-400' },
            { icon: Wallet, label: 'Finance', color: 'text-yellow-400' },
            { icon: Users, label: 'HR & Staff', color: 'text-pink-400' },
            { icon: UserPlus, label: 'Admissions', color: 'text-green-400' },
            { icon: MessageSquare, label: 'Concierge AI', color: 'text-fuchsia-400' },
            { icon: GraduationCap, label: 'Student Portal', color: 'text-gray-400' },
            { icon: MonitorPlay, label: 'Teacher Cockpit', color: 'text-yellow-300' },
            { icon: FileBadge, label: 'Credentials', color: 'text-blue-300' },
            { icon: Target, label: 'Strategic Goals', color: 'text-red-400' },
            { icon: List, label: 'Activity Logs', color: 'text-green-300' },
            { icon: Settings, label: 'Settings', color: 'text-gray-300' },
          ].map((item, i) => {
            const isActive = activePage === item.label;
            const isConcierge = item.label === 'Concierge AI';
            
            return (
            <button 
              key={i} 
              onClick={() => handlePageChange(item.label)}
              className={`flex flex-col items-center justify-center gap-1 py-1.5 xl:py-2 px-2 lg:px-0 rounded-lg xl:rounded-xl transition-all duration-300 min-w-[64px] lg:min-w-0 shrink-0 ${
                isActive && !isConcierge ? 'bg-[#4F46E5] text-white' : 
                isActive && isConcierge ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' :
                'hover:bg-white/5'
              }`}
            >
              <div className={`${isActive ? 'text-white' : item.color || ''} ${isConcierge && !isActive ? 'relative' : ''}`}>
                {isConcierge && !isActive && <div className="absolute inset-0 bg-white/20 blur-md rounded-full"></div>}
                <item.icon className={`w-5 h-5 xl:w-6 xl:h-6 ${isConcierge && !isActive ? 'relative z-10' : ''}`} />
              </div>
              <span className={`text-[8px] xl:text-[9px] font-medium text-center leading-tight px-1 whitespace-nowrap lg:whitespace-normal ${isConcierge ? 'uppercase tracking-wider font-bold' : ''}`}>
                {item.label}
              </span>
            </button>
          )})}
        </div>
      </div>
      
      {/* Mobile Overlay (Removed since menu is always visible at bottom) */}
    </div>
  );
}

