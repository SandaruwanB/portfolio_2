import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hello - Get in Touch',
  description: 'Connect with Sandaruwan Bandara, Senior Software Engineer. Discuss your Android development, API integration, or Odoo ERP project needs.',
  openGraph: {
    title: 'Hello - Get in Touch | Sandaruwan Bandara',
    description: 'Connect with Sandaruwan Bandara for your software development needs.',
  },
}

export default function Hello(){
    return (
        <main className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Hello! 👋</h1>
                <section className="space-y-4">
                    <p className="text-lg">
                        I'm Sandaruwan Bandara, and I'm excited to connect with you!
                    </p>
                    <p>
                        Whether you're looking for Android development, API integrations, 
                        Odoo ERP solutions, or web development services, I'd love to discuss 
                        how I can help bring your ideas to life.
                    </p>
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Let's Work Together</h2>
                        <p>
                            Feel free to reach out to discuss your project requirements, 
                            technical challenges, or collaboration opportunities.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    )
}