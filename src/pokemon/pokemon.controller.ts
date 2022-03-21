import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';

interface Pokemon {
  name: string;
  description: string;
  habitat: string;
  isLegendary: boolean;
}

@Controller('pokemon')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  @Get(':name')
  async findOne(@Param('name') name: string): Promise<Pokemon> {
    try {
      const pokemon = await this.pokemonService.findOne(name);

      return {
        name: pokemon.name,
        description: this.pokemonService.findDescription(
          pokemon.flavor_text_entries,
        ),
        habitat: pokemon.habitat.name,
        isLegendary: pokemon.is_legendary,
      };
    } catch (error) {
      if (error.response?.status === HttpStatus.NOT_FOUND) {
        throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
      }

      throw error;
    }
  }
}
