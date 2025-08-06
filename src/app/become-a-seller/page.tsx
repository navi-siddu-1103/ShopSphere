import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BecomeASellerPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Partner with ShopSphere
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">
        Join our marketplace and reach millions of customers. We provide the tools and support you need to grow your business.
      </p>
      <div className="mt-10">
        <Button size="lg" asChild>
          <Link href="/seller-signup">Start Selling Today</Link>
        </Button>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
        <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold">Low Commissions</h3>
            <p className="mt-2 text-muted-foreground">Keep more of your earnings with our competitive commission rates.</p>
        </div>
        <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold">Powerful Tools</h3>
            <p className="mt-2 text-muted-foreground">Manage your products, inventory, and orders with our easy-to-use seller dashboard.</p>
        </div>
        <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold">Dedicated Support</h3>
            <p className="mt-2 text-muted-foreground">Get help when you need it from our dedicated seller support team.</p>
        </div>
      </div>
    </div>
  );
}
