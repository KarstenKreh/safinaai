import posthog from 'posthog-js'

// Only initialize PostHog in production
if (import.meta.env.PROD) {
  // First check cookie choice before initialization
  const cookieChoice = localStorage.getItem('cookieChoice');
  
  posthog.init('phc_2oqdIiyYEDIB6VWgicJBumGjZdT8F7UivU74bsYDqbN', {
    api_host: 'https://eu.i.posthog.com',
    person_profiles: 'identified_only',
    opt_out_capturing_by_default: cookieChoice !== 'all', // Disable by default unless already accepted
    loaded: (posthog) => {
      if (cookieChoice !== 'all') {
        posthog.opt_out_capturing();
      }
    }
  })
}

export default posthog 