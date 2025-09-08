/*  ---------------------------------------------------
    Template Name: Foodeiblog
    Description:  Foodeiblog Blog HTML Template
    Author: Colorlib
    Author URI: https://colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Humberger Menu
    $(".humberger__open").on('click', function () {
        $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").addClass("active");
    });

    $(".humberger__menu__overlay").on('click', function () {
        $(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").removeClass("active");
    });

    //Search Switch
    $('.search-switch').on('click',function() {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click',function() {
        $('.search-model').fadeOut(400,function() {
            $('#search-input').val('');
        });
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Carousel Slider
    --------------------*/
    var hero_s = $(".hero__slider");
    hero_s.owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<span class='arrow_carrot-left'><span/>", "<span class='arrow_carrot-right'><span/>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

})(jQuery);

const chatbotPopup = document.getElementById("chatbot-popup");
const answerBox = document.getElementById("answer");

// Sample answers for Haryana Tax website
const answers = [
  "To pay e-Challan, visit the 'e-Services' section and select 'e-Challan Payment'.",
  "For VAT/GST refund, login and go to the 'Refunds' section. Submit required documents.",
  "You can check status in 'Track Application Status' under the main menu.",
  "Click on 'Dealer Login' on the homepage, then enter your credentials.",
  "Visit 'New Registration' in the main menu and fill the required details."
];

function toggleChatbot() {
  chatbotPopup.style.display = chatbotPopup.style.display === "block" ? "none" : "block";
  answerBox.style.display = "none";
  answerBox.innerHTML = '';
}

function showAnswer(index) {
  answerBox.innerHTML = answers[index];
  answerBox.style.display = "block";
}
// Toggle the chatbot
function toggleChatbot() {
  const isOpen = chatbotPopup.style.display === "block";
  chatbotPopup.style.display = isOpen ? "none" : "block";
  answerBox.style.display = "none";
  answerBox.innerHTML = '';

  // If opening the popup, enable outside click listener
  if (!isOpen) {
    document.addEventListener("click", outsideClickListener);
  } else {
    document.removeEventListener("click", outsideClickListener);
  }
}

// Detect outside click
function outsideClickListener(event) {
  const isClickInside = chatbotPopup.contains(event.target) || event.target.id === "chatbot-icon";
  if (!isClickInside) {
    chatbotPopup.style.display = "none";
    document.removeEventListener("click", outsideClickListener);
  }
}

document.getElementById("chatbot-icon").addEventListener("click", function (e) {
  e.stopPropagation(); // Prevent triggering outside click logic
  toggleChatbot();
});





// Function to speak the given text

// ---------- core helper ----------
    function speak(text) {
      // cancel anything already playing
      window.speechSynthesis.cancel();

      const utter = new SpeechSynthesisUtterance(text);
      utter.lang   = 'en-US';    // change to 'hi-IN' for Hindi, etc.
      utter.pitch  = 1.0;        // 0 – 2
      utter.rate   = 1.0;        // 0.1 – 10
      utter.volume = 1.0;        // 0 – 1
      window.speechSynthesis.speak(utter);
    }

    // ---------- attach events ----------
    document.querySelectorAll('.speak-on-hover').forEach(el => {
      el.addEventListener('mouseenter', () => speak(el.innerText));
      el.addEventListener('mouseleave',  () => window.speechSynthesis.cancel());
    });

 let voiceEnabled = true;

    const toggleBtn = document.getElementById('toggleSpeak');
    const menuLinks = document.querySelectorAll('#menu a');

    // Toggle voice on/off
    toggleBtn.addEventListener('click', () => {
      voiceEnabled = !voiceEnabled;
      toggleBtn.textContent = voiceEnabled ? '🔊' : '🔇';
    });

    // Speak helper
    function speak(text) {
      if (!voiceEnabled) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      utter.rate = 1;
      utter.pitch = 1;
      window.speechSynthesis.speak(utter);
    }

    // Add hover voice
    menuLinks.forEach(link => {
      link.addEventListener('mouseenter', () => speak(link.textContent.trim()));
      link.addEventListener('mouseleave', () => window.speechSynthesis.cancel());
    });

    