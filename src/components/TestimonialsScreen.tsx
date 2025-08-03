import React, { useEffect } from 'react';
import { sendToFlutter } from '../lib/quabbleFlutterChannel';

interface TestimonialsScreenProps {
  onNext: () => void;
}
export function TestimonialsScreen({
  onNext
}: TestimonialsScreenProps) {

  useEffect(() => {
    // Function to be called when the component mounts
    sendToFlutter('{"event":"v2_5_7_onboarding_A::onboarding:page_1_4:landing"}');
  }, []); 

  const testimonials = [{
    stars: 5,
    text: "It's an app I've been looking for all my life.",
    author: 't.m.s.d7d'
  }, {
    stars: 5,
    text: 'It has been a game changer for my mental health and mindfulness and brings me so much joy.',
    author: 'Emma'
  }, {
    stars: 5,
    text: 'It is a mind blowing way and a different perspective on how you look at mental health as a whole.',
    author: 'Lucy N'
  }, {
    stars: 5,
    text: "Y'all should know dis the best wellness app ever.",
    author: 'Anonymous'
  }];
  return <>
    <style>{`
      .scrollable-options::-webkit-scrollbar {
        display: none;
      }
      .touch-target {
        min-height: 48px;
        min-width: 48px;
      }
    `}</style>
    <div className="flex flex-col w-full h-screen bg-[#faf7f0] text-gray-800 px-4 relative overflow-hidden">
      {/* Fixed Images */}
      <div 
        className="flex flex-col items-center flex-shrink-0"
        style={{ 
          marginTop: 'max(4rem, env(safe-area-inset-top))',
          marginBottom: '2vh'
        }}
      >
        <div 
          className="flex justify-center w-full"
          style={{ 
            height: '20vh',
            marginBottom: '2vh'
          }}
        >
          <img 
            src="/images/7-duck.png" 
            alt="Duck illustration" 
            className="w-full max-w-xs sm:max-w-sm lg:max-w-md h-full object-contain" 
          />
        </div>
        <div 
          className="flex justify-center w-full"
          style={{ 
            height: '6vh',
            marginBottom: '2vh'
          }}
        >
          <img 
            src="/images/7-reviews.png" 
            alt="Review illustration" 
            className="w-full max-w-xs sm:max-w-sm lg:max-w-md h-full object-contain" 
          />
        </div>
      </div>
      
      {/* Scrollable Reviews */}
      <div 
        className="flex-1 overflow-y-auto px-4 md:px-0 scrollable-options" 
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          paddingBottom: '12vh' // Space for fixed button
        }}
      >
        <div className="w-full max-w-md mx-auto mt-1 space-y-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl border border-gray-200"
              style={{ 
                padding: '2vh 2.5vh'
              }}
            >
               <div 
                 className="flex"
                 style={{ marginBottom: '1.5vh' }}
               >
                 {[...Array(testimonial.stars)].map((_, i) => (
                   <svg 
                     key={i} 
                     viewBox="0 0 24 24" 
                     fill="#F9BF29" 
                     xmlns="http://www.w3.org/2000/svg"
                     style={{ 
                       width: '2.5vh', 
                       height: '2.5vh',
                       marginRight: '0.2vh'
                     }}
                   >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#E8A818" strokeWidth="1" />
                   </svg>
                 ))}
              </div>
               <p 
                 className="text-gray-800 font-normal"
                 style={{ 
                   fontSize: '1.9vh',
                   marginBottom: '1.5vh'
                 }}
               >
                {testimonial.text}
              </p>
              <p 
                className="text-gray-600"
                style={{ fontSize: '1.5vh' }}
              >
                by {testimonial.author}
              </p>
             </div>
          ))}
        </div>
      </div>
      
      {/* Fixed Next Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#faf7f0] z-50" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
        <div className="p-5 sm:p-6">
          <div className="max-w-md mx-auto">
            <button
              className="w-4/5 mx-auto block px-7 rounded-full text-white text-center font-normal bg-black hover:bg-gray-800 transition-colors shadow-lg touch-target"
              style={{ 
                height: '7.5vh', // Slightly bigger button height (same as option buttons)
                fontSize: '2.5vh' // 1/40 of viewport height
              }}
              onClick={onNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </>;
}