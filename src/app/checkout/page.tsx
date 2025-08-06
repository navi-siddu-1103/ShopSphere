"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/context/app-context";
import { products } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { createOrder } from "@/actions/orders";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function CheckoutPage() {
  const { cart, clearCart, user, userLoading } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Redirect to login if user is not logged in and loading is finished
    if (!userLoading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to proceed to checkout.",
        variant: "destructive"
      });
      router.push("/login");
    }
  }, [user, userLoading, router, toast]);

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

  const handleConfirm = async () => {
    if (!user) {
       toast({
        title: "Authentication Required",
        description: "You must be logged in to place an order.",
        variant: "destructive"
      });
      return;
    }

    const result = await createOrder({
      userId: user.uid,
      items: cart,
      total: subtotal,
    });

    if ("orderId" in result) {
      clearCart();
      router.push("/checkout/success");
    } else {
       toast({
        title: "Order Failed",
        description: result.error,
        variant: "destructive"
      });
    }
  };

  if (userLoading || !user) {
    // Show a loading state or similar while checking auth
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <p>Loading...</p>
      </div>
    );
  }

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
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              )
            ))}
          </div>
          <Separator />
          <div className="space-y-2 my-4">
            <div className="flex justify-between font-medium">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Shipping & Handling</span>
              <span>₹0.00</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Taxes</span>
              <span>₹0.00</span>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-xl my-4">
            <span>Order Total</span>
            <span>₹{subtotal.toFixed(2)}</span>
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
