import { Injectable } from '@angular/core';

interface Unit {
  value: string;
  shorthand: string;
}

@Injectable({ providedIn: 'root' })
export class UnitsService {
  units: Unit[] = [
    {
      value: 'g',
      shorthand: 'g',
    },
    {
      value: 'ml',
      shorthand: 'ml',
    },
    {
      value: 'ml',
      shorthand: 'ml',
    },
    {
      value: 'cup',
      shorthand: 'cup',
    },
    {
      value: 'teaspoon',
      shorthand: 'tsp',
    },
    {
      value: 'tablespoon',
      shorthand: 'tb',
    },
  ];
}
