import React, { useState, useEffect } from 'react';

// 顏色定義 
// 我們將在 Tailwind 中使用這些
const COLORS = {
  primary: '#5B21B6', // 紫色
  secondary: '#3B82F6', // 藍色
  white: '#FFFFFF',
  black: '#000000',
  grayLight: '#F3F4F6',
  gray: '#6B7280',
  grayDark: '#1F2937',
  green: '#10B981',
  orange: '#F59E0B',
  red: '#EF4444',
};

// ---------------------------------
// 圖標組件 (內聯 SVG)
// ---------------------------------
const IconSearch = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
const IconBell = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 8a6 6 0 0 1 12 0v5a2 2 0 0 0 2 2h0a2 2 0 0 0-2-2v-5a6 6 0 0 0-12 0v5a2 2 0 0 0 2 2h0a2 2 0 0 0-2-2Z"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
  </svg>
);
const IconWallet = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
  </svg>
);
const IconAward = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 1.515 8.326a1 1 0 0 1-1.482.957l-6.06-3.79c-.55-.343-1.2-.343-1.75 0l-6.06 3.79a1 1 0 0 1-1.482-.957l1.515-8.326C2.657 10.33 4.813 8.26 7.4 8.26A5.14 5.14 0 0 1 12 13.4a5.14 5.14 0 0 1 4.6-5.14c2.587 0 4.743 2.07 5.21 4.63Z"></path>
  </svg>
);
const IconBolt = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><path d="m13 2-3 9h4l-3 9"></path>
  </svg>
);
const IconArrowLeftRight = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M7 16.5 16.5 7M21 12H3M16.5 17.5 7 8"></path>
  </svg>
);
const IconLandmark = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><path d="m9 22 0-10 6 0 0 10"></path>
  </svg>
);
const IconShoppingCart = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
  </svg>
);
const IconCreditCard = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line>
  </svg>
);
const IconTag = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);
const IconPlane = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
  </svg>
);
const IconLayoutGrid = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect>
  </svg>
);
const IconBanknote = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="12" x="2" y="6" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path>
  </svg>
);
const IconScan = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><line x1="7" y1="12" x2="17" y2="12"></line>
  </svg>
);
const IconQrCode = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);
const IconSend = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);
const IconUser = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
  </svg>
);
const IconBus = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C20.7 7.6 16.9 4 12 4S3.3 7.6 3.5 11.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2"></path><path d="M12 12v-8"></path><path d="M5 17h14"></path><circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle>
  </svg>
);
const IconX = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const IconChevronRight = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const IconCheckCircle = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const IconSpinner = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin" {...props}>
    <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
);


// ---------------------------------
// 屏幕組件
// ---------------------------------

/**
 * 主屏幕 (您的設計圖)
 */
