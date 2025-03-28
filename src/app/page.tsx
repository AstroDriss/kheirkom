import Hero from "@/components/Hero";
import Companies from "@/components/Companies";
import Footer from "@/components/Footer";

export default async function Home() {
  return (
    <>
      <div className="container">
        <Hero />
        <Companies />
      </div>
      <Footer />
    </>
  );
}
