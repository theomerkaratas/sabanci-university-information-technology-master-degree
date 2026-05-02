import os
from art import logo

def clear():
    """Clears the console screen."""
    os.system('cls' if os.name == 'nt' else 'clear')

def add(n1, n2):
  return n1 + n2

def subtract(n1, n2):
  return n1 - n2

def multiply(n1, n2):
  return n1 * n2

def divide(n1, n2):
  if n2 == 0:
    return "Error: Division by zero"
  return n1 / n2

operations = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide
}

def get_number(prompt):
    """Helper to get a valid float from user input."""
    while True:
        line = input(prompt)
        try:
            return float(line)
        except ValueError:
            print("Invalid input. Please enter a number.")

def calculator():
  clear()
  print(logo)

  num1 = get_number("What's the first number?: ")
  for symbol in operations:
    print(symbol)
  
  should_continue = True
 
  while should_continue:
    operation_symbol = input("Pick an operation: ")
    if operation_symbol not in operations:
      print("Invalid operation. Please pick from the list above.")
      continue
      
    num2 = get_number("What's the next number?: ")
    calculation_function = operations[operation_symbol]
    answer = calculation_function(num1, num2)
    
    if isinstance(answer, str):
        print(answer)
        if input("Type 'y' to start over, or 'n' to exit: ") == 'y':
            calculator()
            return
        else:
            return

    print(f"{num1} {operation_symbol} {num2} = {answer}")

    user_choice = input(f"Type 'y' to continue calculating with {answer}, or type 'n' to start a new calculation (type 'exit' to quit): ").lower()
    if user_choice == 'y':
      num1 = answer
    elif user_choice == 'n':
      should_continue = False
      calculator()
      return
    else:
      should_continue = False

if __name__ == "__main__":
    calculator()
