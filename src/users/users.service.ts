import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, getManager, Repository, Transaction, TransactionRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './entities/role.entity';
import { Task } from './entities/task.entity';
import { User } from './entities/user.entity';
import { UserDetail } from './entities/userDetail.entity';

@Injectable()
export class UsersService {
  //Initialize constructor by injecting User Repository
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(UserDetail) private userDetailRepo: Repository<UserDetail>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(Role) private roleRepo: Repository<Role>
  ) {}

  //@Transaction()
  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log("createUserDto:", createUserDto);
    return await getManager().transaction(async transactionalEntityManager => {
      const newUser = this.usersRepo.create({
        name: createUserDto.name, 
        password: createUserDto.password,
        email: createUserDto.email 
      }); 
      await transactionalEntityManager.save(newUser); 

      const userDetail = this.userDetailRepo.create({
        user: newUser,
        instagramId: createUserDto.instagramId
      });
      userDetail.user = newUser;
      await transactionalEntityManager.save(userDetail);

      const task1 = this.taskRepo.create({ name: 'Walkthrough the application'});
      await transactionalEntityManager.save(task1);
      const task2 = this.taskRepo.create({ name: 'Go through the documentation'});
      await transactionalEntityManager.save(task2);

      newUser.tasks = [task1, task2];

      let role = await this.roleRepo.findOne({name: 'ROLE_USER'});
      if (role == undefined) {
        role = await this.roleRepo.create({name: 'ROLE_USER'});
        await transactionalEntityManager.save(role);
      }

      newUser.roles = [role];
      await transactionalEntityManager.save(newUser); 

      return newUser;
    });
  }

  async findEntireUserByEmail(email: string) {
    
    /** One query is executed to get User id with all joins, another query to get all joined data by id */
    /*const user = await this.usersRepo.findOne({
      where: {email: email},
      relations: ['userDetail', 'tasks', 'roles']
    });*/

    /** Only one query is executed */
    const user = await this.usersRepo.createQueryBuilder('user')
                          .innerJoinAndSelect("user.userDetail", "userDetail")
                          .leftJoinAndSelect("user.tasks", "tasks")
                          .leftJoinAndSelect("user.roles", "roles")
                          .where('user.email = :email', {email: email})
                          .getOne();

    return user
  }

  findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.usersRepo.findOneOrFail(id);
    } catch(err) { throw err;}

  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    return this.usersRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.usersRepo.remove(user);
  }

  findByEmail(email: string) {
    return this.usersRepo.createQueryBuilder("user")
    .where('email = :userEmail', {
      userEmail: email,
    }).innerJoinAndSelect("user.roles", "roles").getOne();
  }
  
}
