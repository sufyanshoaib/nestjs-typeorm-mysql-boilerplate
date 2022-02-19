import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { OfferPost } from './entities/post.entity';

@Injectable()
export class PostsService {
    private posts: any = [{
        id: 1, title: 'Free McDonalds', tags:["Free", "McDonalds", "Food"]
    }, {
        id: 2, title: 'Operation Falafel now open', tags:["Falafel", "Food"]
    }, {
        id: 3, title: 'Hardware Store', tags:["Hardware", "Store"]
    }]

    getAllPosts(): OfferPost[] {
        return this.posts;
    }

    getPostsByTag(tag: string): OfferPost[] {
        return this.posts.filter(post => post.tags.includes(tag));
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
