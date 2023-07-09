import {
  Injectable,
} from '@nestjs/common';
import {Span, TraceData} from "@tdqa/types";

@Injectable()
export class TraceDataService {

  public analyse(data: TraceData): void {
    this.calculateCompleteness(data);
    this.calculateConsistency(data);
    this.calculateSpanTimingAccuracy(data);
    this.calculateTraceDepth(data);
    this.calculateTraceBreadth(data);
  }

  private calculateCompleteness(data: TraceData): void {
    const completenessMetric = data.spans.every(span =>
      this.checkSpanCompleteness(span)
    );

    console.log(`Completeness Metric: ${completenessMetric}`);
  }

  private checkSpanCompleteness(span: Span): boolean {
    // Check if all required fields are present and correctly filled
    return (
      span.traceId !== undefined &&
      span.spanId !== undefined &&
      span.name !== undefined &&
      span.startTimeUnixNano !== undefined &&
      span.endTimeUnixNano !== undefined
    );
  }

  private calculateConsistency(data: TraceData): void {
    const consistencyMetric = this.checkFieldConsistency(data.spans);

    console.log(`Consistency Metric: ${consistencyMetric}`);
  }

  private checkFieldConsistency(spans: Span[]): boolean {
    // Check the consistency of data types or formats across all fields
    const firstSpan = spans[0];
    return spans.every(span =>
      span.startTimeUnixNano === firstSpan.startTimeUnixNano &&
      span.endTimeUnixNano === firstSpan.endTimeUnixNano
    );
  }

  private calculateSpanTimingAccuracy(data: TraceData): void {
    const spanTimingAccuracyMetric = data.spans.every(span =>
      this.checkSpanTimingAccuracy(span, data.spans)
    );

    console.log(`Span Timing Accuracy Metric: ${spanTimingAccuracyMetric}`);
  }

  private checkSpanTimingAccuracy(span: Span, spans: Span[]): boolean {
    // Check if the span start and end times are logical and accurate
    if (span.parentSpanId !== undefined) {
      const parentSpan = spans.find(s => s.spanId === span.parentSpanId);
      if (parentSpan) {
        return (
          span.startTimeUnixNano >= parentSpan.startTimeUnixNano &&
          span.endTimeUnixNano <= parentSpan.endTimeUnixNano
        );
      }
    }
    return true; // If there is no parentSpanId, consider it accurate
  }

  private calculateTraceDepth(data: TraceData): void {
    const traceDepth = data.spans.reduce(
      (depth, span) => Math.max(depth, this.calculateSpanDepth(span, data.spans)),
      0
    );

    console.log(`Trace Depth: ${traceDepth}`);
  }

  private calculateSpanDepth(span: Span, spans: Span[]): number {
    // Calculate the number of spans within a single trace
    if (span.parentSpanId !== undefined) {
      const parentSpan = spans.find(s => s.spanId === span.parentSpanId);
      if (parentSpan) {
        return 1 + this.calculateSpanDepth(parentSpan, spans);
      }
    }
    return 1; // If there is no parentSpanId, it is the root span
  }

  private calculateTraceBreadth(data: TraceData): void {
    const traceBreadth = Array.from(
      new Set(data.spans.map(span => span.name))
    ).length;

    console.log(`Trace Breadth: ${traceBreadth}`);
  }
}
