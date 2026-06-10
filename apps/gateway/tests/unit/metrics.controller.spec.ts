import { Test, TestingModule } from '@nestjs/testing';
import { MetricsController } from '../../src/metrics/metrics.controller';
import { beforeEach, describe, it } from 'node:test';
import { expect } from 'vitest';

describe('MetricsController', () => {
  let controller: MetricsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetricsController],
    }).compile();

    controller = module.get<MetricsController>(MetricsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
