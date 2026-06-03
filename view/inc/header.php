<header class="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-4">
<div class="max-w-[1440px] mx-auto header-inner">

  <!-- Logo -->
  <div class="header-logo flex items-center gap-3 group cursor-pointer">
    <div class="relative w-10 h-10 flex items-center justify-center">
      <div class="absolute inset-0 bg-primary/20 rotate-45 rounded-lg group-hover:rotate-90 transition-transform duration-500"></div>
      <span class="material-symbols-outlined text-primary text-2xl font-bold relative z-10">terrain</span>
    </div>
    <div class="flex flex-col leading-none">
      <h1 class="text-slate-900 dark:text-slate-100 text-xl font-black tracking-tighter uppercase italic">
        <a class="hover:text-primary transition-colors" href="index.php?page=controller_home&op=view">
          Mountain<span class="text-primary">Stride</span>
        </a>
      </h1>
      <span class="text-[10px] font-bold text-primary/60 tracking-[0.3em] uppercase">World Series</span>
    </div>
  </div>

  <!-- Nav -->
  <nav class="header-nav hidden lg:flex items-center gap-8">
    <a class="header-nav-shop" href="index.php?page=controller_shop&op=view">Shop</a>
  </nav>

  <!-- Filtros -->
  <div class="div_search" role="search" aria-label="Search races">
    <select class="search_brand" aria-label="Circuits"></select>
    <select class="search_category" aria-label="Category"></select>
    <div class="header-search-input-wrap">
      <input type="text" id="autocom" autocomplete="off" placeholder="Event name…" />
      <div id="search_auto"></div>
    </div>
  </div>

  <!-- Search button -->
  <button type="button" id="search-btn" class="header-search-submit">Search</button>

  <!-- Sign in / perfil -->
  <div class="header-user-area">
    <div class="log-icon header-user-btn">
      <span class="material-symbols-outlined text-primary">person</span>
    </div>
    <div id="des_inf_user" class="header-user-info"></div>
  </div>

</div>
</header>
