function test() {
  let test = 1
  test = test + 1
  text = document.getElementById('Test')
  text.innerHTML = "Proof it works!"

function pokerGame() {
  let deck = [
    "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "Js", "Qs", "Ks",
    "As", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "Jc", "Qc",
    "Kc", "Ac", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "Jh",
    "Qh", "Kh", "Ah", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d",
    "Jd", "Qd", "Kd", "Ad"
  ];
  let handCPU = [];
  let hand = [];
  let river = [];
  let globalHands = [];
  let score = [];
  let Total = [];
  let yHand = [];
  let totalCards = [];
  let bestHand = [];
  let straightTotalStorage = [];
  let straightRiver = [];
  let highestCard = [];
  let counter = 0;
  let straightCheck = 0;
  let straightCounter = 0;
  let tPairH = 0;
  let tPair = 0;
  let cpuBet = 0;
  let pot = 0;
  let currentBet = 0;
  let buyIn = 50;
  let totalMoney;
  try {
    totalMoney = moneyCarryover;
  } catch {
    totalMoney = 1000;
  }
  for (let i = 0; i < 2; i++) {
    hand.push(deck[Math.floor(Math.random() * deck.length)]);
    deck.splice(deck.indexOf(hand[i]), 1);
    let image = Document.getElementById("img" + (i + 1));
    image.setAttribute("src", "Cards/" + hand[i] + ".png");
  }
  for (let i = 0; i < 2; i++) {
    handCPU.push(deck[Math.floor(Math.random() * deck.length)]);
    deck.splice(deck.indexOf(handCPU[i]), 1);
  }
  for (let i = 0; i < 5; i++) {
    river.push(deck[Math.floor(Math.random() * deck.length)]);
    deck.splice(deck.indexOf(river[i]), 1);
  }
  let riverStorage = [...river];
  totalCards = [...hand, ...river];
  let handStorage = [...totalCards];

  function calculateCPU(handC) {
    let handStorageC = [...handC];
    let totalCardsC = [...handStorageC, ...river];
    let bestHandC = [];
    let straightTotalStorageC = [];
    for (let c = 0; c < handStorageC.length; c++) {
      if (handStorageC[c][0] == "J") {
        straightTotalStorageC.push("11" + handStorageC[c][1]);
      } else if (handStorageC[c][0] == "Q") {
        straightTotalStorageC.push("12" + handStorageC[c][1]);
      } else if (handStorageC[c][0] == "K") {
        straightTotalStorageC.push("13" + handStorageC[c][1]);
      } else if (handStorageC[c][0] == "A") {
        straightTotalStorageC.push("14" + handStorageC[c][1]);
      } else {
        straightTotalStorageC.push(handStorageC[c]);
      }
    }
    for (let i = 0; i < handStorageC.length; i++) {
      let currentCardCH = handStorageC[i];
      totalCardsC.splice(totalCardsC.indexOf(currentCardCH), 1);
      let fCounterCH = 0;
      let pCounterCH = 0;
      for (let j = 0; j < handStorageC.length; j++) {
        let tenDetectCH = len(handStorageC[j]) == 3 ? 1 : 0;
        let tenDetectSuitCH = len(handStorageC[j]) == 3 ? 2 : 1;
        let tenDetectCRH = len(handStorageC[i]) == 3 ? 1 : 0;
        let tenDetectSuitCRH = len(handStorageC[i]) == 3 ? 2 : 1;
        if (handStorageC[i][tenDetectCRH] == handStorageC[j][tenDetectCH]) {
          pCounterCH++;
          if (pCounterCH == 2) {
            if (!handC.includes("Pair")) {
              handC.push("Pair");
            }
            tPairH++;
            if (!handC.includes("Two Pair") && tPairH == 4) {
              handC.push("Two Pair");
              try {
                handC.splice(handC.indexOf("Pair"), 1);
              } catch {}
            }
          } else if (pCounterCH == 3 && !handC.includes("Three of a Kind")) {
            handC.push("Three of a Kind");
            try {
              handC.splice(handC.indexOf("Pair"), 1);
              handC.splice(handC.indexOf("Two Pair"), 1);
            } catch {}
          } else if (pCounterCH == 4 && !handC.includes("Four of a Kind")) {
            handC.push("Four of a Kind");
            try {
              handC.splice(handC.indexOf("Three of a Kind"), 1);
            } catch {}
          }
        } else if (
          handStorageC[i][tenDetectSuitCRH] == handStorageC[j][tenDetectSuitCH]
        ) {
          fCounterCH++;
          if (fCounterCH == 5 && !handC.includes("Flush")) {
            handC.push("Flush");
          }
        }
      }
      totalCardsC.splice(i, 0, currentCardCH);
    }
    let result = combinations(straightTotalStorageC, 5);
    for (let i = 0; i < result.length; i++) {
      let [num1, num2, num3, num4, num5] = result[i];
      let tenForStraight1C = len(num1) == 3 ? 2 : 1;
      let tenForStraight2C = len(num2) == 3 ? 2 : 1;
      let tenForStraight3C = len(num3) == 3 ? 2 : 1;
      let tenForStraight4C = len(num4) == 3 ? 2 : 1;
      let tenForStraight5C = len(num5) == 3 ? 2 : 1;
      let straightCheck2AC = [
        parseInt(num1.slice(0, tenForStraight1C)),
        parseInt(num2.slice(0, tenForStraight2C)),
        parseInt(num3.slice(0, tenForStraight3C)),
        parseInt(num4.slice(0, tenForStraight4C)),
        parseInt(num5.slice(0, tenForStraight5C))
      ];
      let straightCheck2C = straightCheck2AC.indexOf(
        Math.min(...straightCheck2AC)
      );
      try {
        if (
          Math.min(...straightCheck2AC) ==
            straightCheck2AC[straightCheck2C + 1] - 1 ==
            straightCheck2AC[straightCheck2C + 2] - 2 ==
            straightCheck2AC[straightCheck2C + 3] - 3 ==
            straightCheck2AC[straightCheck2C + 4] - 4
        ) {
          if (
            num1[tenForStraight1C] ==
              num2[tenForStraight2C] ==
              num3[tenForStraight3C] ==
              num4[tenForStraight4C] ==
              num5[tenForStraight5C]
          ) {
            if (straightCheck2AC == [10, 11, 12, 13, 14]) {
              handC.push("Royal Flush");
            } else {
              handC.push("Straight Flush");
            }
          } else {
            handC.push("Straight");
          }
        }
      } catch {}
      straightCheck2AC = [];
    }
    if (
      handC.includes("Pair") &&
      handC.includes("Three of a Kind") &&
      !handC.includes("Full House")
    ) {
      handC.push("Full House");
    }
    if (
      handC.includes("Pair") &&
      handC.includes("Three of a Kind") &&
      !handC.includes("Full House")
    ) {
      handC.push("Full House");
    }
    if (handC.length == 0) {
      handC.push("High Card");
    }
    if (handC.includes("Royal Flush") || globalHands.includes("Royal Flush")) {
      bestHandC.push("Royal Flush");
    } else if (
      handC.includes("Straight Flush") ||
      globalHands.includes("Straight Flush")
    ) {
      bestHandC.push("Straight Flush");
    } else if (
      handC.includes("Four of a Kind") ||
      globalHands.includes("Four of a Kind")
    ) {
      bestHandC.push("Four of a Kind");
    } else if (
      handC.includes("Full House") ||
      globalHands.includes("Full House")
    ) {
      bestHandC.push("Full House");
    } else if (handC.includes("Flush") || globalHands.includes("Flush")) {
      bestHandC.push("Flush");
    } else if (handC.includes("Straight") || globalHands.includes("Straight")) {
      bestHandC.push("Straight");
    } else if (
      handC.includes("Three of a Kind") ||
      globalHands.includes("Three of a Kind")
    ) {
      bestHandC.push("Three of a Kind");
    } else if (handC.includes("Two Pair") || globalHands.includes("Two Pair")) {
      bestHandC.push("Two Pair");
    } else if (handC.includes("Pair") || globalHands.includes("Pair")) {
      bestHandC.push("Pair");
    } else {
      bestHandC.push("High Card");
    }
  }

  function calculate() {
    for (let i = 0; i < river.length; i++) {
      let currentCard = river[i];
      river.splice(i, 1);
      let fCounter = 0;
      let pCounter = 0;
      for (let j = 0; j < river.length; j++) {
        let tenDetect = len(currentCard) == 3 ? 1 : 0;
        let tenDetectSuit = len(currentCard) == 3 ? 2 : 1;
        let tenDetectR = len(river[j]) == 3 ? 1 : 0;
        let tenDetectSuitR = len(river[j]) == 3 ? 2 : 1;
        if (riverStorage[i][tenDetect] == river[j][tenDetectR]) {
          pCounter++;
          if (pCounter == 1) {
            if (!globalHands.includes("Pair")) {
              globalHands.push("Pair");
            }
            tPair++;
            if (!globalHands.includes("Two Pair") && tPair == 4) {
              globalHands.push("Two Pair");
              try {
                globalHands.splice(globalHands.indexOf("Pair"), 1);
              } catch {}
            }
          } else if (
            pCounter == 2 &&
            !globalHands.includes("Three of a Kind")
          ) {
            globalHands.push("Three of a Kind");
            try {
              globalHands.splice(globalHands.indexOf("Pair"), 1);
            } catch {}
          } else if (
            pCounter == 3 &&
            !globalHands.includes("Four of a Kind")
          ) {
            globalHands.push("Four of a Kind");
            try {
              globalHands.splice(globalHands.indexOf("Three of a Kind"), 1);
            } catch {}
          }
        }
        if (riverStorage[i][tenDetectSuit] == river[j][tenDetectSuitR]) {
          fCounter++;
          if (fCounter == 5 && !globalHands.includes("Flush")) {
            globalHands.push("Flush");
          }
        }
      }
      river.splice(i, 0, currentCard);
    }
    for (let c = 0; c < handStorage.length; c++) {
      if (handStorage[c][0] == "J") {
        straightTotalStorage.push("11" + handStorage[c][1]);
      } else if (handStorage[c][0] == "Q") {
        straightTotalStorage.push("12" + handStorage[c][1]);
      } else if (handStorage[c][0] == "K") {
        straightTotalStorage.push("13" + handStorage[c][1]);
      } else if (handStorage[c][0] == "A") {
        straightTotalStorage.push("14" + handStorage[c][1]);
      } else {
        straightTotalStorage.push(handStorage[c]);
      }
    }
    for (let t = 0; t < riverStorage.length; t++) {
      if (riverStorage[t][0] == "J") {
        straightRiver.push("11" + riverStorage[t][1]);
      } else if (riverStorage[t][0] == "Q") {
        straightRiver.push("12" + riverStorage[t][1]);
      } else if (riverStorage[t][0] == "K") {
        straightRiver.push("13" + riverStorage[t][1]);
      } else if (riverStorage[t][0] == "A") {
        straightRiver.push("14" + riverStorage[t][1]);
      } else {
        straightRiver.push(riverStorage[t]);
      }
    }
    for (let i = 0; i < handStorage.length; i++) {
      let currentCardH = handStorage[i];
      totalCards.splice(totalCards.indexOf(currentCardH), 1);
      let fCounterH = 0;
      let pCounterH = 0;
      for (let j = 0; j < handStorage.length; j++) {
        let tenDetectH = len(handStorage[j]) == 3 ? 1 : 0;
        let tenDetectSuitH = len(handStorage[j]) == 3 ? 2 : 1;
        let tenDetectRH = len(handStorage[i]) == 3 ? 1 : 0;
        let tenDetectSuitRH = len(handStorage[i]) == 3 ? 2 : 1;
        if (handStorage[i][tenDetectRH] == handStorage[j][tenDetectH]) {
          pCounterH++;
          if (pCounterH == 2) {
            if (!yHand.includes("Pair")) {
              yHand.push("Pair");
            }
            tPairH++;
            if (!yHand.includes("Two Pair") && tPairH == 4) {
              yHand.push("Two Pair");
              try {
                yHand.splice(yHand.indexOf("Pair"), 1);
              } catch {}
            }
          } else if (
            pCounterH == 3 &&
            !yHand.includes("Three of a Kind")
          ) {
            yHand.push("Three of a Kind");
            try {
              yHand.splice(yHand.indexOf("Pair"), 1);
              yHand.splice(yHand.indexOf("Two Pair"), 1);
            } catch {}
          } else if (
            pCounterH == 4 &&
            !yHand.includes("Four of a Kind")
          ) {
            yHand.push("Four of a Kind");
            try {
              yHand.splice(yHand.indexOf("Three of a Kind"), 1);
            } catch {}
          }
        } else if (
          handStorage[i][tenDetectSuitRH] == handStorage[j][tenDetectSuitH]
        ) {
          fCounterH++;
          if (fCounterH == 5 && !yHand.includes("Flush")) {
            yHand.push("Flush");
          }
        }
      }
      totalCards.splice(i, 0, currentCardH);
    }
    for (let z = 0; z < 5; z++) {
      straightCheck = 0;
      let spades = 0;
      let clubs = 0;
      let hearts = 0;
      let diamonds = 0;
      let tenForStraight = len(straightRiver[z]) == 3 ? 2 : 1;
      straightCheck += parseInt(straightRiver[z].slice(0, tenForStraight));
      try {
        if (straightRiver[z][tenForStraight] == "s") {
          spades++;
        } else if (straightRiver[z][tenForStraight] == "c") {
          clubs++;
        } else if (straightRiver[z][tenForStraight] == "h") {
          hearts++;
        } else if (straightRiver[z][tenForStraight] == "d") {
          dismaonds++;
        }
      } catch {}
    }
    straightCheck = highestCard.indexOf(Math.min(...highestCard));
    try {
      if (
        Math.min(...highestCard) ==
          highestCard[straightCheck + 1] - 1 ==
          highestCard[straightCheck + 2] - 2 ==
          highestCard[straightCheck + 3] - 3 ==
          highestCard[straightCheck + 4] - 4
      ) {
        if (
          clubs == 5 ||
          diamonds == 5 ||
          hearts == 5 ||
          spades == 5
        ) {
          if (straightCheck == 60) {
            globalHands.push("Royal Flush");
          } else {
            globalHands.push("Straight Flush");
          }
        } else {
          globalHands.push("Straight");
        }
      }
    } catch {}
    let result = combinations(straightTotalStorage, 5);
    for (let i = 0; i < result.length; i++) {
      let [num1, num2, num3, num4, num5] = result[i];
      let tenForStraight1 = len(num1) == 3 ? 2 : 1;
      let tenForStraight2 = len(num2) == 3 ? 2 : 1;
      let tenForStraight3 = len(num3) == 3 ? 2 : 1;
      let tenForStraight4 = len(num4) == 3 ? 2 : 1;
      let tenForStraight5 = len(num5) == 3 ? 2 : 1;
      let straightCheck2A = [
        parseInt(num1.slice(0, tenForStraight1)),
        parseInt(num2.slice(0, tenForStraight2)),
        parseInt(num3.slice(0, tenForStraight3)),
        parseInt(num4.slice(0, tenForStraight4)),
        parseInt(num5.slice(0, tenForStraight5))
      ];
      let straightCheck2 = straightCheck2A.indexOf(
        Math.min(...straightCheck2A)
      );
      try {
        if (
          Math.min(...straightCheck2A) ==
            straightCheck2A[straightCheck2 + 1] - 1 ==
            straightCheck2A[straightCheck2 + 2] - 2 ==
            straightCheck2A[straightCheck2 + 3] - 3 ==
            straightCheck2A[straightCheck2 + 4] - 4
        ) {
          if (
            num1[tenForStraight1] ==
              num2[tenForStraight2] ==
              num3[tenForStraight3] ==
              num4[tenForStraight4] ==
              num5[tenForStraight5]
          ) {
            if (straightCheck2A == [10, 11, 12, 13, 14]) {
              yHand.push("Royal Flush");
            } else {
              yHand.push("Straight Flush");
            }
          } else {
            yHand.push("Straight");
          }
        }
      } catch {}
      straightCheck2A = [];
    }
    if (
      yHand.includes("Pair") &&
      yHand.includes("Three of a Kind") &&
      !yHand.includes("Full House")
    ) {
      yHand.push("Full House");
    }
    if (
      yHand.includes("Pair") &&
      yHand.includes("Three of a Kind") &&
      !yHand.includes("Full House")
    ) {
      globalHands.push("Full House");
    }
    if (yHand.length == 0) {
      yHand.push("High Card");
    }
    if (yHand.includes("Royal Flush") || globalHands.includes("Royal Flush")) {
      bestHand.push("Royal Flush");
    } else if (
      yHand.includes("Straight Flush") ||
      globalHands.includes("Straight Flush")
    ) {
      bestHand.push("Straight Flush");
    } else if (
      yHand.includes("Four of a Kind") ||
      globalHands.includes("Four of a Kind")
    ) {
      bestHand.push("Four of a Kind");
    } else if (
      yHand.includes("Full House") ||
      globalHands.includes("Full House")
    ) {
      bestHand.push("Full House");
    } else if (yHand.includes("Flush") || globalHands.includes("Flush")) {
      bestHand.push("Flush");
    } else if (yHand.includes("Straight") || globalHands.includes("Straight")) {
      bestHand.push("Straight");
    } else if (
      yHand.includes("Three of a Kind") ||
      globalHands.includes("Three of a Kind")
    ) {
      bestHand.push("Three of a Kind");
    } else if (yHand.includes("Two Pair") || globalHands.includes("Two Pair")) {
      bestHand.push("Two Pair");
    } else if (yHand.includes("Pair") || globalHands.includes("Pair")) {
      bestHand.push("Pair");
    } else {
      bestHand.push("High Card");
    }
  }

  function cpuBet1() {
    cpuBet = 0;
    for (let i = 0; i < 10; i++) {
      let doBet = random.choices([1, 2], { weights: [30, 70], k: 1 });
      if (doBet[0] == 1) {
        cpuBet = 100;
      } else if (doBet[0] == 2) {
        cpuBet = 0;
      }
    }
  }

  totalMoney = totalMoney - buyIn;
  currentBet = parseInt(prompt("How much would you like to bet (0 for stand)?: "));
  cpuBet1();
  if (currentBet == -1) {
    calculate();
  } else if (currentBet == 0) {
  } else {
    while (currentBet > totalMoney) {
      currentBet = parseInt(prompt("How much would you like to bet (0 for stand)?: "));
    }
    totalMoney = totalMoney - currentBet;
    pot = pot + currentBet;
  }
  currentBet = parseInt(
    prompt("How much would you like to bet on round 2 (0 for stand, -1 for fold)?: ")
  );
  if (currentBet == -1) {
    calculate();
  } else if (currentBet == 0) {
  } else {
    while (currentBet > totalMoney) {
      currentBet = parseInt(
        prompt("How much would you like to bet on round 2 (0 for stand, -1 for fold)?: ")
      );
    }
    totalMoney = totalMoney - currentBet;
    pot = pot + currentBet;
  }
  currentBet = parseInt(
    prompt("How much would you like to bet on round 3 (0 for stand, -1 for fold)?: ")
  );
  if (currentBet == -1) {
    calculate();
  } else if (currentBet == 0) {
  } else {
    while (currentBet > totalMoney) {
      currentBet = parseInt(
        prompt("How much would you like to bet on round 3 (0 for stand, -1 for fold)?: ")
      );
    }
    totalMoney = totalMoney - currentBet;
    pot = pot + currentBet;
  }

  function handScoreC() {
    let handScore = 0;
    if (bestHand.includes("Royal Flush")) {
      handScore = 9;
    } else if (bestHand.includes("Straight Flush")) {
      handScore = 8;
    } else if (bestHand.includes("Four of a Kind")) {
      handScore = 7;
    } else if (bestHand.includes("Full House")) {
      handScore = 6;
    } else if (bestHand.includes("Flush")) {
      handScore = 5;
    } else if (bestHand.includes("Straight")) {
      handScore = 4;
    } else if (bestHand.includes("Three of a Kind")) {
      handScore = 3;
    } else if (bestHand.includes("Two Pair")) {
      handScore = 2;
    } else if (bestHand.includes("Pair")) {
      handScore = 1;
    } else if (bestHand.includes("High Card")) {
      handScore = 0;
    }
  }

  currentBet = parseInt(prompt("Place your final bets (0 for stand, -1 for fold)!: "));
  totalMoney = totalMoney - currentBet;
  pot = pot + currentBet;
  if (currentBet == -1) {
    return;
  } else if (currentBet == 0) {
    while (currentBet > totalMoney) {
      currentBet = parseInt(prompt("Place your finals bets (0 for stand, -1 for fold)!: "));
    }
    calculate();
    handScoreC();
    calculateCPU(handCPU);
  }
  try {
    if (totalMoney - moneyCarryover <= 0) {
    } else {
    }
  } catch {
    if (totalMoney - 1000 <= 0) {
    } else {
    }
  }
  let playAgain = prompt("Would you like to play another hand? (y/n): ").toLowerCase();
}

pokerGame();
if (currentBet == -1) {
  let playAgain = prompt("Would you like to play another hand? (y/n): ").toLowerCase();
}
while (playAgain == "y" || playAgain == "yes") {
  let moneyCarryover = totalMoney;
  pokerGame();
}


