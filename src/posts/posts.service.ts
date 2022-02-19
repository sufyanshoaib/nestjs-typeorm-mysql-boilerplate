import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { OfferPost } from './entities/post.entity';

@Injectable()
export class PostsService {
    private posts: any = [{
        id: 1, title: 'Free McDonalds'
    }, {
        id: 2, title: 'Operation Falafel now open'
    }]

    getAllPosts(): OfferPost[] {
        return this.posts;
    }

    getPostsById(id: number): OfferPost {
        return this.posts.find(post => post.id === id);
    }

    createPost(postDto: CreatePostDto): OfferPost {
        const post = {id: Date.now(), ...postDto};
        this.posts.push(post);
        return post;
    }
}
