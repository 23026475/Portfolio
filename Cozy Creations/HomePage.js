let slideIndex = 1;
showSlides(slideIndex);

//controls
function plusSlides(n){
    showSlides(slideIndex += n);
}

//image controls
function currentSlide(n){
    let i;
    showSlides(slideIndex = n);
    let slides = document.getElementsByClassName("mySlide");
    let dots = document.getElementsByClassName("dot");
    let captionText = document.getElementsByClassName("myCaption");
    if(n > plusSlides.length) {slideIndex = 1}
    if(n < 1) {slideIndex = slides.length}
    for(i=0; i<slides.length; i++){
        slides[i].style.display = "none";
    }
    for(i = 0;i < dots.length; i++){
        dots[i].className = dots[i].className.replace("activate","");
    }
    slides[slideIndex-1].style.display= "block";
    dots[slideIndex-1].className += "activate";
   
}



