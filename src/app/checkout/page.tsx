"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/context/app-context";
import { products } from "@/lib/data";
import { Separator } from "@/components/ui/separator";

export default function CheckoutPage() {
  const { cart, clearCart } = useAppContext();
  const router = useRouter();

  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item!.price * item!.quantity,
    0
  );

  const handleConfirm = () => {
    clearCart();
    router.push("/checkout/success");
  };

  if (cartItems.length === 0) {
    router.replace("/");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 mb-4">
            {cartItems.map(item => (
              item && (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              )
            ))}
          </div>
          <Separator />
          <div className="space-y-2 my-4">
            <div className="flex justify-between font-medium">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Shipping & Handling</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Taxes</span>
              <span>$0.00</span>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-xl my-4">
            <span>Order Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <p className="text-xs text-muted-foreground text-center mb-6">
            This is a demo application. No real payment will be processed.
          </p>
          <Button onClick={handleConfirm} size="lg" className="w-full">
            Confirm Purchase
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
