import Footer from "@/components/shared/HomePage/Footer";
import LandingPage from "@/components/shared/HomePage/LandingPage";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-between items-center pb-2 h-dvh">
        <LandingPage />
        <Footer />
      </div>
    </>
  );
}
