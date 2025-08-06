
import { Star, User } from "lucide-react";
import type { Review } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";


interface ProductReviewsProps {
  reviews: Review[];
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold tracking-tight">Customer Reviews</h2>
      <Separator className="my-4" />
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader className="flex flex-row items-center gap-4">
               <Avatar>
                <AvatarFallback>
                    <User />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{review.userName}</CardTitle>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
