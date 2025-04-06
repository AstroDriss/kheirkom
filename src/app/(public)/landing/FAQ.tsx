import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about our platform
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl mt-12">
          <Accordion
            type="single"
            defaultValue="item-1"
            collapsible
            className="w-full"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How do I know my donations are going to legitimate associations?
              </AccordionTrigger>
              <AccordionContent>
                All associations on our platform go through a verification
                process. We check their registration status, contact
                information, and history before they can post needs or receive
                donations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Can I donate money instead of items?
              </AccordionTrigger>
              <AccordionContent>
                Our platform primarily focuses on item donations, but some
                associations may specify monetary needs for specific projects.
                You can always contact them directly to discuss alternative ways
                to support.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                How do I coordinate the delivery of donated items?
              </AccordionTrigger>
              <AccordionContent>
                After connecting with an association, you can arrange delivery
                through our messaging system. Some associations offer pickup
                services, while others may have drop-off locations or events.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Is there a cost to use the platform?
              </AccordionTrigger>
              <AccordionContent>
                Kheirkom is completely free. Associations can post their needs
                and receive donations without any fees. We believe in making
                giving back as accessible as possible.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
