
"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context/app-context";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { products } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  name: string;
};

type Order = {
  id: string;
  total: number;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  items: OrderItem[];
};

export default function OrdersPage() {
  const { user, userLoading } = useAppContext();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userLoading) {
      return;
    }
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const userOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Order[];
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user, userLoading, router]);

  const getProductDetails = (productId: string) => {
    return products.find(p => p.id === productId);
  }

  if (isLoading || userLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-8">My Orders</h1>
        <div className="space-y-6">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold tracking-tight">No Orders Yet</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          You haven't placed any orders with us.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle>Order #{order.id.slice(0, 7)}</CardTitle>
              <CardDescription>
                Placed on: {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => {
                  const product = getProductDetails(item.id);
                  if (!product) return null;
                  return (
                    <div key={item.id} className="flex items-center gap-4">
                       <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover" data-ai-hint={product.aiHint}/>
                        </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-end font-bold text-lg pt-6">
                <span>Total: ₹{order.total.toFixed(2)}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
