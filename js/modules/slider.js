import {getZero} from "./timer";

function slider({prevArrow, nextArrow, sliderP, currentCount, totalCount, allSlides, wrapper, field}) {
    const prev = document.querySelector(prevArrow),
          next= document.querySelector(nextArrow),
          sliderParent = document.querySelector(sliderP),
          current = document.querySelector(currentCount),
          total = document.querySelector(totalCount),
          slides = document.querySelectorAll(allSlides),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;


    let slideIndex = 0;
    let offset = 0;
    let dots = [];

    sliderParent.style.position = "relative";

    const carouselIndicators = document.createElement("ol");
    carouselIndicators.classList.add("carousel-indicators");

    sliderParent.append(carouselIndicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.classList.add("dot");
        dot.setAttribute("data-slide-to", i)

        dots.push(dot);
    }

    dots.forEach(dot => {
        carouselIndicators.append(dot);
        if (dot.getAttribute("data-slide-to") == 0) {
            dot.style.opacity = "1";
        }
    })


    total.textContent = getZero(slides.length);
    current.textContent = getZero(slideIndex + 1);

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";

    slidesWrapper.style.overflow = "hidden";

    slides.forEach(item => {
        item.style.width = width;
    })
    
    function getRidOfPX(str) {
        return +str.replace(/px/, '');
    }

    function highlightDot(element) {
        dots.forEach(item => item.style.opacity = "0.5");
        element.style.opacity = "1";
    }
    
    next.addEventListener("click", () => {
        if (offset == getRidOfPX(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += getRidOfPX(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex > slides.length - 2) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        current.textContent = getZero(slideIndex + 1);  

        highlightDot(dots[slideIndex]);
    });

    prev.addEventListener("click", () => {
        if (offset == 0) {
			offset = getRidOfPX(width) * (slides.length - 1);
		} else {
			offset -= getRidOfPX(width);
		}

        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex < 1) {
            slideIndex = slides.length -1;
        } else {
            slideIndex--;
        }
        current.textContent = getZero(slideIndex + 1);

        highlightDot(dots[slideIndex]);
    });

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            highlightDot(dot);

            const slideTo = +dot.getAttribute("data-slide-to")
            offset = getRidOfPX(width) * (slideTo);
            slidesField.style.transform = `translateX(-${offset}px)`

            slideIndex = slideTo+1;

            if (slideIndex < 10) {
                current.textContent = `0${slideIndex}`
            } else {
                current.textContent = slideIndex;
            }
        });
    });
}

export default slider;