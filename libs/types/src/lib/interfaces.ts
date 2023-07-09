export interface ResponseError {
  statusCode: number;
  error: string;
  message?: string[];
}

export interface Document {
  id: string;
  created_at: Date;
  updated_at: Date;
}


export interface Attribute {
  key: string;
  value: string;
}

export interface Span  {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  name: string;
  startTimeUnixNano: number;
  endTimeUnixNano: number;
  attributes: Attribute[];
}

export interface TraceData {
  spans: Span[];
}

