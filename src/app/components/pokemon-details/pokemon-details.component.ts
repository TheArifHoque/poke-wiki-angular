import { Component, OnDestroy } from '@angular/core';
import { SharedDataService } from '../../service/shared-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent implements OnDestroy {
  pokemon: any;
  subscription: Subscription;

  constructor(private sharedDataService: SharedDataService) {
    this.subscription = sharedDataService.data$.subscribe((data) => (this.pokemon = data));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
