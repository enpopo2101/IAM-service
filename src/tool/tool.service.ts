import { Injectable } from '@nestjs/common';
import { Tool } from 'src/schemas/tool.schema';
import { CreateToolDto } from './dto/create-tool.dto';
import { Model } from 'mongoose';
import { ToolDocument } from '../schemas/tool.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ToolService {
  constructor(@InjectModel(Tool.name) private toolModel: Model<ToolDocument>) {}
  async create(createToolDto: CreateToolDto): Promise<ToolDocument> {
    const tool = new this.toolModel(createToolDto);
    return await tool.save();
  }

  findAll() {
    return `This action returns all tool`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tool`;
  }

  remove(id: number) {
    return `This action removes a #${id} tool`;
  }
}
