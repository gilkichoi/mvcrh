<?php
/**
 * Moi Voi Hospital functions and definitions
 */

function moi_voi_hospital_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
}
add_action('after_setup_theme', 'moi_voi_hospital_setup');

function moi_voi_hospital_scripts() {
    // Tailwind CDN
    wp_enqueue_script('tailwind-cdn', 'https://cdn.tailwindcss.com', array(), null, false);
    
    // FontAwesome
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
    
    // Google Fonts
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    // React Application (Main Entry)
    wp_enqueue_script('moi-voi-app', get_template_directory_uri() . '/index.tsx', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'moi_voi_hospital_scripts');

/**
 * Filter to add type="module" to the React script tag.
 */
function moi_voi_hospital_module_type($tag, $handle, $src) {
    if ('moi-voi-app' !== $handle) {
        return $tag;
    }
    $tag = '<script type="module" src="' . esc_url($src) . '"></script>';
    return $tag;
}
add_filter('script_loader_tag', 'moi_voi_hospital_module_type', 10, 3);

/**
 * Injects the Import Map and API Key into the head.
 */
function moi_voi_hospital_inject_head() {
    ?>
    <script type="importmap">
    {
      "imports": {
        "react-dom/": "https://esm.sh/react-dom@^19.2.4/",
        "react/": "https://esm.sh/react@^19.2.4/",
        "react": "https://esm.sh/react@^19.2.4",
        "@google/genai": "https://esm.sh/@google/genai@^1.40.0"
      }
    }
    </script>
    <?php
}
add_action('wp_head', 'moi_voi_hospital_inject_head');
