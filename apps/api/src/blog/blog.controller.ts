import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFileDto } from './dto/create-file.dto';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('files')
  @ApiOperation({ summary: 'Get all markdown files' })
  @ApiResponse({ status: 200, description: 'Return all markdown files' })
  async getMarkdownFiles() {
    console.log('getMarkdownFiles');
    const s = await this.blogService.getMarkdownFiles();
    console.log(s, 's');
    return s;
  }

  @Get('files/:id')
  @ApiOperation({ summary: 'Get a markdown file by ID' })
  @ApiResponse({ status: 200, description: 'Return a markdown file' })
  async getMarkdownFileById(@Param('id') id: string) {
    return this.blogService.getMarkdownFileById(id);
  }

  @Post('files')
  @ApiOperation({ summary: 'Create a new markdown file' })
  @ApiResponse({
    status: 201,
    description: 'The markdown file has been created',
  })
  async createMarkdownFile(
    @Body()
    createFileDto: CreateFileDto,
  ) {
    return this.blogService.createMarkdownFile(createFileDto);
  }
}
