import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Coin{
  id:string;
  name:string;
  symbol:string;
  image:string;
  current_price:number;
  price_change_percentage_24h:number;
  total_volume:number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  coins :Coin[] = []
  titles: String[] =[
    "#",
    "Moneda",
    "Precio",
    "Variación",
    "Volumen de las ultimas 24hs",
    "Grafico"
  ]

  searchText="";
  filteredCoins: Coin[] = []

  url:string ="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Coin[]>(this.url)
      .subscribe(
        (res) =>{
          this.coins=res; 
          this.filteredCoins=res;
        },
         err => console.log(err))
  }

  searchCoin(){
    //si el nombre o el symbol de la moneda coincide con el texto en el input filtralos.
    this.filteredCoins = this.coins.filter(coin => coin.name.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase())
    || coin.symbol.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()))
  }

}
