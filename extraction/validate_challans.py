import json
import re
from collections import Counter

INPUT_FILE = "../data/output/challans.json"

DATE_PATTERN = re.compile(r"^\d{2}-\d{2}-\d{4}$")


def validate_challans():

    # ==============================
    # LOAD DATA
    # ==============================

    with open(INPUT_FILE, "r", encoding="utf-8") as file:
        challans = json.load(file)

    print("================================")
    print("DATA VALIDATION STARTED")
    print("================================")

    print("Total records:", len(challans))

    # ==============================
    # 1. CHECK DUPLICATE CHALLAN NO.
    # ==============================

    challan_numbers = [
        record.get("challanNumber")
        for record in challans
    ]

    challan_counter = Counter(challan_numbers)

    duplicate_challans = {
        challan: count
        for challan, count in challan_counter.items()
        if count > 1
    }

    print("\n1. Duplicate Challan Numbers")
    print("--------------------------------")

    if duplicate_challans:
        print("Duplicates found:", len(duplicate_challans))

        for challan, count in list(duplicate_challans.items())[:10]:
            print(challan, "->", count, "times")
    else:
        print("No duplicate challan numbers found.")


    # ==============================
    # 2. CHECK MISSING FIELDS
    # ==============================

    required_fields = [
        "serialNumber",
        "challanNumber",
        "vehicleNumber",
        "cnr",
        "nextDate",
        "court",
        "pageNumber"
    ]

    records_with_missing_fields = []

    for index, record in enumerate(challans):

        missing_fields = [
            field
            for field in required_fields
            if not record.get(field)
        ]

        if missing_fields:
            records_with_missing_fields.append({
                "index": index,
                "missing": missing_fields
            })

    print("\n2. Missing Fields")
    print("--------------------------------")

    if records_with_missing_fields:
        print(
            "Records with missing fields:",
            len(records_with_missing_fields)
        )

        for item in records_with_missing_fields[:10]:
            print(item)
    else:
        print("No missing fields found.")


    # ==============================
    # 3. CHECK INVALID DATES
    # ==============================

    invalid_dates = []

    for index, record in enumerate(challans):

        date = record.get("nextDate", "")

        if not DATE_PATTERN.match(date):
            invalid_dates.append({
                "index": index,
                "date": date
            })

    print("\n3. Invalid Dates")
    print("--------------------------------")

    if invalid_dates:
        print("Invalid dates:", len(invalid_dates))

        for item in invalid_dates[:10]:
            print(item)
    else:
        print("No invalid dates found.")


    # ==============================
    # 4. CHECK EMPTY/NULL RECORDS
    # ==============================

    empty_records = [
        index
        for index, record in enumerate(challans)
        if not isinstance(record, dict) or not record
    ]

    print("\n4. Empty Records")
    print("--------------------------------")

    if empty_records:
        print("Empty records:", len(empty_records))
    else:
        print("No empty records found.")


    # ==============================
    # 5. CHECK SERIAL NUMBERS
    # ==============================

    invalid_serials = []

    for index, record in enumerate(challans):

        serial = record.get("serialNumber")

        if not isinstance(serial, int):
            invalid_serials.append({
                "index": index,
                "serial": serial
            })

    print("\n5. Invalid Serial Numbers")
    print("--------------------------------")

    if invalid_serials:
        print("Invalid serial numbers:", len(invalid_serials))
    else:
        print("No invalid serial numbers found.")


    # ==============================
    # FINAL SUMMARY
    # ==============================

    print("\n================================")
    print("VALIDATION COMPLETED")
    print("================================")

    print("Total records:", len(challans))
    print("Duplicate challans:", len(duplicate_challans))
    print("Missing-field records:", len(records_with_missing_fields))
    print("Invalid dates:", len(invalid_dates))
    print("Empty records:", len(empty_records))
    print("Invalid serial numbers:", len(invalid_serials))

        # ==============================
    # 6. CHALLAN FORMAT CHECK
    # ==============================

    invalid_challan_numbers = []

    for index, record in enumerate(challans):

        challan = record.get("challanNumber", "")

        # Challan numbers should be alphanumeric
        if not re.fullmatch(r"[A-Za-z0-9]+", challan):
            invalid_challan_numbers.append({
                "index": index,
                "challan": challan
            })

    print("\n6. Invalid Challan Number Format")
    print("--------------------------------")

    if invalid_challan_numbers:
        print(
            "Invalid challan numbers:",
            len(invalid_challan_numbers)
        )

        for item in invalid_challan_numbers[:10]:
            print(item)
    else:
        print("No invalid challan number formats found.")


    # ==============================
    # 7. VEHICLE NUMBER CHECK
    # ==============================

    invalid_vehicle_numbers = []

    for index, record in enumerate(challans):

        vehicle = record.get("vehicleNumber", "")

        # Remove spaces for format checking
        vehicle_clean = vehicle.replace(" ", "").upper()

        # Basic Indian vehicle number structure
        if not re.fullmatch(
            r"[A-Z]{2}\d{1,2}[A-Z]{0,3}\d{1,4}",
            vehicle_clean
        ):
            invalid_vehicle_numbers.append({
                "index": index,
                "vehicle": vehicle
            })

    print("\n7. Vehicle Number Format")
    print("--------------------------------")

    if invalid_vehicle_numbers:
        print(
            "Potentially invalid vehicle numbers:",
            len(invalid_vehicle_numbers)
        )

        for item in invalid_vehicle_numbers[:10]:
            print(item)
    else:
        print("No suspicious vehicle number formats found.")


    # ==============================
    # 8. CNR FORMAT CHECK
    # ==============================

    invalid_cnr = []

    for index, record in enumerate(challans):

        cnr = record.get("cnr", "")

        if not re.fullmatch(r"[A-Za-z0-9]+", cnr):
            invalid_cnr.append({
                "index": index,
                "cnr": cnr
            })

    print("\n8. CNR Format")
    print("--------------------------------")

    if invalid_cnr:
        print("Potentially invalid CNR values:", len(invalid_cnr))

        for item in invalid_cnr[:10]:
            print(item)
    else:
        print("No suspicious CNR formats found.")


    # ==============================
    # 9. COURT VALUES
    # ==============================

    court_counter = Counter(
        record.get("court", "")
        for record in challans
    )

    print("\n9. Court Distribution")
    print("--------------------------------")

    print("Different court values:", len(court_counter))

    for court, count in court_counter.most_common(20):
        print(f"{court}: {count}")


    # ==============================
    # 10. DATE DISTRIBUTION
    # ==============================

    date_counter = Counter(
        record.get("nextDate", "")
        for record in challans
    )

    print("\n10. Next Date Distribution")
    print("--------------------------------")

    print("Different next dates:", len(date_counter))

    for date, count in date_counter.most_common(20):
        print(f"{date}: {count}")
if __name__ == "__main__":
    validate_challans()