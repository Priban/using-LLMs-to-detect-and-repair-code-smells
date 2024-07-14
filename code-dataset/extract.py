import os

# Function to read file contents
def read_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()

# Function to write file contents
def write_file(file_path, content):
    with open(file_path, 'w') as file:
        file.write(content)

# Function to extract JavaScript code from completion content
def extract_js_from_completion(completion_content):
    parts = completion_content.split('```javascript')
    if len(parts) > 1:
        js_parts = parts[1].split('```')
        if len(js_parts) > 0:
            return js_parts[0].strip()
    return None

def extract_smell(smell):
    # Directory containing the refactored code completions
    refactored_dir = os.path.join(os.getcwd(), 'code_smells', smell, 'refactored')

    # If the refactored directory does not exist, skip
    if not os.path.exists(refactored_dir):
        print(f"Refactored directory not found for: {smell}")
        return

    # Iterate over each refactored completion file
    for completion_file in os.listdir(refactored_dir):
        if completion_file.endswith('.txt'):
            completion_path = os.path.join(refactored_dir, completion_file)
            
            # Read the completion content
            completion_content = read_file(completion_path)
            
            # Extract JavaScript code from the completion content
            js_code = extract_js_from_completion(completion_content)
            
            if js_code:
                # Write the JavaScript code to a new file with a .js extension
                js_file_name = completion_file.replace('.txt', '.js')
                js_file_path = os.path.join(refactored_dir, js_file_name)
                write_file(js_file_path, js_code)
                print(f"Extracted JavaScript code written to: {js_file_path}")
            else:
                print(f"No JavaScript code found in: {completion_path}")

# Directory containing the code smells
code_smells_dir = os.path.join(os.getcwd(), 'code_smells')

# Iterate over each code smell directory
code_smells = [d for d in os.listdir(code_smells_dir) if os.path.isdir(os.path.join(code_smells_dir, d))]

for smell in code_smells:
    print(f"Extracting JavaScript code for {smell}...")
    extract_smell(smell)