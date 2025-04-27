import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Gift,
  HandHeart,
  MessageSquare,
  Search,
  Share2,
  Users,
} from "lucide-react";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Comment Kheirkom Fonctionne
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Notre plateforme facilite la mise en relation des volontaires avec
              les associations ayant besoin de soutien, permettant ainsi à
              chacun de s&apos;engager facilement et efficacement.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12">
          <Tabs defaultValue="donors" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="donors">Pour les volontaires</TabsTrigger>
              <TabsTrigger value="associations">
                Pour les Associations
              </TabsTrigger>
            </TabsList>
            <TabsContent value="donors" className="mt-6">
              <div className="grid gap-8 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="rounded-full bg-rose-100 p-3 mb-4">
                      <Search className="h-6 w-6 text-rose-600" />
                    </div>
                    <CardTitle>Trouvez des Causes</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p>
                      Parcourez les annonces des associations sur leurs besoins
                      actuels et découvrez comment vous pouvez vous engager en
                      tant que volontaire pour apporter votre aide.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="rounded-full bg-rose-100 p-3 mb-4">
                      <Gift className="h-6 w-6 text-rose-600" />
                    </div>
                    <CardTitle>Offrir votre Temps et vos Compétences</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p>
                      Engagez-vous en tant que volontaire et apportez votre aide
                      aux associations en fonction de leurs besoins : soutien,
                      expertise, ou accompagnement.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="rounded-full bg-rose-100 p-3 mb-4">
                      <Share2 className="h-6 w-6 text-rose-600" />
                    </div>
                    <CardTitle>Partagez votre Engagement</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p>
                      Publiez vos actions solidaires et inspirez les autres à
                      rejoindre le mouvement en s&apos;engageant eux aussi en
                      tant que volontaires.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="associations" className="mt-6">
              <div className="grid gap-8 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="rounded-full bg-rose-100 p-3 mb-4">
                      <MessageSquare className="h-6 w-6 text-rose-600" />
                    </div>
                    <CardTitle>Publier vos Annonces</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p>
                      Partagez les besoins spécifiques de votre association avec
                      notre communauté de volontaires prêts à s&apos;engager.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="rounded-full bg-rose-100 p-3 mb-4">
                      <Users className="h-6 w-6 text-rose-600" />
                    </div>
                    <CardTitle>Connectez-vous avec des Volontaires</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p>
                      Communiquez directement avec des volontaires pour
                      coordonner l&apos;engagement et la réalisation des
                      missions de soutien.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="rounded-full bg-rose-100 p-3 mb-4">
                      <HandHeart className="h-6 w-6 text-rose-600" />
                    </div>
                    <CardTitle>Montrez Votre Impact</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p>
                      Partagez des histoires sur la manière dont
                      l&apos;engagement des volontaires a aidé votre cause et
                      renforcé votre communauté.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
