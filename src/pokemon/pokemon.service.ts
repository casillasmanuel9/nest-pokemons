import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon, PokemonDocument } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { PaginatioDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

  private defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<PokemonDocument>,
    private readonly configService: ConfigService
  ){
    this.defaultLimit = this.configService.getOrThrow<number>('defaultLimit')
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;
    } catch (error) {
      this.handleExeptions(error);
    }
  }

  findAll(pagination: PaginatioDto) {
    const { limit = this.defaultLimit, offset = 0 } = pagination;
    return this.pokemonModel.find().limit(limit).skip(offset).sort({
      no: 1
    }).select('-__v');
  }

  async findOne(term: string) {
    let pokemon: PokemonDocument;
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    } else if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    } else {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
    }

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with id, name or no "${term}" not found.`);
    }
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim();
    }
    try {
      const pokemonUpdated = await pokemon.updateOne(updatePokemonDto, { new: true });
      return pokemonUpdated; 
    } catch (error) {
      this.handleExeptions(error);
    }
  }

  async remove(id: string) {
    const result = await this.pokemonModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Pokemon with "${id}" not exit`);
    }
    return;
  }

  private handleExeptions(error: any): never {
    if (error.code === 11000) {
      throw new ConflictException(`Pokemon Exist in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't update Pokemon - Check server logs`);
  }
}
