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
        {/* クリック不可のプロフィールアイコン */}
        <div className="flex -space-x-2">
          <div className="cursor-not-allowed opacity-100">
            <img
              src="/icons/mama.jpg"
              alt="Profile 1"
              className="w-8 h-8 rounded-full border-1 border-white"
            />
          </div>
          <div className="cursor-not-allowed opacity-100">
            <img
              src="/icons/boy.jpg"
              alt="Profile 2"
              className="w-8 h-8 rounded-full border-1 border-white"
            />
          </div>
          <div className="cursor-not-allowed opacity-50">
            <img
              src="/icons/papa.jpg"
              alt="Profile 3"
              className="w-8 h-8 rounded-full border-1 border-white"
            />
          </div>
        </div>
      </div>
      <nav className="flex gap-4">
        <a href="/cooking">
          <img
            src="/icons/cooking.png"
            alt="Cooking Icon"
            className="w-6 h-6"
          />
        </a>
        <a href="/under-construction"> {/* 未実装 */}
          <img
            src="/icons/health.png"
            alt="Health Icon"
            className="w-6 h-6"
          />
        </a>
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