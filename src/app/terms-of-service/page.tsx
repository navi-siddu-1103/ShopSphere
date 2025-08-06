
export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight mb-6">Terms of Service</h1>
      <div className="prose prose-lg max-w-none text-muted-foreground">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Agreement to Terms</h2>
        <p>
          By using our website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Use of Our Service</h2>
        <p>
          ShopSphere grants you a limited, non-exclusive, non-transferable, revocable license to use our website for your personal, non-commercial purposes. You agree not to use the service for any other purpose.
        </p>
        
        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Accounts</h2>
        <p>
          When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Prohibited Activities</h2>
        <p>
          You are prohibited from using the site or its content for any unlawful purpose, to solicit others to perform or participate in any unlawful acts, or to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms of Service on this page.
        </p>

         <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us.
        </p>
      </div>
    </div>
  );
}
