import random
import os

def clear():
  """Clears the console screen."""
  os.system('cls' if os.name == 'nt' else 'clear')

from art import logo

def deal_card():
  """Returns a random card from the deck."""
  cards = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
  return random.choice(cards)

def calculate_score(cards):
  """Take a list of cards and return the score calculated from the cards"""

  if sum(cards) == 21 and len(cards) == 2:
    return 0

  score = sum(cards)
  if 11 in cards and score > 21:
    ace_count = cards.count(11)
    while ace_count > 0 and score > 21:
        score -= 10
        ace_count -= 10

  current_score = sum(cards)
  if 11 in cards and current_score > 21:
    aces = cards.count(11)
    while current_score > 21 and aces > 0:
      current_score -= 10
      aces -= 1
    return current_score

  return sum(cards) if not (11 in cards and sum(cards) > 21) else current_score

def calculate_score_fixed(cards):
  """Improved calculate_score that doesn't mutate input and handles multiple aces."""
  if sum(cards) == 21 and len(cards) == 2:
    return 0
  
  score = sum(cards)
  aces = cards.count(11)
  while score > 21 and aces > 0:
    score -= 10
    aces -= 1
  return score

calculate_score = calculate_score_fixed

def compare(user_score, computer_score):
  if user_score > 21 and computer_score > 21:
    return "You went over. You lose 😤"

  if user_score == computer_score:
    return "Draw 🙃"
  elif computer_score == 0:
    return "Lose, opponent has Blackjack 😱"
  elif user_score == 0:
    return "Win with a Blackjack 😎"
  elif user_score > 21:
    return "You went over. You lose 😭"
  elif computer_score > 21:
    return "Opponent went over. You win 😁"
  elif user_score > computer_score:
    return "You win 😃"
  else:
    return "You lose 😤"

def play_game():
  print(logo)

  user_cards = []
  computer_cards = []
  is_game_over = False

  for _ in range(2):
    user_cards.append(deal_card())
    computer_cards.append(deal_card())

  while not is_game_over:
    user_score = calculate_score(user_cards)
    computer_score = calculate_score(computer_cards)
    print(f"   Your cards: {user_cards}, current score: {user_score}")
    print(f"   Computer's first card: {computer_cards[0]}")

    if user_score == 0 or computer_score == 0 or user_score > 21:
      is_game_over = True
    else:
      user_should_deal = input("Type 'y' to get another card, type 'n' to pass: ")
      if user_should_deal == "y":
        user_cards.append(deal_card())
      else:
        is_game_over = True

  while computer_score != 0 and computer_score < 17:
    computer_cards.append(deal_card())
    computer_score = calculate_score(computer_cards)

  print(f"   Your final hand: {user_cards}, final score: {user_score}")
  print(f"   Computer's final hand: {computer_cards}, final score: {computer_score}")
  print(compare(user_score, computer_score))

while input("Do you want to play a game of Blackjack? Type 'y' or 'n': ") == "y":
  clear()
  play_game()
