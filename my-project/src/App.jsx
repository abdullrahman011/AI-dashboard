import React, { useState } from 'react';

// استيراد أيقونات من مكتبة Lucide
import { Activity, Clock, Percent, Eye, TrendingUp, Settings, Menu, X } from 'lucide-react';

// مكون الداشبورد الرئيسي
export default function RefereeDashboard() {
  // حالة البيانات للداشبورد
  const [currentMatch, setCurrentMatch] = useState({
    homeTeam: 'برشلونة',
    awayTeam: 'فياريال ',
    score: '1 - 0',
    time: '75:31',
    status: 'جاري التحليل'
  });

  const [stats] = useState({
    accuracy: 95,
    responseTime: 1.5,
    analyzedCases: 75
  });

  // حالة لفتح/إغلاق القائمة الجانبية في الأجهزة الصغيرة
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // التبديل بين فتح وإغلاق القائمة الجانبية
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div dir="rtl" className="flex flex-col min-h-screen bg-gred-100 text-gray-800 ">
      {/* الهيدر */}
      <header className="bg-blue-900 text-white p-4 shadow-md ">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar} 
              className="lg:hidden mr-2"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl md:text-2xl font-bold">نظام التحكيم الذكي</h1>
          </div>
          <div className="flex items-center">
            <span className="bg-green-500 px-2 py-1 rounded text-sm">النموذج يعمل</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        
        <aside 
          className={`lg:hidden fixed inset-y-0 right-0 z-50 w-64 bg-blue-800 text-white transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b border-blue-700">
            <h2 className="font-bold">القائمة</h2>
            <button onClick={toggleSidebar}>
              <X size={24} />
            </button>
          </div>
          <div className="p-4">
            <MobileNavItem label="لوحة التحكم" icon={<Activity size={20} />} active />
            <MobileNavItem label="عرض التحليل" icon={<Eye size={20} />} />
            <MobileNavItem label="الإحصائيات" icon={<TrendingUp size={20} />} />
            <MobileNavItem label="الإعدادات" icon={<Settings size={20} />} />
          </div>
        </aside>

        {/* القائمة الجانبية للشاشات الكبيرة */}
        <aside className="hidden lg:block w-16 xl:w-64 bg-blue-800 text-white flex-shrink-0">
          <div className="hidden xl:flex items-center justify-center h-16 border-b border-blue-700">
            <h2 className="font-bold text-xl">القائمة الرئيسية</h2>
          </div>
          <div className="p-2 xl:p-4">
            <NavItem icon={<Activity size={24} />} label="لوحة التحكم" active showLabel={true} />
            <NavItem icon={<Eye size={24} />} label="عرض التحليل" showLabel={true} />
            <NavItem icon={<TrendingUp size={24} />} label="الإحصائيات" showLabel={true} />
            <NavItem icon={<Settings size={24} />} label="الإعدادات" showLabel={true} />
          </div>
        </aside>

        {/* المحتوى الرئيسي */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="container mx-auto">
            {/* معلومات المباراة */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <h2 className="text-xl font-bold mb-4">المباراة الحالية</h2>
              <div className="flex justify-between items-center">
                <div className="text-center flex-1">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="font-bold text-blue-800">{currentMatch.homeTeam.charAt(3)}</span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold">{currentMatch.homeTeam}</h3>
                </div>
                <div className="text-center mx-4">
                  <span className="text-2xl md:text-3xl font-bold">{currentMatch.score}</span>
                  <p className="text-sm text-gray-500">{currentMatch.time}</p>
                </div>
                <div className="text-center flex-1">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="font-bold text-yellow-800">{currentMatch.awayTeam.charAt(0)}</span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold">{currentMatch.awayTeam}</h3>
                </div>
              </div>
              <div className="mt-4 text-center">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {currentMatch.status}
                </span>
              </div>
            </div>

            {/* الإحصائيات والتحليلات */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <StatCard
                title="دقة اكتشاف التسلل"
                value={`${stats.accuracy}%`}
                icon={<Percent />}
                color="bg-green-500"
              />
              <StatCard
                title="متوسط زمن اتخاذ القرار"
                value={`${stats.responseTime} ثانية`}
                icon={<Clock />}
                color="bg-blue-500"
              />
              <StatCard
                title="الحالات المحللة"
                value={stats.analyzedCases}
                icon={<Activity />}
                color="bg-purple-500"
              />
            </div>

            {/* عرض التسلل */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <h2 className="text-xl font-bold mb-4">تحليل حالة التسلل</h2>
              <div className="relative">
                <img
                  src="\public\offside.jpg"
                  alt="صورة التسلل"
                  className="w-full h-auto rounded object-cover"
                />
                
              </div>
            </div>

            {/* المقارنة والخطوات المستقبلية */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-bold mb-4">مقارنة الزمن</h2>
                <div className="space-y-6 p-2">
                  <ComparisonBar label="VAR التقليدي" value={300} maxValue={300} color="bg-gray-500" unit="ثانية" />
                  <ComparisonBar label="نظامنا" value={1.5} maxValue={300} color="bg-green-500" unit="ثانية" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-bold mb-4">الخطوات المستقبلية</h2>
                <div className="p-2">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 mt-1 mr-2"></div>
                      <p>زيادة دقة النموذج وتوسيع قاعدة البيانات</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 mt-1 mr-2"></div>
                      <p>إضافة تحليل للمخالفات الأخرى غير التسلل</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 mt-1 mr-2"></div>
                      <p>تطوير نظام توصيات لتحسين أداء الحكام</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* فريق العمل */}
            <div className="bg-white rounded-lg shadow p-4 mt-6">
              <h2 className="text-xl font-bold mb-6">فريق العمل</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <TeamMember name="يوسف العبري" />
                <TeamMember name="عبدالرحمن سالمة" />
                <TeamMember name="عبدالرحمن العجلان" />
                <TeamMember name="محمد اليامي" />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* الفوتر */}
      <footer className="bg-blue-900 text-white p-4 text-center">
        <p className="text-sm md:text-base"> نظام التحكيم الذكي  </p>
      </footer>
    </div>
  );
}

// مكونات مساعدة

function NavItem({ icon, active, label, showLabel }) {
  return (
    <button className={`flex items-center w-full p-3 rounded mb-2 transition-colors ${
      active ? 'bg-blue-600' : 'hover:bg-blue-700'
    }`}>
      <div className="flex-shrink-0">{icon}</div>
      {showLabel && (
        <span className={`ml-3 transition-opacity duration-200 ${showLabel ? 'opacity-100' : 'opacity-0'}`}>
          {label}
        </span>
      )}
    </button>
  );
}

function MobileNavItem({ icon, active, label }) {
  return (
    <button className={`flex items-center w-full p-3 rounded mb-2 ${
      active ? 'bg-blue-700' : 'hover:bg-blue-700'
    }`}>
      <div className="mr-3">{icon}</div>
      <span>{label}</span>
    </button>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 transition-transform duration-300 hover:transform hover:scale-105">
      <div className="flex items-center">
        <div className={`${color} text-white p-3 rounded mr-3 flex-shrink-0`}>
          {icon}
        </div>
        <div>
          <h3 className="text-gray-500 text-sm">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function ComparisonBar({ label, value, maxValue, color, unit }) {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-medium">{label}</span>
        <span className="font-bold">{value} {unit}</span>
      </div>
      <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full`} 
          style={{ width: `${Math.max(2, percentage)}%` }}
        >
          {percentage > 15 && (
            <div className="h-full flex items-center justify-center text-white text-xs px-2">
              {Math.round(percentage)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TeamMember({ name }) {
  return (
    <div className="text-center p-2 transition-transform duration-300 hover:transform hover:scale-105">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
        <span className="text-xl font-bold text-blue-800">{name.charAt(0)}</span>
      </div>
      <h3 className="font-medium text-sm md:text-base">{name}</h3>
    </div>
  );
}