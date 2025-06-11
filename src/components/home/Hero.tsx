import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ added
import Button from '../ui/Button';

const heroSlides = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1600',
    title: 'Luxury & Performance',
    subtitle: 'Experience the thrill of driving excellence',
    cta: 'Browse Luxury Models',
ctaLink: '#vehicles'   },
  {
    id: 2,
    mediaType: 'video',
    mediaSrc: 'https://cdn.pixabay.com/video/2015/11/27/1406-147169807_medium.mp4',
    title: 'Electric Revolution',
    subtitle: 'Discover our premium electric vehicle range',
    cta: 'View Electric Vehicles',
ctaLink: '#vehicles'   },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1600',
    title: 'Unmatched Luxury',
    subtitle: 'Premium SUVs for those who demand the best',
    cta: 'Explore Luxury SUVs',
ctaLink: '#vehicles'   }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate(); // ✅ added

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

 return (
  <div className="relative h-screen overflow-hidden">
    {/* Slides */}
    <div className="absolute inset-0">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />

          {/* Image or Video */}
          {slide.mediaType === 'video' ? (
            <video
              src={slide.mediaSrc}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          )}

          {/* Overlay Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 opacity-0 animate-[fadeInUp_1s_0.3s_forwards]">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8 opacity-0 animate-[fadeInUp_1s_0.5s_forwards]">
                  {slide.subtitle}
                </p>
                <div className="opacity-0 animate-[fadeInUp_1s_0.7s_forwards]">
                  <Button
                    size="lg"
                    onClick={() => {
                      if (slide.ctaLink?.startsWith('#')) {
                        const section = document.querySelector(slide.ctaLink);
                        if (section) section.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        navigate(slide.ctaLink || '/');
                      }
                    }}
                  >
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Navigation buttons */}
    <button
      onClick={prevSlide}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors duration-200"
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
    <button
      onClick={nextSlide}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors duration-200"
      aria-label="Next slide"
    >
      <ChevronRight className="w-6 h-6" />
    </button>

    {/* Indicators */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
      {heroSlides.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`w-3 h-3 rounded-full transition-colors duration-200 ${
            index === currentSlide ? 'bg-white' : 'bg-white/50'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  </div>
);

};

export default Hero;
