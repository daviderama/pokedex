import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PokemonService],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return the pokemon response', async () => {
      const response = {
        data: {
          name: 'wormadam',
          is_legendary: false,
          habitat: { name: 'water' },
          flavor_text_entries: [
            {
              flavor_text:
                'When the bulb on\nits back grows\nlarge, it appears\fto lose the\nability to stand\non its hind legs',
              language: {
                name: 'en',
              },
            },
          ],
        },
      };
      jest.spyOn(httpService, 'get').mockImplementation(
        () =>
          ({
            toPromise: () => Promise.resolve(response),
          } as any),
      );

      expect(await service.findOne('pokemon')).toStrictEqual(response.data);
    });
  });
});
