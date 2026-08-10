export type Service = { slug: string; name: string; shortDescription: string; benefits: string[] }
export type Review = { quote: string; name: string; location?: string; source?: string }

export type ContractorConfig = {
  business: { name: string; tagline: string; description: string; phone: string; phoneHref: string; email?: string; logoText: string }
  location: { primaryCity: string; state: string; serviceAreaLabel: string; cities: string[] }
  theme: { primary: string; accent: string; background: string; surface: string }
  services: Service[]
  reviews: Review[]
  trustItems: string[]
  faqs: { question: string; answer: string }[]
  modules: { financing: boolean; gallery: boolean; builders: boolean; maintenance: boolean; commercial: boolean }
}

// Neutral fixture data. Replace this object per client; components should not contain client identity.
export const contractor: ContractorConfig = {
  business: {
    name: "Your Contractor",
    tagline: "Comfort, handled clearly.",
    description: "Reliable heating and cooling service for homes and businesses in the local community.",
    phone: "(555) 555-0100",
    phoneHref: "tel:5555550100",
    email: "hello@example.com",
    logoText: "YC",
  },
  location: {
    primaryCity: "Your City",
    state: "OK",
    serviceAreaLabel: "Your City and surrounding communities",
    cities: ["Your City", "Nearby City", "Surrounding Area"],
  },
  theme: { primary: "#123b5d", accent: "#e96b3a", background: "#f7f9fb", surface: "#ffffff" },
  services: [
    { slug: "ac-repair", name: "AC Repair", shortDescription: "Diagnosis and repair when your cooling system is not keeping up.", benefits: ["Clear diagnosis", "Repair options explained", "Service for common system types"] },
    { slug: "heating-repair", name: "Heating Repair", shortDescription: "Practical heating help when your home or business needs it.", benefits: ["System troubleshooting", "Safety-first inspection", "Clear next steps"] },
    { slug: "installation", name: "System Installation", shortDescription: "Replacement and installation guidance based on your property and goals.", benefits: ["Right-sized options", "Upfront scope", "Professional installation"] },
  ],
  reviews: [],
  trustItems: ["Locally operated", "Clear communication", "Licensed and insured when verified"],
  faqs: [
    { question: "What areas do you serve?", answer: "We serve the communities listed on this website. Contact us to confirm availability for your address." },
    { question: "How do I request service?", answer: "Call the business directly or submit the request form. The team will confirm the details and next available step." },
  ],
  modules: { financing: false, gallery: false, builders: false, maintenance: false, commercial: false },
}
