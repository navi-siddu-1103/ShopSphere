
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function BecomeASellerPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Partner with ShopSphere
        </h1>
        <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground">
          Join our marketplace and reach millions of customers. We provide the
          tools and support you need to grow your business.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="text-xl font-semibold">Low Commissions</h3>
          <p className="mt-2 text-muted-foreground">
            Keep more of your earnings with our competitive commission rates.
          </p>
        </div>
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="text-xl font-semibold">Powerful Tools</h3>
          <p className="mt-2 text-muted-foreground">
            Manage your products, inventory, and orders with our easy-to-use
            seller dashboard.
          </p>
        </div>
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="text-xl font-semibold">Dedicated Support</h3>
          <p className="mt-2 text-muted-foreground">
            Get help when you need it from our dedicated seller support team.
          </p>
        </div>
      </div>
      
      <Card className="max-w-2xl mx-auto mt-16">
        <CardHeader>
          <CardTitle>Start Selling Today</CardTitle>
          <CardDescription>
            Fill out the form below to begin your journey as a ShopSphere seller.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="business-name">Business Name</Label>
              <Input id="business-name" placeholder="Your Company LLC" />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="email">Business Email</Label>
              <Input id="email" type="email" placeholder="contact@yourcompany.com" />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" />
            </div>
            <Button size="lg" className="w-full">
                Get Started
            </Button>
          </form>
        </CardContent>
      </Card>

    </div>
  );
}
