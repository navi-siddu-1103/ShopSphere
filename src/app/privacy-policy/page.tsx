
export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight mb-6">Privacy Policy</h1>
      <div className="prose prose-lg max-w-none text-muted-foreground">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Introduction</h2>
        <p>
          Welcome to ShopSphere. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Information We Collect</h2>
        <p>
          We may collect personal information from you in a variety of ways, including when you register on the site, place an order, subscribe to our newsletter, or fill out a form. This may include your name, email address, mailing address, phone number, and credit card information.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">How We Use Your Information</h2>
        <p>
          We may use the information we collect from you to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Personalize your experience and respond to your individual needs.</li>
          <li>Improve our website and offerings based on your feedback.</li>
          <li>Process transactions and deliver your purchased products.</li>
          <li>Send periodic emails regarding your order or other products and services.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Data Security</h2>
        <p>
          We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us.
        </p>
      </div>
    </div>
  );
}
