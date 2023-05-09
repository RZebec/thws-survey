export interface AnalyticsEvent {
  userId?: string;
  event_category: string;
  event_label: string;
  event_measured_time: number;
}
