# Nuxt 3 Portfolio - Comprehensive UI Testing Prompt

Use this prompt with Claude Code to perform thorough UI testing of the Nuxt 3 portfolio application.

---

## The Prompt

```
I need you to perform comprehensive UI testing of my Nuxt 3 portfolio app at @nuxt-portfolio using Playwright MCP.

## Setup
1. Start the dev server: `npm run dev` in the nuxt-portfolio directory
2. Run the server in background and tail logs to monitor for warnings/errors
3. Navigate to http://localhost:3000

## Testing Checklist

### 1. Navigation & Layout
- [ ] Test all 5 nav links (Home, Projects, Gallery, Resume, Blog)
- [ ] Verify active link highlighting works
- [ ] Test sticky header on scroll
- [ ] Resize to mobile (375px) and test hamburger menu
- [ ] Verify slide-out drawer opens/closes properly
- [ ] Check footer renders on all pages

### 2. Theme System
- [ ] Click theme toggle, verify dark/light switch
- [ ] Reload page, verify theme persists
- [ ] Navigate to different pages, confirm theme stays

### 3. Home Page
- [ ] Profile image loads in hero section
- [ ] Typewriter effect cycles through roles
- [ ] Test all social links (GitHub, LinkedIn, YouTube, Email)
- [ ] Timeline entries render correctly
- [ ] Skills/expertise grid displays

### 4. Projects Page
- [ ] Test filter buttons: All, AI/ML, Full-Stack, Research, Cloud
- [ ] Verify projects filter correctly for each category
- [ ] Check project cards have images, badges, tech tags
- [ ] Test action buttons (Demo, GitHub, YouTube links)
- [ ] Verify hover effects on cards

### 5. Gallery Page
- [ ] Images load with skeleton placeholders
- [ ] Click image to open PhotoSwipe lightbox
- [ ] Test arrow key navigation in lightbox
- [ ] Test Escape to close lightbox
- [ ] Verify zoom functionality works
- [ ] Check image captions display

### 6. Resume Page
- [ ] Default "Industry" view displays
- [ ] Toggle to "Research" view, content changes
- [ ] Toggle back to "Industry" view
- [ ] Test PDF download buttons (both views)
- [ ] Verify all sections render (Experience, Education, Skills)
- [ ] Research view shows Publications section

### 7. Blog Page
- [ ] Blog cards display with images, tags, dates
- [ ] Click to navigate to article
- [ ] Verify code syntax highlighting (Shiki)
- [ ] Check related articles section
- [ ] Test "Back to Blog" navigation

### 8. 404 Error Page
- [ ] Navigate to invalid route (e.g., `/invalid-route`)
- [ ] 404 page renders with error message
- [ ] "Return to Home" link works
- [ ] Navigate to invalid blog slug (`/blog/nonexistent`)
- [ ] Verify 404 handling for blog articles

### 9. Accessibility
- [ ] Tab through interactive elements
- [ ] Verify focus rings are visible
- [ ] Check keyboard-only navigation works
- [ ] Test skip-to-content link in layout
- [ ] Verify ARIA attributes on toggles and filters

### 10. Console Monitoring
Throughout testing, monitor and report:
- JavaScript errors
- Vue warnings
- Network failures (404s)
- Missing assets
- Performance warnings

## Deliverables
After testing, provide:
1. Summary of any bugs found
2. Console errors/warnings that need fixing
3. Accessibility issues identified
4. UX improvement suggestions
5. Screenshots of any issues

Please test thoroughly and report everything you find!
```

---

## Quick Test Commands

```bash
# Start dev server
cd nuxt-portfolio && npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate
```

---

## Key Pages & Routes

| Page | Route | Key Features |
|------|-------|--------------|
| Home | `/` | Hero, typewriter, social links, timeline |
| Projects | `/projects` | Filtering, project cards, action buttons |
| Gallery | `/gallery` | PhotoSwipe lightbox, lazy loading |
| Resume | `/resume` | Industry/Research toggle, PDF download |
| Blog | `/blog` | Article cards, reading time |
| Article | `/blog/[slug]` | Syntax highlighting, related articles |
| 404 | `/*` (catch-all) | Error page, return home link |

---

## Components to Test

### Layout Components
- `TheNavigation.vue` - Header nav, mobile menu, sticky behavior
- `ThemeToggle.vue` - Dark/light mode switch with sun/moon icons
- `TheFooter.vue` - Footer with links and copyright
- `ErrorBoundary.vue` - Error handling wrapper in layout

### Interactive Components
- `ProjectFilter.vue` - Filter buttons (All, AI/ML, Full-Stack, Research, Cloud)
- `ResumeViewToggle.vue` - Industry/Research tab toggle
- `PhotoGallery.vue` - Lightbox gallery with PhotoSwipe v5

### Home Page Components
- `AuthorCard.vue` - Hero section with profile image
- `TextScroller.vue` - Typewriter effect for cycling through roles
- `ExperienceTimeline.vue` - Timeline with 6 entries
- `TimelineEntry.vue` - Individual timeline item
- `ExpertiseGrid.vue` - Skills categories display

### Projects Components
- `ProjectCard.vue` - Project display with tech tags and action buttons

### Resume Components
- `EducationCard.vue` - Education section display
- `ExperienceList.vue` - Professional/Research experience listing
- `PublicationList.vue` - Research publications (Research view only)
- `SkillsGrid.vue` - Skills organized by category

### Blog Components
- `BlogCard.vue` - Blog article card with reading time
- `ArticleContent.vue` - Full article rendering with Shiki syntax highlighting

### Error Pages
- `[...404].vue` - 404 catch-all page with return home link

---

## Common Issues to Watch For

1. **Images not loading** - Check paths in data files
2. **Theme not persisting** - localStorage issues
3. **Mobile menu not closing** - Event handler issues
4. **Filter not working** - State management bug
5. **Lightbox errors** - PhotoSwipe initialization
6. **Code not highlighted** - Shiki async loading
7. **PDF download failing** - File path issues

---

## Viewport Sizes to Test

| Device | Width | Height |
|--------|-------|--------|
| Mobile | 375px | 667px |
| Tablet | 768px | 1024px |
| Desktop | 1280px | 800px |
| Large Desktop | 1920px | 1080px |

---

## Notes

- The app uses Tailwind CSS v4 with dark mode class strategy
- PhotoSwipe v5 handles the gallery lightbox
- Shiki v3 handles code syntax highlighting
- Pinia stores manage theme and resume view state
- SSR is enabled with prerendering for main routes
