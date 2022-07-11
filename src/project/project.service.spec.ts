import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectEntity } from './entities/project.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { Repository } from 'typeorm';

describe('ProjectService', () => {
  let projectService: ProjectService;
  let projectRepository: Repository<ProjectEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: getRepositoryToken(ProjectEntity),
          useValue: { create: jest.fn(), save: jest.fn() },
        },
      ],
    }).compile();

    projectService = module.get<ProjectService>(ProjectService);
    projectRepository = module.get<Repository<ProjectEntity>>(
      getRepositoryToken(ProjectEntity),
    );
  });

  it('should be defined', () => {
    expect(projectService).toBeDefined();
    expect(projectRepository).toBeDefined();
  });

  describe('create', () => {
    it('should be create with success', () => {
      // Arrange
      const data: CreateProjectDto = {
        name: 'Projeto Solar',
        link: 'www.google.com/sucesso',
        description: 'Um projeto bem legal para passar o tempo',
      };
      const projectEntityMock = data as ProjectEntity;

      jest.spyOn(projectRepository, 'create').mockReturnValueOnce(projectEntityMock);
      jest.spyOn(projectRepository, 'save').mockResolvedValueOnce(projectEntityMock);
      // Act
      const result = projectService.create(data);
      // Assert
      expect(result).toBeDefined();
      expect(projectRepository.create).toBeCalledTimes(1);
      expect(projectRepository.save).toBeCalledTimes(1);
    });
  });
});
