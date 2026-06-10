import { Test, TestingModule } from '@nestjs/testing';
import { MetricsService } from '../../src/metrics/metrics.service';
import { beforeEach, describe, it } from 'node:test';
import { expect } from 'vitest';

describe('MetricsService', () => {
  let service: MetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetricsService],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
