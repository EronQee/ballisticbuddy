export type NavLink = {
  label: string
  url: string
}

// Top-level navigation, derived from documention/plans/seo-foundation/05-site-map.md.
// Used when the CMS header global has no navItems configured yet.
export const defaultHeaderNav: NavLink[] = [
  { label: 'Ballistic Glass', url: '/products/bulletproof-vehicle-glass/' },
  { label: 'Bulletproof Tires', url: '/products/bulletproof-tires/' },
  { label: 'Armored Vehicles', url: '/armored-vehicles/' },
  { label: 'Test Samples', url: '/test-samples/' },
  { label: 'Results', url: '/results/' },
  { label: 'Learn', url: '/learn/how-to-bulletproof-a-car/' },
  { label: 'Contact', url: '/contact/' },
]

// Footer link groups, modeled on the sectioning style of competitor footers
// (Production / Services / Company) but pointed at our own site-map URLs.
export const footerNav = {
  production: [
    { label: 'Ballistic Vehicle Glass', url: '/products/bulletproof-vehicle-glass/' },
    { label: 'Bulletproof Tires', url: '/products/bulletproof-tires/' },
    { label: 'Armored Vehicles', url: '/armored-vehicles/' },
    { label: 'Glass Specifications', url: '/specifications/ballistic-glass-levels/' },
    { label: 'Research & Testing', url: '/results/' },
  ],
  services: [
    { label: 'Test Samples', url: '/test-samples/' },
    { label: 'Glass Cost', url: '/cost/bulletproof-glass-cost/' },
    { label: 'Armored Car Cost', url: '/cost/bulletproof-car-cost/' },
    { label: 'Bulletproof Tires Cost', url: '/cost/bulletproof-tires-cost/' },
  ],
  company: [
    { label: 'About', url: '/about/' },
    { label: 'How to Bulletproof a Car', url: '/learn/how-to-bulletproof-a-car/' },
    { label: 'Are Bulletproof Tires Real', url: '/learn/are-bulletproof-tires-real/' },
    { label: 'Armored Vehicle Basics', url: '/learn/armored-vehicle-basics/' },
    { label: 'Contact', url: '/contact/' },
  ],
}
