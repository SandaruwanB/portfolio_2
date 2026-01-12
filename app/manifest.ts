import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sandaruwan Bandara - Senior Software Engineer Portfolio',
    short_name: 'Sandaruwan Portfolio',
    description: 'Portfolio of Sandaruwan Bandara, Senior Software Engineer specializing in Android development, API integrations, and Odoo ERP.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/favicon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}