const HomeScreen = ({ onTopUp, balance }) => {
  const formatBalance = (num) => {
    // 簡單的格式化，將數字變為帶逗號的字符串
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="overflow-y-auto pb-24">
      {/* 1. 頂部搜索欄 */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-sm z-10 px-4 pt-4 pb-3">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IconSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enjoy Insurance Discounts 🔥"
              className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none"
            />
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <IconBell className="h-6 w-6 text-gray-700" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <IconWallet className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </header>

      {/* 2. 導航標籤 */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-100">
        <div className="flex space-x-5 text-gray-500">
          <a href="#" className="text-black font-bold text-lg border-b-2 border-blue-600 pb-1">Finance</a>
          <a href="#" className="font-bold text-lg">Chill Life</a>
          <a href="#" className="font-bold text-lg">Travel+</a>
        </div>
      </div>

      {/* 3. 餘額卡片 */}
      <div className="p-4">
        <div className="rounded-2xl p-5 shadow-lg bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-800 text-white relative overflow-hidden">

          {/* A Point */}
          <div className="flex items-center space-x-3 z-10 relative">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-md">
            </div>
            <div>
              <p className="font-semibold text-lg">DSB. Point</p>
              <p className="font-bold text-2xl">221</p>
            </div>
          </div>

          {/* 餘額和增值按鈕 */}
          <div className="mt-6 z-10 relative">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-200">Total balance HKD</p>
                <p className="text-2xl font-bold">
                  {typeof balance === 'number' ? `$ ${formatBalance(balance)}` : '****'}
                </p>
              </div>
              <button
                className="bg-white/90 text-blue-700 font-bold px-6 py-2 rounded-full shadow-md"
                onClick={onTopUp}>
                Top up
              </button>
            </div>
            {/* 分割線和底部信息 */}
            <div className="flex space-x-4 mt-3 pt-3 border-t border-white/20 text-sm">
              <p className="flex-1 text-gray-200">Daily earnings <span className="text-green-300">●●●●</span></p>
              <p className="border-l border-white/20 pl-4 flex-1 text-gray-200">DSB Pay balance</p>
              <p className="border-l border-white/20 pl-4 flex-1 text-gray-200">DSB eM+</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. 圖標網格 */}
      <div className="grid grid-cols-5 gap-y-4 px-4 py-2 bg-white text-center">
        <IconGridItem icon={<IconBolt className="h-8 w-8 text-blue-600" />} text="Bill Payment" />
        <IconGridItem icon={<IconArrowLeftRight className="h-8 w-8 text-blue-600" />} text="Remittance" />
        <IconGridItem icon={<IconLandmark className="h-8 w-8 text-blue-600" />} text="DS Bank" />
        <IconGridItem icon={<IconShoppingCart className="h-8 w-8 text-orange-500" />} text="Taobao" />
        <IconGridItem icon={<IconCreditCard className="h-8 w-8 text-blue-600" />} text="Credit Card Repayment" />
        <IconGridItem icon={<IconTag className="h-8 w-8 text-red-500" />} text="Mainland Deals" />
        <IconGridItem icon={<IconPlane className="h-8 w-8 text-green-500" />} text="Travel Zone" />
        <IconGridItem icon={<IconLayoutGrid className="h-8 w-8 text-gray-500" />} text="View All" />
      </div>

      {/* 5. 廣告橫幅 (簡化) */}
      <div className="px-4 py-3 grid grid-cols-3 gap-3">
        <div className="col-span-2 rounded-xl shadow-md overflow-hidden h-24 bg-orange-500 flex items-center justify-center">
          <p className="text-white font-bold">Taobao x PPS Ads</p>
        </div>
        <div className="col-span-1 rounded-xl shadow-md overflow-hidden bg-blue-500 text-white p-3 h-24">
          <p className="font-bold">Meituan</p>
        </div>
      </div>

      {/* 6. 推薦 (簡化) */}
      <div className="px-4 py-3">
        <h2 className="text-xl font-bold mb-3">Recommend for you</h2>
        {/* ... 省略了標籤 ... */}
      </div>
    </div>
  );
};

/**
 * 授權同意頁
 */
const ConsentScreen = ({ onAgree, onCancel }) => {
  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* 頂部標題 */}
      <div className="p-4 bg-white border-b border-gray-200">
        <h2 className="text-lg font-bold text-center">Consent Authorization</h2>
      </div>

      {/* 條款內容 */}
      <div className="flex-1 overflow-y-auto p-4 text-gray-700 text-sm leading-relaxed">
        <h3 className="text-base font-semibold mb-3">Personal Data Collection & Credit Check</h3>
        <p className="mb-2">
          To proceed with your loan application, DSB Pay needs to obtain your credit and
          identity information from TransUnion (TU). By continuing, you consent to DSB Pay
          collecting, using, and storing your personal data in accordance with applicable
          privacy regulations.
        </p>
        <p className="mb-2">
          The data retrieved may include your credit report, payment history, and other
          identification-related information for the purpose of assessing your credit
          eligibility.
        </p>
        <p className="mb-2">
          Your data will not be shared with third parties except as necessary to process
          your loan request or as required by law. You may withdraw your consent at any
          time by contacting DSB Pay support.
        </p>
        <p className="mt-4">
          Please read the above terms carefully. Click “Agree” below if you consent to
          proceed with credit data retrieval.
        </p>
      </div>

      {/* 底部按鈕區 */}
      <div className="p-4 bg-white border-t border-gray-200 flex space-x-3">
        <button
          className="w-1/3 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-full transition duration-150"
          onClick={onCancel}>
          Cancel
        </button>
        <button
          className="w-2/3 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full transition duration-150"
          onClick={onAgree}>
          Agree
        </button>
      </div>
    </div>
  );
};

/**
 * 貸款詳情頁
 */
