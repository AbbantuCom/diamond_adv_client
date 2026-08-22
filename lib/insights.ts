import { getInsights } from './content-api';
import { insightFilters } from './content-types';
import type { InsightArticle, InsightCategory, InsightItem } from './content-types';

/** Kept as the name the components already use for one insight. */
export type Insight = InsightItem;
export type { InsightArticle, InsightCategory };

export { getInsights };

export { insightFilters };

export async function getInsight(slug: string): Promise<Insight | undefined> {
  return (await getInsights()).find((insight) => insight.slug === slug);
}

/**
 * Insights that have a readable article. The rest are placeholder cards that hold
 * a slot in the listing without linking anywhere.
 */
export async function getPublishedInsights(): Promise<Insight[]> {
  return (await getInsights()).filter((insight) => insight.hasArticle && insight.slug);
}
