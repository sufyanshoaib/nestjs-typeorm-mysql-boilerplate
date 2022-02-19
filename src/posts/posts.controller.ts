import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { OfferPost } from './entities/post.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {};

    @Get()
    getPosts(): OfferPost[]  {
        return this.postsService.getAllPosts();
    }

    @Get(":id")
    getPostById(@Param('id') id: Number): OfferPost {
        return this.postsService.getPostsById(Number(id));
    }

    @Post()
    createPost(@Body() postDto: CreatePostDto): OfferPost {
        return this.postsService.createPost(postDto);
    }
}
