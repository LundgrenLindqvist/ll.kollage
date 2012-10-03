<?php get_header(); ?>

        <div id="container">
            <?php
            if (have_posts()) :            
                while (have_posts()) : the_post();
                    get_kollage();                
                endwhile;            
            else : ?>
                <p class="none"><?php _e('No images to build kollage from.'); ?></p>
            <?php endif; ?>    
        </div>
        
<?php get_footer(); ?>
	