import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { OfferPost } from './entities/post.entity';
import { PostsService } from './posts.service';

@ApiTags("Posts")
@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {};

    @ApiOkResponse({type: OfferPost, isArray: true})
    @ApiNotFoundResponse()
    @Get()
    getPosts(): OfferPost[]  {
        const posts = this.postsService.getAllPosts();
        if (posts.length == 0) {
            throw new NotFoundException();
        }
        return posts;
    }

    @ApiOkResponse({type: OfferPost, isArray: true})
    @ApiQuery({name:"tag", required: true})
    @ApiNotFoundResponse()
    @Get("search")
    getPostsByTag(@Query('tag') tag: string): OfferPost[] {
        const posts = this.postsService.getPostsByTag(tag);
        if (posts.length == 0) {
            throw new NotFoundException();
        }
        return posts;
    }

    @ApiOkResponse({type: OfferPost})
    @ApiNotFoundResponse()
    @Get(":id")
    getPostById(@Param('id', ParseIntPipe) id: number): OfferPost {
        const post = this.postsService.getPostsById(id);
        if (!post) {
            throw new NotFoundException();
        }
        return post;
    }

    @ApiCreatedResponse({type: OfferPost})
    @Post()
    createPost(@Body() postDto: CreatePostDto): OfferPost {
        return this.postsService.createPost(postDto);
    }
}
