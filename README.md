# Technical Task: Construction Cost Calculator

## Overview
The Construction Cost Calculator allows users to estimate the total cost of their flooring project by selecting demolition types, baseboard replacement, flooring materials, stairs, and other factors. The system dynamically calculates costs based on user inputs and includes the option to only calculate installation costs. The design is optimized for both desktop and mobile devices.

---

## Technical Details

### User Contact Information
- **Fields:**
  - Name (Text only, 30 characters max)
  - Phone Number (Numbers only, 10 characters only)
  - Email Address (Email)
  - Zip Code (Numbers only, 5 characters only)
- **Validation:**
  - All fields must be filled before enabling the calculator.
  - The calculator remains disabled until all fields are completed.

---

### Inputs and Options

#### 1. Square Footage
- **Field:** sqft
- **Placeholder:** "Enter approximate sqft"
- **Minimum value:** 100
- **Maximum value:** 10000
- **Validation:** Must be a positive number.

---

#### 2. What type of floor do you need to remove?
- **Dropdown field:** demoType
- **Options and Costs:**
  - Carpet: $1/sqft
  - Tile: $2.5/sqft
  - Hardwood: $2.5/sqft
  - Vinyl: $1/sqft
  - Laminate: $1/sqft
  - Linoleum: $1/sqft
  - I don’t need removal: $0/sqft
- **Calculation:** `demoCost = sqft * selectedDemoCost`

---

#### 3. Do you need baseboard replacement? (If yes, please click on checkbox)
- **Checkbox:** hasBaseboard
- **Tooltip:** Explains what baseboard is.
- **Formula for baseboard length:**
  - Perimeter Formula: `BaseboardLength = 2 * (sqrt(sqft) * 2 + 100)`
- **Cost:** $2/linear foot
- **Calculation:** `baseboardCost = BaseboardLength * $2.5`

---

#### 4. Do you have stairs? (If yes, please click on checkbox)
- **Checkbox:** hasStairs
- **When checked:**
  - A field appears: stairCount (minimum: 1, maximum: 25).
- **Cost per step:** $100
- **Calculation:** `stairsCost = stairCount * $100`

---

#### 5. What type of the flooring material do you need to install?
- **Dropdown:** material
- **Options:**
  - **Luxury Vinyl Plank**
    - Additional dropdown: vinylOption
    - Options:
      - Luxury Vinyl 5.5 mm: $1.49/sqft
      - Luxury Vinyl 6.5 mm: $1.89/sqft
      - Luxury Vinyl 8 mm: $2.29/sqft
    - Installation Cost: $2.25/sqft
    - Calculation: `(sqft * selectedVinylCost) + (sqft * $2.25)`
  - **Laminate**
    - Additional dropdown: laminateOption
    - Options:
      - Laminate 12 mm no pad attached: $2.39/sqft
      - Laminate 10 mm pad attached: $2.59/sqft
    - Installation Cost: $2.25/sqft
    - Calculation: `(sqft * selectedLaminateCost) + (sqft * $2.25)`
  - **Hardwood**
    - Additional dropdown: hardwoodOption
    - Options:
      - Waterproof Hardwood 7 mm: $3.89/sqft
      - Engineered Hardwood 12 mm: $5.89/sqft
    - Installation Cost: $3.25/sqft
    - Calculation: `(sqft * selectedHardwoodCost) + (sqft * $3.25)`
  - **I have material and need installation only**
    - Additional dropdown: installationType
    - Options:
      - Luxury Vinyl Plank: $2.25/sqft
      - Laminate: $2.25/sqft
      - Hardwood: $3.25/sqft
    - Calculation: `installationOnlyCost = sqft * selectedInstallationCost`

---

#### 6. Total Cost Calculation
The total cost is the sum of all individual costs:
- Formula: `totalCost = demoCost + baseboardCost + stairsCost + materialCost + installationCost`

---

### 7. Functional Requirements
1. **Real-Time Validation:**
 - Contact information fields must be validated in real-time.
 - The calculator is enabled only after all contact fields are completed.
2. **Dynamic Input Options:**
 - Flooring material options should appear or hide dynamically based on user selection.
 - Vinyl, Laminate, and Hardwood have sub-options that update costs.
3. **Responsive Design:**
 - The calculator must work seamlessly on both desktop and mobile devices.
4. **Dynamic Cost Updates:**
 - Costs for demolition, baseboards, stairs, and materials must update dynamically as the user inputs data.

