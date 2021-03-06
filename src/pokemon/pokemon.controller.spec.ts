import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

describe('PokemonController', () => {
  let controller: PokemonController;
  let service: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [PokemonController],
      providers: [PokemonService],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return the pokemon object', async () => {
      const expected = {
        name: 'wormadam',
        description:
          'When the bulb on\nits back grows\nlarge, it appears\fto lose the\nability to stand\non its hind legs',
        habitat: 'water',
        isLegendary: false,
      };
      const serviceResponse = {
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
      };
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(serviceResponse));

      expect(await controller.findOne('pokemon')).toStrictEqual(expected);
    });
  });

  describe('findTranslatedOne', () => {
    describe('when the translation is successful', () => {
      it('should return the pokemon object with translated description', async () => {
        const translatedDescription = 'translated description';
        const expected = {
          name: 'wormadam',
          description: translatedDescription,
          habitat: 'water',
          isLegendary: false,
        };
        const serviceResponse = {
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
        };
        jest
          .spyOn(service, 'findOne')
          .mockImplementation(() => Promise.resolve(serviceResponse));
        jest
          .spyOn(service, 'findTranslatedDescription')
          .mockImplementation(() => Promise.resolve(translatedDescription));

        expect(await controller.findTranslatedOne('pokemon')).toStrictEqual(
          expected,
        );
      });
    });

    describe('when the translation is not successful', () => {
      it('should return the pokemon object with the not translated description', async () => {
        const expected = {
          name: 'wormadam',
          description:
            'When the bulb on\nits back grows\nlarge, it appears\fto lose the\nability to stand\non its hind legs',
          habitat: 'water',
          isLegendary: false,
        };
        const serviceResponse = {
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
        };
        jest
          .spyOn(service, 'findOne')
          .mockImplementation(() => Promise.resolve(serviceResponse));
        jest
          .spyOn(service, 'findTranslatedDescription')
          .mockImplementation(() => Promise.reject(new Error()));

        expect(await controller.findTranslatedOne('pokemon')).toStrictEqual(
          expected,
        );
      });
    });
  });
});
