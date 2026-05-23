export const DISTRICTS = [
  "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam", 
  "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram", 
  "Kozhikode", "Wayanad", "Kannur", "Kasaragod"
];

export const ROLES = ["STATE_ADMIN", "DISTRICT_ADMIN", "DIVISION_SECRETARY", "UNIT_SECRETARY", "MEMBER"] as const;

export interface Member {
  id: string;
  name: string;
  malayalamName: string;
  employeeId: string;
  phone: string;
  district: string;
  division: string;
  unit: string;
  role: typeof ROLES[number];
  status: "ACTIVE" | "INACTIVE" | "PENDING_TRANSFER";
  joinedDate: string;
}

export const MOCK_MEMBERS: Member[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    malayalamName: "രാജേഷ് കുമാർ",
    employeeId: "KSEB10023",
    phone: "9847012345",
    district: "Thiruvananthapuram",
    division: "City Division",
    unit: "Pattom Unit",
    role: "STATE_ADMIN",
    status: "ACTIVE",
    joinedDate: "2010-05-12"
  },
  {
    id: "2",
    name: "Sunitha P.",
    malayalamName: "സുനിത പി.",
    employeeId: "KSEB10456",
    phone: "9447054321",
    district: "Kozhikode",
    division: "West Hill",
    unit: "Nadakkavu",
    role: "DISTRICT_ADMIN",
    status: "ACTIVE",
    joinedDate: "2015-08-20"
  },
  {
    id: "3",
    name: "Anil Das",
    malayalamName: "അനിൽ ദാസ്",
    employeeId: "KSEB20112",
    phone: "9123456789",
    district: "Ernakulam",
    division: "Aluva",
    unit: "Perumbavoor",
    role: "DIVISION_SECRETARY",
    status: "ACTIVE",
    joinedDate: "2018-02-10"
  }
];

export interface Notice {
  id: string;
  title: string;
  malayalamTitle: string;
  content: string;
  date: string;
  category: "GENERAL" | "URGENT" | "MEETING";
  priority: "HIGH" | "MEDIUM" | "LOW";
}

export const MOCK_NOTICES: Notice[] = [
  {
    id: "n1",
    title: "State Level Convention - 2026",
    malayalamTitle: "സംസ്ഥാന സമ്മേളനം - 2026",
    content: "The state level convention will be held at Ernakulam on June 15th.",
    date: "2026-05-20",
    category: "GENERAL",
    priority: "HIGH"
  },
  {
    id: "n2",
    title: "Unit Meeting - Pattom",
    malayalamTitle: "യൂണിറ്റ് കമ്മിറ്റി - പട്ടം",
    content: "Monthly meeting of Pattom unit will be held tomorrow at 5 PM.",
    date: "2026-05-15",
    category: "MEETING",
    priority: "MEDIUM"
  }
];

export interface Program {
  id: string;
  title: string;
  malayalamTitle: string;
  date: string;
  location: string;
  image: string;
  attendanceCount: number;
}

export const MOCK_PROGRAMS: Program[] = [
  {
    id: "p1",
    title: "Protest March to Secretariat",
    malayalamTitle: "സെക്രട്ടേറിയറ്റ് മാർച്ച്",
    date: "2026-05-10",
    location: "Thiruvananthapuram",
    image: "https://images.unsplash.com/photo-1552133457-ce1d2d33cdfb?auto=format&fit=crop&q=80&w=800",
    attendanceCount: 1500
  },
  {
    id: "p2",
    title: "Anti-Privatization Seminar",
    malayalamTitle: "സ്വകാര്യവൽക്കരണ വിരുദ്ധ സെമിനാർ",
    date: "2026-04-25",
    location: "Thrissur",
    image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800",
    attendanceCount: 450
  }
];
