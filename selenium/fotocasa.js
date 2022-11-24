
const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');
const { title } = require('process');
//La const fastcsv = require('fast-csv'); va fuera de la funcion example para crear el csv
const fastcsv = require('fast-csv');

async function example() {

    //estas 3 constantes van dentro de la funcio example para crear el csv
    const csvStream = fastcsv.format({ headers: true });
    const csv = fs.createWriteStream('fotocasa.csv', { flag: 'a' });
    csvStream.pipe(csv).on('end', () => process.exit());

    const driver = await new Builder().forBrowser('chrome').build();

    let today = new Date();

    let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();

    await driver.get('https://www.fotocasa.es/es/alquiler/viviendas/illes-balears-provincia/todas-las-zonas/l');
    await driver.wait(until.elementLocated(By.xpath("//button[@data-testid='TcfAccept']")), 10000).click();
    
    await driver.manage().window().maximize();
    


    
    let pages = 56;

    for( i=1 ; i<= pages; i++) {
        
        await driver.get('https://www.fotocasa.es/es/alquiler/viviendas/illes-balears-provincia/todas-las-zonas/l/' + i);

        await driver.executeScript('document.body.style.zoom="1%"');

        await driver.sleep(2000);

        let cards = await driver.findElements(By.xpath(".//section[@class='re-SearchResult']/article"));


        for(let card of cards){

            let title = await card.findElement(By.xpath(".//h3[@class='re-CardHeader']/span/strong")).getText();
            title = title.replace("/mes", "");
            let price = await card.findElement(By.xpath(".//span[@class= 're-CardPrice']")).getText();
            price = price.replace("€", "");
            let room = await card.findElement(By.xpath(".//li[@class= 're-CardFeaturesWithIcons-feature']/span")).getText();
            room = room.replace("habs.", "");
            let area = await card.findElement(By.xpath(".//li[@class= 're-CardFeaturesWithIcons-feature']/span[@class= 're-CardFeaturesWithIcons-feature-icon re-CardFeaturesWithIcons-feature-icon--surface']")).getText();
            area = area.replace("m²", "");

            // console.log(price, title, room, area);
        
            //definimos las columnas(que equivalen a los campos ) y le pasamos su variables
            csvStream.write({
                
                date: date,
                titulo: title, 
                precio: price,
                habitacion: room,
                area: area
                
            });
        
        };


    }

 


}

example();