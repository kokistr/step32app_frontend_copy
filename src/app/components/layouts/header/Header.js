export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-4 py-2 border-b border-gray-200 bg-white-50">
      <div className="flex items-center gap-2">
        <a href="/top-menu">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-8 h-8"
          />
        </a>
      </div>
      <nav className="flex gap-4">
        <a href="/cooking">
          <img
            src="/icons/cooking.png"
            alt="Cooking Icon"
            className="w-6 h-6"
          />
        </a>
        {/* <a href="/health"> */} {/* 未実装 */}
        <a href="/under-construction"> {/* 未実装 */}
          <img
            src="/icons/health.png"
            alt="Health Icon"
            className="w-6 h-6"
          />
        </a>
        {/* <a href="/shopping"> */} {/* 未実装 */}
        <a href="/under-construction"> {/* 未実装 */}
          <img
            src="/icons/shopping.png"
            alt="Shopping Icon"
            className="w-6 h-6"
          />
        </a>
        <a href="/under-construction"> {/* 未実装 */}
        <img
          src="/icons/menu.png"
          alt="Menu Icon"
          className="w-6 h-6"
        />
        </a>
      </nav>
    </header>
  )
}