const fs = require('fs');

const constantsPath = './constants.tsx';
let content = fs.readFileSync(constantsPath, 'utf8');

const newDepartments = `  {
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
  },
`;

const splitContent = content.split('export const DEPARTMENTS: DetailedDepartment[] = [');

let updatedContent = splitContent[0] + 'export const DEPARTMENTS: DetailedDepartment[] = [\n' + newDepartments + splitContent[1].substring(splitContent[1].indexOf('  {', splitContent[1].indexOf('opd') - 20));

fs.writeFileSync(constantsPath, updatedContent);
console.log('Successfully updated constants.tsx');
