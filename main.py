import random
from itertools import combinations
import contextlib
from js import Document
#Generating random hands and checking to see what you have
def pokerGame():
  global deck
  deck = [
      "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "Js", "Qs", "Ks",
      "As", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "Jc", "Qc",
      "Kc", "Ac", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "Jh",
      "Qh", "Kh", "Ah", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d",
      "Jd", "Qd", "Kd", "Ad"
  ]
  global handCPU
  handCPU = []
  hand = [] * 2
  global river
  river = [] * 5
  global globalHands
  globalHands = []
  score = []
  Total = []
  yHand = []
  totalCards = []
  bestHand = []
  straightTotalStorage = []
  straightRiver = []
  highestCard = []
  counter = 0
  straightCheck = 0
  straightCounter = 0
  handCPU = []
  global tPairH
  tPairH = 0
  global tPair
  tPair = 0
  global cpuBet
  cpuBet = 0
  global pot
  pot = 0
  global currentBet
  currentBet = 0
  buyIn = 50
  global totalMoney
  try:
    totalMoney = moneyCarryover
  except:
    totalMoney = 1000
  
  
  
  for i in range(2):
    hand.append(random.choice(deck))
    deck.remove(hand[i])
    image = document.getElementById("img"+str(i+1))
    image.setAttribute("src", ("Cards/"+hand[i]+".png"))
  for i in range(2):
    handCPU.append(random.choice(deck))
    deck.remove(handCPU[i])
  for i in range(5):
    river.append(random.choice(deck))
    deck.remove(river[i])
  
  riverStorage = river.copy()
  totalCards = hand + river
  handStorage = totalCards.copy()
  
  def calculateCPU(handC):
    handStorageC = handC.copy()
    totalCardsC = handStorageC + river
    
    
    global bestHandC
    bestHandC = []
    straightTotalStorageC = []
    for c in range(len(handStorageC)):
      if handStorageC[c][0] == "J":
        straightTotalStorageC.append("11" + handStorageC[c][1])
      elif handStorageC[c][0] == "Q":
        straightTotalStorageC.append("12" + handStorageC[c][1])
      elif handStorageC[c][0] == "K":
        straightTotalStorageC.append("13" + handStorageC[c][1])
      elif handStorageC[c][0] == "A":
        straightTotalStorageC.append("14" + handStorageC[c][1])
      else:
        straightTotalStorageC.append(handStorageC[c])
    for i in range(len(handStorageC)):
      currentCardCH = handStorageC[i]
      
      totalCardsC.remove(currentCardCH)
      fCounterCH = 0
      pCounterCH = 0
      for j in range(len(handStorageC)):
        if len(handStorageC[j]) == 3:
          tenDetectCH = 1
          tenDetectSuitCH = 2
        else:
          tenDetectCH = 0
          tenDetectSuitCH = 1
        if len(handStorageC[i]) == 3:
          tenDetectCRH = 1
          tenDetectSuitCRH = 2
        else:
          tenDetectCRH = 0
          tenDetectSuitCRH = 1
        if handStorageC[i][tenDetectCRH] == handStorageC[j][tenDetectCH]:
          pCounterCH = pCounterCH + 1
          if pCounterCH == 2:
            if "Pair" not in (handC):
              handC.append("Pair")
            global tPairH
            tPairH = tPairH + 1
            if "Two Pair" not in (handC) and tPairH == 4:
              handC.append("Two Pair")
              try:
                handC.remove("Pair")
              except:
                pass
          elif pCounterCH == 3 and "Three of a Kind" not in (handC):
            handC.append("Three of a Kind")
            try:
              handC.remove("Pair")
              handC.remove("Two Pair")
            except:
              pass
          elif pCounterCH == 4 and "Four of a Kind" not in (handC):
            handC.append("Four of a Kind")
            try:
              handC.remove("Three of a Kind")
            except:
              pass
        elif handStorageC[i][tenDetectSuitCRH] == handStorageC[j][tenDetectSuitCH]:
          fCounterCH = fCounterCH + 1
          if fCounterCH == 5 and "Flush" not in (handC):
            handC.append("Flush")
      totalCardsC.insert(i, currentCardCH)
    result = [x for x in combinations(straightTotalStorageC, 5)]
    for i in range(len(result)):
      num1, num2, num3, num4, num5 = result[i]
      tenForStraight1C = 2 if len(num1) == 3 else 1
      tenForStraight2C = 2 if len(num2) == 3 else 1
      tenForStraight3C = 2 if len(num3) == 3 else 1
      tenForStraight4C = 2 if len(num4) == 3 else 1
      tenForStraight5C = 2 if len(num5) == 3 else 1
      straightCheck2AC = [
          int(num1[0:tenForStraight1C]),
          int(num2[0:tenForStraight2C]),
          int(num3[0:tenForStraight3C]),
          int(num4[0:tenForStraight4C]),
          int(num5[0:tenForStraight5C])
      ]
      straightCheck2C = straightCheck2AC.index(min(straightCheck2AC))
      try:
        if min(straightCheck2AC) == straightCheck2AC[
            straightCheck2C +
            1] - 1 == straightCheck2AC[straightCheck2C + 2] - 2 == straightCheck2AC[
                straightCheck2C + 3] - 3 == straightCheck2AC[straightCheck2C +
                                                           4] - 4:
          if num1[tenForStraight1C:tenForStraight1C +
                  1] == num2[tenForStraight2C:tenForStraight2C + 1] == num3[
                      tenForStraight3C:tenForStraight3C +
                      1] == num4[tenForStraight4C:tenForStraight4C +
                                 1] == num5[tenForStraight5C:tenForStraight5C + 1]:
            if straightCheck2AC == [10, 11, 12, 13, 14]:
              handC.append("Royal Flush")
            else:
              handC.append("Straight Flush")
          else:
            handC.append("Straight")
      except:
        pass
      straightCheck2AC.clear()
    for i in range(len(handC)):
      if "Pair" in handC and "Three of a Kind" in handC and "Full House" not in(handC):
        handC.append("Full House")
      if "Pair" in handC and "Three of a Kind" in handC and "Full House" not in(handC):
        handC.append("Full House")

      if len(handC) == 0:
        handC.append("High Card")

    if "Royal Flush" in (handC + globalHands):
      bestHandC.append("Royal Flush")
    elif "Straight Flush" in (handC + globalHands):
      bestHandC.append("Straight Flush")
    elif "Four of a Kind" in (handC + globalHands):
      bestHandC.append("Four of a Kind")
    elif "Full House" in (handC + globalHands):
      bestHandC.append("Full House")
    elif "Flush" in (handC + globalHands):
      bestHandC.append("Flush")
    elif "Straight" in (handC + globalHands):
      bestHandC.append("Straight")
    elif "Three of a Kind" in (handC + globalHands):
      bestHandC.append("Three of a Kind")
    elif "Two Pair" in (handC + globalHands):
      bestHandC.append("Two Pair")
    elif "Pair" in (handC + globalHands):
      bestHandC.append("Pair")
    else:
      bestHandC.append("High Card")

  def calculate():
    for i in range(len(river)):
      currentCard = river[i]
      river.remove(currentCard)
      fCounter = 0
      pCounter = 0
      for j in range(len(river)):
        if len(currentCard) == 3:
          tenDetect = 1
          tenDetectSuit = 2
        else:
          tenDetect = 0
          tenDetectSuit = 1
        if len(river[j]) == 3:
          tenDetectR = 1
          tenDetectSuitR = 2
        else:
          tenDetectR = 0
          tenDetectSuitR = 1
        if riverStorage[i][tenDetect] == river[j][tenDetectR]:
          pCounter = pCounter + 1
          if pCounter == 1:
            if "Pair" not in (globalHands):
              globalHands.append("Pair")
            global tPair
            tPair = tPair + 1
            if "Two Pair" not in (globalHands) and tPair == 4:
              globalHands.append("Two Pair")
              try:
                globalHands.remove("Pair")
              except:
                pass
          elif pCounter == 2 and "Three of a Kind" not in (globalHands):
            globalHands.append("Three of a Kind")
            try:
              globalHands.remove("Pair")
            except:
              pass
          elif pCounter == 3 and "Four of a Kind" not in (globalHands):
            globalHands.append("Four of a Kind")
            try:
              globalHands.remove("Three of a Kind")
            except:
              pass
        if riverStorage[i][tenDetectSuit] == river[j][tenDetectSuitR]:
          fCounter = fCounter + 1
          if fCounter == 5 and "Flush" not in (globalHands):
            globalHands.append("Flush")
      river.insert(i, currentCard)
    for c in range(len(handStorage)):
      if handStorage[c][0] == "J":
        straightTotalStorage.append("11" + handStorage[c][1])
      elif handStorage[c][0] == "Q":
        straightTotalStorage.append("12" + handStorage[c][1])
      elif handStorage[c][0] == "K":
        straightTotalStorage.append("13" + handStorage[c][1])
      elif handStorage[c][0] == "A":
        straightTotalStorage.append("14" + handStorage[c][1])
      else:
        straightTotalStorage.append(handStorage[c])
    for t in range(len(riverStorage)):
      if riverStorage[t][0] == "J":
        straightRiver.append("11" + riverStorage[t][1])
      elif riverStorage[t][0] == "Q":
        straightRiver.append("12" + riverStorage[t][1])
      elif riverStorage[t][0] == "K":
        straightRiver.append("13" + riverStorage[t][1])
      elif riverStorage[t][0] == "A":
        straightRiver.append("14" + riverStorage[t][1])
      else:
        straightRiver.append(riverStorage[t])
    for i in range(len(handStorage)):
      currentCardH = handStorage[i]
      totalCards.remove(currentCardH)
      fCounterH = 0
      pCounterH = 0
      for j in range(len(handStorage)):
        if len(handStorage[j]) == 3:
          tenDetectH = 1
          tenDetectSuitH = 2
        else:
          tenDetectH = 0
          tenDetectSuitH = 1
        if len(handStorage[i]) == 3:
          tenDetectRH = 1
          tenDetectSuitRH = 2
        else:
          tenDetectRH = 0
          tenDetectSuitRH = 1
        if handStorage[i][tenDetectRH] == handStorage[j][tenDetectH]:
          pCounterH = pCounterH + 1
          if pCounterH == 2:
            if "Pair" not in (yHand):
              yHand.append("Pair")
            global tPairH
            tPairH = tPairH + 1
            if "Two Pair" not in (yHand) and tPairH == 4:
              yHand.append("Two Pair")
              try:
                yHand.remove("Pair")
              except:
                pass
          elif pCounterH == 3 and "Three of a Kind" not in (yHand):
            yHand.append("Three of a Kind")
            try:
              yHand.remove("Pair")
              yHand.remove("Two Pair")
            except:
              pass
          elif pCounterH == 4 and "Four of a Kind" not in (yHand):
            yHand.append("Four of a Kind")
            try:
              yHand.remove("Three of a Kind")
            except:
              pass
        elif handStorage[i][tenDetectSuitRH] == handStorage[j][tenDetectSuitH]:
          fCounterH = fCounterH + 1
          if fCounterH == 5 and "Flush" not in (yHand):
            yHand.append("Flush")
      totalCards.insert(i, currentCardH)
    for z in range(5):
      straightCheck = 0
      spades = 0
      clubs = 0
      hearts = 0
      diamonds = 0
      tenForStraight = 2 if len(straightRiver[z]) == 3 else 1
      straightCheck = straightCheck + int(straightRiver[z][0:tenForStraight])
      with contextlib.suppress(Exception):
        highestCard.append(int(straightRiver[z][0:tenForStraight]))
      try:
        if straightRiver[z][tenForStraight:tenForStraight + 1] == "s":
          spades = spades + 1
        elif straightRiver[z][tenForStraight:tenForStraight + 1] == "c":
          clubs = clubs + 1
        elif straightRiver[z][tenForStraight:tenForStraight + 1] == "h":
          hearts = hearts + 1
        elif straightRiver[z][tenForStraight:tenForStraight + 1] == "d":
          dismaonds = diamonds + 1
      except:
        pass
    straightCheck = highestCard.index(min(highestCard))
    try:
      if min(highestCard) == highestCard[straightCheck + 1] - 1 == highestCard[
          straightCheck + 2] - 2 == highestCard[
              straightCheck + 3] - 3 == highestCard[straightCheck + 4] - 4:
        if clubs == 5 or diamonds == 5 or hearts == 5 or spades == 5:
          if straightCheck == 60:
            globalHands.append("Royal Flush")
          else:
            globalHands.append("Straight Flush")
        else:
          globalHands.append("Straight")
    except:
      pass
    result = [x for x in combinations(straightTotalStorage, 5)]
    for i in range(len(result)):
      num1, num2, num3, num4, num5 = result[i]
      tenForStraight1 = 2 if len(num1) == 3 else 1
      tenForStraight2 = 2 if len(num2) == 3 else 1
      tenForStraight3 = 2 if len(num3) == 3 else 1
      tenForStraight4 = 2 if len(num4) == 3 else 1
      tenForStraight5 = 2 if len(num5) == 3 else 1
      straightCheck2A = [
          int(num1[0:tenForStraight1]),
          int(num2[0:tenForStraight2]),
          int(num3[0:tenForStraight3]),
          int(num4[0:tenForStraight4]),
          int(num5[0:tenForStraight5])
      ]
      straightCheck2 = straightCheck2A.index(min(straightCheck2A))
      try:
        if min(straightCheck2A) == straightCheck2A[
            straightCheck2 +
            1] - 1 == straightCheck2A[straightCheck2 + 2] - 2 == straightCheck2A[
                straightCheck2 + 3] - 3 == straightCheck2A[straightCheck2 +
                                                           4] - 4:
          if num1[tenForStraight1:tenForStraight1 +
                  1] == num2[tenForStraight2:tenForStraight2 + 1] == num3[
                      tenForStraight3:tenForStraight3 +
                      1] == num4[tenForStraight4:tenForStraight4 +
                                 1] == num5[tenForStraight5:tenForStraight5 + 1]:
            if straightCheck2A == [10, 11, 12, 13, 14]:
              yHand.append("Royal Flush")
            else:
              yHand.append("Straight Flush")
          else:
            yHand.append("Straight")
      except:
        pass
      straightCheck2A.clear()
    for i in range(len(yHand)):
      if "Pair" in yHand and "Three of a Kind" in yHand and "Full House" not in(yHand):
        yHand.append("Full House")
      if "Pair" in yHand and "Three of a Kind" in yHand and "Full House" not in(yHand):
        globalHands.append("Full House")
  
      if len(yHand) == 0:
        yHand.append("High Card")
  
    if "Royal Flush" in (yHand + globalHands):
      bestHand.append("Royal Flush")
    elif "Straight Flush" in (yHand + globalHands):
      bestHand.append("Straight Flush")
    elif "Four of a Kind" in (yHand + globalHands):
      bestHand.append("Four of a Kind")
    elif "Full House" in (yHand + globalHands):
      bestHand.append("Full House")
    elif "Flush" in (yHand + globalHands):
      bestHand.append("Flush")
    elif "Straight" in (yHand + globalHands):
      bestHand.append("Straight")
    elif "Three of a Kind" in (yHand + globalHands):
      bestHand.append("Three of a Kind")
    elif "Two Pair" in (yHand + globalHands):
      bestHand.append("Two Pair")
    elif "Pair" in (yHand + globalHands):
      bestHand.append("Pair")
    else:
      bestHand.append("High Card")
    # end of random hand generation and checking
    # betting
  def cpuBet1():
      cpuBet = 0
      for i in range(10):
          doBet = random.choices([1,2], weights = (30,70), k=1)
          
          if doBet[0] == 1:
              cpuBet = 100
          elif doBet[0] == 2:
              cpuBet = 0
          
  totalMoney = totalMoney - buyIn
  
  
  
  currentBet = int(input("How much would you like to bet (0 for stand)?: "))
  cpuBet1()
  if currentBet == -1:
    
    
    
    calculate()
  elif currentBet == 0:
    
    
    
  else:
    while currentBet > totalMoney:
      
      currentBet = int(input("How much would you like to bet (0 for stand)?: "))
    totalMoney = totalMoney - currentBet
    pot = pot + currentBet
  
  
  
  currentBet = int(
      input(
          "How much would you like to bet on round 2 (0 for stand, -1 for fold)?: "
      ))
  if currentBet == -1:
    
    calculate()
  elif currentBet == 0:
    
    
    
    
    
    
  else:
    while currentBet > totalMoney:
      
      currentBet = int(
          input(
              "How much would you like to bet on round 2 (0 for stand, -1 for fold)?: "
          ))
    totalMoney = totalMoney - currentBet
    pot = pot + currentBet
    
    
    
  currentBet = int(
      input(
          "How much would you like to bet on round 3 (0 for stand, -1 for fold)?: "
      ))
  if currentBet == -1:
    
    calculate()
  elif currentBet == 0:
    
    
    
    
  else:
    while currentBet > totalMoney:
      
      currentBet = int(
          input(
              "How much would you like to bet on round 3 (0 for stand, -1 for fold)?: "
          ))
    totalMoney = totalMoney - currentBet
    pot = pot + currentBet
    
    
    
  
  def handScoreC():
    global handScore
    handScore = 0
    if "Royal Flush" in (bestHand):
      handScore = 9
    elif "Straight Flush" in (bestHand):
      handScore = 8
    elif "Four of a Kind" in (bestHand):
      handScore = 7
    elif "Full House" in (bestHand):
      handScore = 6
    elif "Flush" in (bestHand):
      handScore = 5
    elif "Straight" in (bestHand):
      handScore = 4
    elif "Three of a Kind" in (bestHand):
      handScore = 3
    elif "Two Pair" in (bestHand):
      handScore = 2
    elif "Pair" in (bestHand):
      handScore = 1
    elif "High Card" in (bestHand):
      handScore = 0
  currentBet = int(input("Place your final bets (0 for stand, -1 for fold)!: "))
  totalMoney = totalMoney - currentBet
  pot = pot + currentBet
  if currentBet == -1:
    return()
  elif currentBet == 0:
    while currentBet > totalMoney:
      currentBet = int(input("Place your finals bets (0 for stand, -1 for fold)!: "))
    calculate()
    handScoreC()
    calculateCPU(handCPU)
  try:
    if totalMoney - moneyCarryover <= 0:
    else:
      
  except:
    if totalMoney - 1000 <= 0:
      
    else:
      
  
  
  global playAgain
  playAgain = str(input("Would you like to play another hand? (y/n): ")).lower()
  








pokerGame()
if currentBet == -1:
  
  global playAgain
  playAgain = str(input("Would you like to play another hand? (y/n): ")).lower()
  
while playAgain == "y" or playAgain == "yes":
  moneyCarryover = totalMoney
  pokerGame()
