import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  //create user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto

    //check if email exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException({message: 'Email already exist'});
    }

    const newUser = this.userRepository.create(createUserDto)
    return await this.userRepository.save(newUser);
  }
  //read all user

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  //read single user
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }});
    if(!user){
      throw new BadRequestException({ message: 'User not foud'})
    }
    return user;
  }

  //update user
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id)

    const updateUser = this.userRepository.merge(user,updateUserDto);
    return await this.userRepository.save(updateUser);
  }

  //delete user
  async  remove(id: number): Promise<User> {
    const user = await this.findOne(id)
    return await this.userRepository.remove(user);
  }
}
