type Translate = (key: string, named?: Record<string, unknown>) => string
type Exists = (key: string) => boolean

/** Video button text and screen-reader label; a project's own locale keys win over the shared ones. */
export function projectVideoText(t: Translate, te: Exists, id: string) {
  const own = `projects.${id}`
  return {
    label: te(`${own}.video`) ? t(`${own}.video`) : t('projects.page.video'),
    aria: te(`${own}.videoAria`)
      ? t(`${own}.videoAria`)
      : t('projects.page.videoAria', { title: t(`${own}.title`) })
  }
}
