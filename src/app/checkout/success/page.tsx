import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <CheckCircle2 className="mx-auto h-24 w-24 text-green-500" />
      <h1 className="mt-8 text-3xl font-bold tracking-tight">
        Thank You For Your Order!
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Your purchase has been confirmed.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Continue Shopping</Link>
      </Button>
    </div>
  );
}
