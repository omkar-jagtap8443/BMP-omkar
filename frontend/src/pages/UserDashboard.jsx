import ParcelForm from '../components/user/ParcelForm';
import TravelerList from '../components/user/TravelerList';
import DashboardHeader from '../components/user/DashboardHeader';
import MobileStats from '../components/user/MobileStats';
import ProcessSteps from '../components/user/ProcessSteps';
import SecurityBadge from '../components/user/SecurityBadge';
import HelpSection from '../components/user/HelpSection';
import BottomFeatures from '../components/user/BottomFeatures';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <DashboardHeader />
      <MobileStats />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProcessSteps />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ParcelForm />
            <SecurityBadge />
          </div>
          
          <div className="lg:col-span-2">
            <TravelerList />
            <HelpSection />
          </div>
        </div>
        
        <BottomFeatures />
      </div>
    </div>
  );
};

export default UserDashboard;