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
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
          },
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

      jest
        .spyOn(projectRepository, 'create')
        .mockReturnValueOnce(projectEntityMock);
      jest
        .spyOn(projectRepository, 'save')
        .mockResolvedValueOnce(projectEntityMock);
      // Act
      const result = projectService.create(data);
      // Assert
      expect(result).toBeDefined();
      expect(projectRepository.create).toBeCalledTimes(1);
      expect(projectRepository.save).toBeCalledTimes(1);
    });
  });

  describe('get all', () => {
    it('should be return empty array when dont have projects', async () => {
      // Arrange
      const projectEntityMock = [] as ProjectEntity[];
      jest
        .spyOn(projectRepository, 'find')
        .mockResolvedValueOnce(projectEntityMock);
      // Act
      const result = await projectService.findAll();
      // Assert
      expect(result).toBeDefined();
      expect(result).toHaveLength(0);
    });

    it('should be return one project when have id project', async () => {
      // Arrange
      const data: ProjectEntity = new ProjectEntity();
      data.name = 'Projeto Solar';
      data.link = 'www.google.com/sucesso';
      data.description = 'Um projeto bem legal para passar o tempo';

      const projectEntityMock = [data] as ProjectEntity[];
      jest
        .spyOn(projectRepository, 'find')
        .mockResolvedValueOnce(projectEntityMock);
      // Act
      const result = await projectService.findAll();
      // Assert
      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(data);
    });
  });

  describe('get one', () => {
    it('should be return null when dont have projects', async () => {
      // Arrange
      const projectEntityMock = null;
      jest
        .spyOn(projectRepository, 'findOneBy')
        .mockResolvedValueOnce(projectEntityMock);
      // Act
      const result = await projectService.findOne(1);
      // Assert
      expect(result).toBeDefined();
      expect(result).toEqual(projectEntityMock);
    });

    it('should be return one project when have id project', async () => {
      // Arrange
      const data: ProjectEntity = new ProjectEntity();
      data.name = 'Projeto Solar';
      data.link = 'www.google.com/sucesso';
      data.description = 'Um projeto bem legal para passar o tempo';

      const projectEntityMock = data as ProjectEntity;
      jest
        .spyOn(projectRepository, 'findOneBy')
        .mockResolvedValueOnce(projectEntityMock);
      // Act
      const result = await projectService.findOne(1);
      // Assert
      expect(result).toBeDefined();
      expect(result).toEqual(data);
    });
  });

  describe('update', () => {
    it('', async () => {
      // Arrange
      const data: ProjectEntity = new ProjectEntity();
      data.name = 'Projeto Solar';
      data.link = 'www.google.com/sucesso';
      data.description = 'Um projeto bem legal para passar o tempo';

      // Act
      const result = await projectService.update(1, data);
      // Assert
      expect(result).toBeDefined();
    });
  });

  describe('remove', () => {
    it('', async () => {
      // Arrange
      // Act
      const result = await projectService.remove(1);
      // Assert
      expect(result).toBeDefined();
    });
  });
});
