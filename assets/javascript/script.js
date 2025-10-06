document.addEventListener("DOMContentLoaded", () => {
  const sliderTrack = document.getElementById("sliderTrack");
  const slides = document.querySelectorAll(".slide");
  const carouselStatus = document.getElementById("carouselStatus");
  let currentIndex = 0;
  const totalSlides = slides.length;
  let interval = null;

  const updateSlider = () => {
    sliderTrack.style.transform = `translateX(${-currentIndex * 100}%)`;

    const slideLabel = slides[currentIndex].getAttribute("aria-label");
    carouselStatus.textContent = `Slide ${
      currentIndex + 1
    } of ${totalSlides}: ${slideLabel}`;
  };

  const autoSlide = () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  };

  const startAutoSlide = () => {
    if (interval) clearInterval(interval);
    interval = setInterval(autoSlide, 4000);
  };

  const stopAutoSlide = () => {
    if (interval) clearInterval(interval);
  };

  updateSlider();
  startAutoSlide();

  const sliderContainer = sliderTrack.parentElement;

  sliderContainer.addEventListener("mouseenter", stopAutoSlide);
  sliderContainer.addEventListener("mouseleave", startAutoSlide);
  sliderContainer.addEventListener("focusin", stopAutoSlide);
  sliderContainer.addEventListener("focusout", startAutoSlide);

  sliderContainer.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "Right") {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
      stopAutoSlide();
    } else if (e.key === "ArrowLeft" || e.key === "Left") {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlider();
      stopAutoSlide();
    }
  });
});

/*Note:
Slider bergerak otomatis setiap 4 detik (otomatis saat halaman dimuat),
bisa dijeda saat mouse hover atau focus (hover atau tab ke slider),
bisa dikendalikan dengan keyboard (panah kiri dan kanan)
dan tambahan untuk aksesibilitas untuk pembaca layar seperti elemen carouselStatus.*/