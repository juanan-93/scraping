
const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

async function example() {

    const driver = await new Builder().forBrowser('chrome').build();

    let today = new Date();

    let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();

    await driver.get('https://tienda.comercialvera.eu/es/3-carne');

    //delcaramos una variable  donde le buscmos el numero 5 que es donde nos sale reflejado la cantidad de paginas que tene,
    //de ahi nos vamos al atributo a y con gettext que nos coja el texto de ese atributo

    let pages = await driver.findElement(By.xpath("//ul[contains(@class,'page-list')]/li[5]/a")).getText();

    //declaramos la i que equivale a la pagina 1 de la paginacion y le declaramos que si i es menor a el numero le incremente uno hata llegar a 100
    for( i=1 ; i<= pages; i++) {
        
        //aqui entramos en el enlace de la pagina y le sumamos la variable creada en el bucle que es i.

        await driver.get('https://tienda.comercialvera.eu/es/3-carne?page=' + i);

        let restaurants_links = await driver.findElements(By.xpath("//h3[@class='h3 product-title']/a"));

        let restaurants_hrefs = [];
        // Aqui hacemos un blucle para meter dentro del array los productos
        for ( let restaurant_link of restaurants_links ) {
            
            restaurants_hrefs.push(await restaurant_link.getAttribute('href'));
        }

        // y en este bucle lo usamos para para meternos y salir de cada producto
        for( let restaurant_href of restaurants_hrefs ) {

            await driver.get(restaurant_href);
        }
        
    }
}

example();