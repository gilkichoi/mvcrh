
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
    downloadUrl: '#'
  },
  {
    id: 'finance-act-2024',
    title: 'County Finance ACT 2024',
    category: 'Legislative Acts',
    description: 'Regulatory document detailing health service fees and budget allocations for the current fiscal year.',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    downloadUrl: '#'
  },
  {
    id: 'admission-form',
    title: 'Patient Admission & Consent Form',
    category: 'Hospital Forms',
    description: 'Standard form required for all inpatient admissions. Can be filled prior to arrival.',
    fileType: 'DOCX',
    fileSize: '450 KB',
    downloadUrl: '#'
  },
  {
    id: 'referral-template',
    title: 'Inter-Facility Referral Template',
    category: 'Hospital Forms',
    description: 'Formal template for medical practitioners referring patients to Moi Voi Hospital specialized clinics.',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    downloadUrl: '#'
  },
  {
    id: 'tender-2024-05',
    title: 'Supply of Medical Equipment Tender 2024/05',
    category: 'Finance & Tenders',
    description: 'Official tender document for the procurement of modern surgical equipment for the new theater.',
    fileType: 'PDF',
    fileSize: '3.1 MB',
    downloadUrl: '#'
  },
  {
    id: 'patient-rights',
    title: 'Patient Bill of Rights & Responsibilities',
    category: 'Patient Guides',
    description: 'A comprehensive guide explaining your rights while receiving care at our facility.',
    fileType: 'PDF',
    fileSize: '890 KB',
    downloadUrl: '#'
  },
  {
    id: 'maternity-checklist',
    title: 'Linda Mama Maternity Checklist',
    category: 'Patient Guides',
    description: 'Essential items and documentation required for expectant mothers visiting the maternity wing.',
    fileType: 'PDF',
    fileSize: '560 KB',
    downloadUrl: '#'
  }
];

