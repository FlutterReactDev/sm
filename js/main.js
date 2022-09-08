$(document).ready(function () {
  $(".anyclass").click(function () {
    // Действие при клике
    $(".anyclass").hide(200); // Действие скрывать
    $(".anyclass").show(200); // Действие показывать
    $(".anyclass").fadeOut(300); // Плавное исчезновение
    $(".anyclass").fadeIn(300); // Плавное показ
    $(".anyclass").fadeTo(300, 0.5).fadeTo(300, 1); // Исчезновение и Показ

    $(".anyclass").css({
      // Css свойства
      display: "flex",
    });

    $(".anyclass").animate(
      {
        // анимирование на высоту или ширину
        display: "flex",
      },
      3000
    );

    $(".anyclass").slideUp(300); // Сворачивать Скрывать с верху

    $(".anyclass").slideDown(300); // Сворачивать Показывать с верху

    $(".anyclass").text(Hi); // текст

    $(".anyclass").width(150); // ширина
    $(".anyclass").height(300); // высота
  });
  incTab();
  cardsAnimation();
  slider();
});

function incTab() {
  $(".ind_list_item").click(function (e) {
    var data = "";

    $(".ind_list_item").removeClass("ind_list_item--active");
    if (e.target.parentNode.classList.contains("ind_list_item")) {
      $(e.target.parentNode).addClass("ind_list_item--active");
      data = $(e.target.parentNode).attr("data-tab");
    } else {
      $(e.target).addClass("ind_list_item--active");

      data = $(e.target).attr("data-tab");
    }

    $(".inc_icon_tab").css({ display: "none" });
    $(`.ind-text-tab`).css({ display: "none" });
    $(`.inc_icon_tab[data-content='${data}']`).fadeIn();
    $(`.ind-text-tab[data-content='${data}']`).fadeIn();
  });

  $(".inc_icon_tab").first().fadeIn();
  $(".ind-text-tab").fadeOut();
  $(".ind-text-tab").first().fadeIn();
}
function cardsAnimation() {
  $(".card").click(function (e) {
    if ($(e.target).attr("data-card")) {
      $(".about_card").first().addClass("about-card--move");
      setTimeout(() => {
        $(".about_card").first().removeClass("about-card--move");
        $(".about_card").first().remove();

        $(".about_cards").prepend(createCard($(e.target).attr("data-card")));

        $(".about_card").first().addClass("about_card-animate");
      }, 350);
    }
  });
  function createCard(img) {
    return `<div class="about_card">
              <img src="img/card${img}.svg" alt=""/>
            </div>`;
  }
}
function slider() {
  var currentSlide = 0;
  var currentQuiz = 1;
  var currentQuizActive = 0;
  
  var activeElemets = {};
  var data = {
    projectType: "",
    projectPlatform: "",
    projectState: "",
    projectStart: "",
    contact: {
      username: "",
      phone: "",
      email: "",
      comment: "",
    },
  };
  $(".quiz_content").css({ display: "none" });
  $(".quiz_content").first().css({ display: "block" });
  $(".brief_breadcrumbs_item")
    .first()
    .addClass("brief_breadcrumbs_item--active");

  $(".quiz_list_item").click(function (e) {
    var dataValue = "";
    var dataProp = "";
    var dataQuiz = "";
    $(".quiz_list_item").removeClass("quiz_list_item--active");
    $(".brief_breadcrumbs_item")
      .eq(currentQuizActive)
      .addClass("brief_breadcrumbs_item--filled");

    if (e.target.parentNode.classList.contains("quiz_list_item")) {
      $(e.target.parentNode).addClass("quiz_list_item--active");
      dataValue = $(e.target.parentNode).attr("data-value");
      dataProp = $(e.target.parentNode).attr("data-prop");
      dataQuiz = $(e.target.parentNode).attr("data-quiz");
      activeElemets[dataQuiz] = dataValue;
    } else {
      $(e.target).addClass("quiz_list_item--active");
      dataValue = $(e.target).attr("data-value");
      dataProp = $(e.target).attr("data-prop");
      dataQuiz = $(e.target).attr("data-quiz");
      activeElemets[dataQuiz] = dataValue;
    }
    addActiveClass(activeElemets);
    data[dataProp] = dataValue;
    $(".brief_breadcrumbs_item .brief_breadcrumbs_item_name")
      .eq(dataQuiz)
      .text(data[dataProp]);
     
  });
  $(".brief_quiz_btn-next").click(function () {
    if(activeElemets[currentSlide]) {
      nextSlider();
    }
    
  });
  $(".brief_quiz_btn-prev").click(function () {
    prevSlider();
  });

  $(".brief_quiz_btn-submit").click(onSubmit);
  function onSubmit() {
    console.log(data);
  }
  function nextSlider() {
    $(".quiz_content").eq(currentSlide).fadeOut();
    $(".brief_breadcrumbs_item").removeClass("brief_breadcrumbs_item--active");
    itemPick = ''
    currentSlide++;
    currentQuizActive++;
    if (currentQuizActive > 4) {
      currentQuizActive = 4;
    }
    if ($(".quiz_content").eq(currentSlide).attr("data-pass") == "false") {
      currentQuiz++;
    }
    if (currentSlide > 4) {
      currentSlide = 4;
    }
    if (currentQuiz > 5 && currentSlide > 4) {
      currentQuiz = 5;
    }
    if (currentSlide == 4) {
      $(".brief_quiz_btn-submit").css({ display: "inline-block" });
      $(".brief_quiz_btn-next").css({ display: "none" });
    }
    $(".brief_breadcrumbs_item")
      .eq(currentQuizActive)
      .addClass("brief_breadcrumbs_item--active");
   
      $(".progress_bar").css({ width: `${currentQuiz * 60 - 4}` });
    

    $(".quiz_step span").text(currentQuiz);
    $(".quiz_content").eq(currentSlide).attr("data-pass", "true");
    setTimeout(function () {
      $(".quiz_content").eq(currentSlide).fadeIn();
    }, 400);
  }
  function prevSlider() {
    $(".quiz_content").eq(currentSlide).fadeOut();
    $(".brief_quiz_btn-submit").css({ display: "none" });
    $(".brief_quiz_btn-next").css({ display: "inline-block" });
    currentSlide--;
    currentQuizActive--;
    if (currentQuizActive < 0) {
      currentQuizActive = 0;
    }
    if (currentSlide < 0) {
      currentSlide = 0;
    }
    $(".brief_breadcrumbs_item").removeClass("brief_breadcrumbs_item--active");
    $(".brief_breadcrumbs_item")
      .eq(currentQuizActive)
      .addClass("brief_breadcrumbs_item--active");
    setTimeout(function () {
      $(".quiz_content").eq(currentSlide).fadeIn();
    }, 400);
  }
  function addActiveClass(items) {
    for (const key in items) {
      $(`.quiz_list_item[data-value="${items[key]}"]`).addClass(
        "quiz_list_item--active"
      );
    }
  }
}
