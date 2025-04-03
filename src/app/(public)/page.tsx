import Hero from "@/components/Hero";
import Companies from "@/components/Companies";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import LastCallToAction from "@/components/LastCallToAction";
import RecentPosts from "@/components/RecentPosts";

export default async function Home() {
  return (
    <>
      <div className="wrapper">
        <Hero />
        <Companies />
        <AboutSection />
        <TeamSection />
        <RecentPosts />
      </div>
      <LastCallToAction />
      <Footer />
    </>
  );
}
