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
              How Kheirkom Works
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform makes it easy to connect donors with associations in
              need
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12">
          <Tabs defaultValue="donors" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="donors">For Donors</TabsTrigger>
              <TabsTrigger value="associations">For Associations</TabsTrigger>
            </TabsList>
            <TabsContent value="donors" className="mt-6">
              <div className="grid gap-8 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="rounded-full bg-rose-100 p-3 mb-4">
                      <Search className="h-6 w-6 text-rose-600" />
                    </div>
                    <CardTitle>Find Causes</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p>
                      Browse through announcements from associations about their
                      current needs
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="rounded-full bg-rose-100 p-3 mb-4">
                      <Gift className="h-6 w-6 text-rose-600" />
                    </div>
                    <CardTitle>Donate Items</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p>
                      Donate your clothes, books, toys, or other items to
                      associations in need
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="rounded-full bg-rose-100 p-3 mb-4">
                      <Share2 className="h-6 w-6 text-rose-600" />
                    </div>
                    <CardTitle>Share Your Impact</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p>
                      Post about your donations and inspire others to join the
                      movement
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
                    <CardTitle>Post Announcements</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p>
                      Share your organization&amp;s specific needs with our
                      community of donors
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="rounded-full bg-rose-100 p-3 mb-4">
                      <Users className="h-6 w-6 text-rose-600" />
                    </div>
                    <CardTitle>Connect with Donors</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p>
                      Communicate directly with donors to coordinate donations
                      and pickups
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="rounded-full bg-rose-100 p-3 mb-4">
                      <HandHeart className="h-6 w-6 text-rose-600" />
                    </div>
                    <CardTitle>Show Your Impact</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p>
                      Share stories about how donations have helped your cause
                      and community
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
