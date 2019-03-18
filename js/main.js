$(document).ready(function () {
  const url = "http://api.tvmaze.com/shows";
  $.getJSON(url, function (result) {

    $.each(result, (i, element) => {

      if (element.id <= 50) {

        let link = $('<a>');
        let card = $('<div class="card" style="width: 19rem;"></div>');
        let img = $('<img class="card-img-top">');
        let cardBody = $('<div class="card-body"></div>');
        let h3 = $('<h4 class="card-text"></h4>');

        link.attr("title", "Click for more information");
        link.attr("id", element.id);
        link.attr("href", "singlePage.html");
        img.attr("src", element.image.medium).attr("alt", element.name);
        card.append(img).append(cardBody);
        h3.text(element.name);
        link.append(h3);
        cardBody.append(link);

        $(".row").append(card);
      };
    });
  });
});


$(document).on("change keyup", ".form-control", function () {
  let val = $(".form-control").val();

  const url = "http://api.tvmaze.com/search/shows?q=" + val;

  $.getJSON(url, function (result) {
    $(".search-list").html("");

    $.each(result, (i, element) => {

      let id = element.show.id;
      let title = element.show.name;

      let listItem = $("<li>");
      let link = $("<a>");

      link.attr("href", "#");
      link.attr("id", id);

      listItem.text(title);
      link.append(listItem);
      $(".search-list").append(link);

    });
  });
});


$(document).on("click", "a", function () {
  let id = $(this).attr("id");

  localStorage.setItem("id", id);
  location.replace("singlePage.html");
});
