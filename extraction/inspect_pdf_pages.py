import pymupdf

PDF_PATH = "../data/input/TOTAL CHALLANS LIST LOK ADALAT.pdf"

pages_to_check = [12, 20, 21, 60, 61, 68, 71]

document = pymupdf.open(PDF_PATH)

for page_number in pages_to_check:

    print("\n" + "=" * 70)
    print(f"PDF PAGE {page_number}")
    print("=" * 70)

    page = document[page_number - 1]

    text = page.get_text()

    print(text)

document.close()