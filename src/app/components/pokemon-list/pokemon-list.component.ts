import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../service/poke-api.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  pokemonDetails: any[];

  constructor(private pokeApiService: PokeApiService) {
    this.pokemonDetails = [];
  }

  ngOnInit(): void {
    this.loadAllPokemonDetails();
  }

  loadAllPokemonDetails(): void {
    this.pokeApiService.getPokemonDetails(0).subscribe({
      next: (result) => this.pokemonDetails = result,
      error: (error) => console.error(error),
    });
  }
}
