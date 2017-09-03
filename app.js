// $.ajax({
//     url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
//     type: 'GET', // The HTTP Method
//     data: {
//       collectible: 1,
//     }, // Additional parameters here
//     datatype: 'json',
//     success: function(data) {
//       var CardData = []
//       for (i = 0; i < standard.length; i++) {
//         CardData.push(data[standard[i]])
//       }
//       CardData = [].concat.apply([], CardData);
//       console.log(CardData)
//       // initialize(CardData);
//     },
//     error: function(err) { console.log(err); },
//     beforeSend: function(xhr) {
//     xhr.setRequestHeader("X-Mashape-Authorization", "hiDNPnZIZ5mshn7mb4HvG6dtL0NZp1P4wUujsnE9Ch9dOsWVF2"); // Enter here your Mashape key
//     }
// });

var standard = ['Basic', 'Classic', "Journey to Un'Goro", 'Knights of the Frozen Throne', 'Mean Streets of Gadgetzan', 'One Night in Karazhan', 'Whispers of the Old Gods'];


function initialize(CardData) {

  function getCardByCost(cost) {
    return CardData.filter(function (index) {
        return (index.cost === cost && index.type === "Minion" && index.collectible === true);
    });
  }

  // var costSeven = getCardByCost(7);
  // console.log(getCardByCost(7));




  function buildCard(card) {
    var cardTemplate = `
    <div class="col s12 m3">
      <div class="card">
        <div class="card-content">
          <img src="${card.img}" />
        </div>
      </div>
    </div>`
    $('.card-container').append(cardTemplate);
  }

  function evolve(startingCard) {
    // console.log(startingCard.cost)
    if (startingCard.cost < 11) {
      var newCost = startingCard.cost + 1;
      return getRandomCard(newCost)
    } else {
      console.log("this minion TOO THICC")
      return startingCard
    }
  }

  $('.evolve-cards').click(function(event) {
    $('.card-container').empty();
    for (var i = 0; i < cardList.length; i++) {
      cardList[i] = evolve(cardList[i])
      // console.log(cardList)
    }
    // console.log(cardList)
    buildCardList();

  });

  function getRandomCard(cost) {
    var cardCost = getCardByCost(cost);
    var randomCard = cardCost[Math.floor(Math.random()*cardCost.length)]
    return randomCard;
  }

  // var cardList = [
  //   getRandomCard(1),
  //   getRandomCard(2),
  //   getRandomCard(3),
  //   getRandomCard(4)
  // ]

  var cardList = []

  function getCardList() {
    $('select.card-value').each(function(index, el) {
      if ($(this).val() != null) {
        var cardValue = parseInt($(this).val());

        cardList.push(getRandomCard(cardValue));
      }
    });
  }

  function buildCardList() {
    $('.card-container').empty()
    for (var i = 0; i < cardList.length; i++) {
      buildCard(cardList[i]);
    }
  }

  $('.start-button').click(function(event) {
    getCardList();
    buildCardList();
  });



  buildCardList();

}

initialize(CardData)