import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          dashboard: {
            overview: 'Overview',
            active_users: 'Active Users',
            total_revenue: 'Total Revenue',
            growth_rate: 'Growth Rate',
            system_status: 'System Status',
          },
          nav: {
            dashboard: 'Dashboard',
            platform: 'Platform Core',
            finance: 'Finance',
            hr: 'HR & Staff',
            admissions: 'Admissions',
            ai: 'Concierge AI',
          }
        }
      },
      es: {
        translation: {
          dashboard: {
            overview: 'Resumen',
            active_users: 'Usuarios Activos',
            total_revenue: 'Ingresos Totales',
            growth_rate: 'Tasa de Crecimiento',
            system_status: 'Estado del Sistema',
          },
          nav: {
            dashboard: 'Tablero',
            platform: 'Núcleo de Plataforma',
            finance: 'Finanzas',
            hr: 'RR.HH. y Personal',
            admissions: 'Admisiones',
            ai: 'Conserje IA',
          }
        }
      }
    }
  });

export default i18n;
