import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Header />
      <Timeline />
    </div>
  );
}
