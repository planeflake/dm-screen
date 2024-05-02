import pdfplumber
import re
import json

def extract_stat_blocks(pdf_path, start_page=0, end_page=None):
    stats = []
    with pdfplumber.open(pdf_path) as pdf:
        # If end_page is not specified, use the last page of the PDF
        if end_page is None or end_page > len(pdf.pages):
            end_page = len(pdf.pages)
        
        for i in range(start_page, end_page):
            page = pdf.pages[i]
            text = page.extract_text()
            for block in text.split('\n\n'):  # Assuming each block is separated by double newlines
                if "Armor Class" in block:  # Simple check to identify stat blocks
                    stat = parse_stat_block(block)
                    if stat:
                        stats.append(stat)
    return stats

def parse_stat_block(block):
    # Adjust these regex patterns according to the actual content and structure
    try:
        name = re.search(r"^\w+ \w+", block).group(0)
        ac = re.search(r"Armor Class (\d+)", block).group(1)
        hp = re.search(r"Hit Points (\d+)", block).group(1)
        speed = re.search(r"Speed ([\d\w\s,]+)", block).group(1)
        # Add more fields as necessary

        stat_block = {
            "name": name,
            "armor_class": int(ac),
            "hit_points": int(hp),
            "speed": speed
        }
        return stat_block
    except AttributeError:
        return None

def save_to_json(data, file_path):
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)

# Example usage
pdf_path = "G:\\Mordenkainen.pdf"
# Specify the start and end pages for testing
start_page = 40  # Python index (0 is the first page)
end_page = 42    # Not inclusive, similar to range function

stats = extract_stat_blocks(pdf_path, start_page, end_page)
# Save the extracted data to a JSON file
save_to_json(stats, 'monsters-pdfplumber.json')

print("Data extraction complete.")
