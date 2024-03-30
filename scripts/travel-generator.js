"use strict";

/*class ManualCookie{
    static getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        console.log(matches[1])
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    static setCookie(name, value, days = 31, options = {}) {

        options = {
            path: '/',
            // при необходимости добавьте другие значения по умолчанию
            'max-age': days * 24 * 60 * 60,
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }
        console.log(updatedCookie);
        document.cookie = updatedCookie;
    }
    static async loadBlob(key){
        let src = this.getCookie(key);
        return fetch(src).then(res => {
            if (res.ok) {
                return res.blob();
            } else {
                throw new Error("Can't get blob by address");
            }
        })
    }
    static async saveBlob(id,blob){
        try{
            let b64 = new FileReader();
            b64.readAsDataURL(blob);
            b64.onload = () => {
                ManualCookie.setCookie(id,b64.result.toString());
            }
        } catch (e) {
            console.log(e.name + ': ' + e.message);
        }
    }
}*/
class ManualLocal{

    static async loadBlob(key){
        let src = localStorage.getItem(key);
        return fetch(src).then(res => {
            if (res.ok) {
                return res.blob();
            } else {
                throw new Error("Can't get blob by address");
            }
        })
    }
    static async saveBlob(id,blob){
        let b64 = new FileReader();
        b64.readAsDataURL(blob);
        try{
            b64.onload = () => {
                localStorage.setItem(id,b64.result.toString());
            }
        } catch (e) {
            console.log(e.name + ': ' + e.message);
        }
    }
}


const CAPITALS = (["Kabul","Mariehamn","Tirana","Algiers","Pago Pago","Andorra la Vella","Luanda","The Valley","Antarctica","St. John's","Buenos Aires","Yerevan","Oranjestad","Canberra","Vienna","Baku","Nassau","Manama","Dhaka","Bridgetown","Minsk","Brussels","Belmopan","Porto-Novo","Hamilton","Thimphu","Sucre","Kralendijk","Sarajevo","Gaborone","Brasilia","Diego Garcia","Bandar Seri Begawan","Sofia","Ouagadougou","Bujumbura","Phnom Penh","Yaounde","Ottawa","Praia","George Town","Bangui","N'Djamena","Santiago","Beijing","Flying Fish Cove","West Island","Bogota","Moroni","Brazzaville","Kinshasa","Avarua","San Jose","Yamoussoukro","Zagreb","Havana","Willemstad","Nicosia","Prague","Copenhagen","Djibouti","Roseau","Santo Domingo","Quito","Cairo","San Salvador","Malabo","Asmara","Tallinn","Addis Ababa","Stanley","Torshavn","Suva","Helsinki","Paris","Cayenne","Papeete","Port-aux-Francais","Libreville","Banjul","Tbilisi","Berlin","Accra","Gibraltar","Athens","Nuuk","St. George's","Basse-Terre","Hagatna","Guatemala City","St Peter Port","Conakry","Bissau","Georgetown","Port-au-Prince","","Vatican City","Tegucigalpa","Hong Kong","Budapest","Reykjavik","New Delhi","Jakarta","Tehran","Baghdad","Dublin","Douglas, Isle of Man","Jerusalem","Rome","Kingston","Tokyo","Saint Helier","Amman","Astana","Nairobi","Tarawa","Pyongyang","Seoul","Pristina","Kuwait City","Bishkek","Vientiane","Riga","Beirut","Maseru","Monrovia","Tripolis","Vaduz","Vilnius","Luxembourg","Macao","Skopje","Antananarivo","Lilongwe","Kuala Lumpur","Male","Bamako","Valletta","Majuro","Fort-de-France","Nouakchott","Port Louis","Mamoudzou","Mexico City","Palikir","Chisinau","Monaco","Ulan Bator","Podgorica","Plymouth","Rabat","Maputo","Nay Pyi Taw","Windhoek","Yaren","Kathmandu","Amsterdam","Willemstad","Noumea","Wellington","Managua","Niamey","Abuja","Alofi","Kingston","Saipan","Oslo","Muscat","Islamabad","Melekeok","East Jerusalem","Panama City","Port Moresby","Asuncion","Lima","Manila","Adamstown","Warsaw","Lisbon","San Juan","Doha","Saint-Denis","Bucharest","Moscow","Kigali","Gustavia","Jamestown","Basseterre","Castries","Marigot","Saint-Pierre","Kingstown","Apia","San Marino","Sao Tome","Riyadh","Dakar","Belgrade","Belgrade","Victoria","Freetown","Singapur","Philipsburg","Bratislava","Ljubljana","Honiara","Mogadishu","Pretoria","Grytviken","Juba","Madrid","Colombo","Khartoum","Paramaribo","Longyearbyen","Mbabane","Stockholm","Berne","Damascus","Taipei","Dushanbe","Dodoma","Bangkok","Dili","Lome","","Nuku'alofa","Port of Spain","Tunis","Ankara","Ashgabat","Cockburn Town","Funafuti","Kampala","Kiev","Abu Dhabi","London","Washington","","Montevideo","Tashkent","Port Vila","Caracas","Hanoi","Road Town","Charlotte Amalie","Mata Utu","El-Aaiun","Sanaa","Lusaka","Harare"]
    .filter((el) => (el != null && el !== " " && el !== ''))
    .sort((a,b) => a.localeCompare(b)));
