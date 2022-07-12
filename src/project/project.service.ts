import { ProjectEntity } from './entities/project.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    return this.projectRepository.save(this.projectRepository.create(createProjectDto));
  }

  async findAll(): Promise<ProjectEntity[]> {
    return await this.projectRepository.find();
  }

  async findOne(id: number) {
    return await this.projectRepository.findOneBy({id});
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOneBy({id});

    this.checkIfExist(project);

    return await this.projectRepository.update(id, updateProjectDto);
  }

  async remove(id: number) {
    const project = await this.projectRepository.findOneBy({id});

    this.checkIfExist(project);

    project.archived = true;

    return await this.projectRepository.update(id, project);
  }

  private checkIfExist(project: ProjectEntity) {
    if (!project) {
      throw new HttpException('Projeto não encontrado', HttpStatus.BAD_REQUEST);
    }
  }
}
