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

/**
 * Ensure .tsx and .ts files are served with the correct header so browsers
 * can execute them as ES modules.
 */
function moi_voi_hospital_mime_types($mimes) {
    $mimes['ts'] = 'application/javascript';
    $mimes['tsx'] = 'application/javascript';
    return $mimes;
}
add_filter('upload_mimes', 'moi_voi_hospital_mime_types');

function moi_voi_hospital_scripts() {
    // Tailwind CDN
    wp_enqueue_script('tailwind-cdn', 'https://cdn.tailwindcss.com', array(), null, false);
    
    // FontAwesome
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
    
    // Google Fonts
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    // Main React Entry (Loaded as a module)
    // Adding a version string to bust cache during development
    $version = '1.0.2';
    wp_enqueue_script('moi-voi-app', get_template_directory_uri() . '/index.tsx', array(), $version, true);

    // Provide WordPress data to the React environment
    wp_localize_script('moi-voi-app', 'wpData', array(
        'template_url' => get_template_directory_uri(),
        'site_url'     => get_site_url(),
        'api_url'      => esc_url_raw(rest_url()),
        'nonce'        => wp_create_nonce('wp_rest')
    ));
}
add_action('wp_enqueue_scripts', 'moi_voi_hospital_scripts');

/**
 * Add type="module" to the React script tag.
 */
function moi_voi_hospital_module_type($tag, $handle, $src) {
    if ('moi-voi-app' === $handle) {
        return '<script type="module" src="' . esc_url($src) . '"></script>';
    }
    return $tag;
}
add_filter('script_loader_tag', 'moi_voi_hospital_module_type', 10, 3);

/**
 * Injects the Import Map and global configurations into the head.
 */
function moi_voi_hospital_inject_head() {
    $theme_uri = get_template_directory_uri();
    ?>
    <script type="importmap">
    {
      "imports": {
        "react-dom/": "https://esm.sh/react-dom@^19.2.4/",
        "react/": "https://esm.sh/react@^19.2.4/",
        "react": "https://esm.sh/react@^19.2.4",
        "@google/genai": "https://esm.sh/@google/genai@^1.40.0",
        "./": "<?php echo $theme_uri; ?>/"
      }
    }
    </script>
    <script>
      // Mock process.env for Gemini API compatibility in the browser
      window.process = { env: { API_KEY: "" } };
      
      // Fallback for wpData to ensure paths are always defined
      window.wpData = window.wpData || { 
        template_url: '<?php echo $theme_uri; ?>',
        site_url: '<?php echo get_site_url(); ?>'
      };
    </script>
    <style>
        /* Loading placeholder styling */
        #root:empty { min-height: 100vh; background: #f8fafc; }
        /* Fix for scroll behavior in some browsers */
        html { scroll-behavior: smooth; }
    </style>
    <?php
}
add_action('wp_head', 'moi_voi_hospital_inject_head');
