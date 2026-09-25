import pymupdf
import re
import json
import os

# ==============================
# FILE PATHS
# ==============================

PDF_PATH = "../data/input/TOTAL CHALLANS LIST LOK ADALAT.pdf"
OUTPUT_PATH = "../data/output/challans.json"

# ==============================
# REGEX
# ==============================

DATE_PATTERN = re.compile(r"^\d{2}-\d{2}-\d{4}$")

# ==============================
# EXTRACT FUNCTION
# ==============================

def extract_challans():

    document = pymupdf.open(PDF_PATH)

    print("Total pages:", len(document))
    print("Starting extraction...\n")

    challans = []
    invalid_rows = []

    for page_index in range(len(document)):

        page = document[page_index]

        # Page number for human-readable output
        page_number = page_index + 1

        text = page.get_text()

        # Split extracted text into lines
        lines = [
            line.strip()
            for line in text.splitlines()
            if line.strip()
        ]

        i = 0

        while i < len(lines):

            # ----------------------------------
            # Detect serial number
            # ----------------------------------

            if lines[i].isdigit():

                serial_number = int(lines[i])

                # We need at least:
                #
                # serial
                # challan
                # vehicle
                # CNR
                # date
                # court
                #
                if i + 5 < len(lines):

                    challan_number = lines[i + 1]

                    # Vehicle number may contain spaces,
                    # so we cannot simply take one line/token.
                    vehicle_number = lines[i + 2]

                    cnr = lines[i + 3]
                    next_date = lines[i + 4]
                    court = lines[i + 5]

                    # ----------------------------------
                    # Validate date
                    # ----------------------------------

                    if DATE_PATTERN.match(next_date):

                        record = {
                            "serialNumber": serial_number,
                            "challanNumber": challan_number,
                            "vehicleNumber": vehicle_number,
                            "cnr": cnr,
                            "nextDate": next_date,
                            "court": court,
                            "pageNumber": page_number
                        }

                        challans.append(record)

                        i += 6
                        continue

            i += 1

    document.close()

    # ==============================
    # SAVE JSON
    # ==============================

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

    with open(OUTPUT_PATH, "w", encoding="utf-8") as file:
        json.dump(
            challans,
            file,
            indent=2,
            ensure_ascii=False
        )

    # ==============================
    # SUMMARY
    # ==============================

    print("\n==============================")
    print("EXTRACTION COMPLETED")
    print("==============================")

    print("Total records extracted:", len(challans))
    print("Invalid rows:", len(invalid_rows))
    print("Output file:", OUTPUT_PATH)


# ==============================
# MAIN
# ==============================

if __name__ == "__main__":
    extract_challans()