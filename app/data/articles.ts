import type { Article } from '~/types'
import { useReadingTime } from '~/composables/useReadingTime'

// Article content imported as raw strings
const programmingPracticeContent = `## Programming Practice Resources

| Link                                                                         | Description                                                                                                                                       |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Codewars](https://www.codewars.com/)                                        | A community-driven site with coding challenges that help you learn and grow. Ranking up as you solve problems feels like a game—super motivating. |
| [Leetcode](https://leetcode.com/)                                            | Ideal for practicing interview-style questions. It's got a huge problem library you can sort by topic or difficulty.                              |
| [HackerRank](https://www.hackerrank.com/)                                    | Amazon uses this in their hiring process, so it's a must-know. It offers challenges and projects to sharpen your skills.                          |
| [Cracking the Coding Interview](https://www.crackingthecodinginterview.com/) | The go-to book for tech interviews. It breaks down common questions and teaches a structured problem-solving approach.                            |
| [Microsoft Learn](https://docs.microsoft.com/en-us/learn/)                   | A free platform with learning paths for all kinds of tech. It's always fresh with new content.                                                    |
| [Amazon AWS Educate](https://aws.amazon.com/education/awseducate/)           | Hands-on AWS experience with tutorials and courses—perfect for diving into cloud tech.                                                            |

---

### Final Thoughts

> "You always pass failure on your way to success."
>
> -- Mickey Rooney

These resources turned coding practice into something I genuinely enjoy. If you're an aspiring programmer, give them a try. Failure's just a pit stop on the road to success—keep coding, keep learning, and don't quit.`

export const articles: Article[] = [
  {
    slug: 'programming-practice-resources',
    title: 'Programming Practice Resources - Learning from My First Amazon Interview',
    date: '2022-08-12',
    author: 'AJ Barea',
    excerpt:
      "First tech interview with Amazon, fresh out of college. Didn't pass, but turned the experience into a coding skill boost by discovering key resources.",
    content: programmingPracticeContent,
    readingTime: useReadingTime(programmingPracticeContent),
    tags: ['amazon', 'resources', 'interview', 'learn'],
    coverImage:
      'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  }
]

// Helper function to get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}

// Get articles sorted by date (newest first)
export function getArticlesSortedByDate(): Article[] {
  return [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get related articles (excluding current article, limited to 3)
export function getRelatedArticles(currentSlug: string, limit = 3): Article[] {
  return articles.filter((article) => article.slug !== currentSlug).slice(0, limit)
}