export const DEPARTMENTS: DetailedDepartment[] = [
  {
    id: 'maternity',
    name: 'Maternity & Newborn',
    icon: 'fa-baby',
    description: 'Providing comprehensive care for mothers and infants including prenatal, delivery, and postnatal services.',
    longDescription: 'Our Maternity and Newborn unit is dedicated to providing the highest quality of care for mothers and their babies. We offer a safe and supportive environment for childbirth, with a focus on family-centered care. Our team of experienced obstetricians, midwives, and neonatologists are available 24/7 to handle both normal deliveries and high-risk pregnancies.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    subServices: [
      'Antenatal & Postnatal Care',
      'Normal and Caesarean Deliveries',
      'Neonatal Intensive Care (NICU)',
      'Immunization Clinics',
      'Family Planning Services'
    ],
    headOfDepartment: 'Dr. Sarah Mwakazi',
    faqs: [
      { question: "What should I carry when coming for delivery?", answer: "We recommend a 'mother-baby bag' containing clean clothes for both, diapers, sanitary towels, and your clinic card/NHIF card." },
      { question: "Is NHIF Linda Mama covered here?", answer: "Yes, Moi Voi Hospital fully supports the Linda Mama program for free maternity services to all eligible citizens." },
      { question: "Can a birth partner stay during delivery?", answer: "We allow one birth partner in the delivery room for support, provided they follow our hygiene and safety protocols." },
      { question: "Are there specialized doctors for newborns?", answer: "Yes, we have resident neonatologists and pediatricians available 24/7 to attend to newborns needing specialized care." }
    ],
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=800', alt: 'Modern neonatal incubator', caption: 'State-of-the-art Neonatal Care' },
      { url: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&q=80&w=800', alt: 'Clean maternity ward', caption: 'Comfortable Recovery Wards' },
      { url: 'https://images.unsplash.com/photo-1631217816660-ad3535598e23?auto=format&fit=crop&q=80&w=800', alt: 'Patient monitor for vitals', caption: '24/7 Vital Monitoring' },
      { url: 'https://images.unsplash.com/photo-1584362946444-1e7c85aa8e11?auto=format&fit=crop&q=80&w=800', alt: 'Sterile delivery room', caption: 'Advanced Delivery Suites' },
      { url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', alt: 'Consultation with a specialist', caption: 'Personalized Prenatal Care' }
    ],
    events: [
      {
        title: "Breastfeeding Support Workshop",
        date: "Every Last Saturday",
        time: "10:00 AM - 12:00 PM",
        description: "A specialized session led by our midwives to help new mothers master breastfeeding techniques and nutrition."
      },
      {
        title: "Prenatal Yoga & Wellness",
        date: "Wednesdays",
        time: "4:00 PM - 5:30 PM",
        description: "Gentle exercises and breathing techniques designed specifically for expectant mothers in their second and third trimesters."
      }
    ]
  },
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
        date: "October 24, 2024",
        time: "8:00 AM - 2:00 PM",
        description: "Free blood sugar testing and specialist consultations for the general public."
      },
      {
        title: "Hypertension Awareness Day",
        date: "October 25, 2024",
        time: "9:00 AM - 3:00 PM",
        description: "Blood pressure checks and nutritional advice on managing heart health."
      }
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
      'General Surgery',
      'Orthopedic Surgery',
      'Gynecological Surgery',
      'ENT Procedures',
      'Emergency Trauma Surgery'
    ],
    headOfDepartment: 'Dr. Festus Mwangi',
    faqs: [
      { question: "How do I prepare for an elective surgery?", answer: "Your surgeon will provide specific instructions, usually involving fasting (nothing by mouth) for at least 6-8 hours prior to the procedure." },
      { question: "Are emergency surgeries done at night?", answer: "Yes, our surgical team and anesthetists are on standby 24/7 for life-saving and emergency procedures." },
      { question: "What is the recovery process like?", answer: "After surgery, you will spend time in our Recovery Unit before being transferred to the ward or discharged, depending on the procedure." },
      { question: "Does NHIF cover surgical procedures?", answer: "Yes, NHIF covers a significant portion of surgical costs for inpatient stays. Pre-authorization may be required for elective cases." }
    ],
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800', alt: 'Modern operating theater', caption: 'Advanced Surgical Suites' },
      { url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', alt: 'Surgical team preparing', caption: 'Highly Skilled Teams' },
      { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800', alt: 'Post-operative recovery room', caption: 'Post-Op Care Units' },
      { url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=800', alt: 'Laparoscopic surgery tools', caption: 'Minimally Invasive Tools' },
      { url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800', alt: 'Anesthesia equipment', caption: 'Safe Anesthesia Tech' }
    ],
    events: [
      {
        title: "Pre-Operative Patient Education",
        date: "Every Friday",
        time: "2:00 PM - 3:30 PM",
        description: "An essential briefing for patients scheduled for elective surgery to discuss preparation and post-op care."
      },
      {
        title: "Orthopedic Specialist Camp",
        date: "November 01, 2024",
        time: "8:00 AM - 5:00 PM",
        description: "Specialized joint and bone health evaluations by visiting consultant orthopedic surgeons."
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
        date: "October 14-20, 2024",
        time: "8:00 AM - 4:00 PM Daily",
        description: "Breast cancer awareness and discounted screening services for women over 40."
      },
      {
        title: "Radiology Tech Update Seminar",
        date: "October 30, 2024",
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
        date: "October 18, 2024",
        time: "9:00 AM - 4:00 PM",
        description: "Join us at the hospital forecourt to donate blood and save lives. Free testing and refreshments for donors."
      },
      {
        title: "Lab Safety & Quality Workshop",
        date: "November 05, 2024",
        time: "10:00 AM - 1:00 PM",
        description: "Continuous professional development for our lab staff on the latest biosafety protocols."
      }
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
      'Medication Counseling',
      'Drug Information Services',
      'Clinical Pharmacy Services',
      'Procurement & Quality Assurance'
    ],
    headOfDepartment: 'Pharm. Lucy Njeri',
    faqs: [
      { question: "Can I use NHIF to get medicine?", answer: "NHIF covers medications for inpatient admissions. For outpatients, some chronic disease medications may be covered under specific schemes." },
      { question: "Do you accept prescriptions from other hospitals?", answer: "Yes, we can dispense medications based on valid prescriptions from any registered medical practitioner, subject to stock availability." },
      { question: "What if a prescribed drug is out of stock?", answer: "Our pharmacists will suggest generic alternatives or advise on where to find the medication in our network of partner pharmacies." },
      { question: "Can I return unused medication?", answer: "For safety and quality reasons, we cannot accept returns of dispensed medications once they have left the pharmacy premises." }
    ],
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=800', alt: 'Pharmacy shelves with medicine', caption: 'Essential Drug Stocks' },
      { url: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=800', alt: 'Pharmacist dispensing medication', caption: 'Expert Counseling' },
      { url: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=800', alt: 'Automated dispensing system', caption: 'Accurate Dispensing' },
      { url: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=800', alt: 'Pharmacy refrigeration', caption: 'Safe Cold Chain' },
      { url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=800', alt: 'Drug information leaflet', caption: 'Patient Education' }
    ],
    events: [
      {
        title: "Medication Adherence Clinic",
        date: "Every Tuesday",
        time: "10:00 AM - 12:00 PM",
        description: "Special counseling for patients on long-term medications for diabetes, hypertension, and TB."
      },
      {
        title: "World Pharmacists Day Celebration",
        date: "September 25, 2024",
        time: "All Day",
        description: "Open day featuring drug safety exhibits and free medication reconciliation services."
      }
    ]
  }
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
