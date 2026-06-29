
export interface ConsumerMetrics {

    totalProcessed: number;
    totalSuccess: number;
    totalFailed: number;
    totalRetries: number;
    statedAt: Date;
    averageProcessingTime: number;

}