<?php if (preg_match("/msie|trident|internet\sexplorer/i", $_SERVER["HTTP_USER_AGENT"])) { ?>
IE
<?php } else { ?>
NOT IE
<?php } ?>