import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SLIDES = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1400&q=80",
    badge: "Trending now",
    title: "Mike's famous salad with cheese",
    author: "By John Mike",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1400&q=80",
    badge: "New this week",
    title: "Wood-fired margherita pizza",
    author: "By Sarah Chen",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1400&q=80",
    badge: "Editor's pick",
    title: "Garden bowl with lemon tahini",
    author: "By Alex Rivera",
  },
];

function HeroCarousel() {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="hero-carousel">
      <Swiper
        className="hero-carousel__swiper"
        slidesPerView={1}
        spaceBetween={0}
        speed={450}
        onSwiper={setSwiper}
        onSlideChange={(s) => setActiveIndex(s.activeIndex)}
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className="hero-carousel__swiper-slide">
            <div
              className="hero-carousel__slide"
              style={{ backgroundImage: `url(${slide.image})` }}
              role="img"
              aria-label={slide.title}
            >
              <div className="hero-carousel__overlay">
                <p className="hero-carousel__badge">{slide.badge}</p>
                <h2 className="hero-carousel__title">{slide.title}</h2>
                <p className="hero-carousel__author">{slide.author}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hero-carousel__controls" aria-label="Carousel controls">
        <button
          type="button"
          className="hero-carousel__arrow"
          onClick={() => swiper?.slidePrev()}
          aria-label="Previous slide"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <div className="hero-carousel__dots" role="tablist" aria-label="Slides">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Slide ${index + 1}`}
              className={
                index === activeIndex
                  ? "hero-carousel__dot hero-carousel__dot--active"
                  : "hero-carousel__dot"
              }
              onClick={() => swiper?.slideTo(index)}
            />
          ))}
        </div>
        <button
          type="button"
          className="hero-carousel__arrow"
          onClick={() => swiper?.slideNext()}
          aria-label="Next slide"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  );
}

export default HeroCarousel;
