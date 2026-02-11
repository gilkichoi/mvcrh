<?php get_header(); ?>

<div id="root">
    <!-- Server-side loading shell -->
    <div class="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div class="flex flex-col items-center gap-6 p-8 max-w-sm text-center">
            <div class="relative flex items-center justify-center">
                <div class="w-16 h-16 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin"></div>
                <i class="fa-solid fa-house-medical absolute text-teal-600 text-xl"></i>
            </div>
            <div>
                <h2 class="text-xl font-bold text-slate-900 mb-1">Moi Voi Hospital</h2>
                <p class="text-sm text-slate-500 font-medium">Connecting to Health Portal...</p>
            </div>
        </div>
    </div>
</div>

<?php get_footer(); ?>