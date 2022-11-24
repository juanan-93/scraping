//until sirve para hacer esperar que se cargue un elemento html en la pantalla, nos traemos tres objetos de la libreria selenium-webdriver que son By, Builder y until
const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

async function example() {

    const driver = await new Builder().forBrowser('chrome').build();
// declaramos la variable para coger  la fecha con el objeto Date de js
    let today = new Date();
    // aqui la cogemos le suma uno porque empieza en 0 
    let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
 // apartitr de aqui hasta el for recore paginas , en esta linea entra en lapagina
    await driver.get('https://glovoapp.com/es/es/palma/restaurantes_1');

    let pages = await driver.findElement(By.className('current-page-text')).getText()
    //separamos la cadena de texto, en este caso suprimimos los espacios de 1 de 8 y cponemos entre corchetes el elemento que queremos coger en esa caso es 2 que equivale 8
    pages = pages.split(' ')[2];
// con el for recorremos las paginas siempre le ponemos el ultimo numero de la pagina cion que nos sale  y le incrementamos 1 en este caso es 1de 8 y le incrementamos 1
    for (let i = 1; i <= pages; i++) {
      
        await driver.get('https://glovoapp.com/es/es/palma/restaurantes_1/?page=' + i);
       //si hay muchos elementos no le puede dar clcik a muchos elementos, aqui busca en toda la pagina un elemento div que tenga un atributo class y 
        let restaurants_links = await driver.findElements(By.xpath("//div[@class='store-cards-wrapper hidden-when-search']//a[@class='collection-item hover-effect full-width--mobile']"));
        //declaramos una array vacia donde en dentro del bucle meteremos las urls de los resturantes en este caso.
        let restaurants_hrefs = [];
        //BUCLE PARA ENTRAR EN LAS FICHAS DE CADA RESTAURANTE 
        for ( let restaurant_link of restaurants_links ) {
          // push lo usamos para meter valor a una array declarada vacia 
            restaurants_hrefs.push(await restaurant_link.getAttribute('href'));
        }

        for( let restaurant_href of restaurants_hrefs ) {

            await driver.get(restaurant_href);
           
            let restaurantName = await driver.findElement(By.xpath("//span[@data-e2e-id='breadcrumbs-store']")).getText();
            let minimumPayment = "";
            let minimumPaymentFee = "";

            let serviceFee = await driver.findElement(By.xpath(".//div[@data-test-id='service-fee-label']")).getText();
            //el split lo usamos para separar una cadena de texto en este caso lo que hace es separar la cadena de texto en un array y lo que esta entre corchetes es el elemento que queremos coger
            serviceFee = serviceFee.split(" ")[0].replace(",", ".");

            try {
              //aqui LE DECIMOS que busque los siguientes elementos dentro del html con until le decimos que espere a que cargue busque y al fina 100000 el el tiempo que tarda, get text que coja el texo que le decimos [el numero del elemento que buscamos dentro den el sapn hay dos be aqui decimos que coja la primera ]
                minimumPayment = await driver.wait(until.elementLocated(By.xpath("//span[@data-test-id='surcharge-button']//span//b[1]")), 10000).getText();
                minimumPayment = minimumPayment.split(" ")[0].replace(",", ".");
               
                minimumPaymentFee = await driver.findElement(By.xpath("//span[@data-test-id='surcharge-button']//span//b[2]")).getText();
                minimumPaymentFee = minimumPaymentFee.split(" ")[0].replace(",", ".");
            } catch {
                minimumPayment = "";
                minimumPaymentFee = "";
            }
           
            let categoriesLinks = await driver.findElements(By.xpath("//div[@class='image-preview-card']//a[@class='card__link']"));

            if(categoriesLinks.length > 0) {

                let categoriesHrefs = [];
           
                for ( let categoryLink of categoriesLinks ) {
                    categoriesHrefs.push(await categoryLink.getAttribute('href'));
                }
           
                for( let category_href of categoriesHrefs ) {
           
                    await driver.get(category_href);
                   
                    let dishElements = await driver.findElements(By.xpath("//div[@type='PRODUCT_ROW']"));
               
                    for(let dishElement of dishElements) {
                      // el punto delante de (.//) espara que busque dentro del elemento que le hemos dicho que busque
                        let dishName = await dishElement.findElement(By.xpath(".//div[@class='product-row__name']/span/span")).getText();
                        let dishprice = await dishElement.findElement(By.xpath(".//span[@class='product-price__effective product-price__effective--new-card']")).getText();
                        dishprice = dishprice.split(" ")[0].replace(",", ".");
                       // en el csv hay que ponr una coma delanta ",glovo" para que separe los campos por la clave id.Aqui le damos el orden de los campos que queremos que salgan en el csv \n
                        let extractData = ",Glovo," + restaurantName + "," + serviceFee + "," + minimumPayment + "," + minimumPaymentFee + "," + dishName + "," + dishprice + "," + date + "\n";
                        //cree el archivo csv
                        fs.appendFile('glovo.csv', extractData, function (err) {
                            if (err) throw err;
                        });
                    }
                }

            }else{
               
                let dishElements = await driver.findElements(By.xpath("//div[@type='PRODUCT_ROW']"));
               
                for(let dishElement of dishElements) {
           
                    let dishName = await dishElement.findElement(By.xpath(".//div[@class='product-row__name']/span/span")).getText();
                    let dishprice = await dishElement.findElement(By.xpath(".//span[@class='product-price__effective product-price__effective--new-card']")).getText();
                    //la funcion split convierte texto en una array, entre parentesis y las comillas le ponemos donde va ir la separacion para hacer una array.
                    dishprice = dishprice.split(" ")[0].replace(",", ".");
                   
                    let extractData = ",Glovo," + restaurantName + ","  + serviceFee + "," + minimumPayment + "," + minimumPaymentFee + "," + dishName + "," + dishprice + "," + date + "\n";
           
                    fs.appendFile('glovo.csv', extractData, function (err) {
                        if (err) throw err;
                    });
                }
            }
        }
    }
}

example();