console.log(CAPITALS);
class RandomImage{
    static id = 0;
    static async loadImage(step = 0){
        let key = 'randomImage' + (Math.floor(Math.random()*18)+1);
        try {
            console.log('Get Image from key: ' + key);
            return await ManualLocal.loadBlob(key);
        }catch (e) {
            console.log( e.name + ": " + e.message + ": " + step);
            if( step < 5) return await this.loadImage(++step);
            else {
                localStorage.setItem('rImageID',String(0));
                return await this.getImage();
            }
        }
    }
    static async saveImage(image){
        let id = 'randomImage' + (this.id);
        try{
            await ManualLocal.saveBlob(id,image);
            let imageID = localStorage.getItem('rImageID');
            if(!imageID || imageID === "0"){
                localStorage.setItem('rImageID',String(1));
            }
            else if (parseInt(imageID) < 19 ){
                let refID = parseInt(imageID);
                refID++;
                localStorage.setItem('rImageID',String(refID));
            }
            else if (isNaN(Number(imageID))){
                localStorage.setItem('rImageID','0');
            }
            console.log('Local id:' + id + ', Saved id:' + imageID);
            this.id++;
        }catch (e) {
            console.log(e.name + ": " + e.message);
                await this.saveImage(false);
        }

    }
    static async getImage(category = 'city') {

        if(parseInt(localStorage.getItem('rImageID')) >= 19) return this.loadImage();
        else if(this.id >= 19){
            try{
                return this.loadImage()
            } catch (e) {
                console.log(e.name + ":" + e.message);
            }
        }
        let response = await fetch('https://api.api-ninjas.com/v1/randomimage?category=' + category, {
            method: 'GET',
            headers:{
                'X-Api-Key': '+qTImCgrYKlcoKZSe1F8Zw==SHIDRIQGu8UwHPfx',
                'Accept': 'image/jpg',
            },

        });
        if(response.ok){
            let image = await response.blob();
            this.saveImage(image).then();
            return image;
        }
        else {
            console.log(response.status);
        }
    }

    static createImg() {
        return document.createElement('img');
    }
    static  createRandomImage(category){
        let img =  this.createImg();
        this.getImage(category)
            .then(src => img.src = URL.createObjectURL(src))
            .catch((e) => console.log(e.name + ": " + e.message));
        return img;
    }
}

class TravelTab{
    static id = 0;
    static capitals = CAPITALS;
    static lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi aperiam autem consequuntur fugiat harum ipsum laudantium minus modi nulla odio praesentium provident qui repellat, totam ut veniam voluptatum. Deserunt minus, optio perspiciatis similique suscipit temporibus. Accusantium, amet consequatur hic modi odit possimus quaerat vitae voluptas? Aut cum cupiditate eaque expedita impedit, in laborum praesentium, quibusdam, reprehenderit repudiandae suscipit voluptatem. Aperiam autem dolore doloremque et, harum provident ullam. Ad architecto asperiores, cumque debitis explicabo id iste libero, maiores molestiae natus officiis placeat quam quod sed soluta sunt tempora, tempore? Accusantium aperiam excepturi harum itaque magni molestiae quisquam voluptates? Amet, aspernatur.'.split(' ',100);
    static tabs = {

    }

