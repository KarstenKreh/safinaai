import posthog from 'posthog-js'

// Only initialize PostHog in production
if (import.meta.env.PROD) {
  // First check cookie choice before initialization
  const cookieChoice = localStorage.getItem('cookieChoice');
  
  posthog.init('phc_2oqdIiyYEDIB6VWgicJBumGjZdT8F7UivU74bsYDqbN', {
    api_host: 'https://eu.i.posthog.com',
    person_profiles: 'identified_only',
    opt_out_capturing_by_default: cookieChoice !== 'all',
    loaded: (posthog) => {
      if (import.meta.env.DEV) {
        posthog.opt_out_capturing();
      }
      if (cookieChoice !== 'all') {
        posthog.opt_out_capturing();
      }
    },
    capture_pageview: false
  })
}

export default posthog 