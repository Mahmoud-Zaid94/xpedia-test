const resultSelectors = require('../selectors/result.selectors');
const homeSelectors = require('../selectors/home.selectors');

describe('Check Expedia Hotel Prices And Rates Sorts', () => {

  it('should search for "Canaa, Southeast Region, Brazil"', async () => {
    homeSelectors.hotelButton.click();
    homeSelectors.search.click();
    homeSelectors.search.sendKeys('Canaa, Southeast Region, Brazil');
    homeSelectors.searchButton.click();
    expect(resultSelectors.location.getText()).toEqual('Canaa, Southeast Region, Brazil');
  });

  it('should sort the result by "Price"', async () => {
    var arrayOfPrices = await resultSelectors.price.getText();
    var arr = [];
    for (var i = 0; i < arrayOfPrices.length; i++) {
      var x = arrayOfPrices[i].split('$');
      var y = Number(x[1]);
      arr.push(y)
    }
    var sortedArrayOfPrices = arr.sort((a, b) => b - a);
    resultSelectors.sortPriceButton.click();
    for (var i = 0; i < sortedArrayOfPrices.length; i++) {
      expect(resultSelectors.price.get(i).getText()).toEqual('$' + sortedArrayOfPrices[i].toString());
    }
  })

  it('should sort the result by "Guest Rating"', async () => {
    var arr = [];
    var arrayOfRates = await resultSelectors.rate.getText();
    for (var j = 0; j < arrayOfRates.length; j++) {
      var x = arrayOfRates[j].split('/5');
      var y = Number(x[0]);
      arr.push(y);
    }
    var sortedArrayOfRates = arr.sort((a, b) => a - b);
    resultSelectors.sortGust.click();
    for (var i = 0; i < sortedArrayOfRates.length; i++) {
      expect(resultSelectors.rate.get(i).getText()).toEqual(sortedArrayOfRates[i].toString() + '/5');
    }
  })

});

