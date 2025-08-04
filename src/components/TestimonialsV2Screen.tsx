import { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';

interface TestimonialsV2ScreenProps {
  onNext: () => void;
}

export function TestimonialsV2Screen({
  onNext
}: TestimonialsV2ScreenProps) {

  useEffect(() => {
    // Function to be called when the component mounts
    sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:testimonials_v2:landing"}');
  }, []); 

  const testimonials = [
    {
      text: "It's an app I've been looking for all my life.",
      author: "t.m.s.d7d"
    },
    {
      text: "It has been a game changer for my mental health and mindfulness and brings me so much joy.",
      author: "Emma"
    },
    {
      text: "It is a mind blowing way and a different perspective on how you look at mental health as a whole.",
      author: "Lucy N"
    },
    {
      text: "Y'all should know dis the best wellness app ever.",
      author: "Daryn T"
    },
    {
      text: "It's not a game pretending to be a mental health tool; it's a genuine mental health tool that happens to be fun and adorable.",
      author: "Katherine"
    }
  ];

  const renderStars = () => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="text-yellow-400 text-sm">★</span>
        ))}
      </div>
    );
  };

  return <>
    <div 
      className="flex flex-col w-full h-screen text-gray-800 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/testimonial-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Content Container - starts at 5% from top */}
      <div className="flex flex-col items-center px-5 sm:px-6" style={{ paddingTop: '5vh' }}>
        {/* Progress dots */}
        <div className="flex space-x-2 mb-8 sm:mb-12">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <div className="w-2 h-2 rounded-full bg-gray-800"></div>
        </div>
        
        {/* Rating Section */}
        {/* <div className="flex flex-col items-center mb-8 sm:mb-12">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-white text-3xl font-bold">4.8</span>
          </div>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, index) => (
              <span key={index} className="text-yellow-400 text-lg">★</span>
            ))}
          </div>
        </div> */}
        
        {/* Testimonials Container */}
        <div 
          className="flex-1 w-full max-w-sm space-y-4 overflow-y-auto"
          style={{ 
            paddingBottom: '8rem' // Space for fixed button
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 shadow-lg">
              {renderStars()}
              <p className="text-gray-800 text-sm font-normal leading-relaxed mt-2 mb-3">
                {testimonial.text}
              </p>
              <p className="text-gray-500 text-xs">
                by {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Next Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-transparent z-50" 
           style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="p-5 sm:p-6">
          <div className="max-w-md mx-auto">
            <button
              className="w-4/5 mx-auto block px-7 rounded-full text-white text-center font-normal bg-black hover:bg-gray-800 transition-colors shadow-lg touch-target"
              style={{ 
                height: '7.5vh',
                fontSize: '2.5vh'
              }}
              onClick={() => {
                sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:testimonials_v2:click_next"}');
                onNext();
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <style>{`
      .touch-target {
        min-height: 48px;
        min-width: 48px;
      }
      
      @media (max-width: 375px) {
        .text-3xl { font-size: 1.875rem; }
        .text-lg { font-size: 1.125rem; }
        .text-sm { font-size: 0.875rem; }
        .text-xs { font-size: 0.75rem; }
      }
      
      @media (max-height: 667px) {
        .mb-8 { margin-bottom: 1.5rem; }
        .mb-12 { margin-bottom: 2rem; }
      }
      
      @media (min-width: 768px) {
        .text-3xl { font-size: 2.25rem; }
        .text-lg { font-size: 1.25rem; }
      }
    `}</style>
  </>;
}