    static getRCapital(){
        let id = Math.floor(Math.random()*this.capitals.length);
        let capital = this.capitals[id]
        return (capital.length > 1) ? capital : 'Gomel';
    }
    static getLorem(){
        let len = Math.floor(Math.random()*24)+6;
        let lorem = "This is";
        for(let i = 0; i < len; i++){
            let id = Math.floor(Math.random()*this.lorem.length);
            let word =this.lorem[id];

            word = (word.length > 1) ? word[0].toUpperCase() + word.slice(1) : word[0].toUpperCase();

            lorem += " " + word;
        }
        return lorem;
    }
    static createTab(container){
        let location = this.getRCapital();
        let tab = document.createElement('div');

        tab.classList.add('travel-tab');
        this.id++;
        container.append(tab);
        this.addImage(tab);
        this.addMain(tab,location);
        this.addPrice(tab);
        if(!this.tabs[location]){
            this.tabs[location] = [tab];
        }
        else {
            this.tabs[location].push(tab);
        }
    }
    static addImage(tab){
        let imgCont = document.createElement("div");
        imgCont.classList.add('travel-img-cont');
        let img = RandomImage.createRandomImage('city');
        img.width = 150;
        img.height = 150;
        img.classList.add('travel-img');
        tab.append(imgCont);
        imgCont.append(img);
    }
    static addMain(tab,location){
        let tabMain = document.createElement('div');
        tabMain.classList.add('travel-main');
        let header = `<h4 class="tab-header"><a href="" class="tab-header" onclick="return false;" data-location="${location}">${location}</a></h4>`;
        let info = `<div class="tab-info">${this.getLorem()}</div>`
        tabMain.innerHTML = header + info;
        tab.append(tabMain);
    }
    static addPrice(tab){
        let tabPrice = document.createElement('div');
        tabPrice.classList.add('travel-price');
        let stars = Math.floor(Math.random()*4)+1;
        tabPrice.innerHTML = `<h4>${(Math.random()*200).toFixed(2)}$</h4><span class="tab-stars">${ '&starf;'.repeat(stars) + '&star;'.repeat(5-stars)}</span>`
        tab.append(tabPrice);
    }
}
class TravelLinks{
    capitals = CAPITALS;
    constructor() {
        this.navLinks = document.querySelector('.ul-links');
        this.travelCont = document.querySelector('.travel-container');
        this.capitals.forEach((location) => this.addFilter(location));
        console.log(JSON.stringify(TravelTab.tabs));
        document.addEventListener('click',function (event) {
            let link = event.target.closest('[data-location]');
            if(!link) return;
            event.preventDefault();
            this.loadPages(link.dataset.location);
        }.bind(this))
    }
    addFilter(location){
        let filter = document.createElement('li');
        let link = document.createElement('a');
        link.href = "";
        link.dataset.location = location;
        link.innerHTML = location;
        filter.append(link);
        this.navLinks.append(filter);
    }
    loadPages(location){
        try{
            window.addEventListener('scroll',loadTabs);
        }catch (e) {
            console.log(e.name + ':' + e.message);
        }
        this.travelCont.innerHTML = '';
        if(TravelTab.tabs && TravelTab.tabs[location]){
            this.travelCont.append(...TravelTab.tabs[location]);
        }
    }
}
class DynamicTabs{
    constructor() {
        this.travelCont = document.querySelector('.travel-container');
        this.min = Math.round(document.documentElement.clientHeight/150);
        this.loaded = 0;
        this.loadTabs(this.min*3,this.travelCont);
    }
    loadTabs(val = this.min,container = this.travelCont){
        this.loaded+=1;
        for(let i =0; i< val;i++){
            TravelTab.createTab(container)
        }
    }
    scrollToLoad(){
        let scrolls = Math.floor(window.scrollY/document.documentElement.clientHeight + 0.3);
        console.log(scrolls +  ',' + this.loaded);
        if(scrolls > this.loaded){
            this.loadTabs();
        }
    }
}
let tab = new DynamicTabs();
let loadTabs = tab.scrollToLoad.bind(tab);
window.addEventListener('scroll',loadTabs);
new TravelLinks();





