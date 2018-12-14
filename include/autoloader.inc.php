<?php
    foreach (glob("*.inc.php") as $filename) {
        require_once $filename;
    }