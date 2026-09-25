import fitz

pdf_path = "../data/input/TOTAL CHALLANS LIST LOK ADALAT.pdf"

document = fitz.open(pdf_path)

print("Total pages:", len(document))

page = document[0]

text = page.get_text()

print("\nFirst page text:\n")
print(text)