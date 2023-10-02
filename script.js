const slideWrapper = document.querySelector(".slides");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
let slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot_container span");

console.log(dots);

let index = 1;
let timeInt;
const interval = 1200;

const firstClone  = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "firstClone";
lastClone.id = "lastClone";

slideWrapper.prepend(lastClone);
slideWrapper.append(firstClone);

slideWrapper.style.transform = "translateX(-100%)";
dots[0].classList.add("dot_active");


const startSlide = () => {
    timeInt = setInterval(() => {
       moveToNext();
    }, interval);
}

const getSlides = () => document.querySelectorAll(".slide");


slideWrapper.addEventListener("transitionend",() => {
    slides = getSlides();
    if(slides[index].id === firstClone.id){
        slideWrapper.style.transition = "none";
        index = 1;
        slideWrapper.style.transform = `translateX(-${index * 100}%)`;
    }

    if(slides[index].id === lastClone.id){
        slideWrapper.style.transition = "none";
        index = slides.length - 2;
        slideWrapper.style.transform = `translateX(-${index * 100}%)`;
    }
})


const moveToNext = () => {
    slides = getSlides();
    if(index >= slides.length - 1) return;
    console.log(index);
    if(index < 10){
        dots[index - 1].classList.remove("dot_active");
        if(!dots[index].classList.contains("dot_active")){
            dots[index].classList.add("dot_active"); 
        }   
    }else{
        dots[index - 1].classList.remove("dot_active");
        dots[0].classList.add("dot_active");
    }
    index++;
    slideWrapper.style.transform = `translateX(-${index * 100}%)`;
    slideWrapper.style.transition = "0.7s ease-out";
}

const moveToPrev = () => {
    if(index <= 0) return;
    index--;
    if(index > 0){
        dots[index].classList.remove("dot_active");
        if(!dots[index - 1].classList.contains("dot_active")){
            dots[index - 1].classList.add("dot_active"); 
        }   
    }else{
        dots[0].classList.remove("dot_active");
        dots[dots.length - 1].classList.add("dot_active");
        
    }
    slideWrapper.style.transform = `translateX(-${index * 100}%)`;
    slideWrapper.style.transition = "0.7s ease-out";
}

slideWrapper.addEventListener("mouseenter",() => {
    clearInterval(timeInt);
})

slideWrapper.addEventListener("mouseleave",startSlide);

nextBtn.addEventListener("click",moveToNext);

prevBtn.addEventListener("click",moveToPrev);

dots.forEach((dot,i) => {
    dot.addEventListener("click" ,() => {
        dots[index - 1].classList.remove("dot_active")
        index = i + 1;
        dots[i].classList.add("dot_active")
        slideWrapper.style.transform = `translateX(-${index * 100}%)`;
        slideWrapper.style.transition = "0.7s ease-out";
    })
})

startSlide()
