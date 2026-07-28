import { Department, HospitalService, Resource, FAQ, GalleryImage, DepartmentEvent, DetailedDepartment, SocialLinks } from './types';

export interface Testimonial {
  id: number;
  name: string;
  quote: string;
  rating: number;
  location: string;
}

export const SOCIAL_LINKS: SocialLinks = {
  facebook: 'https://web.facebook.com/p/Moi-County-Referral-Hospital-Voi-100089810477442/',
  twitter: 'https://twitter.com/moivoihospital',
  instagram: 'https://instagram.com/moivoihospital',
  linkedin: 'https://linkedin.com/company/moivoihospital',
  youtube: 'https://youtube.com/@moivoihospital'
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Jane W. Mwakazi",
    quote: "The maternity team was absolutely amazing. As a first-time mother, I felt safe and cared for throughout my entire stay. Linda Mama covered everything just as promised!",
    rating: 5,
    location: "Voi Town"
  },
  {
    id: 2,
    name: "David O. Juma",
    quote: "I was impressed by the speed of the Diagnostic Laboratory. I got my results within the hour and the clinicians were very professional in explaining the next steps.",
    rating: 5,
    location: "Mwatate"
  },
  {
    id: 3,
    name: "Mary K. Tole",
    quote: "The specialized eye clinic is a blessing for our community. I received excellent care for my cataracts and can now see clearly. Asante sana to the surgical team.",
    rating: 4,
    location: "Tausa"
  },
  {
    id: 4,
    name: "Samuel N. Mwangi",
    quote: "Efficient service at the OPD. The digital record-keeping system meant I didn't have to wait long despite the queue. Truly a level 5 experience.",
    rating: 5,
    location: "Maungu"
  }
];

export const RESOURCES: Resource[] = [
  {
    id: 'health-act-2023',
    title: 'Taita Taveta Health ACT 2023',
    category: 'Legislative Acts',
    description: 'The official framework for healthcare delivery and management within Taita Taveta County.',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    downloadUrl: 'javascript:void(0)'
  },
  {
    id: 'finance-act-2026',
    title: 'County Finance ACT 2026',
    category: 'Legislative Acts',
    description: 'Regulatory document detailing health service fees and budget allocations for the current fiscal year.',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    downloadUrl: 'javascript:void(0)'
  },
  {
    id: 'admission-form',
    title: 'Patient Admission & Consent Form',
    category: 'Hospital Forms',
    description: 'Standard form required for all inpatient admissions. Can be filled prior to arrival.',
    fileType: 'DOCX',
    fileSize: '450 KB',
    downloadUrl: 'javascript:void(0)'
  },
  {
    id: 'referral-template',
    title: 'Inter-Facility Referral Template',
    category: 'Hospital Forms',
    description: 'Formal template for medical practitioners referring patients to Moi Voi Hospital specialized clinics.',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    downloadUrl: 'javascript:void(0)'
  },
  {
    id: 'tender-2026-05',
    title: 'Supply of Medical Equipment Tender 2026/05',
    category: 'Finance & Tenders',
    description: 'Official tender document for the procurement of modern surgical equipment for the new theater.',
    fileType: 'PDF',
    fileSize: '3.1 MB',
    downloadUrl: 'javascript:void(0)'
  },
  {
    id: 'patient-rights',
    title: 'Patient Bill of Rights & Responsibilities',
    category: 'Patient Guides',
    description: 'A comprehensive guide explaining your rights while receiving care at our facility.',
    fileType: 'PDF',
    fileSize: '890 KB',
    downloadUrl: 'javascript:void(0)'
  },
  {
    id: 'maternity-checklist',
    title: 'Linda Mama Maternity Checklist',
    category: 'Patient Guides',
    description: 'Essential items and documentation required for expectant mothers visiting the maternity wing.',
    fileType: 'PDF',
    fileSize: '560 KB',
    downloadUrl: 'javascript:void(0)'
  }
];

