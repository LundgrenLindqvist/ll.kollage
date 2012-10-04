<?php
// Custom Favicons
function add_favicon() { ?>
    <link rel="shortcut icon" href="<?php echo bloginfo('stylesheet_directory') ?>/favicon.png"/>
<?php }
add_action('wp_head', 'add_favicon');

function admin_favicon() { ?>
    <link rel="shortcut icon" href="<?php echo bloginfo('stylesheet_directory') ?>/favicon.png"/>
<?php }
add_action('admin_head', 'admin_favicon');

// Fetch images
function get_kollage() {
    
    $images = get_children(
	   array(
	       'order'          => 'ASC',
	       'orderby'		 => 'menu_order ID',
	       'post_parent'    => get_the_ID(),
	       'post_type'      => 'attachment',
	       'numberposts'    => -1, // show all
	       'post_status'    => null,
	       'post_mime_type' => 'image',
	   )
    );
    
    if ( $images ) {
		$id_count = 1;
		foreach( $images as $image ) {
			$imgtag   = wp_get_attachment_image($image->ID,'medium');		
			$atturl   = wp_get_attachment_url($image->ID);
			echo '<div data-original="'.$atturl.'" id="'.$id_count.'" class="image">';
			echo $imgtag;
			echo '</div>';
			$id_count++;			
		}		
	}
}


// Update image settings for Kollage
update_option('medium_size_w', 432);
update_option('medium_size_h', 0);
update_option('large_size_w', 1296);
update_option('large_size_h', 0);


// Custom Dashboard footer text
function remove_footer_admin () {
    echo 'Kollage Theme by <a href="http://www.lundgrenlindqvist.se" title="Lundgren+Lindqvist" target="_blank">Lundgren+Lindqvist</a> | Powered by <a href="http://www.wordpress.org" title="WordPress" target="_blank">WordPress</a>';
} 
add_filter('admin_footer_text', 'remove_footer_admin');


// Remove admin menu options
// http://www.wprecipes.com/how-to-remove-menus-in-wordpress-dashboard
/*
function remove_admin_menus() {
global $menu;
	$restricted = array(__('Links'), __('Pages'), __('Comments'));
	end ($menu);
	while (prev($menu)){
		$value = explode(' ',$menu[key($menu)][0]);
		if(in_array($value[0] != NULL?$value[0]:"" , $restricted)){unset($menu[key($menu)]);}
	}
}
add_action('admin_menu', 'remove_admin_menus');
*/


// Instagram connection
/*
require_once( 'instagram/kollage_instagram.php' );
require_once( 'instagram/kollage_instagram_settings_page.php' );
*/

?>