"use strict";

const CAPITALS = (["Kabul","Mariehamn","Tirana","Algiers","Pago Pago","Andorra la Vella","Luanda","The Valley","Antarctica","St. John's","Buenos Aires","Yerevan","Oranjestad","Canberra","Vienna","Baku","Nassau","Manama","Dhaka","Bridgetown","Minsk","Brussels","Belmopan","Porto-Novo","Hamilton","Thimphu","Sucre","Kralendijk","Sarajevo","Gaborone","Brasilia","Diego Garcia","Bandar Seri Begawan","Sofia","Ouagadougou","Bujumbura","Phnom Penh","Yaounde","Ottawa","Praia","George Town","Bangui","N'Djamena","Santiago","Beijing","Flying Fish Cove","West Island","Bogota","Moroni","Brazzaville","Kinshasa","Avarua","San Jose","Yamoussoukro","Zagreb","Havana","Willemstad","Nicosia","Prague","Copenhagen","Djibouti","Roseau","Santo Domingo","Quito","Cairo","San Salvador","Malabo","Asmara","Tallinn","Addis Ababa","Stanley","Torshavn","Suva","Helsinki","Paris","Cayenne","Papeete","Port-aux-Francais","Libreville","Banjul","Tbilisi","Berlin","Accra","Gibraltar","Athens","Nuuk","St. George's","Basse-Terre","Hagatna","Guatemala City","St Peter Port","Conakry","Bissau","Georgetown","Port-au-Prince","","Vatican City","Tegucigalpa","Hong Kong","Budapest","Reykjavik","New Delhi","Jakarta","Tehran","Baghdad","Dublin","Douglas, Isle of Man","Jerusalem","Rome","Kingston","Tokyo","Saint Helier","Amman","Astana","Nairobi","Tarawa","Pyongyang","Seoul","Pristina","Kuwait City","Bishkek","Vientiane","Riga","Beirut","Maseru","Monrovia","Tripolis","Vaduz","Vilnius","Luxembourg","Macao","Skopje","Antananarivo","Lilongwe","Kuala Lumpur","Male","Bamako","Valletta","Majuro","Fort-de-France","Nouakchott","Port Louis","Mamoudzou","Mexico City","Palikir","Chisinau","Monaco","Ulan Bator","Podgorica","Plymouth","Rabat","Maputo","Nay Pyi Taw","Windhoek","Yaren","Kathmandu","Amsterdam","Willemstad","Noumea","Wellington","Managua","Niamey","Abuja","Alofi","Kingston","Saipan","Oslo","Muscat","Islamabad","Melekeok","East Jerusalem","Panama City","Port Moresby","Asuncion","Lima","Manila","Adamstown","Warsaw","Lisbon","San Juan","Doha","Saint-Denis","Bucharest","Moscow","Kigali","Gustavia","Jamestown","Basseterre","Castries","Marigot","Saint-Pierre","Kingstown","Apia","San Marino","Sao Tome","Riyadh","Dakar","Belgrade","Belgrade","Victoria","Freetown","Singapur","Philipsburg","Bratislava","Ljubljana","Honiara","Mogadishu","Pretoria","Grytviken","Juba","Madrid","Colombo","Khartoum","Paramaribo","Longyearbyen","Mbabane","Stockholm","Berne","Damascus","Taipei","Dushanbe","Dodoma","Bangkok","Dili","Lome","","Nuku'alofa","Port of Spain","Tunis","Ankara","Ashgabat","Cockburn Town","Funafuti","Kampala","Kiev","Abu Dhabi","London","Washington","","Montevideo","Tashkent","Port Vila","Caracas","Hanoi","Road Town","Charlotte Amalie","Mata Utu","El-Aaiun","Sanaa","Lusaka","Harare"]
    .filter(function (el) {
        return (el != null && el !== " ");
    }));
class Cookie{
    stat
}
class RandomImage{
    static id = 0;
    static async loadImage(){
        let key = Math.floor(Math.random()*19);
        try{
            console.log('from data key: ' + key);
            let src = localStorage.getItem('randomImage-' + key);
            return fetch(src).then(res => {
                if(res.ok){
                    return res.blob();
                }
                else{
                    return this.loadImage()
                }
            });
        }catch (e) {
            console.log(e.name + ": " + e.message);
        }
    }
    static async saveImage(image){
        let b64 = new FileReader();
        b64.readAsDataURL(image);
        b64.onload = () => {
            localStorage.setItem('randomImage-' + this.id,b64.result.toString());
        }
        this.id++;
        if(!localStorage.getItem('rImageID') || localStorage.getItem('rImageID') === '0'){
            localStorage.setItem('rImageID',String(this.id));
        }
        else if (parseInt(localStorage.getItem('rImageID')) < 19){
            let refID = Number(localStorage.getItem('rImageID'));
            refID++;
            localStorage.setItem('rImageID',String(refID));
        }
        else if (isNaN(Number(localStorage.getItem('rImageID')))){
            localStorage.setItem('rImageID','1');
        }
        console.log(this.id + ',' + localStorage.getItem('rImageID'));
    }
    static async getImage(category) {
        if(this.id >= 19 || parseInt(localStorage.getItem('rImageID')) >= 19){
            return this.loadImage();
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
    static getRCapital(){
        let id = Math.floor(Math.random()*this.capitals.length);
        let capital = this.capitals[id]
        return (capital.length > 1) ? capital : 'Gomel';
    }
    static getLorem(){
        let len = Math.floor(Math.random()*5)+3;
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
        tab.dataset.location = location.toLowerCase();
        this.id++;
        container.append(tab);
        this.addImage(tab);
        this.addMain(tab,location);
        this.addPrice(tab);
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
        let header = `<h4 class="tab-header">${location}</h4>`;
        let info = `<div class="tab-info">${this.getLorem()}</div>`
        tabMain.innerHTML = header + info;
        tab.append(tabMain);
    }
    static addPrice(tab){
        let tabPrice = document.createElement('div');
        tabPrice.classList.add('travel-price');
        tabPrice.innerHTML = `<h4>${(Math.random()*200).toFixed(2)}$</h4>`
        tab.append(tabPrice);
    }
}
class TravelLinks{
    static create
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
            TravelTab.createTab(container);
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