export const DEPARTMENTS: DetailedDepartment[] = [
  {
    id: 'mch_fp',
    name: 'MCH/FP Department',
    icon: 'fa-child-reaching',
    description: 'Mother and Child Health / Family Planning services.',
    longDescription: 'The MCH/FP department provides integrated, quality health services for mothers, children, adolescents, and families. We support safe pregnancy, child survival, informed reproductive choices, and elimination of mother-to-child transmission of HIV (EMTCT).',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    subServices: [
      'Antenatal care',
      'Immunization (KEPI)',
      'Family planning and PNC',
      'Child welfare clinic',
      'HTC (HIV Testing and Counselling)',
      'PMTCT',
      'Sick babies'
    ],
    galleryImages: [],
    serviceCharter: [
      { service: 'Antenatal care', requirements: '8+ focused visits, ANC profile, 3 comprehensive scans, POCAS-point of care u/s, Supplements~IFASS, ~IPT(fansidar), ~Mebendazole, Health talks, Birth plan, Revisits-check Hb/urinalysis' },
      { service: 'Immunization (KEPI)', requirements: 'All childhood vaccines 0-5 Years, HPV for 10-14-year-old girls, Tetanus Toxoid for pregnant mothers' },
      { service: 'Family planning and PNC', requirements: 'Counselling, Offering all FP methods (pills, injectables, implants, IUCD, condoms, natural family planning), Post-natal check-ups at 48 hours, 2 weeks, and 6 weeks' },
      { service: 'Child welfare clinic', requirements: 'Growth monitoring, Vitamin A, deworming, and nutrition counselling' },
      { service: 'HTC (HIV Testing and Counselling)', requirements: 'Pregnant women tested, Couple testing, PNS-Partner Notification Service' },
      { service: 'PMTCT', requirements: 'ART for positive mothers, Infant prophylaxis, Eid/PCR at ~6 weeks, ~6 months, ~12 months, and an antibody test for 18 Months, V/L monitoring, Infant feeding counselling, Prep initiation and monitoring' },
      { service: 'Sick babies', requirements: 'All sick babies in MCH/FP are seen by specialized registered clinical officers' }
    ]
  },
  {
    id: 'orthopaedic',
    name: 'Orthopaedic Trauma Services',
    icon: 'fa-bone',
    description: 'Specialized orthopaedic trauma and fracture management services.',
    longDescription: 'Providing high-quality orthopaedic trauma services, fracture management, joint dislocations, and rehabilitation.',
    image: 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&q=80&w=800',
    subServices: [
      'POP application & Removal',
      'Dislocation Management',
      'Traction (Skin & Skeletal)',
      'Steroid Injections',
      'Removal of K-wire / External Fixator'
    ],
    galleryImages: [],
    serviceCharter: [
      { service: 'Review after POP application', charges: '300/=', time: '5 min' },
      { service: 'Dislocation of shoulder', charges: '2000/=', time: '20 min' },
      { service: 'Dislocation of hip', charges: '3500/=', time: '30 min' },
      { service: 'Skin traction per piece', charges: '2500/=', time: '20 min' },
      { service: 'Skeletal traction', charges: '2500/=', time: '1 hour' },
      { service: 'Removal of POP', charges: '300/=', time: '20 min' },
      { service: 'POP application below calcut', charges: '1000/=', time: '45 min' },
      { service: 'Cylinder POP (Adult)', charges: '1000/=', time: '45 min' },
      { service: 'Cervical Collar (Adult)', charges: '2000/=', time: '20 min' },
      { service: 'Removal of K-wire', charges: '2500/=', time: '1 hr' }
    ]
  },
  {
    id: 'paediatric',
    name: 'Paediatric Ward',
    icon: 'fa-children',
    description: 'Inpatient management of paediatric conditions for children aged 0-12 years.',
    longDescription: 'To be a centre of excellence in paediatric care, providing safe, high quality and child centred services that reduce morbidity and mortality.',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
    subServices: [
      'Inpatient management (0-12 years)',
      'Management of common childhood illnesses',
      'Emergency triage, resuscitation and stabilization',
      'Nutritional assessment and rehabilitation',
      'Growth monitoring',
      'Health education for caregivers'
    ],
    galleryImages: [],
    serviceCharter: [
      { service: 'Emergency cases', time: 'Attended to immediately' },
      { service: 'Urgent cases', time: 'Reviewed within 15-30 minutes' },
      { service: 'Routine cases', time: 'Attended to within 1 hour' },
      { service: 'Vital signs monitoring', time: '8 hourly but open for changes depending on condition' },
      { service: 'Ward rounds', time: 'Major ward rounds with paediatrician at least twice weekly, daily with medical officer' }
    ]
  },
  {
    id: 'mortuary',
    name: 'Mortuary Wing',
    icon: 'fa-bed-pulse',
    description: 'Dignified preservation and preparation services.',
    longDescription: 'Committed to providing high quality service to all its clients with dignity, professionalism and within the shortest time possible.',
    image: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=800',
    subServices: [
      'Body Admission',
      'Embalming',
      'Body Cleaning',
      'Reconstruction',
      'Postmortem'
    ],
    galleryImages: [],
    serviceCharter: [
      { service: 'Admission inpatient', charges: '300/=', time: '5 Minutes' },
      { service: 'Admission B.I.D', charges: '500/=', time: '5 Minutes' },
      { service: 'Body Embalming', charges: '3,000/=', time: '20 Minutes per body' },
      { service: 'Body Cleaning', charges: '1,500/=', time: '10 Minutes' },
      { service: 'Reconstruction', charges: '2,000/=', time: '45 Minutes' },
      { service: 'Postmortem Friday', charges: '3,000/=', time: '45 Minutes' },
      { service: 'Postmortem Any Day', charges: '9,000/=', time: '45 Minutes' },
      { service: 'Body Viewing Mon – Friday', charges: 'Free', time: '15 Minutes' },
      { service: 'Body Collection from Wards', charges: 'Free', time: '20 Minutes' }
    ]
  },
  {
    id: 'newborn',
    name: 'New Born Unit',
    icon: 'fa-baby-carriage',
    description: 'Care of sick and premature newborns.',
    longDescription: 'We are dedicated to delivering exceptional and holistic care to newborn, recognizing their unique need and the integral role of their families in the care process.',
    image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=800',
    subServices: [
      'Admission and care of sick and premature newborns',
      'Neonate resuscitation',
      'Incubator and kangaroo mother care (KMC)',
      'Phototherapy for jaundice',
      'Feeding support (breastfeeding and tube feeding)'
    ],
    galleryImages: [],
    serviceCharter: [
      { service: 'Admission of new born', time: 'Within 10 minutes of arrival' },
      { service: 'Initial assessment', time: 'Within 10 minutes of arrival' },
      { service: 'Emergency care', time: 'Immediate' },
      { service: 'Doctor review', time: 'Within 30 minutes of arrival' },
      { service: 'Laboratory tests', time: 'Within 1 hour to 8 hours depending on test' },
      { service: 'Daily ward rounds', time: 'At least once every 24 hours' },
      { service: 'Major ward rounds', time: 'At least twice every week' },
      { service: 'Discharge process', time: 'Within 2 hours after approval' }
    ]
  },
  {
    id: 'counseling',
    name: 'Psychological Counseling',
    icon: 'fa-brain',
    description: 'Psychological assessments, psychotherapy, and group therapy.',
    longDescription: 'Providing comprehensive psychological and mental health support, including individual and group therapy sessions.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
    subServices: [
      'Psychological Assessments & Diagnosing',
      'Psychotherapy',
      'Individual Counseling',
      'Group Therapy',
      'Psycho-Education'
    ],
    galleryImages: [],
    serviceCharter: [
      { service: 'Psychological Assessments & Diagnosing', requirements: 'Exercise Books, Assessment Forms, Pen', charges: '500' },
      { service: 'Psychotherapy', charges: '200' },
      { service: 'Individual Counseling Session', requirements: 'Exercise Book, Assessment / Screening Forms, Client Cooperation', charges: '100' },
      { service: 'Psycho-Education', charges: '(- 5) People 500/-' },
      { service: 'Clients Follow Up', charges: '1000' },
      { service: 'Group Therapy', requirements: 'Venue, Register, Assessment/Screening Forms, Clients Cooperation', charges: '(5-10) People 2,000/-' },
      { service: 'Health Talks', requirements: 'Venue, Register', charges: 'Free' }
    ]
  },
  {
    id: 'emergency',
    name: 'Emergency Unit',
    icon: 'fa-truck-medical',
    description: '24/7 Emergency and critical care services.',
    longDescription: 'Dedicated to providing rapid response and immediate care for life-threatening conditions and acute illnesses.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    subServices: [
      'Emergency consultation',
      'Nebulization',
      'Stitching & Wound Care',
      'Resuscitation',
      'Vital monitoring'
    ],
    galleryImages: [],
    serviceCharter: [
      { service: 'Emergency consultation', requirements: 'SHA FORM, Referral document, Clinic notes and work outs', charges: '150', time: 'Immediate for emergency - 10-30 minutes for non emergency' },
      { service: 'Nebulization', requirements: 'SHA FORM, Clinical notes and findings', charges: '300', time: 'Immediate' },
      { service: 'Stitching', requirements: 'SHA FORM, Clinical notes and findings', charges: '1000', time: '5-10 minutes' },
      { service: 'Catheterization', requirements: 'SHA, Clinical booklet', charges: '200', time: '10 minutes' },
      { service: 'ECG', requirements: 'Request FORM', charges: '1000', time: '20 minutes' },
      { service: 'Admission', requirements: 'File', charges: '450', time: '30 minutes' },
      { service: 'Oxygen administration', requirements: 'Clinical findings', charges: '1000 per hour', time: 'Immediate' },
      { service: 'Resuscitation', requirements: 'Clinical findings', charges: '2000', time: 'Immediate' }
    ]
  },
  {
    id: 'medical_social_work',
    name: 'Medical Social Work',
    icon: 'fa-hands-holding-child',
    description: 'Holistic psychosocial support to patients and their families.',
    longDescription: 'The Medical Social Work Department is committed to providing holistic psychosocial support to patients and their families within the hospital. We aim to promote social well-being, facilitate access to care, and support vulnerable individuals through professional social work services.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953eb1b5ae?auto=format&fit=crop&q=80&w=800',
    subServices: [
      'Psychosocial assessment',
      'Counseling and emotional support',
      'Assessment for waiver and exemption',
      'Child protection and safeguarding',
      'Gender-Based Violence (GBV) case management'
    ],
    galleryImages: [],
    serviceCharter: []
  },
  {
    id: 'physiotherapy',
    name: 'Physiotherapy Department',
    icon: 'fa-person-walking',
    description: 'Affordable, accessible, and high-quality rehabilitation services.',
    longDescription: 'To provide affordable, accessible, and high-quality physiotherapy services that promote recovery, functional independence, and improved quality of life for all patients.',
    image: 'https://images.unsplash.com/photo-1576089172869-4f5f6f315620?auto=format&fit=crop&q=80&w=800',
    subServices: [
      'Orthopedic and musculoskeletal physiotherapy',
      'Neurological rehabilitation (e.g. stroke)',
      'Post-surgical rehabilitation',
      'Pediatric physiotherapy',
      'Geriatric care'
    ],
    galleryImages: [],
    serviceCharter: [
      { service: 'Stroke rehabilitation', requirements: 'Exercise Books, Assessment Forms', charges: '500', time: '30 minutes' },
      { service: 'Post – surgical rehabilitation', requirements: 'Exercise Book, Assessment form', charges: '500', time: '30 minutes' },
      { service: 'Orthopedic and Musculoskeletal physiotherapy', requirements: 'Exercise Book, Assessment / Screening Forms', charges: '500', time: '30 minutes' },
      { service: 'Health Talks', requirements: 'Venue, Register', charges: 'Free', time: '30 min-1 hr' }
    ]
  },
  {
    id: 'renal',
    name: 'Renal Unit',
    icon: 'fa-kidneys',
    description: 'Comprehensive nephrology and hemodialysis services.',
    longDescription: 'Specialized unit providing nephrologist consultations, hemodialysis, and catheter insertions.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    subServices: [
      'Nephrologist Consultation',
      'Haemodialysis',
      'Paracentesis',
      'Catheter Insertion & Removal'
    ],
    galleryImages: [],
    serviceCharter: [
      { service: 'Nephrologist Consultation', requirements: 'Record Book, Valid Receipt/NHIF Card', charges: '500/-', time: '10 MINS' },
      { service: 'Haemodialysis Per Session', requirements: 'UECS, Hepatitis B&C, HIV Results, Valid Receipt/NHIF', charges: '6,000/=', time: '4 HOURS' },
      { service: 'Paracentesis', requirements: 'Record Book, Valid Receipt/NHIF Card', charges: '300/=', time: '4 HOURS' },
      { service: 'Permanent Catheter', requirements: 'Record Book, UEC\'S, Hepatitis B&C, HIV, NHIF Card/Receipt', charges: '20,000/=', time: 'NA' },
      { service: 'Temporary Catheter', requirements: 'Record Book, UEC\'S, Hepatitis B&C, HIV, NHIF Card/Receipt', charges: '14,000/=', time: 'NA' },
      { service: 'Catheter Insertion', requirements: 'Record Book, UEC\'S, Hepatitis B&C, HIV Results, Receipt/NHIF Card', charges: '500/=', time: '30 MINS' },
      { service: 'Catheter Removal', requirements: 'Record Book, UEC\'S Results, Receipt/NHIF Card', charges: '200/=', time: '15 MINS' }
    ]
  },
  {
    id: 'male_ward',
    name: 'Male Ward',
    icon: 'fa-bed',
    description: 'Inpatient services for adult male patients.',
    longDescription: 'Provide safe, compassionate, quality medical care and improve the health and well-being of male patients.',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800',
    subServices: [
      'Admission',
      'Lab Investigations',
      'Oxygen Administration',
      'Surgical Operations Post-Op Care'
    ],
    galleryImages: [],
    serviceCharter: [
      { service: 'Admission', requirements: 'Admission file, Active SHA Cover', charges: '450', time: '10 mins' },
      { service: 'Lab Investigations', requirements: 'Active SHA Cover, Doctor\'s request form', charges: 'As per investigation', time: '10 mins' },
      { service: 'Oxygen Administration', requirements: 'Consent', charges: '150 per hour', time: '5 mins' },
      { service: 'Catheterization', requirements: 'Consent', charges: '300/-', time: '15 mins' },
      { service: 'Hospitalization (Bed)', requirements: 'Active SHA Cover', charges: '500/-', time: '5 mins' },
      { service: 'Meals', requirements: 'Plate, Cup, Spoon', charges: '650/-', time: '10 mins' },
      { service: 'Blood Transfusion', requirements: 'Doctor\'s Request Form (CGXM)', charges: '600/- per pint', time: '15 mins' },
      { service: 'Surgical Operations', requirements: 'Consent, SHA Approval', charges: 'As per operation', time: '15 mins' }
    ]
  },
  {
    id: 'surgery',
    name: 'Theatre & Surgery',
    icon: 'fa-procedures',
    description: 'Equipped with modern surgical suites for major and minor elective and emergency procedures.',
    longDescription: 'Our surgical department comprises state-of-the-art operating theatres and a dedicated post-operative recovery unit. We perform a wide range of procedures, from minor outpatient surgeries to complex major operations, utilizing modern laparoscopic and open surgical techniques.',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
    subServices: [
      'Elective surgical procedures',
      'Emergency surgical procedures',
      'Pre-operative patient preparation',
      'Intra-operative care',
      'Post-operative recovery care',
      'Sterilization and infection prevention services'
    ],
    headOfDepartment: 'Dr. Festus Mwangi',
    faqs: [
      { question: "How do I prepare for an elective surgery?", answer: "Your surgeon will provide specific instructions, usually involving fasting (nothing by mouth) for at least 6-8 hours prior to the procedure." },
      { question: "Are emergency surgeries done at night?", answer: "Yes, our surgical team and anesthetists are on standby 24/7 for life-saving and emergency procedures." }
    ],
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800', alt: 'Modern operating theater', caption: 'Advanced Surgical Suites' }
    ],
    serviceCharter: [
      { service: 'Emergency surgeries', time: 'Immediate response (within 30 minutes)' },
      { service: 'Elective surgeries', time: 'As per scheduled theatre list (24 hours)' },
      { service: 'Patient preparation', time: 'Completed at least 1 hour before surgery' },
      { service: 'Theatre cleanliness', time: 'Maintained before and after every procedure' },
      { service: 'Sterilization of instruments', time: '100% compliance with sterilization protocols' }
    ]
  },
  {
    id: 'pharmacy',
    name: 'Hospital Pharmacy',
    icon: 'fa-capsules',
    description: 'Dispensing essential medications and providing counseling on drug usage.',
    longDescription: 'The hospital pharmacy ensures that all patients have access to essential, high-quality medications. Our pharmacists are dedicated to patient safety, providing thorough counseling on drug interactions and proper medication adherence.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=800',
    subServices: [
      'Inpatient & Outpatient Dispensing',
      'Patient counseling and medication education',
      'Pharmaceutical compounding of customized medicines',
      'Inpatient medication reviews',
      'Drug and therapeutic information service'
    ],
    headOfDepartment: 'Pharm. Lucy Njeri',
    faqs: [
      { question: "Can I use NHIF to get medicine?", answer: "NHIF covers medications for inpatient admissions. For outpatients, some chronic disease medications may be covered under specific schemes." }
    ],
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=800', alt: 'Pharmacy shelves with medicine', caption: 'Essential Drug Stocks' }
    ],
    serviceCharter: [
      { service: 'Prescription screening', time: 'Within 5 minutes' },
      { service: 'Dispensing of medicines', time: 'Within 10–20 minutes' },
      { service: 'Patient counseling', time: 'Before medicines are dispensed' },
      { service: 'Inpatient medication review', time: 'During ward rounds or as required' },
      { service: 'Extemporaneous preparations/Compounded medicines', charges: 'KES 300' },
      { service: 'Drug information requests', time: 'Within 10 minutes' }
    ]
  }
