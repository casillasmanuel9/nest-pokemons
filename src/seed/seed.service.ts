import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { IPokemonResponse } from './interfaces/pokemon-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon, PokemonDocument } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  

  constructor(
    private readonly http: AxiosAdapter,
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<PokemonDocument>
  ){}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<IPokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=65');

    const pokemonToInsert = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      return ({
        name,
        no
      })
    });

    this.pokemonModel.insertMany(pokemonToInsert);
    return data.results;
  }
}
