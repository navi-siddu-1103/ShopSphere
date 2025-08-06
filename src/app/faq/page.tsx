
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  const faqs = [
    {
      question: "What are your shipping options?",
      answer:
        "We offer standard shipping (5-7 business days) and expedited shipping (2-3 business days). All orders over ₹5000 qualify for free standard shipping.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order has shipped, you will receive an email with a tracking number and a link to the carrier's website. You can also find tracking information in your 'My Orders' section if you have an account.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We accept returns on most items within 30 days of delivery. The item must be unused and in its original packaging. To initiate a return, please visit our Shipping & Returns page or contact customer support.",
    },
    {
      question: "How do I use a discount code?",
      answer:
        "You can apply your discount code during the checkout process. There will be a field labeled 'Discount Code' where you can enter it before confirming your purchase.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Currently, we only ship within India. We are working on expanding our shipping capabilities to more countries in the future.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight mb-8 text-center">
        Frequently Asked Questions
      </h1>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
