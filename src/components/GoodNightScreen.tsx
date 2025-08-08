import React, { useState, useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';

interface GoodNightScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function GoodNightScreen({
  onBack,
  onNext
}: GoodNightScreenProps) {
  const [bedTime, setBedTime] = useState('10:00 PM');
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedHour, setSelectedHour] = useState('10');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('PM');

  useEffect(() => {
    // Send the new event for onboarding survey
    sendToFlutter(JSON.stringify({
      "event": "view_ob_survey_go_to_bed",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []);

  const handleOpenTimeModal = () => {
    // Parse current time to set modal defaults
    const [time, period] = bedTime.split(' ');
    const [hours, minutes] = time.split(':');
    setSelectedHour(hours);
    setSelectedMinute(minutes);
    setSelectedPeriod(period);
    setShowTimeModal(true);
    
    // Send click alarm time event
    // sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:page_7:click_alarm_time"}');
  };

  const handleTimeConfirm = () => {
    const newTime = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
    setBedTime(newTime);
    setShowTimeModal(false);
  };

  const handleTimeCancel = () => {
    setShowTimeModal(false);
  };

  // Function to convert time string to DateTime format
  const formatToDateTime = (timeString: string): string => {
    try {
      // Parse the time string (e.g., "10:00 PM")
      const [time, period] = timeString.split(' ');
      const [hours, minutes] = time.split(':');
      
      let hour24 = parseInt(hours, 10);
      if (period?.toUpperCase() === 'PM' && hour24 !== 12) {
        hour24 += 12;
      } else if (period?.toUpperCase() === 'AM' && hour24 === 12) {
        hour24 = 0;
      }
      
      // Create date with current date and parsed time
      const date = new Date();
      date.setHours(hour24, parseInt(minutes, 10), 0, 0);
      
      // Format as "YYYY-MM-DD HH:mm:ss.000"
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hour = String(date.getHours()).padStart(2, '0');
      const minute = String(date.getMinutes()).padStart(2, '0');
      
      return `${year}-${month}-${day} ${hour}:${minute}:00.000`;
    } catch (error) {
      // Fallback if parsing fails
      const date = new Date();
      date.setHours(22, 0, 0, 0); // Default to 10:00 PM
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day} 22:00:00.000`;
    }
  };

  return (
    <>
    <div className="flex flex-col w-full min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/18-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Overlay content */}
      <div className="relative z-10 flex flex-col w-full min-h-screen px-4">
        {/* Header */}
        <div className="flex items-center justify-between mt-16 mb-8">
          <button className="p-2 text-white" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex-1"></div>
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center flex-1 justify-center">
          {/* Question text */}
          <div className="text-center mb-6 px-4 mt-48">
            <h1 className="text-2xl font-medium text-white leading-tight">
              When do you usually<br />
              go to bed?
            </h1>
          </div>

          {/* Time button */}
          <div className="w-full max-w-36 mb-16">
            <button
              onClick={handleOpenTimeModal}
              className="w-full bg-white rounded-3xl py-4 px-6 text-center hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl font-medium text-gray-800">
                {bedTime}
              </span>
            </button>
          </div>
        </div>

        {/* Next Button - same format as FocusScreen */}
        <div className="fixed bottom-0 left-0 right-0 z-50" 
             style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <div className="p-5 sm:p-6">
            <div className="max-w-md mx-auto">
              <button
                className="w-4/5 mx-auto block px-7 rounded-full text-white text-center font-normal bg-black hover:bg-gray-800 transition-colors shadow-lg touch-target"
                style={{ 
                  height: '7.5vh', // Slightly bigger button height (same as option buttons)
                  fontSize: '2.5vh' // 1/40 of viewport height
                }}
                onClick={() => {
                  // Send click next event with bed time
                  sendToFlutter(JSON.stringify({
                    "event": "click_next_ob_survey_go_to_bed",
                    "eventProperties": {
                      "onboarding_version": 4.0,
                      "survey_go_to_bed": bedTime
                    }
                  }));
                  onNext();
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Time Selector Modal */}
      {showTimeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white max-w-sm w-full mx-4 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6">
              <button onClick={handleTimeCancel} className="text-gray-500 font-medium">
                Cancel
              </button>
              <h3 className="text-lg font-medium text-gray-800">Select Time</h3>
              <button onClick={handleTimeConfirm} className="text-blue-500 font-medium">
                Done
              </button>
            </div>
            
            <div className="flex justify-center items-center gap-4">
              {/* Hour Selector */}
              <select
                value={selectedHour}
                onChange={(e) => setSelectedHour(e.target.value)}
                className="text-2xl font-medium bg-gray-100 rounded-lg p-3 text-center min-w-[80px]"
              >
                {Array.from({length: 12}, (_, i) => {
                  const hour = String(i + 1).padStart(2, '0');
                  return <option key={hour} value={hour}>{hour}</option>;
                })}
              </select>
              
              <span className="text-2xl font-medium text-gray-800">:</span>
              
              {/* Minute Selector */}
              <select
                value={selectedMinute}
                onChange={(e) => setSelectedMinute(e.target.value)}
                className="text-2xl font-medium bg-gray-100 rounded-lg p-3 text-center min-w-[80px]"
              >
                {Array.from({length: 60}, (_, i) => {
                  const minute = String(i).padStart(2, '0');
                  return <option key={minute} value={minute}>{minute}</option>;
                })}
              </select>
              
              {/* AM/PM Selector */}
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="text-2xl font-medium bg-gray-100 rounded-lg p-3 text-center min-w-[80px]"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
    
    <style>{`
      .touch-target {
        min-height: 48px;
        min-width: 48px;
      }
    `}</style>
    </>
  );
} 