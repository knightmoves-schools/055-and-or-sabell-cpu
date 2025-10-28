function taxable(state, taxExempt) {
  if (state === "IA" && taxExempt === false) {
    return "is taxable";
  }
}

function isVehicle(hasWheels, canFly, canSwim) {
  if (hasWheels || canFly || canSwim) {
    return "is vehicle";
  }
}