const LoanDetailsScreen = ({ onConfirm, user }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const loanOptions = [10000, 20000, 50000];

  // 根據登入用戶決定身份證資料
  const idCardMap = {
    'Chan Tai Man': 'A123***(4)',
    'Jackey Ng': 'B456***(7)',
  };

  const userName = user?.name || 'Unknown User';
  const idCard = idCardMap[userName] || '********';

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-white border-b border-gray-100">
        <h2 className="text-lg font-bold text-center">Apply for Loan</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">

        {/* 用戶信息 */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <InfoRow label="Full Name" value={userName} />
          <InfoRow label="Hong Kong ID" value={idCard} />
        </div>

        {/* 貸款金額選擇 */}
        <div className="mt-4">
          <h3 className="text-base font-semibold text-gray-700 mb-3">Select Loan Amount</h3>
          {loanOptions.map((amount) => (
            <button
              key={amount}
              className={`flex justify-between items-center w-full bg-white p-5 rounded-lg mb-3 border ${
                selectedAmount === amount ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedAmount(amount)}>
              <p className={`text-lg font-bold ${
                  selectedAmount === amount ? 'text-purple-700' : 'text-gray-800'
                }`}>
                HKD ${new Intl.NumberFormat('en-US').format(amount)}
              </p>
              <IconChevronRight className={`h-5 w-5 ${
                  selectedAmount === amount ? 'text-purple-700' : 'text-gray-400'
                }`} />
            </button>
          ))}
        </div>
      </div>

      {/* 底部確認按鈕 */}
      <div className="p-4 bg-white border-t border-gray-100">
        <button
          className={`w-full py-4 rounded-full text-white font-bold ${
            !selectedAmount ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
          }`}
          disabled={!selectedAmount}
          onClick={() => onConfirm(selectedAmount)}>
          Confirm
        </button>
      </div>
    </div>
  );
};


/**
 * 處理中頁面
 */
const ProcessingScreen = ({ processingStep }) => {
  let iconElement;

  if (processingStep === 'Loan Approved') {
    iconElement = <IconCheckCircle className="h-12 w-12 text-green-500" />;
  } else if (processingStep === 'Loan Application Rejected') {
    iconElement = <IconX className="h-12 w-12 text-red-500" />;
  } else {
    iconElement = <IconSpinner className="h-12 w-12 text-purple-600" />;
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      {iconElement}
      <p className="text-lg font-semibold text-gray-700 mt-6">{processingStep}</p>
    </div>
  );
};


/**
 * Loan Confirmation Page
 * — simulate real-world loan confirmation flow with T&C
 */
const LoanConfirmScreen = ({ amount, onConfirm, onCancel }) => {
  const formatted = new Intl.NumberFormat('en-US').format(amount);

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-200">
        <h2 className="text-lg font-bold text-center text-gray-800">Confirm Loan</h2>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-6 pb-24 text-gray-800">
        {/* Approved amount highlight */}
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center mb-5">
          <p className="text-base text-gray-500">Approved Loan Amount</p>
          <p className="text-4xl font-extrabold text-purple-700 my-3">
            HKD ${formatted}
          </p>
          <p className="text-sm text-gray-600">
            Please confirm if you wish to proceed with this loan.
          </p>
        </div>

        {/* Terms & Conditions simulation */}
        <div className="bg-white rounded-2xl shadow-sm p-5 text-sm leading-relaxed text-gray-700">
          <h3 className="font-semibold mb-2 text-gray-800">Terms & Conditions</h3>
          <p className="mb-2">
            By confirming this loan, you agree to the terms governed by DSB Pay, including
            repayment obligations and interest schedules communicated to you in the final
            loan agreement.
          </p>
          <p className="mb-2">
            The loan amount will be disbursed to your DSB Pay account upon confirmation.
            Interest is charged daily, and repayment will be automatically deducted
            according to your chosen repayment plan.
          </p>
          <p className="mb-2">
            Late or missed payments may result in additional fees or affect your credit
            rating maintained by TransUnion (TU). You are encouraged to review all loan
            details carefully before proceeding.
          </p>
          <p className="mb-2">
            For any inquiries regarding early repayment, charges, or account closure,
            please contact DSB Pay Customer Support.
          </p>
          <p className="mt-3 text-gray-500 text-xs">
            This loan agreement is subject to the prevailing laws and regulations of Hong
            Kong. By clicking “Confirm,” you acknowledge that you have read and understood
            all the above terms.
          </p>
        </div>
      </div>

      {/* Footer buttons */}
      <div className="p-4 bg-white border-t border-gray-200 flex items-center space-x-3">
        <button
          className="w-1/3 py-4 rounded-full text-gray-700 font-semibold bg-gray-200 hover:bg-gray-300 active:scale-95 transition duration-150"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="w-2/3 py-4 rounded-full text-white font-bold bg-purple-600 hover:bg-purple-700 active:scale-95 transition duration-150"
          onClick={onConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

// ---------------------------------
// 彈出式組件
// ---------------------------------

/**
 * 增值彈窗
 */
const TopUpModal = ({ visible, onClose, onSelectLoan }) => {
  if (!visible) return null;

  // From Bank 按鈕的樣式與 Loan 保持一致，但仍禁用
  const bankButtonClasses = "flex items-center w-full py-4";
  const bankIconClasses = "h-7 w-7 text-purple-600 opacity-100";
  const bankTextClasses = "text-base text-gray-800 ml-3 opacity-100";
  
  // Loan 按鈕
  const loanButtonClasses = "flex items-center w-full py-4 hover:bg-gray-50 rounded-lg transition duration-150";
  const loanIconClasses = "h-7 w-7 text-purple-600";
  const loanTextClasses = "text-base text-gray-800 ml-3";


  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-end" onClick={onClose}>
      <div
        className="bg-white w-full rounded-t-2xl p-5 pt-6"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold">Top Up</h3>
          <button onClick={onClose} className="p-1">
            <IconX className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* From Bank 按鈕 - 樣式與 Loan 相同，但禁用 */}
        <button className={bankButtonClasses} disabled={true}>
          <IconLandmark className={bankIconClasses} />
          <p className={bankTextClasses}>From Bank</p>
        </button>

        {/* Loan 按鈕 */}
        <button className={loanButtonClasses} onClick={onSelectLoan}>
          <IconBanknote className={loanIconClasses} />
          <p className={loanTextClasses}>Loan</p>
        </button>
      </div>
    </div>
  );
};

// ---------------------------------
// 輔助組件
// ---------------------------------

// 圖標網格項
const IconGridItem = ({ icon, text }) => (
  <a href="#" className="flex flex-col items-center p-1">
    {icon}
    <p className="text-xs mt-1.5 text-center text-gray-700">{text}</p>
  </a>
);

// 信息行 (用於貸款頁)
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
    <p className="text-base text-gray-500">{label}</p>
    <p className="text-base font-semibold text-gray-800">{value}</p>
  </div>
);

// ---------------------------------
// 主應用程序組件
// ---------------------------------
export default function App() {
  // const [currentScreen, setCurrentScreen] = useState('Home'); // 'Home', 'LoanDetails', 'Processing', 'LoanConfirm'
  const [currentScreen, setCurrentScreen] = useState('Login'); // 初始改成登入畫面
  const [balance, setBalance] = useState(1234.56); // 初始餘額
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLoanAmount, setSelectedLoanAmount] = useState(0);
  const [processingStep, setProcessingStep] = useState('Checking TU Credit Record...');
  const [user, setUser] = useState(null); // 保存登入用戶物件 {name: string}
  const [error, setError] = useState('');

  // ✅ 把 balance 變成一個物件，用 username 作為 key
  const [balances, setBalances] = useState({
    'Chan Tai Man': 1234.56,
    'Jackey Ng': 500.0,
  });

  

  // 登入畫面元件
  const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
      if (
        (username === 'Chan Tai Man' || username === 'Jackey Ng') &&
        password === 'dsbai'
      ) {
        setUser({ name: username });
        setError('');
        setCurrentScreen('Home');
      } else {
        setError('Invalid username or password 😅');
      }
    };

    return (
      <div className="flex flex-col justify-center items-center h-full bg-gradient-to-br from-purple-600 to-blue-500 text-white p-6">
        <h1 className="text-3xl font-bold mb-8">DSB Pay Login</h1>

        <div className="w-full max-w-xs bg-white text-gray-800 rounded-xl p-6 shadow-md">
          <input
            type="text"
            placeholder="Please enter username"
            className="w-full mb-3 p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Please enter password"
            className="w-full mb-3 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded transition duration-150">
            Login
          </button>
        </div>
      </div>
    );
  };


  // 處理批核邏輯
  useEffect(() => {
    if (currentScreen === 'Processing') {
      // 根據不同用戶決定結果
      const approved = user?.name === 'Chan Tai Man';
      setProcessingStep('Checking TU Credit Record...');
      const timer1 = setTimeout(() => {
        setProcessingStep('Processing Loan Application...');
      }, 1500);
      const timer2 = setTimeout(() => {
        setProcessingStep(approved ? 'Loan Approved' : 'Loan Application Rejected');
      }, 3000);
      const timer3 = setTimeout(() => {
        if (approved) {
          setCurrentScreen('LoanConfirm');
        } else {
          // 不批核就返回主畫面
          setCurrentScreen('Home');
        }
      }, 4500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [currentScreen, user]);

  // 1. 點擊 "Top up"
  const handleTopUp = () => {
    setIsModalVisible(true);
  };


  // 2. 在彈窗中選擇 "Loan"
  const handleSelectLoan = () => {
    setIsModalVisible(false);
    setCurrentScreen('Consent');
  };

  // 3. 在貸款詳情頁點擊 "Confirm"
  const handleConfirmLoan = (amount) => {
    setSelectedLoanAmount(amount);
    setCurrentScreen('Processing');
  };


  // 當貸款批核並確認時更新該用戶餘額
  const handleFinalConfirm = () => {
    if (!user?.name) return;
    setBalances(prev => ({
      ...prev,
      [user.name]: (prev[user.name] || 0) + selectedLoanAmount,
    }));
    setCurrentScreen('Home');
    setSelectedLoanAmount(0);
  };




  // 5. 處理取消貸款
  const handleCancelLoan = () => {
    setCurrentScreen('Home');
    setSelectedLoanAmount(0); // 重置
  };

  // 登出
  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('Login');
  };



  // Helper: 取得當前使用者餘額
  const currentBalance = user?.name ? balances[user.name] : 0;

  // 渲染主內容
  const renderScreen = () => {
    switch (currentScreen) {
      case 'Login':
        return <LoginScreen />;
      case 'Home':
        return <HomeScreen onTopUp={handleTopUp} balance={currentBalance} />;
      case 'Consent':
        return <ConsentScreen onAgree={() => setCurrentScreen('LoanDetails')} onCancel={() => setCurrentScreen('Home')} />;
      case 'LoanDetails':
        return <LoanDetailsScreen onConfirm={handleConfirmLoan} user={user}/>;
      case 'Processing':
        return <ProcessingScreen processingStep={processingStep} />;
      case 'LoanConfirm':
        return (
          <LoanConfirmScreen
            amount={selectedLoanAmount}
            onConfirm={handleFinalConfirm}
            onCancel={handleCancelLoan}
          />
        );
      default:
        return <HomeScreen onTopUp={handleTopUp} balance={currentBalance} />;
    }
  };

  return (
    // 模擬手機外框和屏幕
    <div className="flex justify-center items-center h-screen bg-gray-200">
    {/* ✅ 根據是否為登入畫面動態修改樣式 */}
    {currentScreen === 'Login' ? (
      // 登入時 — 直接全屏顯示，沒有圓角、沒有邊框效果
      <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col justify-center items-center text-white p-6">
        {renderScreen()}
      </div>
    ) : (
      <div className="w-full max-w-sm h-full max-h-[850px] bg-gray-100 shadow-2xl rounded-2xl overflow-hidden relative flex flex-col">
        {/* 屏幕內容 */}
        <div className="flex-1 overflow-hidden relative">
          {/* 我們使用絕對定位來切換屏幕，
              這樣切換效果更像APP。
              但為簡單起見，我們先用條件渲染。
          */}
          {renderScreen()}
        </div>

        {/* 底部導航欄 (僅在主頁顯示) */}
        {currentScreen === 'Home' && (
          <div className="relative grid grid-cols-5 items-center bg-white h-20 rounded-t-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)] px-2 z-20">
            <IconGridItem icon={<IconSend className="h-6 w-6 text-gray-600" />} text="Transfer" />
            <IconGridItem icon={<IconScan className="h-6 w-6 text-gray-600" />} text="Scan" />

            {/* 中間的付款按鈕 */}
            <div className="flex flex-col items-center relative -top-6">
              <button className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg border-4 border-gray-100">
                <IconQrCode className="h-8 w-8 text-white" />
              </button>
              <p className="text-xs text-gray-600 mt-1">Payment</p>
            </div>

            <IconGridItem icon={<IconBus className="h-6 w-6 text-gray-600" />} text="Transport" />

            <button onClick={handleLogout} className="flex flex-col items-center p-1 focus:outline-none">
              <IconUser className="h-6 w-6 text-gray-600" />
              <p className="text-xs mt-1.5 text-center text-gray-700">Logout</p>
            </button>

          </div>
        )}

        {/* 增值彈窗 (全局) */}
        <TopUpModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSelectLoan={handleSelectLoan}
        />
      </div>
    )}
    </div>
  );
}