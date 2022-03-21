import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

interface PokemonResponse {
  name: string;
  flavor_text_entries: FlavorTextEntries[];
  habitat: {
    name: string;
  };
  is_legendary: boolean;
}

interface FlavorTextEntries {
  flavor_text: string;
  language: {
    name: string;
  };
}

@Injectable()
export class PokemonService {
  constructor(private httpService: HttpService) {}

  async findOne(name: string): Promise<PokemonResponse> {
    const response = await this.httpService
      .get(`https://pokeapi.co/api/v2/pokemon-species/${name}/`)
      .toPromise();
    return response.data;
  }

  findDescription(entries: FlavorTextEntries[]): string | null {
    const description = entries.find((elem) => elem?.language?.name === 'en');

    return description?.flavor_text || null;
  }

  async findTranslatedDescription(
    pokemon: PokemonResponse,
  ): Promise<any> | null {
    const description = this.findDescription(pokemon.flavor_text_entries);
    if (pokemon.habitat.name === 'cave' || pokemon.is_legendary) {
      const response = await this.httpService
        .post(`https://api.funtranslations.com/translate/yoda.json`, {
          text: description,
        })
        .toPromise();
      return response.data?.contents?.translated;
    } else {
      const response = await this.httpService
        .post(`https://api.funtranslations.com/translate/shakespeare.json`, {
          text: description,
        })
        .toPromise();
      return response.data?.contents?.translated;
    }

    return null;
  }
}
