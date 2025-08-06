
"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context/app-context";
import { useRouter } from "next/navigation";
import { getUserDetails, type UserDetails } from "@/actions/users";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Mail, Phone, Home } from "lucide-react";

export default function ProfilePage() {
  const { user, userLoading } = useAppContext();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userLoading) {
      return;
    }
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchUserDetails = async () => {
      setIsLoading(true);
      const details = await getUserDetails(user.uid);
      setUserDetails(details);
      setIsLoading(false);
    };

    fetchUserDetails();
  }, [user, userLoading, router]);

  if (isLoading || userLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
          My Profile
        </h1>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-6 rounded" />
              <Skeleton className="h-6 w-full" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-6 rounded" />
              <Skeleton className="h-6 w-full" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-6 rounded" />
              <Skeleton className="h-6 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Could not load user profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
        My Profile
      </h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Personal Information</CardTitle>
          <CardDescription>
            Your account details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-lg">
          <div className="flex items-center gap-4">
            <User className="h-6 w-6 text-muted-foreground" />
            <span className="font-medium">{userDetails.firstName}</span>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="h-6 w-6 text-muted-foreground" />
            <span className="font-medium">{userDetails.email}</span>
          </div>
          {userDetails.phone && (
             <div className="flex items-center gap-4">
              <Phone className="h-6 w-6 text-muted-foreground" />
              <span className="font-medium">{userDetails.phone}</span>
            </div>
          )}
          {userDetails.address && (
             <div className="flex items-center gap-4">
              <Home className="h-6 w-6 text-muted-foreground" />
              <span className="font-medium">{userDetails.address}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
