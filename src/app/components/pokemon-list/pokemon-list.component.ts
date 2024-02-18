import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../service/poke-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../../service/shared-data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  currentPageNo: number;
  pokemonDetails: any[];

  constructor(private pokeApiService: PokeApiService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private sharedDataService: SharedDataService) {
    this.currentPageNo = 0;
    this.pokemonDetails = [];
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      this.currentPageNo = params.has('page') ? params.get('page') : 0;
      this.loadAllPokemonDetails();
    });
    // this.loadAllPokemonDetails();
  }

  loadAllPokemonDetails(): void {
    this.pokeApiService.getPokemonDetails(this.currentPageNo).subscribe({
      next: (result) => this.pokemonDetails = result,
      error: (error) => console.error(error),
    });
  }

  loadPreviousPage(): void {
    this.router.navigate(['/pokemon-list'], {
      queryParams: {
        page: --this.currentPageNo,
      }
    });
  }

  loadNextPage(): void {
    this.router.navigate(['/pokemon-list'], {
      queryParams: {
        page: ++this.currentPageNo,
      }
    });
  }

  viewDetails(pokemon: any): void {
    this.sharedDataService.sendData(pokemon);
    this.router.navigate(['/pokemon-details']);
  }
}
