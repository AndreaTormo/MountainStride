<header class="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-4">
<div class="max-w-[1440px] mx-auto flex items-center justify-between">
<div class="flex items-center gap-12">

  <!-- Logo animado -->
  <div class="flex items-center gap-3 group cursor-pointer">
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
      </h1>
      <span class="text-[10px] font-bold text-primary/60 tracking-[0.3em] uppercase">World Series</span>
    </div>
  </div>

  <!-- Nav -->
  <nav class="hidden lg:flex items-center gap-8">
    
       <a class="text-xs font-bold hover:text-primary transition-colors uppercase tracking-widest text-primary"
       href="index.php?page=controller_shop&op=view">Shop</a>
  </nav>

</div>
<div class="flex items-center gap-6">

  <!-- search -->
  <div class="div_search">
    <select class="search_brand"></select>
    <select class="search_category"></select>
    <input type="text" id="autocom" autocomplete="off" placeholder="City" />
    <div id="search_auto"></div>
    <input type="button" value="Search" id="search-btn" class="btna third" />
  </div>

  <div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
      <span class="material-symbols-outlined text-primary">person</span>
    </div>
  </div>

</div>
</div>
</header>