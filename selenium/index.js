const { Builder, By } = require('selenium-webdriver');
const { getExtension, getAddHeaderUrl } = require('chrome-modheader');
const chrome = require('selenium-webdriver/chrome');

async function example() {

  const options = new chrome.Options().addExtensions(getExtension());
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  await driver.get('https://censo.abogacia.es/ecensofront/html/homeColegiados.iface?env=www.abogacia.es');

  // Seleccionar la opción de "Baleares" en el select con la id j_id23:idBuscar

  await driver.findElement(By.xpath("//*[@value='2011']")).click();
  await driver.findElement(By.id('j_id23:idBuscar')).click();
  // await driver.findElement(By.id('j_id23:tablaElementos:0')).click();

  // Lanzar con selenium un script llamado tableRowClicked, cuyos parametros son (event, false,'1', 'j_id23', 'j_id23:tablaElementossel_rows','iceDatTblRow2 tablaElementosRow2 iceRowSelSelected'


  // await driver.executeScript("tableRowClicked(event, false,'1', 'j_id23', 'j_id23:tablaElementossel_rows','iceDatTblRow2 tablaElementosRow2 iceRowSelSelected')");

  // await driver.executeScript("Ice.tableRowClicked(event, false,'1', 'j_id23', 'j_id23:tablaElementossel_rows','iceDatTblRow2 tablaElementosRow2 iceRowSelSelected');");

  // await driver.findElement(By.id('j_id23:tablaElementos:0')).click();

  // for (let i = 1; i < 4216; i++) {

  // }
}
example();


