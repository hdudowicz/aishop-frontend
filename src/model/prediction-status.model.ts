export interface PredictionStatus {
  id: string;
  version?: string;
  urls: {
    get?: string;
    cancel?: string;
  }
  created_at: Date;
  started_at: Date;
  completed_at: Date;
  source: string;
  status?: string;
  input: {
    prompt?: string;
  }
  output: string[];
  error: any;
  logs?: string;
  metrics: {
    predict_time: string;
  }

}
