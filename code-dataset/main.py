import os
from openai import OpenAI
from tqdm import tqdm

client = OpenAI()

# Function to read file contents
def read_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()

# Function to refactor code using OpenAI API
def refactor_code(js_content, tests_content):

    full_content = f"""Code:
```javascript
{js_content}
```

Tests:
```javascript
{tests_content}
```"""

    # Creating the prompt for GPT
    prompt = f"""Refactor the code to improve readability and maintainability. Ensure the refactored code still passes all tests and the test file remains the same. Ensure the external behavior of the code remains the same by maintaining the structure of the API class. Let's solve this step by step to be sure you don't miss anything:
Step 1: Identify the code smell in the code.
Step 2: Write down the definition of the code smell you identified.
Step 3: Refactor the code.

{full_content}"""

    system_prompt = """System prompt:
You are a software engineer proficient in refactoring code. Here is a list of code smells you know:
- Alternative Classes with Different Interfaces
- Comments
- Data Class
- Data Clumps
- Divegent Change
- Duplicated Code
- Feature Envy
- Global Data
- Insider Trading
- Large Class
- Lazy Element
- Long Function
- Long Parameter List
- Loops
- Message Chains
- Middle Man
- Mutable Data
- Mysterious Name
- Primitive Obsession
- Refused Bequest
- Repeated Switches
- Shotgun Surgery
- Speculative Generality
- Temporary Field"""

    # Sending the prompt to the GPT-4 API
    response = client.chat.completions.create(
        model="gpt-4o",
        temperature=0,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt},
        ],
    )

    # Returning the refactored code
    return response.choices[0].message.content

# Directory containing the code smells
code_smells_dir = os.path.join(os.getcwd(), 'code_smells')

# Iterate over each code smell directory
code_smells = [d for d in os.listdir(code_smells_dir) if os.path.isdir(os.path.join(code_smells_dir, d))]
code_smells = ["mutable_data"]

for smell in tqdm(code_smells, desc="Processing code smells"):
    smell_dir = os.path.join(code_smells_dir, smell)

    if os.path.isdir(smell_dir):
        # Find the files that are smell samples (end with .js extension but not tests.js and start with any number)
        smell_samples = [f for f in os.listdir(smell_dir) if f.endswith('.js') and not f.endswith('.tests.js') and f[0].isdigit()]

        for sample in smell_samples:
            print(f"Refactoring code for {smell} - {sample}...")
            
            js_file = read_file(os.path.join(smell_dir, sample))
            test_file = read_file(os.path.join(smell_dir, f"{sample.split('.')[0]}.tests.js"))

            # If the test file is empty, skip the refactoring
            if not test_file:
                print(f"Skipping refactoring for {smell} - {sample} as test file is empty.")
                continue

            completion = refactor_code(js_file, test_file)

            # Write the refactored code to a new file in the refactored directory (if the refactored directory does not exist, create it)
            if not os.path.exists(os.path.join(smell_dir, "refactored")):
                os.makedirs(os.path.join(smell_dir, "refactored"))

            # Naming convention: <smell_dir>/refactored/<sample_number>_<generation_number>.txt

            if not os.listdir(os.path.join(smell_dir, "refactored")) or not any(f.endswith('.txt') and f.startswith(f"{sample.split('.')[0]}_") for f in os.listdir(os.path.join(smell_dir, "refactored"))):
                generation_number = 1
            else:
                try:
                    existing_files = [f for f in os.listdir(os.path.join(smell_dir, "refactored")) if f.endswith('.txt') and f.startswith(f"{sample.split('.')[0]}_")]
                    existing_generation_numbers = [int(f.split('_')[1].split('.')[0]) for f in existing_files if f.split('_')[1].split('.')[0].isdigit()]
                    generation_number = max(existing_generation_numbers) + 1 if existing_generation_numbers else 1
                except:
                    generation_number = 1

            file_name = f"{sample.split('.')[0]}_{generation_number}.txt"

            with open(os.path.join(smell_dir, "refactored", file_name), 'w') as file:
                file.write(completion)
