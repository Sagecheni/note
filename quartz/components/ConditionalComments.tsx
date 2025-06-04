import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ConditionalComments: QuartzComponent = (props: QuartzComponentProps) => {
  const { fileData, displayClass } = props
  
  // 排除首页
  if (fileData.slug === "index") {
    return null
  }
  
  // 排除标签页面和文件夹页面
  if (fileData.slug?.startsWith("tags/") || fileData.slug?.includes("folder")) {
    return null
  }
  
  // 创建中文路径标识符
  const createChinesePathIdentifier = (slug: string, title?: string) => {
    const decodedSlug = decodeURIComponent(slug)
    const pathParts = decodedSlug.split('/').filter(part => part !== '')
    
    if (pathParts[pathParts.length - 1] === 'index') {
      pathParts.pop()
    }
    
    const formattedPath = pathParts.join(' / ')
    
    if (title && title !== pathParts[pathParts.length - 1]) {
      return `${formattedPath} - ${title}`
    }
    
    return formattedPath || slug
  }
  
  const customIdentifier = createChinesePathIdentifier(
    fileData.slug!, 
    fileData.frontmatter?.title
  )
  
  const safeTerm = customIdentifier || fileData.slug || "default"
  
  return (
    <div
      class={classNames(displayClass, "giscus")}
      data-repo="Sagecheni/note-comment"
      data-repo-id="R_kgDOO143OA"
      data-category="Announcements"
      data-category-id="DIC_kwDOO143OM4CrBhX"
      data-mapping="specific"
      data-term={safeTerm}
      data-strict="0"
      data-reactions-enabled="1"
      data-input-position="top"
      data-theme="preferred_color_scheme"
      data-lang="zh-CN"
      data-loading="lazy"
    />
  )
}

// 使用自定义的 afterDOMLoaded 脚本（不是原有的 script）
ConditionalComments.afterDOMLoaded = `
const giscusContainer = document.querySelector(".giscus")
if (giscusContainer) {
  const script = document.createElement("script")
  script.src = "https://giscus.app/client.js"
  script.async = true
  script.crossOrigin = "anonymous"
  
  // 手动设置所有属性，确保 term 正确传递
  script.setAttribute("data-repo", "Sagecheni/note-comment")
  script.setAttribute("data-repo-id", "R_kgDOO143OA")
  script.setAttribute("data-category", "Announcements")
  script.setAttribute("data-category-id", "DIC_kwDOO143OM4CrBhX")
  script.setAttribute("data-mapping", "specific")
  
  // 关键：从容器中读取 term 值
  const termValue = giscusContainer.getAttribute("data-term")
  script.setAttribute("data-term", termValue)
  
  script.setAttribute("data-strict", "0")
  script.setAttribute("data-reactions-enabled", "1")
  script.setAttribute("data-input-position", "top")
  
  // 设置主题
  const theme = document.documentElement.getAttribute("saved-theme") || "light"
  script.setAttribute("data-theme", theme === "dark" ? "dark" : "light")
  script.setAttribute("data-lang", "zh-CN")
  script.setAttribute("data-loading", "lazy")
  
  // 替换容器
  giscusContainer.parentNode.replaceChild(script, giscusContainer)
}
`

ConditionalComments.displayName = "ConditionalComments"

export default (() => ConditionalComments) satisfies QuartzComponentConstructor