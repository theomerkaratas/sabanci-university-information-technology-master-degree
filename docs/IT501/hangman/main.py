from hangman_words import word_list
from hangman_art import stages, logo
import random

chosen_word = random.choice(word_list)
word_length = len(chosen_word)

end_of_game = False
lives = 6

print(logo)

display = []
guess_list = []

for _ in range(word_length):
    display += "_"

while not end_of_game:
    guess = input("Guess a letter: ").lower()
    
    if not guess or len(guess) != 1:
        print("Please enter a single letter.")
        continue
        
    if guess in guess_list:
        print(f"You've already guessed {guess}.")
        continue
    
    guess_list.append(guess)
    
    for position in range(word_length):
        letter = chosen_word[position]
        if letter == guess:
            display[position] = letter

    if guess not in chosen_word:
        print(f"You guessed {guess}, that's not in the word. You lose a life.")
        lives -= 1
        if lives == 0:
            end_of_game = True
            print("You lose.")
            print(f"The word was: {chosen_word}")

    print(f"{' '.join(display)}")

    if "_" not in display:
        end_of_game = True
        print("You win.")

    print(stages[lives])