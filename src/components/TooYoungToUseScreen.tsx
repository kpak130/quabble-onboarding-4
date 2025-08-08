import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';

export function TooYoungToUseScreen() {

  useEffect(() => {
    sendToFlutter(JSON.stringify({
      "event": "view_ob_too_young_screen",
      "eventProperties": {
        "onboarding_version": 4.0
      }
    }));
  }, []);

  return (
    <div className="flex flex-col w-full h-screen text-gray-800 relative overflow-hidden" style={{ backgroundColor: '#F8EFE0' }}>
      {/* Status bar area */}
      <div className="flex justify-between items-center px-6 pt-4 pb-2">
        <span className="text-black font-medium">9:41</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <svg width="18" height="12" viewBox="0 0 24 24" fill="none" className="ml-2">
            <path d="M2 17h20v2H2v-2zm1.15-4.05L4 11.47l.85 1.48L6.3 12l-1.45-.95L3.4 12l1.45-.95L4 9.57l-.85 1.48zm5.7 0L9.7 11.47l.85 1.48L12 12l-1.45-.95L9.1 12l1.45-.95L9.7 9.57l-.85 1.48zm5.7 0L15.4 11.47l.85 1.48L17.7 12l-1.45-.95L14.8 12l1.45-.95L15.4 9.57l-.85 1.48z" fill="black"/>
          </svg>
          <div className="w-6 h-3 border border-black rounded-sm">
            <div className="w-full h-full bg-black rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1 px-8 pb-16">
        {/* Title */}
        <div className="text-center mb-6 max-w-sm">
          <h1 className="font-medium mb-6" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(6vw, 2.25rem)',
            lineHeight: '1.2'
          }}>
            Quabble is for users aged 13 and up
          </h1>
          <div className="leading-relaxed" style={{ 
            color: '#4C4A3C',
            fontSize: 'min(4vw, 1rem)'
          }}>
            <p className="mb-4">Thanks for your interest!<br/>Please come back when you're old<br />enough. We'll be here waiting. 💛</p>
          </div>
        </div>

        {/* Duck illustration */}
        <div className="flex items-center justify-center mb-12">
          <img
            src="/images/too-young-duck.png"
            alt="Too Young Duck Illustration"
            className="w-full h-auto object-contain"
            style={{ 
              maxWidth: 'min(80vw, 400px)',
              maxHeight: 'min(40vh, 350px)'
            }}
          />
        </div>

        {/* Support text */}
        <div className="text-center">
          <p style={{ 
            color: '#4C4A3C',
            fontSize: 'min(3.5vw, 0.875rem)'
          }}>
            Do you need a support? <span className="underline">Contact us</span>
          </p>
        </div>
      </div>
    </div>
  );
}