export interface ContactLink {
  label: string
  href: string
}

export interface ContactConfig {
  email: string
  address: string[]
  socials: ContactLink[]
  openSource: {
    text: string
    githubUrl: string
    linkText: string
  }
}

export const CONTACT: ContactConfig = {
  email: 'contact@quasarftc.com',
  address: [
    'Biblioteen',
    'Huși, Vaslui',
  ],
  socials: [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/quasarftc',
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/@quasarftc',
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/share/1JpemvaV5Y/',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/quasar-robotics-95a920382/',
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@quasarftc',
    },
  ],
  openSource: {
    text: 'Știai că acest site este open source?',
    githubUrl: 'https://github.com/AkilaWasTaken/Quasar',
    linkText: 'Vezi pe GitHub',
  },
}