,
  {
    id: 'opd',
    name: 'Outpatient (OPD)',
    icon: 'fa-user-md',
    description: 'General consultations, triage, and specialized clinic referrals available daily.',
    longDescription: 'The Outpatient Department is the gateway to our specialized medical services. We handle general consultations, emergency triage, and referrals to our various specialized clinics. Our efficient queuing system ensures that patients are seen promptly by qualified medical officers and consultants.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    subServices: [
      'General Medical Consultations',
      'Specialized Clinic Referrals',
      'Triage & Basic Emergencies',
      'Physical Examinations',
      'Chronic Disease Management'
    ],
    headOfDepartment: 'Dr. James Waweru',
    faqs: [
      { question: "Do I need an appointment for general consultation?", answer: "No, general OPD services are available on a walk-in basis. However, specialized clinics like ENT or Eye Clinic may require booking." },
      { question: "What are the registration fees?", answer: "Our registration fees follow the county government guidelines for referral hospitals. Please inquire at the main reception triage desk." },
      { question: "How long is the average waiting time?", answer: "Wait times vary by volume, but we aim to have patients triaged within 15 minutes and seen by a clinician within 45 minutes." },
      { question: "Which insurances are accepted at OPD?", answer: "We accept NHIF (National Cover), private insurances like Jubilee, APA, and Britam, and county government staff schemes." }
    ],
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', alt: 'Modern hospital waiting area', caption: 'Spacious Waiting Lounge' },
      { url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800', alt: 'Clinician examining patient', caption: 'Expert Consultations' },
      { url: 'https://images.unsplash.com/photo-1505751172107-573225a92701?auto=format&fit=crop&q=80&w=800', alt: 'Hospital reception desk', caption: 'Efficient Triage Desk' },
      { url: 'https://images.unsplash.com/photo-1581594639580-2db0207865e0?auto=format&fit=crop&q=80&w=800', alt: 'Diagnostic equipment', caption: 'On-site Diagnostics' },
      { url: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800', alt: 'Medical records section', caption: 'Digital Record Keeping' }
    ],
    events: [
      {
        title: "Community Diabetes Screening",
        date: "October 24, 2026",
        time: "8:00 AM - 2:00 PM",
        description: "Free blood sugar testing and specialist consultations for the general public."
      },
      {
        title: "Hypertension Awareness Day",
        date: "October 25, 2026",
        time: "9:00 AM - 3:00 PM",
        description: "Blood pressure checks and nutritional advice on managing heart health."
      }
    ]
  },
  {
    id: 'radiology',
    name: 'Radiology & Imaging',
    icon: 'fa-x-ray',
    description: 'X-rays, Ultrasound, and CT Scan services to assist in accurate diagnosis.',
    longDescription: 'The Radiology and Imaging department provides critical diagnostic support to all our clinical departments. We are equipped with modern digital imaging technology to ensure clear, accurate results with minimal radiation exposure to patients.',
    image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=800',
    subServices: [
      'Digital X-Ray',
      'Obstetric & General Ultrasound',
      'Computed Tomography (CT Scan)',
      'Fluoroscopy',
      'Echocardiography'
    ],
    headOfDepartment: 'Dr. Elizabeth Tole',
    faqs: [
      { question: "Do I need a doctor's referral for an X-ray?", answer: "Yes, imaging procedures require a request form from a qualified clinician to ensure the correct scan is performed for your condition." },
      { question: "How long until I get my results?", answer: "X-ray and Ultrasound results are usually ready within 1-2 hours. CT Scan reports may take up to 24 hours depending on complexity." },
      { question: "Are imaging services available 24/7?", answer: "Emergency X-ray and CT services are available 24/7. Routine Ultrasounds are typically scheduled during day shifts." },
      { question: "Is radiation from X-rays dangerous?", answer: "We use modern digital equipment that minimizes radiation dose. Our staff follow strict safety protocols to protect patients." }
    ],
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=800', alt: 'Modern CT Scan machine', caption: 'High-Resolution CT' },
      { url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', alt: 'Ultrasound in progress', caption: 'Safe Obstetric Imaging' },
      { url: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800', alt: 'Digital X-ray panel', caption: 'Digital Radiography' },
      { url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800', alt: 'MRI technician console', caption: 'Advanced Diagnostics' },
      { url: 'https://images.unsplash.com/photo-1579154273155-9430064b22c7?auto=format&fit=crop&q=80&w=800', alt: 'Interventional radiology tools', caption: 'Specialized Imaging' }
    ],
    events: [
      {
        title: "Mammography Screening Week",
        date: "October 14-20, 2026",
        time: "8:00 AM - 4:00 PM Daily",
        description: "Breast cancer awareness and discounted screening services for women over 40."
      },
      {
        title: "Radiology Tech Update Seminar",
        date: "October 30, 2026",
        time: "2:00 PM - 5:00 PM",
        description: "Internal professional development session on the latest digital imaging protocols."
      }
    ]
  },
  {
    id: 'laboratory',
    name: 'Diagnostic Laboratory',
    icon: 'fa-vial',
    description: 'Full range of medical tests including hematology, biochemistry, and microbiology.',
    longDescription: 'Our diagnostic laboratory is certified and equipped with automated analyzers to provide rapid and reliable results. We maintain strict quality control standards to ensure clinical accuracy for effective patient management.',
    image: 'https://images.unsplash.com/photo-1579154273155-9430064b22c7?auto=format&fit=crop&q=80&w=800',
    subServices: [
      'Hematology & Blood Transfusion',
      'Clinical Chemistry',
      'Microbiology & Parasitology',
      'Histopathology',
      'Molecular Diagnostics'
    ],
    headOfDepartment: 'Mr. David Mwashigadi',
    faqs: [
      { question: "Do I need to fast before a blood test?", answer: "Some tests (like blood sugar or lipid profile) require 8-12 hours of fasting. Your doctor will specify this during your consultation." },
      { question: "How can I get my lab results?", answer: "Results are sent directly to your treating physician's portal or can be collected at the laboratory desk with your patient ID." },
      { question: "Is the lab accredited?", answer: "Yes, our laboratory follows national quality standards and undergoes regular external proficiency testing." },
      { question: "Do you offer DNA or paternity testing?", answer: "We currently offer specialized molecular diagnostics, but paternity testing is usually handled through specific legal channels and referrals." }
    ],
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1579154273155-9430064b22c7?auto=format&fit=crop&q=80&w=800', alt: 'Automated biochemistry analyzer', caption: 'High-Throughput Testing' },
      { url: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800', alt: 'Technician using microscope', caption: 'Expert Microbiology' },
      { url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800', alt: 'Sterile laboratory bench', caption: 'Quality Controlled Lab' },
      { url: 'https://images.unsplash.com/photo-1511174511135-26a97ccc581c?auto=format&fit=crop&q=80&w=800', alt: 'Blood sample storage', caption: 'Certified Blood Bank' },
      { url: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&q=80&w=800', alt: 'PCR machine for molecular tests', caption: 'Molecular Diagnostics' }
    ],
    events: [
      {
        title: "County Blood Donation Drive",
        date: "October 18, 2026",
        time: "9:00 AM - 4:00 PM",
        description: "Join us at the hospital forecourt to donate blood and save lives. Free testing and refreshments for donors."
      },
      {
        title: "Lab Safety & Quality Workshop",
        date: "November 05, 2026",
        time: "10:00 AM - 1:00 PM",
        description: "Continuous professional development for our lab staff on the latest biosafety protocols."
      }
    ]
  },
];

export const SERVICES: HospitalService[] = [
  {
    id: 'emergency',
    title: '24/7 Accident & Emergency',
    description: 'Round-the-clock emergency medical attention for critical injuries and acute illnesses.',
    available: 'Always Open'
  },
  {
    id: 'dental',
    title: 'Comprehensive Dental Clinic',
    description: 'Extractions, fillings, root canals, and preventive oral health education.',
    available: 'Mon - Fri, 8AM - 5PM'
  },
  {
    id: 'eye',
    title: 'Eye Clinic & Optical Services',
    description: 'Vision screening, treatment of eye infections, and prescription of corrective lenses.',
    available: 'Tue & Thu, 8AM - 4PM'
  },
  {
    id: 'mental',
    title: 'Mental Health & Wellness',
    description: 'Counseling and psychiatric services for a holistic approach to patient health.',
    available: 'Mon - Wed, 8AM - 4PM'
  }
];

export const NEWS: import('./types').NewsItem[] = [
  {
    id: 1,
    title: "New Digital X-Ray Machine Installed",
    date: "Oct 10, 2026",
    category: "Facility Upgrade",
    department: "Radiology & Imaging",
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600",
    description: "The Radiology department has received a state-of-the-art digital X-ray machine, reducing wait times and providing clearer imaging for better diagnosis.",
    content: "Moi Voi County Referral Hospital has officially commissioned a new digital radiography suite in the Radiology Department. The equipment will significantly shorten diagnosis turnaround time, lower radiation doses, and enable high-definition digital archives.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=600", caption: "Installation phase in Radiology", alt: "X-Ray Equipment" },
      { url: "https://images.unsplash.com/photo-1579154273155-9430064b22c7?auto=format&fit=crop&q=80&w=600", caption: "Technicians testing digital calibration", alt: "Calibrating equipment" }
    ],
    archived: false
  },
  {
    id: 2,
    title: "Free Breast Cancer Screening Campaign",
    date: "Oct 14, 2026",
    category: "Health Campaign",
    department: "Outpatient (OPD)",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600",
    description: "In observation of Breast Cancer Awareness Month, we are offering free screening and subsidized mammography services for all women.",
    content: "Our clinical oncology and OPD teams are hosting a month-long breast health clinic. Services include free clinical breast exams, self-examination training, and subsidized mammogram scans for eligible women.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600", caption: "Clinical team conducting consultations", alt: "Screening Session" }
    ],
    archived: false
  },
  {
    id: 3,
    title: "SHA Registration & Onboarding Drive",
    date: "Oct 20, 2026",
    category: "Important Update",
    department: "Administration",
    image: "https://images.unsplash.com/photo-1505751172107-573225a92701?auto=format&fit=crop&q=80&w=600",
    description: "Our customer care staff will be assisting patients to register for the new Social Health Authority (SHA) health cover at main reception.",
    content: "To ensure seamless healthcare access under Kenya's universal health coverage transition, Moi Voi Hospital has set up dedicated SHA registration desks at the main entrance and OPD wing. Patients can dial *147# or register with our support staff.",
    gallery: [],
    archived: false
  }
];

