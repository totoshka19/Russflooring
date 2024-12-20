export function calculateBaseboardLength() {
  const sqft = parseFloat(document.getElementById('sqft').value.trim());
  const hasBaseboard = document.getElementById('hasBaseboard').checked;

  if (hasBaseboard && !isNaN(sqft)) {
    const baseboardLength = 2 * (Math.sqrt(sqft) * 2 + 100);
    document.getElementById('baseboardLength').textContent = Math.round(baseboardLength);
    document.getElementById('baseboardLengthResult').classList.remove('hidden');
  } else {
    document.getElementById('baseboardLengthResult').classList.add('hidden');
  }
}

export function toggleStairsField() {
  const hasStairs = document.getElementById('hasStairs').checked;
  const stairsField = document.getElementById('stairsField');
  stairsField.classList.toggle('hidden', !hasStairs);
}

export function handleMaterialSelection() {
  const material = document.getElementById('material').value;

  document.getElementById('vinylOptions').classList.add('hidden');
  document.getElementById('laminateOptions').classList.add('hidden');
  document.getElementById('hardwoodOptions').classList.add('hidden');
  document.getElementById('installationOnlyOptions').classList.add('hidden');

  if (material === "vinyl") {
    document.getElementById('vinylOptions').classList.remove('hidden');
  } else if (material === "laminate") {
    document.getElementById('laminateOptions').classList.remove('hidden');
  } else if (material === "hardwood") {
    document.getElementById('hardwoodOptions').classList.remove('hidden');
  } else if (material === "installationOnly") {
    document.getElementById('installationOnlyOptions').classList.remove('hidden');
  }
}

export function setupSubmitButton() {
  document.getElementById('submitButton').addEventListener('click', () => {
    const sqft = parseFloat(document.getElementById('sqft').value.trim());
    const demoTypeValue = parseFloat(document.getElementById('demoType').value || 0);
    const hasBaseboard = document.getElementById('hasBaseboard').checked;
    const material = document.getElementById('material').value;
    const stairsCount = parseInt(document.getElementById('stairCount')?.value || 0, 10);
    let materialCost = 0;

    if (material === "vinyl") {
      materialCost = parseFloat(document.getElementById('vinylOption').value || 0);
    } else if (material === "laminate") {
      materialCost = parseFloat(document.getElementById('laminateOption').value || 0);
    } else if (material === "hardwood") {
      materialCost = parseFloat(document.getElementById('hardwoodOption').value || 0);
    } else if (material === "installationOnly") {
      materialCost = parseFloat(document.getElementById('installationType').value || 0);
    }

    const baseboardCost = hasBaseboard ? sqft * 0.5 : 0;
    const stairCost = stairsCount > 0 ? stairsCount * 50 : 0;

    const totalCost = (sqft * (demoTypeValue + materialCost)) + baseboardCost + stairCost;

    document.getElementById('costAmount').textContent = totalCost.toFixed(2);
    document.getElementById('totalCost').classList.remove('hidden');
  });
}
