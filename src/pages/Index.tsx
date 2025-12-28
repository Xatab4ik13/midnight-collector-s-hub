import { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import FloatingCart from '@/components/FloatingCart';
import FloatingTelegram from '@/components/FloatingTelegram';

// Lazy load sections below the fold
const ContentsSection = lazy(() => import('@/components/ContentsSection'));
const GuaranteesSection = lazy(() => import('@/components/GuaranteesSection'));
const FAQSection = lazy(() => import('@/components/FAQSection'));

// Loading fallback
const SectionSkeleton = () => (
  <div className="py-20 md:py-32 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={<SectionSkeleton />}>
          <ContentsSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <GuaranteesSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <FAQSection />
        </Suspense>
      </main>
      <Footer />
      <FloatingCart />
      <FloatingTelegram />
    </div>
  );
};

export default Index;
