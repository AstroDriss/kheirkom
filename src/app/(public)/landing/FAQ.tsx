import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
      <div className=" px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Questions Fréquemment Posées
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Trouvez les réponses aux questions courantes sur notre plateforme.
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
                Comment savoir que mon engagement va aux bonnes associations ?
              </AccordionTrigger>
              <AccordionContent>
                Toutes les associations sur notre plateforme passent par un
                processus de vérification. Nous vérifions leur statut
                d&apos;enregistrement, leurs informations de contact et leur
                historique avant qu&apos;elles ne puissent publier leurs besoins
                ou accueillir des volontaires.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Comment coordonner mon engagement avec les associations ?
              </AccordionTrigger>
              <AccordionContent>
                Vous pouvez communiquer directement avec les associations via la
                plateforme pour coordonner vos missions de bénévolat et définir
                les modalités de votre aide.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Y a-t-il un coût pour utiliser la plateforme ?
              </AccordionTrigger>
              <AccordionContent>
                Non, l&apos;utilisation de la plateforme est gratuite pour les
                volontaires. Nous facilitons simplement la mise en relation avec
                les associations en quête de soutien.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
