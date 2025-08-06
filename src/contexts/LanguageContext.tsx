import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLanguage, getLanguageFromUrl, updateUrlLanguage } from '../utils/language';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<SupportedLanguage>(getLanguageFromUrl());

  const setLanguage = (newLanguage: SupportedLanguage) => {
    setLanguageState(newLanguage);
    updateUrlLanguage(newLanguage);
  };

  useEffect(() => {
    // Listen for URL changes (back/forward navigation)
    const handlePopState = () => {
      setLanguageState(getLanguageFromUrl());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const t = (key: string): string => {
    return getTranslation(key, language);
  };

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translation function
function getTranslation(key: string, language: SupportedLanguage): string {
  const translations = getTranslations();
  // Type assertion to tell TypeScript that we know the structure
  const typedTranslations = translations as Record<SupportedLanguage, Record<string, string>>;
  return typedTranslations[language]?.[key] || typedTranslations.en[key] || key;
}

// Translation data - organized by language then by key
function getTranslations() {
  return {
    en: {
      // Common
      next: "Next",
      back: "Back", 
      done: "Done",
      skip: "Skip",
      cancel: "Cancel",
      
      // Age Group Screen
      "age.title": "What's your age group?",
      "age.under18": "Under 18",
      "age.19to24": "19-24",
      "age.25to34": "25-34", 
      "age.35plus": "35 and over",
      "age.preferNotToAnswer": "Prefer not to answer",
      
      // Gender Screen
      "gender.title": "How do you identify your gender?",
      "gender.male": "Male",
      "gender.female": "Female",
      "gender.nonBinary": "Non-binary",
      "gender.preferNotToSay": "Prefer not to answer",
      
      // Focus Screen
      "focus.title": "What has been your focus lately?",
      "focus.stress": "Reducing and managing stress",
      "focus.positive": "Cultivating a positive mindset", 
      "focus.selfLove": "Boosting self-love",
      "focus.connecting": "Connecting with others",
      "focus.productivity": "Improving productivity",
      
      // Confirmation Screen
      "confirmation.welcomeMessage": "Welcome!\nLet's find out how\nwe can help you!",
      
      // Testimonials Screen
      "testimonials.testimonial1Text": "It's an app I've been looking for all my life.",
      "testimonials.testimonial1Author": "t.m.s.d7d",
      "testimonials.testimonial2Text": "It has been a game changer for my mental health and mindfulness and brings me so much joy.",
      "testimonials.testimonial2Author": "Emma",
      "testimonials.testimonial3Text": "It is a mind blowing way and a different perspective on how you look at mental health as a whole.",
      "testimonials.testimonial3Author": "Lucy N",
      "testimonials.testimonial4Text": "Y'all should know dis the best wellness app ever.",
      "testimonials.testimonial4Author": "Anonymous",
      "testimonials.authorPrefix": "by",
      
      // Duck With Jar Screen
      "duckWithJar.title": "Quabble",
      "duckWithJar.subtitle": "10M+ mental wellness routines completed",
      
      // Mental Wellness Screens
      "mentalWellness1.title": "Consistent mental wellness is the key to staying balanced, resilient, and fulfilled in life!",
      "mentalWellness1.daysSundayShort": "S",
      "mentalWellness1.daysMondayShort": "M",
      "mentalWellness1.daysTuesdayShort": "T",
      "mentalWellness1.daysWednesdayShort": "W",
      "mentalWellness1.daysThursdayShort": "T",
      "mentalWellness1.daysFridayShort": "F",
      "mentalWellness1.daysSaturdayShort": "S",
      
      "mentalWellness2.statistic": "98% of regular users find Quabble helpful for managing their mental health",
      
      "mentalWellness3.proceedButton": "Proceed",
      "mentalWellness3.statistic": "10M+ mental wellness\nroutines completed",
      "mentalWellness3.signingInButton": "Signing in...",
      
      // Chart Screen
      "chart.title": "Stay motivated with personal insights to guide your wellness journey!",
      
      // Sign Up Screen
      "signUp.title": "Quabble",
      "signUp.subtitle": "Daily Mental Wellness with One Joyful App!",
      "signUp.termsText": "I agree to Quabble's Terms of Service and Privacy Policy",
      
      // Duck Naming Screen
      "duckNaming.title": "Meet your Quabble Duck! Do you want to name your duck?",
      "duckNaming.defaultName": "Waddles",
      "duckNaming.modalTitle": "Name your duck",
      "duckNaming.modalPlaceholder": "Enter duck name",
      
      // Tell Us Intro Screen
      "tellUsIntro.message": "Tell us a little about you so that we can personalize your Quabble experience.",
      "tellUsIntro.tapToStart": "Tap to start >>",
      
      // Routine Recommendation Screen
      "routineRecommendation.morningRoutineTitle": "Morning Routine",
      "routineRecommendation.eveningRoutineTitle": "Evening Routine",
      "routineRecommendation.checkIn": "Check-in",
      "routineRecommendation.moodDiary": "Mood Diary",
      "routineRecommendation.gratitudeJar": "Gratitude Jar",
      "routineRecommendation.changeText": "You can change this later",
      "routineRecommendation.okayButton": "Okay",
      
      // App Finale Screen
      "appFinale.statistic": "80% of regular users report they improved their mental health since they started using Quabble",
      "appFinale.testimonialAuthor": "Nat",
      "appFinale.testimonialText": "I really love Quabble, my therapist suggested it and it keeps me afloat during the week.",
      "appFinale.therapistRecommendedTitle": "Therapist-recommended",
      "appFinale.therapistText": "Quabble brings real wellness practices to daily life—backed by experts like our advisor, Dr. Jung Kim, Assist. Professor of Psychiatry at Harvard Medical School",
      "appFinale.moodDiaryTitle": "Mood Diary",
      "appFinale.moodDiaryText": "Simple, effective mood tracking to recognize patterns and triggers",
      "appFinale.pleasantActivitiesTitle": "Pleasant Activities",
      "appFinale.pleasantActivitiesText": "Plan and engage in activities that bring you joy",
      
      // Wake Up Screen
      "wakeUp.title": "When do you usually wake up?",
      "wakeUp.modalTitle": "Select Time",
      
      // Good Night Screen
      "goodNight.title": "When do you usually go to bed?",
      "goodNight.modalTitle": "Select Time",
      
      // Mental Wellness Question 1
      "mentalWellnessQ1.title": "How are you doing mentally these days?",
      "mentalWellnessQ1.optionGreat": "Great",
      "mentalWellnessQ1.optionGood": "Good",
      "mentalWellnessQ1.optionNotVeryGood": "Not very good",
      "mentalWellnessQ1.optionPoor": "Poor",
      
      // Ask Feeling Screen
      "askFeelingScreen.title": "How have you been feeling lately?",
      "askFeelingScreen.subtitle": "Choose all that apply",
      "askFeelingScreen.optionExcited": "Excited",
      "askFeelingScreen.optionHappy": "Happy",
      "askFeelingScreen.optionRelaxed": "Relaxed",
      "askFeelingScreen.optionContent": "Content",
      "askFeelingScreen.optionLonely": "Lonely",
      "askFeelingScreen.optionStressed": "Stressed",
      "askFeelingScreen.optionAnxious": "Anxious",
      "askFeelingScreen.optionDepressed": "Depressed",
      "askFeelingScreen.optionPanicky": "Panicky",
      
      // Ask Interests Page
      "askInterests.title": "Which of the following are you interested in practicing?",
      "askInterests.subtitle": "Choose all that apply",
      "askInterests.breathing": "Breathing exercises",
      "askInterests.moodTracking": "Mood tracking",
      "askInterests.journaling": "Journaling",
      "askInterests.selfLove": "Self-love",
      "askInterests.gratitude": "Gratitude practices",
      "askInterests.meditation": "Meditation",
      "askInterests.physical": "Physical activities",
      "askInterests.sleep": "Better sleep",
      "askInterests.productivity": "Productivity",
      
      // Customize Routine Screen
      "customizeRoutine.title": "Customizing your mental wellness routine",
      "customizeRoutine.percentage": "%",
      
      // Recommended Routine Intro Screen
      "recommendedRoutineIntro.message": "Here is your recommended routine",
      "recommendedRoutineIntro.checkItOutButton": "Check it out >>",
      
      // Mind Quote Screen
      "mindQuote.quote": "A healthy mind is the foundation\nof a successful, full,\nand meaningful life.",
      
      // We Can Help Screen
      "weCanHelp.messageGeneral": "While professional care is essential, Quabble is here to offer support and walk alongside you in your mental health journey.",
      "weCanHelp.messagePersonalized": "We're here to help you through this tough time, and \"{achievement}\" is something you can achieve with us.",
      
      // Why Quabble Screen
      "whyQuabble.title": "Here's why Quabble might be just what you need.",
      
      // Stats Screen
      "stats.title": "98% of our regular users reported Quabble helps managing their mental health",
      
      // Improved Proof Screen
      "improvedProof.title": "87% regular users report their mental health has improved since they started using Quabble",
      
      // Let's Find Out Screen
      "letsFindOut.message": "Welcome!\nLet's find out how\nwe can help you",
      
      // Why So Many Screen
      "whySoMany.message": "So, why do so many people find Quabble so helpful?",
      
      // Quabble Tools Screen
      "quabbleTools.title": "Quabble has the right tools for everyone",
      "quabbleTools.subtitle": "18 different workouts across 6 categories available now and more to come!",
      "quabbleTools.moodDiary": "Mood Diary",
      "quabbleTools.meditation": "Meditation",
      "quabbleTools.bambooForest": "Bamboo Forest",
      "quabbleTools.oneMinBreathing": "1min Breathing",
      "quabbleTools.watermelonTaiChi": "Watermelon Tai Chi",
      "quabbleTools.proudDandelion": "Proud Dandelion",
      "quabbleTools.gratitudeJar": "Gratitude Jar",
      "quabbleTools.worryBox": "Worry Box",
      "quabbleTools.treasureBox": "Treasure Box",
      "quabbleTools.safePlace": "Safe Place",
      "quabbleTools.moonlight": "Moonlight",
      "quabbleTools.outdoorWalk": "Outdoor Walk",
      "quabbleTools.fiveFourThreeTwoOne": "54321",
      "quabbleTools.pleasantActivities": "Pleasant Activities",
      "quabbleTools.thankYou": "Thank You",
      "quabbleTools.dearSelf": "Dear Self",
      "quabbleTools.smartGoals": "Smart Goals",
      "quabbleTools.mindfulEating": "Mindful Eating",
      
      // Radar Screen
      "radar.title": "Quabble takes a holistic approach to mental health",
      "radar.subtitle": "Our mind and body are deeply connected, and lasting mental health can only come from caring for all areas of life.",
      "radar.radarDescription": "Measure your progress with our Wellness Radar!",
      
      // Routine Intro Screen
      "routineIntro.title": "It delivers bite-sized, personalized daily routines to help you build sustainable habits",
      "routineIntro.morningText": "Start your morning with a positive mindset",
      "routineIntro.eveningText": "End your day with a kind reflection",
      "routineIntro.readyButton": "I'm Ready",
      
      // Testimonials V2 Screen
      "testimonialsV2.testimonial1Text": "It's an app I've been looking for all my life.",
      "testimonialsV2.testimonial1Author": "t.m.s.d7d",
      "testimonialsV2.testimonial2Text": "It has been a game changer for my mental health and mindfulness and brings me so much joy.",
      "testimonialsV2.testimonial2Author": "Emma",
      "testimonialsV2.testimonial3Text": "It is a mind blowing way and a different perspective on how you look at mental health as a whole.",
      "testimonialsV2.testimonial3Author": "Lucy N",
      "testimonialsV2.testimonial4Text": "Y'all should know dis the best wellness app ever.",
      "testimonialsV2.testimonial4Author": "Daryn T",
      "testimonialsV2.testimonial5Text": "It's not a game pretending to be a mental health tool; it's a genuine mental health tool that happens to be fun and adorable.",
      "testimonialsV2.testimonial5Author": "Katherine",
      "testimonialsV2.authorPrefix": "by",
      
      // Are You Ready Screen
      "areYouReady.title": "Are you ready for setting up your personalized routine and start your journey?",
      "areYouReady.yesButton": "Yes",
      "areYouReady.maybeLaterButton": "Maybe later",
      
      // Therapist Screen
      "therapist.title": "It's therapist-recommended",
      "therapist.subtitle": "Quabble is backed by licensed therapists and mental health professionals",
      
      // Support System Screen
      "support.title": "How strong is your support system?",
      "support.subtitle": "Family, friends, teachers, peers, etc.",
      "support.excellent": "Excellent",
      "support.good": "Good", 
      "support.limited": "Limited",
      "support.poor": "Poor",
      
      // Mental Health Issue Screen  
      "mentalIssue.title": "Have you been diagnosed with a mental health condition?",
      "mentalIssue.yes": "Yes",
      "mentalIssue.no": "No",
      
      // What Dealing With Screen
      "dealingWith.title": "What are you dealing with?",
      "dealingWith.depression": "Depression",
      "dealingWith.anxiety": "Anxiety", 
      "dealingWith.panicAttacks": "Panic attacks",
      "dealingWith.ocd": "OCD",
      "dealingWith.ptsd": "PTSD",
      "dealingWith.bipolar": "Bipolar disorder",
      "dealingWith.eatingDisorder": "Eating disorder",
      "dealingWith.other": "Other",
      
      // What Did You Try Screen
      "whatTry.title": "What have you tried before?",
      "whatTry.therapy": "Therapy",
      "whatTry.medication": "Medication",
      "whatTry.otherApps": "Other apps",
      "whatTry.exercise": "Exercise",
      "whatTry.meditation": "Meditation", 
      "whatTry.nothing": "Nothing",
      "whatTry.other": "Other",
      
      // What Felt Missing Screen
      "whatMissing.title": "What felt missing?",
      "whatMissing.tooExpensive": "Too expensive",
      "whatMissing.hardToAccess": "Hard to access",
      "whatMissing.notPersonalized": "Not personalized",
      "whatMissing.lackOfProgress": "Lack of progress",
      "whatMissing.timeConsuming": "Time consuming",
      "whatMissing.other": "Other",
      
      // Where Did You Hear Screen
      "whereHear.title": "Where did you\nfirst hear about us?",
      "whereHear.appSearch": "App search",
      "whereHear.socialMedia": "Social Media Ad", 
      "whereHear.friendFamily": "Friend or Family",
      "whereHear.other": "Other",
      
      // Ask Feeling V2 Screen
      "askFeeling.title": "How have you been feeling lately?",
      "askFeeling.difficult": "It's been difficult recently",
      "askFeeling.ongoing": "I have ongoing challenges", 
      "askFeeling.okay": "I'm doing okay",
      
      // Sorry To Heart Screen
      "sorry.title": "We're sorry to hear that",
      "sorry.subtitle": "Let's see what we can do to help",
      "sorry.depression": "Depression",
      "sorry.anxiety": "Anxiety",
      "sorry.stress": "Stress",
      "sorry.loneliness": "Loneliness",
      "sorry.other": "Other",
      
      // Achievement Screen
      "achievement.title": "What would you like to achieve?",
      "achievement.feelBetter": "Feel better about myself",
      "achievement.manageAnxiety": "Manage anxiety", 
      "achievement.improveRelationships": "Improve relationships",
      "achievement.betterSleep": "Sleep better",
      "achievement.moreConfident": "Be more confident",
      "achievement.other": "Other",
      "achievement.titleQuestion": "What do you want to\nachieve with us?",
      "achievement.takeCare": "Take care of my mental health",
      "achievement.managingStress": "Managing daily stress",
      "achievement.positiveMindset": "Cultivating a positive mindset",
      "achievement.boostingSelfLove": "Boosting self-love",
      "achievement.connectingOthers": "Connecting with others",
      "achievement.improvingProductivity": "Improving productivity"
    },
    
    kr: {
      // Common
      next: "다음",
      back: "뒤로",
      done: "완료", 
      skip: "건너뛰기",
      
      // Age Group Screen
      "age.title": "연령대가 어떻게 되시나요?",
      "age.under18": "18세 미만",
      "age.19to24": "19-24세",
      "age.25to34": "25-34세",
      "age.35plus": "35세 이상", 
      "age.preferNotToAnswer": "답변하지 않음",
      
      // Gender Screen
      "gender.title": "성별이 어떻게 되시나요?",
      "gender.male": "남성",
      "gender.female": "여성", 
      "gender.nonBinary": "논바이너리",
      "gender.preferNotToSay": "답변하지 않음",
      
      // Focus Screen
      "focus.title": "어떤 것에 집중하고 싶으신가요?",
      "focus.anxiety": "불안감",
      "focus.depression": "우울감",
      "focus.stress": "스트레스 관리",
      "focus.sleep": "수면 개선",
      "focus.selfEsteem": "자존감", 
      "focus.relationships": "인간관계",
      
      // Confirmation Screen
      "confirmation.welcomeMessage": "환영합니다!\n저희가 어떻게 도움을\n드릴 수 있는지 알아보겠습니다!",
      
      // Mental Wellness 3 Screen
      "mentalWellness3.proceedButton": "진행",
      "mentalWellness3.statistic": "1천만 회 이상의\n정신건강 루틴 완료",
      "mentalWellness3.signingInButton": "로그인 중...",
      
      // Therapist Screen
      "therapist.title": "전문가가 추천하는",
      "therapist.subtitle": "Quabble은 정신건강 전문의와 치료사들이 지지하는 앱입니다",
      
      // Support System Screen
      "support.title": "지지체계가 얼마나 튼튼한가요?",
      "support.subtitle": "가족, 친구, 선생님, 동료 등",
      "support.excellent": "매우 좋음",
      "support.good": "좋음",
      "support.limited": "제한적",
      "support.poor": "부족함",
      
      // Mental Health Issue Screen
      "mentalIssue.title": "정신건강 질환 진단을 받으신 적이 있나요?",
      "mentalIssue.yes": "예",
      "mentalIssue.no": "아니오",
      
      // What Dealing With Screen  
      "dealingWith.title": "현재 어떤 어려움을 겪고 계신가요?",
      "dealingWith.depression": "우울증",
      "dealingWith.anxiety": "불안장애",
      "dealingWith.panicAttacks": "공황발작", 
      "dealingWith.ocd": "강박장애",
      "dealingWith.ptsd": "외상후스트레스장애",
      "dealingWith.bipolar": "양극성장애",
      "dealingWith.eatingDisorder": "섭식장애",
      "dealingWith.other": "기타",
      
      // What Did You Try Screen
      "whatTry.title": "이전에 무엇을 시도해보셨나요?",
      "whatTry.therapy": "심리치료",
      "whatTry.medication": "약물치료",
      "whatTry.otherApps": "다른 앱",
      "whatTry.exercise": "운동",
      "whatTry.meditation": "명상",
      "whatTry.nothing": "없음", 
      "whatTry.other": "기타",
      
      // What Felt Missing Screen
      "whatMissing.title": "무엇이 아쉬웠나요?",
      "whatMissing.tooExpensive": "너무 비쌈",
      "whatMissing.hardToAccess": "접근하기 어려움",
      "whatMissing.notPersonalized": "개인화되지 않음",
      "whatMissing.lackOfProgress": "진전 부족",
      "whatMissing.timeConsuming": "시간이 많이 걸림",
      "whatMissing.other": "기타",
      
      // Where Did You Hear Screen
      "whereHear.title": "어디서 저희를\n처음 알게 되셨나요?",
      "whereHear.appSearch": "앱 검색",
      "whereHear.socialMedia": "소셜미디어 광고",
      "whereHear.friendFamily": "지인 추천",
      "whereHear.other": "기타",
      
      // Ask Feeling V2 Screen
      "askFeeling.title": "최근 기분이 어떠셨나요?",
      "askFeeling.difficult": "최근 힘들었어요",
      "askFeeling.ongoing": "지속적인 어려움이 있어요",
      "askFeeling.okay": "괜찮아요",
      
      // Sorry To Heart Screen
      "sorry.title": "안타깝게 생각합니다",
      "sorry.subtitle": "도움을 드릴 수 있는 방법을 찾아보겠습니다",
      "sorry.depression": "우울감",
      "sorry.anxiety": "불안감", 
      "sorry.stress": "스트레스",
      "sorry.loneliness": "외로움",
      "sorry.other": "기타",
      
      // Achievement Screen
      "achievement.title": "무엇을 이루고 싶으신가요?",
      "achievement.feelBetter": "자신에 대해 더 좋게 느끼기",
      "achievement.manageAnxiety": "불안감 관리",
      "achievement.improveRelationships": "인간관계 개선",
      "achievement.betterSleep": "더 나은 수면",
      "achievement.moreConfident": "더 자신감 있기", 
      "achievement.other": "기타",
      "achievement.titleQuestion": "저희와 함께\n무엇을 이루고 싶으신가요?",
      "achievement.takeCare": "정신건강 관리하기",
      "achievement.managingStress": "일상 스트레스 관리하기",
      "achievement.positiveMindset": "긍정적인 마음가짐 기르기",
      "achievement.boostingSelfLove": "자기사랑 키우기",
      "achievement.connectingOthers": "다른 사람들과 소통하기",
      "achievement.improvingProductivity": "생산성 향상시키기",
      
      // Let's Find Out Screen
      "letsFindOut.message": "환영합니다!\n저희가 어떻게\n도움을 드릴 수 있는지 알아보겠습니다",
      
      // Mind Quote Screen
      "mindQuote.quote": "건강한 마음은 성공적이고\n풍요로우며 의미 있는\n삶의 기초입니다."
    },
    
    jp: {
      // Common  
      next: "次へ",
      back: "戻る",
      done: "完了",
      skip: "スキップ",
      
      // Age Group Screen
      "age.title": "年齢層を教えてください",
      "age.under18": "18歳未満", 
      "age.19to24": "19-24歳",
      "age.25to34": "25-34歳",
      "age.35plus": "35歳以上",
      "age.preferNotToAnswer": "回答しない",
      
      // Gender Screen
      "gender.title": "性別を教えてください",
      "gender.male": "男性",
      "gender.female": "女性",
      "gender.nonBinary": "ノンバイナリー", 
      "gender.preferNotToSay": "回答しない",
      
      // Focus Screen
      "focus.title": "何に焦点を当てたいですか？",
      "focus.anxiety": "不安",
      "focus.depression": "うつ",
      "focus.stress": "ストレス管理",
      "focus.sleep": "睡眠改善",
      "focus.selfEsteem": "自尊心",
      "focus.relationships": "人間関係",
      
      // Confirmation Screen
      "confirmation.welcomeMessage": "ようこそ！\nどのようにお手伝い\nできるか見つけましょう！",
      
      // Mental Wellness 3 Screen
      "mentalWellness3.proceedButton": "進む",
      "mentalWellness3.statistic": "1000万回以上の\nメンタルウェルネスルーチンが完了",
      "mentalWellness3.signingInButton": "サインイン中...",
      
      // Therapist Screen
      "therapist.title": "セラピスト推奨",
      "therapist.subtitle": "Quabbleは認定セラピストとメンタルヘルス専門家によってサポートされています",
      
      // Support System Screen
      "support.title": "サポートシステムはどの程度強いですか？",
      "support.subtitle": "家族、友人、教師、仲間など", 
      "support.excellent": "優秀",
      "support.good": "良い",
      "support.limited": "限定的",
      "support.poor": "不十分",
      
      // Mental Health Issue Screen
      "mentalIssue.title": "メンタルヘルスの診断を受けたことがありますか？",
      "mentalIssue.yes": "はい",
      "mentalIssue.no": "いいえ",
      
      // What Dealing With Screen
      "dealingWith.title": "何に対処していますか？",
      "dealingWith.depression": "うつ病", 
      "dealingWith.anxiety": "不安障害",
      "dealingWith.panicAttacks": "パニック発作",
      "dealingWith.ocd": "強迫性障害",
      "dealingWith.ptsd": "PTSD", 
      "dealingWith.bipolar": "双極性障害",
      "dealingWith.eatingDisorder": "摂食障害",
      "dealingWith.other": "その他",
      
      // What Did You Try Screen
      "whatTry.title": "以前に何を試しましたか？",
      "whatTry.therapy": "セラピー",
      "whatTry.medication": "薬物療法", 
      "whatTry.otherApps": "他のアプリ",
      "whatTry.exercise": "運動",
      "whatTry.meditation": "瞑想",
      "whatTry.nothing": "何もしていない",
      "whatTry.other": "その他",
      
      // What Felt Missing Screen
      "whatMissing.title": "何が足りないと感じましたか？",
      "whatMissing.tooExpensive": "高すぎる",
      "whatMissing.hardToAccess": "アクセスが困難",
      "whatMissing.notPersonalized": "個人化されていない",
      "whatMissing.lackOfProgress": "進歩の欠如",
      "whatMissing.timeConsuming": "時間がかかる",
      "whatMissing.other": "その他",
      
      // Where Did You Hear Screen
      "whereHear.title": "どこで私たちを\n最初に知りましたか？",
      "whereHear.appSearch": "アプリ検索",
      "whereHear.socialMedia": "ソーシャルメディア広告",
      "whereHear.friendFamily": "友人や家族",
      "whereHear.other": "その他",
      
      // Ask Feeling V2 Screen  
      "askFeeling.title": "最近の気分はいかがですか？",
      "askFeeling.difficult": "最近つらいです",
      "askFeeling.ongoing": "継続的な困難があります", 
      "askFeeling.okay": "大丈夫です",
      
      // Sorry To Heart Screen
      "sorry.title": "それは残念です",
      "sorry.subtitle": "私たちにできることを見つけましょう",
      "sorry.depression": "うつ",
      "sorry.anxiety": "不安",
      "sorry.stress": "ストレス",
      "sorry.loneliness": "孤独感",
      "sorry.other": "その他",
      
      // Achievement Screen
      "achievement.title": "何を達成したいですか？",
      "achievement.feelBetter": "自分をより良く感じる",
      "achievement.manageAnxiety": "不安の管理",
      "achievement.improveRelationships": "人間関係の改善",
      "achievement.betterSleep": "より良い睡眠",
      "achievement.moreConfident": "より自信を持つ",
      "achievement.other": "その他",
      "achievement.titleQuestion": "私たちと一緒に\n何を達成したいですか？",
      "achievement.takeCare": "メンタルヘルスのケア",
      "achievement.managingStress": "日常のストレス管理",
      "achievement.positiveMindset": "ポジティブなマインドセット",
      "achievement.boostingSelfLove": "自己愛の向上",
      "achievement.connectingOthers": "他者とのつながり",
      "achievement.improvingProductivity": "生産性の向上",
      
      // Let's Find Out Screen
      "letsFindOut.message": "ようこそ！\nどのようにお手伝い\nできるか見つけましょう",
      
      // Mind Quote Screen
      "mindQuote.quote": "健康な心は成功した\n充実した意味のある\n人生の基盤です。"
    }
  };
}