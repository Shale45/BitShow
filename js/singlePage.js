$(document).ready(function () {
  let id = localStorage.getItem("id");

  let single = $.ajax({
    url: "http://api.tvmaze.com/shows/" + id,
    method: "GET",
    data: {
      embed: ["seasons", "cast"]
    }
  });

  single.done(result => {

    let h1 = $("h1").text(result.name);
    let img = $(".card-img");
    img.attr("src", result.image.original).attr("alt", result.name);

    let season = $("<ul>");
    let numberOfSeasons = result._embedded.seasons.length;
    result._embedded.seasons.forEach(function (element) {
      let seasonItem = $("<li>");
      seasonItem.text("" + element.premiereDate + " - " + element.endDate);
      season.append(seasonItem);

    }, this);

    let cast = $("<ul>");
    result._embedded.cast.forEach(function (element) {
      let castItem = $("<li>");
      castItem.text("" + element.character.name);
      cast.append(castItem);

    }, this);

    $("#number-of-seasons").append("(" + numberOfSeasons + ")");
    $("#seasons").append(season);
    $("#casts").append(cast);
    $(".single-text").append(result.summary);

  });
});
