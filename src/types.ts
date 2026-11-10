export type Corporation = 'umbrella' | 'murkoff';

export interface CharityProgram {
  id: string;
  corp: Corporation;
  title: string;
  tagline: string;
  description: string;
  location: string;
  benefits: string[];
  duration: string;
  eligibility: string;
  easterEggNote: string;
  spotsLeft: number;
}

export interface Testimonial {
  id: string;
  corp: Corporation;
  name: string;
  role: string;
  location: string;
  date: string;
  avatarInitial: string;
  rating: number;
  quote: string;
  innocentContext: string;
  subtleHorrorClue: string;
}

export interface VolunteerFormData {
  fullName: string;
  age: string;
  email: string;
  phone: string;
  preferredCorp: Corporation;
  bloodType: string;
  hasLivingRelatives: boolean;
  relocationReady: boolean;
  mentalResilience: string;
  motivation: string;
  agreedToTerms: boolean;
}

export interface VolunteerPass {
  id: string;
  volunteerNumber: string;
  fullName: string;
  corp: Corporation;
  facility: string;
  assignedRole: string;
  clearanceLevel: string;
  bloodType: string;
  issuedDate: string;
  barcode: string;
}
