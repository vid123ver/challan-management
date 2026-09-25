import json

INPUT_FILE = "../data/output/challans.json"

with open(INPUT_FILE, "r", encoding="utf-8") as file:
    challans = json.load(file)


def looks_suspicious(vehicle):

    vehicle_clean = vehicle.replace(" ", "").upper()

    # Same validation rule used previously
    import re

    return not re.fullmatch(
        r"[A-Z]{2}\d{1,2}[A-Z]{0,3}\d{1,4}",
        vehicle_clean
    )


count = 0

print("======================================")
print("SUSPICIOUS VEHICLE RECORDS")
print("======================================")

for record in challans:

    vehicle = record["vehicleNumber"]

    if looks_suspicious(vehicle):

        print(
            f"Index: {challans.index(record)} | "
            f"Page: {record['pageNumber']} | "
            f"Challan: {record['challanNumber']} | "
            f"Vehicle: {record['vehicleNumber']} | "
            f"CNR: {record['cnr']} | "
            f"Court: {record['court']}"
        )

        count += 1

        # Don't print all 269 initially
        if count >= 30:
            break

print("\nShowing first", count, "suspicious records.")