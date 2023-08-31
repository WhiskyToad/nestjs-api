import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, EditTaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  async getTasks(userId: number) {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId,
      },
    });

    return tasks;
  }

  async createTask(userId: number, dto: CreateTaskDto) {
    const task = await this.prisma.task.create({
      data: {
        userId,
        ...dto,
      },
    });

    return task;
  }

  async getTaskById(userId: number, taskId: number) {
    return await this.prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    });
  }

  async editTaskkById(userId: number, taskId: number, dto: EditTaskDto) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task || task.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }
    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: { ...dto },
    });
  }

  async deleteTaskById(userId: number, taskId: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task || task.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }

    return await this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
