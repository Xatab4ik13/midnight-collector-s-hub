import HeroSection from '@/components/HeroSection';
import ContentsSection from '@/components/ContentsSection';
import GuaranteesSection from '@/components/GuaranteesSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import FloatingCart from '@/components/FloatingCart';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <ContentsSection />
        <GuaranteesSection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingCart />
    </div>
  );
};

export default Index;
