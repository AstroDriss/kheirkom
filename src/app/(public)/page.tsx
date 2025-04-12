import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import LastCallToAction from "@/components/LastCallToAction";
import HowItWorks from "./landing/HowItWorks";
import FAQ from "./landing/FAQ";
import RecentPosts from "./landing/RecentPosts";

export default async function Home() {
  return (
    <>
      <div className="wrapper">
        <Hero />

        {/* Stats Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-rose-600">2+</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  Registered Associations
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-rose-600">7+</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Donors
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-rose-600">0</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  Items Donated
                </p>
              </div>
            </div>
          </div>
        </section>

        <HowItWorks />
        <AboutSection />
        <RecentPosts />
        <FAQ />
      </div>
      <LastCallToAction />
      <Footer />
    </>
  );
}
