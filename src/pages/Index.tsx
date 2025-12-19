import HeroSection from '@/components/HeroSection';
import EditionSection from '@/components/EditionSection';
import ContentsSection from '@/components/ContentsSection';
import OrderForm from '@/components/OrderForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <EditionSection />
        <ContentsSection />
        <OrderForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
