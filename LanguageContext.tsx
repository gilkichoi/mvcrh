import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'EN' | 'SW';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, defaultText?: string) => string;
  tText: (text: string) => string;
}

const swahiliTranslations: Record<string, string> = {
  // Nav & Header
  'Home': 'Nyumbani',
  'About Us': 'Kuhusu Sisi',
  'Departments': 'Idara',
  'Services': 'Huduma',
  'News': 'Habari',
  'Campus Map': 'Ramani ya Hospitali',
  'Health Blog': 'Blogu ya Afya',
  'SHA Info': 'Taarifa za SHA',
  'Resources': 'Rasilimali',
  'Contact': 'Mawasiliano',
  'Book Now': 'Weka Miadi',
  'Book Consultation': 'Weka Miadi ya Daktari',
  'Emergency': 'Dharura',
  'Emergency: +254 43 203 0746': 'Dharura: +254 43 203 0746',
  'Dashboard': 'Deshibodi',
  'Secure Staff Portal': 'Tovuti ya Wafanyakazi',
  'Connect:': 'Ungana Nasi:',
  'County Referral Hospital': 'Hospitali ya Rufaa ya Kaunti',
  'Moi Voi': 'Moi Voi',

  // Common Headings & Actions
  'Our Center of Excellence': 'Kituo Chetu cha Umahiri',
  'Our Centers of Excellence': 'Kituo Chetu cha Umahiri',
  'Medical Departments': 'Idara za Matibabu',
  'Featured Departments': 'Idara Kuu za Matibabu',
  'Hospital Services': 'Huduma za Hospitali',
  'Our Services': 'Huduma Zetu',
  'What We Offer': 'Huduma Tunazotoa',
  'Public Resources & Documents': 'Rasilimali na Nyaraka za Umma',
  'Social Health Authority (SHA) Information': 'Taarifa za Mamlaka ya Afya ya Jamii (SHA)',
  'Search for a department...': 'Tafuta idara ya matibabu...',
  'Search for a service...': 'Tafuta huduma ya afya...',
  'Search resources...': 'Tafuta nyaraka au rasilimali...',
  'Search documents by title or keyword...': 'Tafuta nyaraka kwa anwani au neno la msingi...',
  'Learn More': 'Pata Maelezo Zaidi',
  'Download Current Policies & Insurance': 'Pakua Sera na Bima za Sasa (PDF)',
  'Back to Departments': 'Rudi kwenye Idara',
  'No departments found': 'Hakuna idara iliyopatikana',
  'Clear Search': 'Futa Utafutaji',
  'Download': 'Pakua',
  'All': 'Yote',
  'Legislative Acts': 'Sheria za Afya',
  'Hospital Forms': 'Fomu za Hospitali',
  'Finance & Tenders': 'Fedha na Zabuni',
  'Patient Guides': 'Mwongozo wa Mgonjwa',
  'Policies & Insurance': 'Sera na Bima',
  'Emergency Line': 'Nambari ya Dharura',
  'Main Switchboard': 'Simu Kuu',
  'Email Us': 'Barua Pepe',
  'Email Address': 'Anwani ya Barua Pepe',
  'Location': 'Mahali Tunapopatikana',
  'Working Hours': 'Saa za Kazi',
  'Get In Touch': 'Mawasiliano Nasi',
  'Contact Us': 'Wasiliana Nasi',
  'Send us a Message': 'Tutumie Ujumbe',
  'Send Us a Message': 'Tutumie Ujumbe',
  'First Name': 'Jina la Kwanza',
  'Last Name': 'Jina la Pili',
  'Your Name': 'Jina Lako',
  'Your Email': 'Barua Pepe Yako',
  'Phone Number': 'Nambari ya Simu',
  'Subject': 'Mada',
  'Message': 'Ujumbe Wako',
  'Submit Feedback': 'Tuma Maoni',
  'Sending...': 'Inatuma...',
  'Feedback & Complaints': 'Maoni na Malalamiko',
  'Share Your Experience': 'Toa Maoni Yako Kuhusu Huduma',
  'Rating': 'Kiwango cha Huduma',
  'Comments': 'Maoni',
  'Thank you for your feedback!': 'Asante kwa kutoa maoni yako!',
  '© 2026 Moi Voi County Referral Hospital': '© 2026 Hospitali ya Rufaa ya Kaunti ya Moi Voi',
  'Admin Dashboard': 'Deshibodi ya Usimamizi',
  '24/7 Emergency Care Available': 'Huduma za Dharura Masaa 24/7 Inapatikana',
  'Serving Taita Taveta with a state-of-the-art database-backed medical portal for efficient patient care.': 'Kuitumikia Taita Taveta kwa huduma bora za matibabu kupitia tovuti ya kisasa ya kidijitali.',
  'Explore Departments': 'Chunguza Idara',
  'SHA Health Cover Info': 'Taarifa za Bima ya SHA',
  'Register for SHA: Dial *147#': 'Jisajili na SHA: Piga *147#',
  'Voi Town, Off Nairobi-Mombasa Highway': 'Mji wa Voi, Barabara Kuu ya Nairobi-Mombasa',
  'Voi Town, Off Nairobi-Mombasa Highway, Kenya': 'Mji wa Voi, Barabara Kuu ya Nairobi-Mombasa, Kenya',
  'View All': 'Tazama Yote',
  'Latest News & Events': 'Habari na Matukio ya Hivi Karibuni',
  'Stay Informed': 'Pata Habari',
  'Hospital News & Announcements': 'Habari na Matangazo ya Hospitali',
  'Read More': 'Soma Zaidi',
  'Facility Upgrade': 'Uboreshaji wa Vifaa',
  'Health Campaign': 'Kampeni ya Afya',
  'Important Update': 'Taarifa Muhimu',

  // About Page
  'Our Story': 'Historia Yetu',
  'About Moi Voi County Referral Hospital': 'Kuhusu Hospitali ya Rufaa ya Kaunti ya Moi Voi',
  'Moi Voi County Referral Hospital is the premier healthcare provider in Taita Taveta County, committed to delivering exceptional medical services to our community and beyond.': 'Hospitali ya Rufaa ya Kaunti ya Moi Voi ndiyo mtoa huduma mkuu wa afya katika Kaunti ya Taita Taveta, iliyojitolea kutoa huduma bora za matibabu kwa jamii yetu na maeneo ya jirani.',
  'Founded with a vision to offer state-of-the-art medical care accessible to all, our facility is equipped with modern technology and staffed by dedicated healthcare professionals who put patient well-being first.': 'Ikiwa imejengwa kwa maono ya kutoa matibabu ya kisasa yanayofikiwa na wote, hospitali yetu imewekewa vifaa vya kisasa na madaktari na wauguzi waliojitolea kuweka afya ya mgonjwa mbele.',
  'Our Mission': 'Dhamira Yetu',
  'To provide quality, affordable, and accessible healthcare to all.': 'Kutoa huduma za afya bora, za bei nafuu na zinazofikika kwa wote.',
  'Our Vision': 'Maono Yetu',
  'To be a center of excellence in healthcare delivery in the region.': 'Kuwa kituo cha umahiri katika utoaji wa huduma za afya katika ukanda huu.',

  // Contact Page
  'We are here to help. Reach out to us for any inquiries, appointments, or emergency assistance.': 'Tuko hapa kukusaidia. Wasiliana nasi kwa maswali, miadi, au msaada wa dharura.',
  'Available 24/7': 'Inapatikana Masaa 24/7',
  'For general inquiries': 'Kwa maswali ya jumla',
  'Visit our facility': 'Tembelea hospitali yetu',
  'How can we help you?': 'Tukusaidie vipi?',
  'Send Message': 'Tuma Ujumbe',

  // SHA Page
  'National Health Transition': 'Mabadiliko ya Afya ya Kitaifa',
  'Social Health Authority (SHA)': 'Mamlaka ya Afya ya Jamii (SHA)',
  'The Social Health Authority (SHA) replaces NHIF to provide more inclusive healthcare for all Kenyans. Register today to ensure continued access to services at Moi Voi County Referral Hospital.': 'Mamlaka ya Afya ya Jamii (SHA) inachukua nafasi ya NHIF ili kutoa huduma za afya zinazomjumuisha kila Mkenya. Jisajili leo ili kuendelea kupata huduma katika Hospitali ya Rufaa ya Kaunti ya Moi Voi.',
  'Visit SHA Portal': 'Tembelea Tovuti ya SHA',
  'How to Register': 'Jinsi ya Kujisajili',
  'How to Pay': 'Jinsi ya Kulipa',
  'Check Eligibility': 'Angalia Haki ya Huduma',
  'Quick USSD': 'USSD ya Haraka',
  'Registration': 'Usajili',
  'Support Desk': 'Dawati la Msaada',
  'Verify My Status': 'Thibitisha Hali Yangu',
  'Make Contribution': 'Fanya Michango',
  'Transition FAQ': 'Maswali Kuhusu Mabadiliko',
  'Need Assistance with SHA?': 'Unahitaji Msaada Kuhusu SHA?',

  // Blog Page
  'Health Education': 'Elimu ya Afya',
  'Medical Blog & Health Tips': 'Blogu ya Matibabu na Ushauri wa Afya',
  'Stay informed with the latest health advice, preventive care tips, and medical news from our experts.': 'Pata taarifa za hivi karibuni za ushauri wa afya, kinga, na habari za matibabu kutoka kwa wataalamu wetu.',
  'Read Article': 'Soma Makala',
  'Disease Prevention': 'Kinga ya Magonjwa',
  'Wellness': 'Afya na Ustawi',
  'Diet & Nutrition': 'Lishe na Chakula',

  // Booking Modal
  'Book a Consultation': 'Weka Miadi ya Daktari',
  'Real-time database persistence': 'Uhifadhi wa haraka katika mfumo',
  'Patient Full Name': 'Jina Kamili la Mgonjwa',
  'Phone (e.g. 07xx)': 'Nambari ya Simu (m.f. 07xx)',
  'Select Department': 'Chagua Idara',
  'Preferred Time': 'Saa Unayopendelea',
  'Symptom notes (optional)': 'Maelezo ya dalili (si lazima)',
  'Secure Database Booking': 'Hifadhi Miadi Salama',
  'Confirmed!': 'Imethibitishwa!',
  'Your record has been saved to the hospital database.': 'Taarifa zako zimehifadhiwa kikamilifu kwenye mfumo wa hospitali.',

  // Feedback Form
  'Patient Experience': 'Uzoefu wa Mgonjwa',
  'Your voice matters to us. Your feedback will be sent directly to': 'Sauti yako ni muhimu kwetu. Maoni yako yatatumwa moja kwa moja kwa',
  'Overall Experience': 'Tathmini ya Huduma',
  'Comments & Suggestions': 'Maoni na Mapendekezo',
  'Tell us about your experience...': 'Tueleze kuhusu uzoefu wako...',
  'General Feedback': 'Maoni ya Jumla',
  'Clinical Care': 'Huduma za Tiba',
  'Customer Service': 'Huduma kwa Wateja',
  'Facilities & Cleanliness': 'Mazingira na Usafi',
  'Suggestions for Improvement': 'Mapendekezo ya Uboreshaji',

  // Department Detail
  'Head of Department': 'Mkuu wa Idara',
  'Overview': 'Muhtasari',
  'Services & Clinics': 'Huduma na Kliniki',
  'Service Charter': 'Mkataba wa Huduma',
  'Upcoming Events': 'Matukio Yanayokuja',
  'Frequently Asked Questions': 'Maswali Yanayoulizwa Mara Kwa Mara',
  'Photo Gallery': 'Picha za Idara',
  'Book Appointment': 'Weka Miadi ya Daktari',
  'Share Department': 'Gawana Taarifa za Idara',

  // Department names translation
  'Casualty & Emergency': 'Dharura na Majeraha',
  'Outpatient Clinic (OPD)': 'Kliniki ya Wagonjwa wa Nje (OPD)',
  'Maternity & Newborn Unit': 'Wodi ya Uzazi na Watoto Wachanga',
  'General Surgery': 'Idara ya Upasuaji Mkuu',
  'Radiology & Diagnostic Imaging': 'Idara ya Radiolojia na Picha',
  'Renal & Dialysis Unit': 'Kituo cha Kusafisha Figo',
  'Pediatrics & Child Health': 'Afya ya Watoto',
  'Dental Clinic': 'Kliniki ya Meno',
  'Ophthalmology (Eye Unit)': 'Kliniki ya Macho',
  'Laboratory & Pathology': 'Maabara na Vipimo',
  'Pharmacy Services': 'Duka la Dawa na Tiba'
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved === 'SW' || saved === 'EN') ? saved : 'EN';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
    document.documentElement.lang = lang === 'SW' ? 'sw' : 'en';
  };

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'SW' : 'EN');
  };

  useEffect(() => {
    document.documentElement.lang = language === 'SW' ? 'sw' : 'en';
  }, [language]);

  const tText = (text: string): string => {
    if (!text || language === 'EN') return text;
    
    // Direct match
    if (swahiliTranslations[text]) {
      return swahiliTranslations[text];
    }

    // Trimmed match
    const trimmed = text.trim();
    if (swahiliTranslations[trimmed]) {
      return swahiliTranslations[trimmed];
    }

    return text;
  };

  const t = (key: string, defaultText?: string): string => {
    if (language === 'EN') {
      return defaultText || key;
    }

    // Check key or defaultText in swahiliTranslations
    if (swahiliTranslations[key]) {
      return swahiliTranslations[key];
    }

    if (defaultText && swahiliTranslations[defaultText]) {
      return swahiliTranslations[defaultText];
    }

    // Check if key itself is English text in dictionary
    return tText(defaultText || key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, tText }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