export const EVENTS: import('./types').EventItem[] = [
  {
    id: 1,
    title: "Community Blood Drive",
    date: "Oct 25, 2026",
    time: "09:00 AM - 04:00 PM",
    location: "Main Hospital Grounds",
    department: "Diagnostic Laboratory",
    icon: "fa-droplet",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=600",
    description: "Join our blood bank team at the forecourt to donate blood. Free health screening, blood group typing, and refreshments will be provided to all donors.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1579154273155-9430064b22c7?auto=format&fit=crop&q=80&w=600", caption: "Blood donation station setup", alt: "Blood drive" }
    ],
    archived: false
  },
  {
    id: 2,
    title: "Maternal & Newborn Health Workshop",
    date: "Nov 02, 2026",
    time: "10:00 AM - 12:00 PM",
    location: "Conference Hall A",
    department: "MCH/FP Department",
    icon: "fa-person-breastfeeding",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=600",
    description: "An interactive educational session for expectant mothers covering antenatal nutrition, birth planning, infant care, and Linda Mama benefits.",
    gallery: [],
    archived: false
  },
  {
    id: 3,
    title: "Free Eye Checkup & Cataract Camp",
    date: "Nov 15, 2026",
    time: "08:00 AM - 05:00 PM",
    location: "Outpatient Eye Clinic",
    department: "Outpatient (OPD)",
    icon: "fa-eye",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
    description: "Specialist ophthalmic surgeons will provide free eye examinations, glaucoma screening, and subsidized cataract surgery evaluations.",
    gallery: [],
    archived: false
  }
];
