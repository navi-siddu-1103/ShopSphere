
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useAppContext } from "@/context/app-context";
import { products } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { createOrder } from "@/actions/orders";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CheckoutPage() {
  const { cart, clearCart, user, userDetails, userLoading } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();

  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    if (!userLoading) {
      if (user && userDetails) {
        setShippingDetails({
          name: userDetails.firstName || "",
          email: userDetails.email || "",
          phone: userDetails.phone || "",
          address: userDetails.address || "",
        });
      } else if (user) {
        // user object exists but details are not loaded yet or are null
        setShippingDetails(prev => ({ ...prev, email: user.email || ""}));
      }
    }
  }, [user, userDetails, userLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [id]: value }));
  };

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

  const total = subtotal - discountAmount;

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === "SAVE10") {
      const discount = subtotal * 0.10;
      setDiscountAmount(discount);
      toast({
        title: "Discount applied!",
        description: `You saved ₹${discount.toFixed(2)}.`,
      });
    } else {
      setDiscountAmount(0);
      toast({
        title: "Invalid Code",
        description: "The discount code you entered is not valid.",
        variant: "destructive"
      });
    }
  };


  const handleConfirm = async () => {
    // Basic validation
    if (!shippingDetails.name || !shippingDetails.email || !shippingDetails.address) {
       toast({
        title: "Missing Information",
        description: "Please fill in all required shipping details.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    const result = await createOrder({
      userId: user?.uid || "guest", // Use "guest" for non-logged-in users
      items: cart,
      total: total,
      shippingDetails, // Pass shipping details to the order
      discount: discountAmount > 0 ? { code: discountCode, amount: discountAmount } : undefined,
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
     setIsProcessing(false);
  };

  if (userLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    router.replace("/");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-center">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-12">
        
        <div className="lg:col-span-2 space-y-8">
            {/* Shipping Details */}
            <Card>
            <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>
                    {user ? "Please confirm your details for shipping." : "Enter your details for guest checkout."}
                </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={shippingDetails.name} onChange={handleInputChange} required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={shippingDetails.email} onChange={handleInputChange} required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input id="phone" type="tel" value={shippingDetails.phone} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="address">Shipping Address</Label>
                    <Textarea id="address" value={shippingDetails.address} onChange={handleInputChange} required />
                </div>
            </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
                <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>This is a demo. No real payment will be processed.</CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid md:grid-cols-3 gap-4">
                        <div>
                            <RadioGroupItem value="card" id="card" className="peer sr-only" />
                            <Label htmlFor="card" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                Credit/Debit Card
                            </Label>
                        </div>
                         <div>
                            <RadioGroupItem value="netbanking" id="netbanking" className="peer sr-only" />
                            <Label htmlFor="netbanking" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                Net Banking
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
                            <Label htmlFor="cod" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                Cash on Delivery
                            </Label>
                        </div>
                    </RadioGroup>
                    {paymentMethod === 'card' && (
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="grid gap-2 col-span-2">
                                <Label htmlFor="card-number">Card Number</Label>
                                <Input id="card-number" placeholder="0000 0000 0000 0000" />
                            </div>
                            <div className="grid gap-2 col-span-2">
                                <Label htmlFor="card-name">Name on Card</Label>
                                <Input id="card-name" placeholder="John Doe" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="expiry-date">Expiration Date</Label>
                                <Input id="expiry-date" placeholder="MM/YY" />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="123" />
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>

        {/* Order Summary */}
        <Card className="flex flex-col lg:col-span-1">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <div className="space-y-2 mb-4 max-h-60 overflow-y-auto pr-2">
              {cartItems.map(item => (
                item && (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground truncate pr-2">{item.name} x{item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                )
              ))}
            </div>
            <Separator />
            <div className="flex gap-2">
              <Input
                placeholder="Discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <Button onClick={handleApplyDiscount} variant="outline">Apply</Button>
            </div>
             <Separator />
            <div className="space-y-2 my-4 text-sm">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping & Handling</span>
                <span>₹0.00</span>
              </div>
               <div className="flex justify-between">
                <span>Taxes</span>
                <span>Calculated at next step</span>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg my-4">
              <span>Order Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4 mt-auto">
            <Button onClick={handleConfirm} size="lg" className="w-full" disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Confirm Purchase"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
