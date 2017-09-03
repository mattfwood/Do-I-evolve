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

function filterSets(sets) {
  if (sets == 'standard') {
    return CardData.filter(function (index) {
        return (index.cardSet === 'Basic' || index.cardSet === 'Classic' || index.cardSet === "Journey to Un'Goro" || index.cardSet === 'Knights of the Frozen Throne' || index.cardSet === 'Mean Streets of Gadgetzan' || index.cardSet === 'One Night in Karazhan' && index.collectible === true);
    });
  }
}

// console.log(filterSets('standard'));


// index.cardSet === 'Basic' || index.cardSet === 'Classic' || index.cardSet === "Journey to Un'Goro" || index.cardSet === 'Knights of the Frozen Throne' || index.cardSet === 'Mean Streets of Gadgetzan' || index.cardSet === 'One Night in Karazhan' ||

function setCollection(sets) {
  if (sets == 'standard') {
    var CardCollection = filterSets(sets)
  }

  if (sets == 'wild') {
    // figure out wild later
    var CardCollection = CardData
  }

  console.log(CardCollection)

  initialize(CardCollection)

}





function initialize(CardCollection) {

  // filters

  function getCardByCost(cost) {
    return CardCollection.filter(function (index) {
        return (index.cost === cost && index.type === "Minion" && index.collectible === true);
    });
  }

  function filterCards(mechanic, cost) {
    var matchedCards = []

    for (i = 0; i < CardCollection.length; i++) {
      if (CardCollection[i].mechanics != undefined && CardCollection[i].cost == cost) {
        for (m = 0; m < CardCollection[i].mechanics.length; m++) {
          if (CardCollection[i].mechanics[m].name == mechanic) {
            matchedCards.push(CardCollection[i])
          }
        }
      }
    }

    for (i = 0; i < matchedCards.length; i++) {
      buildMatchedCard(matchedCards[i])
    }

    return matchedCards
  }

  function costCount(cost) {
    var costTotal = []
    for (i = 0; i < CardCollection.length; i++) {
      if (CardCollection[i].cost == cost) {
        costTotal.push(CardCollection[i])
      }
    }

    return costTotal.length
  }

  function calculateChance(cardCost, mechanic) {

    var newCost = cardCost + 1

    return ((filterCards(mechanic, newCost).length / costCount(newCost)) * 100).toFixed(2) + '%'
  }

  function buildCard(card) {

    var mechanic = $('select.card-mechanic').val()

    var cardTemplate = `
    <div class="col s6 m2">
      <div class="hs-card">
          <img src="${card.img}" />
      </div>
      <span class="badge new">
        ${calculateChance(card.cost, mechanic)}
      </span>
      <div class="percent-label">
        chance you evolve into a minion with ${mechanic}
      </div>
    </div>`
    $('.card-container').append(cardTemplate);
  }

  function buildMatchedCard(card) {

    var mechanic = $('select.card-mechanic').val()

    var cardTemplate = `
    <div class="col s6 m2">
      <div class="hs-card">
          <img src="${card.img}" />
      </div>
    </div>`
    $('.match-container').append(cardTemplate);
  }

  function evolve(startingCard) {
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

  var cardList = []


  function getCardList() {

    cardList = []

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

  // console.log(CardCollection)


}

setCollection('standard');




