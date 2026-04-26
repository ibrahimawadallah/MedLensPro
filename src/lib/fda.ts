/**
 * FDA Content Fetching
 * Fetches official FDA content from RSS feeds and APIs
 */

export interface FDANewsItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  category?: string;
}

/**
 * Fetch FDA Drug Safety Communications RSS feed
 */
export async function getFDADrugSafetyNews(limit: number = 5): Promise<FDANewsItem[]> {
  try {
    const response = await fetch('https://www.fda.gov/about-fda/contact-fda/rss-feeds/drug-safety-and-availability/rss.xml', {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error(`FDA RSS fetch failed: ${response.status}`);
    }
    
    const text = await response.text();
    const items = parseRSS(text);
    
    return items.slice(0, limit);
  } catch (error) {
    console.error('Error fetching FDA news:', error);
    return [];
  }
}

/**
 * Parse RSS XML content
 */
function parseRSS(xmlText: string): FDANewsItem[] {
  const items: FDANewsItem[] = [];
  
  // Simple XML parsing for RSS
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const titleRegex = /<title>([\s\S]*?)<\/title>/;
  const linkRegex = /<link>([\s\S]*?)<\/link>/;
  const descriptionRegex = /<description>([\s\S]*?)<\/description>/;
  const pubDateRegex = /<pubDate>([\s\S]*?)<\/pubDate>/;
  const categoryRegex = /<category>([\s\S]*?)<\/category>/;
  
  let match;
  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemContent = match[1];
    
    const titleMatch = titleRegex.exec(itemContent);
    const linkMatch = linkRegex.exec(itemContent);
    const descMatch = descriptionRegex.exec(itemContent);
    const pubDateMatch = pubDateRegex.exec(itemContent);
    const categoryMatch = categoryRegex.exec(itemContent);
    
    if (titleMatch && linkMatch) {
      items.push({
        title: stripHTML(titleMatch[1]),
        link: linkMatch[1],
        description: descMatch ? stripHTML(descMatch[1]).substring(0, 200) + '...' : '',
        pubDate: pubDateMatch ? pubDateMatch[1] : '',
        category: categoryMatch ? categoryMatch[1] : undefined,
      });
    }
  }
  
  return items;
}

/**
 * Strip HTML tags from text
 */
function stripHTML(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Format date for display
 */
export function formatFDADate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}
