<html lang="en">

<head>
    <meta charset="UTF-8">
   <script src="/mfid/web/js/jquery-3.3.1.min.js"></script>
   <script src="/mfid/web/js/in/jquery-ui.js" type="text/javascript"></script>  
<style>
    .ui-helper-hidden{display:none}.ui-helper-hidden-accessible{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.ui-helper-reset{margin:0;padding:0;border:0;outline:0;line-height:1.3;text-decoration:none;font-size:100%;list-style:none}.ui-helper-clearfix:before,.ui-helper-clearfix:after{content:"";display:table;border-collapse:collapse}.ui-helper-clearfix:after{clear:both}.ui-helper-zfix{width:100%;height:100%;top:0;left:0;position:absolute;opacity:0;filter:Alpha(Opacity=0)}.ui-front{z-index:100}.ui-state-disabled{cursor:default!important;pointer-events:none}.ui-icon{display:inline-block;vertical-align:middle;margin-top:-.25em;position:relative;text-indent:-99999px;overflow:hidden;background-repeat:no-repeat}.ui-widget-icon-block{left:50%;margin-left:-8px;display:block}.ui-widget-overlay{position:fixed;top:0;left:0;width:100%;height:100%}.ui-accordion .ui-accordion-header{display:block;cursor:pointer;position:relative;margin:2px 0 0;padding:.5em .5em .5em .7em;font-size:100%}.ui-accordion .ui-accordion-content{padding:1em 2.2em;border-top:0;overflow:auto}.ui-autocomplete{position:absolute;top:0;left:0;cursor:default}.ui-menu{list-style:none;padding:0;margin:0;display:block;outline:0}.ui-menu .ui-menu{position:absolute}.ui-menu .ui-menu-item{margin:0;cursor:pointer;list-style-image:url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)}.ui-menu .ui-menu-item-wrapper{position:relative;padding:3px 1em 3px .4em}.ui-menu .ui-menu-divider{margin:5px 0;height:0;font-size:0;line-height:0;border-width:1px 0 0}.ui-menu .ui-state-focus,.ui-menu .ui-state-active{margin:-1px}.ui-menu-icons{position:relative}.ui-menu-icons .ui-menu-item-wrapper{padding-left:2em}.ui-menu .ui-icon{position:absolute;top:0;bottom:0;left:.2em;margin:auto 0}.ui-menu .ui-menu-icon{left:auto;right:0}.ui-button{padding:.4em 1em;display:inline-block;position:relative;line-height:normal;margin-right:.1em;cursor:pointer;vertical-align:middle;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:visible}.ui-button,.ui-button:link,.ui-button:visited,.ui-button:hover,.ui-button:active{text-decoration:none}.ui-button-icon-only{width:2em;box-sizing:border-box;text-indent:-9999px;white-space:nowrap}input.ui-button.ui-button-icon-only{text-indent:0}.ui-button-icon-only .ui-icon{position:absolute;top:50%;left:50%;margin-top:-8px;margin-left:-8px}.ui-button.ui-icon-notext .ui-icon{padding:0;width:2.1em;height:2.1em;text-indent:-9999px;white-space:nowrap}input.ui-button.ui-icon-notext .ui-icon{width:auto;height:auto;text-indent:0;white-space:normal;padding:.4em 1em}input.ui-button::-moz-focus-inner,button.ui-button::-moz-focus-inner{border:0;padding:0}.ui-controlgroup{vertical-align:middle;display:inline-block}.ui-controlgroup > .ui-controlgroup-item{float:left;margin-left:0;margin-right:0}.ui-controlgroup > .ui-controlgroup-item:focus,.ui-controlgroup > .ui-controlgroup-item.ui-visual-focus{z-index:9999}.ui-controlgroup-vertical > .ui-controlgroup-item{display:block;float:none;width:100%;margin-top:0;margin-bottom:0;text-align:left}.ui-controlgroup-vertical .ui-controlgroup-item{box-sizing:border-box}.ui-controlgroup .ui-controlgroup-label{padding:.4em 1em}.ui-controlgroup .ui-controlgroup-label span{font-size:80%}.ui-controlgroup-horizontal .ui-controlgroup-label + .ui-controlgroup-item{border-left:none}.ui-controlgroup-vertical .ui-controlgroup-label + .ui-controlgroup-item{border-top:none}.ui-controlgroup-horizontal .ui-controlgroup-label.ui-widget-content{border-right:none}.ui-controlgroup-vertical .ui-controlgroup-label.ui-widget-content{border-bottom:none}.ui-controlgroup-vertical .ui-spinner-input{width:75%;width:calc(100% - 2.4em)}.ui-controlgroup-vertical .ui-spinner .ui-spinner-up{border-top-style:solid}.ui-checkboxradio-label .ui-icon-background{box-shadow:inset 1px 1px 1px #ccc;border-radius:.12em;border:none}.ui-checkboxradio-radio-label .ui-icon-background{width:16px;height:16px;border-radius:1em;overflow:visible;border:none}.ui-checkboxradio-radio-label.ui-checkboxradio-checked .ui-icon,.ui-checkboxradio-radio-label.ui-checkboxradio-checked:hover .ui-icon{background-image:none;width:8px;height:8px;border-width:4px;border-style:solid}.ui-checkboxradio-disabled{pointer-events:none}.ui-datepicker{width:17em;padding:.2em .2em 0;display:none}.ui-datepicker .ui-datepicker-header{position:relative;padding:.2em 0}.ui-datepicker .ui-datepicker-prev,.ui-datepicker .ui-datepicker-next{position:absolute;top:2px;width:1.8em;height:1.8em}.ui-datepicker .ui-datepicker-prev-hover,.ui-datepicker .ui-datepicker-next-hover{top:1px}.ui-datepicker .ui-datepicker-prev{left:2px}.ui-datepicker .ui-datepicker-next{right:2px}.ui-datepicker .ui-datepicker-prev-hover{left:1px}.ui-datepicker .ui-datepicker-next-hover{right:1px}.ui-datepicker .ui-datepicker-prev span,.ui-datepicker .ui-datepicker-next span{display:block;position:absolute;left:50%;margin-left:-8px;top:50%;margin-top:-8px}.ui-datepicker .ui-datepicker-title{margin:0 2.3em;line-height:1.8em;text-align:center}.ui-datepicker .ui-datepicker-title select{font-size:1em;margin:1px 0}.ui-datepicker select.ui-datepicker-month,.ui-datepicker select.ui-datepicker-year{width:45%}.ui-datepicker table{width:100%;font-size:.9em;border-collapse:collapse;margin:0 0 .4em}.ui-datepicker th{padding:.7em .3em;text-align:center;font-weight:700;border:0}.ui-datepicker td{border:0;padding:1px}.ui-datepicker td span,.ui-datepicker td a{display:block;padding:.2em;text-align:right;text-decoration:none}.ui-datepicker .ui-datepicker-buttonpane{background-image:none;margin:.7em 0 0;padding:0 .2em;border-left:0;border-right:0;border-bottom:0}.ui-datepicker .ui-datepicker-buttonpane button{float:right;margin:.5em .2em .4em;cursor:pointer;padding:.2em .6em .3em;width:auto;overflow:visible}.ui-datepicker .ui-datepicker-buttonpane button.ui-datepicker-current{float:left}.ui-datepicker.ui-datepicker-multi{width:auto}.ui-datepicker-multi .ui-datepicker-group{float:left}.ui-datepicker-multi .ui-datepicker-group table{width:95%;margin:0 auto .4em}.ui-datepicker-multi-2 .ui-datepicker-group{width:50%}.ui-datepicker-multi-3 .ui-datepicker-group{width:33.3%}.ui-datepicker-multi-4 .ui-datepicker-group{width:25%}.ui-datepicker-multi .ui-datepicker-group-last .ui-datepicker-header,.ui-datepicker-multi .ui-datepicker-group-middle .ui-datepicker-header{border-left-width:0}.ui-datepicker-multi .ui-datepicker-buttonpane{clear:left}.ui-datepicker-row-break{clear:both;width:100%;font-size:0}.ui-datepicker-rtl{direction:rtl}.ui-datepicker-rtl .ui-datepicker-prev{right:2px;left:auto}.ui-datepicker-rtl .ui-datepicker-next{left:2px;right:auto}.ui-datepicker-rtl .ui-datepicker-prev:hover{right:1px;left:auto}.ui-datepicker-rtl .ui-datepicker-next:hover{left:1px;right:auto}.ui-datepicker-rtl .ui-datepicker-buttonpane{clear:right}.ui-datepicker-rtl .ui-datepicker-buttonpane button{float:left}.ui-datepicker-rtl .ui-datepicker-buttonpane button.ui-datepicker-current,.ui-datepicker-rtl .ui-datepicker-group{float:right}.ui-datepicker-rtl .ui-datepicker-group-last .ui-datepicker-header,.ui-datepicker-rtl .ui-datepicker-group-middle .ui-datepicker-header{border-right-width:0;border-left-width:1px}.ui-datepicker .ui-icon{display:block;text-indent:-99999px;overflow:hidden;background-repeat:no-repeat;left:.5em;top:.3em}.ui-dialog{position:absolute;top:0;left:0;padding:.2em;outline:0}.ui-dialog .ui-dialog-titlebar{padding:.4em 1em;position:relative}.ui-dialog .ui-dialog-title{float:left;margin:.1em 0;white-space:nowrap;width:90%;overflow:hidden;text-overflow:ellipsis}.ui-dialog .ui-dialog-titlebar-close{position:absolute;right:.3em;top:50%;width:20px;margin:-10px 0 0;padding:1px;height:20px}.ui-dialog .ui-dialog-content{position:relative;border:0;padding:.5em 1em;background:none;overflow:auto}.ui-dialog .ui-dialog-buttonpane{text-align:left;border-width:1px 0 0;background-image:none;margin-top:.5em;padding:.3em 1em .5em .4em}.ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset{float:right}.ui-dialog .ui-dialog-buttonpane button{margin:.5em .4em .5em 0;cursor:pointer}.ui-dialog .ui-resizable-n{height:2px;top:0}.ui-dialog .ui-resizable-e{width:2px;right:0}.ui-dialog .ui-resizable-s{height:2px;bottom:0}.ui-dialog .ui-resizable-w{width:2px;left:0}.ui-dialog .ui-resizable-se,.ui-dialog .ui-resizable-sw,.ui-dialog .ui-resizable-ne,.ui-dialog .ui-resizable-nw{width:7px;height:7px}.ui-dialog .ui-resizable-se{right:0;bottom:0}.ui-dialog .ui-resizable-sw{left:0;bottom:0}.ui-dialog .ui-resizable-ne{right:0;top:0}.ui-dialog .ui-resizable-nw{left:0;top:0}.ui-draggable .ui-dialog-titlebar{cursor:move}.ui-draggable-handle{-ms-touch-action:none;touch-action:none}.ui-resizable{position:relative}.ui-resizable-handle{position:absolute;font-size:.1px;display:block;-ms-touch-action:none;touch-action:none}.ui-resizable-disabled .ui-resizable-handle,.ui-resizable-autohide .ui-resizable-handle{display:none}.ui-resizable-n{cursor:n-resize;height:7px;width:100%;top:-5px;left:0}.ui-resizable-s{cursor:s-resize;height:7px;width:100%;bottom:-5px;left:0}.ui-resizable-e{cursor:e-resize;width:7px;right:-5px;top:0;height:100%}.ui-resizable-w{cursor:w-resize;width:7px;left:-5px;top:0;height:100%}.ui-resizable-se{cursor:se-resize;width:12px;height:12px;right:1px;bottom:1px}.ui-resizable-sw{cursor:sw-resize;width:9px;height:9px;left:-5px;bottom:-5px}.ui-resizable-nw{cursor:nw-resize;width:9px;height:9px;left:-5px;top:-5px}.ui-resizable-ne{cursor:ne-resize;width:9px;height:9px;right:-5px;top:-5px}.ui-progressbar{height:2em;text-align:left;overflow:hidden}.ui-progressbar .ui-progressbar-value{margin:-1px;height:100%}.ui-progressbar .ui-progressbar-overlay{background:url(data:image/gif;base64,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);height:100%;filter:alpha(opacity=25);opacity:.25}.ui-progressbar-indeterminate .ui-progressbar-value{background-image:none}.ui-selectable{-ms-touch-action:none;touch-action:none}.ui-selectable-helper{position:absolute;z-index:100;border:1px dotted #000}.ui-selectmenu-menu{padding:0;margin:0;position:absolute;top:0;left:0;display:none}.ui-selectmenu-menu .ui-menu{overflow:auto;overflow-x:hidden;padding-bottom:1px}.ui-selectmenu-menu .ui-menu .ui-selectmenu-optgroup{font-size:1em;font-weight:700;line-height:1.5;padding:2px .4em;margin:.5em 0 0;height:auto;border:0}.ui-selectmenu-open{display:block}.ui-selectmenu-text{display:block;margin-right:20px;overflow:hidden;text-overflow:ellipsis}.ui-selectmenu-button.ui-button{text-align:left;white-space:nowrap;width:14em}.ui-selectmenu-icon.ui-icon{float:right;margin-top:0}.ui-slider{position:relative;text-align:left}.ui-slider .ui-slider-handle{position:absolute;z-index:2;width:1.2em;height:1.2em;cursor:default;-ms-touch-action:none;touch-action:none}.ui-slider .ui-slider-range{position:absolute;z-index:1;font-size:.7em;display:block;border:0;background-position:0 0}.ui-slider.ui-state-disabled .ui-slider-handle,.ui-slider.ui-state-disabled .ui-slider-range{filter:inherit}.ui-slider-horizontal{height:.8em}.ui-slider-horizontal .ui-slider-handle{top:-.3em;margin-left:-.6em}.ui-slider-horizontal .ui-slider-range{top:0;height:100%}.ui-slider-horizontal .ui-slider-range-min{left:0}.ui-slider-horizontal .ui-slider-range-max{right:0}.ui-slider-vertical{width:.8em;height:100px}.ui-slider-vertical .ui-slider-handle{left:-.3em;margin-left:0;margin-bottom:-.6em}.ui-slider-vertical .ui-slider-range{left:0;width:100%}.ui-slider-vertical .ui-slider-range-min{bottom:0}.ui-slider-vertical .ui-slider-range-max{top:0}.ui-sortable-handle{-ms-touch-action:none;touch-action:none}.ui-spinner{position:relative;display:inline-block;overflow:hidden;padding:0;vertical-align:middle}.ui-spinner-input{border:none;background:none;color:inherit;padding:.222em 0;margin:.2em 0;vertical-align:middle;margin-left:.4em;margin-right:2em}.ui-spinner-button{width:1.6em;height:50%;font-size:.5em;padding:0;margin:0;text-align:center;position:absolute;cursor:default;display:block;overflow:hidden;right:0}.ui-spinner a.ui-spinner-button{border-top-style:none;border-bottom-style:none;border-right-style:none}.ui-spinner-up{top:0}.ui-spinner-down{bottom:0}.ui-tabs{position:relative;padding:.2em}.ui-tabs .ui-tabs-nav{margin:0;padding:.2em .2em 0}.ui-tabs .ui-tabs-nav li{list-style:none;float:left;position:relative;top:0;margin:1px .2em 0 0;border-bottom-width:0;padding:0;white-space:nowrap}.ui-tabs .ui-tabs-nav .ui-tabs-anchor{float:left;padding:.5em 1em;text-decoration:none}.ui-tabs .ui-tabs-nav li.ui-tabs-active{margin-bottom:-1px;padding-bottom:1px}.ui-tabs .ui-tabs-nav li.ui-tabs-active .ui-tabs-anchor,.ui-tabs .ui-tabs-nav li.ui-state-disabled .ui-tabs-anchor,.ui-tabs .ui-tabs-nav li.ui-tabs-loading .ui-tabs-anchor{cursor:text}.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-active .ui-tabs-anchor{cursor:pointer}.ui-tabs .ui-tabs-panel{display:block;border-width:0;padding:1em 1.4em;background:none}.ui-tooltip{padding:8px;position:absolute;z-index:9999;max-width:300px}body .ui-tooltip{border-width:2px}.ui-widget{font-family:Arial,Helvetica,sans-serif;font-size:1em}.ui-widget .ui-widget{font-size:1em}.ui-widget input,.ui-widget select,.ui-widget textarea,.ui-widget button{font-family:Arial,Helvetica,sans-serif;font-size:1em}.ui-widget.ui-widget-content{border:1px solid #c5c5c5}.ui-widget-content{border:1px solid #ddd;background:#fff;color:#333}.ui-widget-content a{color:#333}.ui-widget-header{border:1px solid #ddd;background:#e9e9e9;color:#333;font-weight:700}.ui-widget-header a{color:#333}.ui-state-default,.ui-widget-content .ui-state-default,.ui-widget-header .ui-state-default,.ui-button,/* We use html here because we need a greater specificity to make sure disabled
works properly when clicked or hovered */
html .ui-button.ui-state-disabled:hover,html .ui-button.ui-state-disabled:active{border:1px solid #c5c5c5;background:#f6f6f6;font-weight:400;color:#454545}.ui-state-default a,.ui-state-default a:link,.ui-state-default a:visited,a.ui-button,a:link.ui-button,a:visited.ui-button,.ui-button{color:#454545;text-decoration:none}.ui-state-hover,.ui-widget-content .ui-state-hover,.ui-widget-header .ui-state-hover,.ui-state-focus,.ui-widget-content .ui-state-focus,.ui-widget-header .ui-state-focus,.ui-button:hover,.ui-button:focus{border:1px solid #ccc;background:#ededed;font-weight:400;color:#2b2b2b}.ui-state-hover a,.ui-state-hover a:hover,.ui-state-hover a:link,.ui-state-hover a:visited,.ui-state-focus a,.ui-state-focus a:hover,.ui-state-focus a:link,.ui-state-focus a:visited,a.ui-button:hover,a.ui-button:focus{color:#2b2b2b;text-decoration:none}.ui-visual-focus{box-shadow:0 0 3px 1px #5e9ed6}.ui-state-active,.ui-widget-content .ui-state-active,.ui-widget-header .ui-state-active,a.ui-button:active,.ui-button:active,.ui-button.ui-state-active:hover{border:1px solid #003eff;background:#007fff;font-weight:400;color:#fff}.ui-icon-background,.ui-state-active .ui-icon-background{border:#003eff;background-color:#fff}.ui-state-active a,.ui-state-active a:link,.ui-state-active a:visited{color:#fff;text-decoration:none}.ui-state-highlight,.ui-widget-content .ui-state-highlight,.ui-widget-header .ui-state-highlight{border:1px solid #dad55e;background:#fffa90;color:#777620}.ui-state-checked{border:1px solid #dad55e;background:#fffa90}.ui-state-highlight a,.ui-widget-content .ui-state-highlight a,.ui-widget-header .ui-state-highlight a{color:#777620}.ui-state-error,.ui-widget-content .ui-state-error,.ui-widget-header .ui-state-error{border:1px solid #f1a899;background:#fddfdf;color:#5f3f3f}.ui-state-error a,.ui-widget-content .ui-state-error a,.ui-widget-header .ui-state-error a{color:#5f3f3f}.ui-state-error-text,.ui-widget-content .ui-state-error-text,.ui-widget-header .ui-state-error-text{color:#5f3f3f}.ui-priority-primary,.ui-widget-content .ui-priority-primary,.ui-widget-header .ui-priority-primary{font-weight:700}.ui-priority-secondary,.ui-widget-content .ui-priority-secondary,.ui-widget-header .ui-priority-secondary{opacity:.7;filter:Alpha(Opacity=70);font-weight:400}.ui-state-disabled,.ui-widget-content .ui-state-disabled,.ui-widget-header .ui-state-disabled{opacity:.35;filter:Alpha(Opacity=35);background-image:none}.ui-state-disabled .ui-icon{filter:Alpha(Opacity=35)}.ui-icon{width:16px;height:16px}.ui-icon,.ui-widget-content .ui-widget-header .ui-state-hover .ui-icon,.ui-state-focus .ui-icon,.ui-button:hover .ui-icon,.ui-button:focus .ui-state-active .ui-icon,.ui-button:active .ui-icon{background-image:url(images/ui-icons_ffffff_256x240.png)}.ui-state-highlight .ui-icon,.ui-button .ui-state-highlight.ui-icon{background-image:url(images/ui-icons_777620_256x240.png)}.ui-state-error .ui-icon,.ui-state-error-text .ui-icon{background-image:url(images/ui-icons_cc0000_256x240.png)}.ui-button .ui-icon{background-image:url(images/ui-icons_777777_256x240.png)}.ui-icon-blank{background-position:16px 16px}.ui-icon-caret-1-n{background-position:0 0}.ui-icon-caret-1-ne{background-position:-16px 0}.ui-icon-caret-1-e{background-position:-32px 0}.ui-icon-caret-1-se{background-position:-48px 0}.ui-icon-caret-1-s{background-position:-65px 0}.ui-icon-caret-1-sw{background-position:-80px 0}.ui-icon-caret-1-w{background-position:-96px 0}.ui-icon-caret-1-nw{background-position:-112px 0}.ui-icon-caret-2-n-s{background-position:-128px 0}.ui-icon-caret-2-e-w{background-position:-144px 0}.ui-icon-triangle-1-n{background-position:0 -16px}.ui-icon-triangle-1-ne{background-position:-16px -16px}.ui-icon-triangle-1-e{background-position:-32px -16px}.ui-icon-triangle-1-se{background-position:-48px -16px}.ui-icon-triangle-1-s{background-position:-65px -16px}.ui-icon-triangle-1-sw{background-position:-80px -16px}.ui-icon-triangle-1-w{background-position:-96px -16px}.ui-icon-triangle-1-nw{background-position:-112px -16px}.ui-icon-triangle-2-n-s{background-position:-128px -16px}.ui-icon-triangle-2-e-w{background-position:-144px -16px}.ui-icon-arrow-1-n{background-position:0 -32px}.ui-icon-arrow-1-ne{background-position:-16px -32px}.ui-icon-arrow-1-e{background-position:-32px -32px}.ui-icon-arrow-1-se{background-position:-48px -32px}.ui-icon-arrow-1-s{background-position:-65px -32px}.ui-icon-arrow-1-sw{background-position:-80px -32px}.ui-icon-arrow-1-w{background-position:-96px -32px}.ui-icon-arrow-1-nw{background-position:-112px -32px}.ui-icon-arrow-2-n-s{background-position:-128px -32px}.ui-icon-arrow-2-ne-sw{background-position:-144px -32px}.ui-icon-arrow-2-e-w{background-position:-160px -32px}.ui-icon-arrow-2-se-nw{background-position:-176px -32px}.ui-icon-arrowstop-1-n{background-position:-192px -32px}.ui-icon-arrowstop-1-e{background-position:-208px -32px}.ui-icon-arrowstop-1-s{background-position:-224px -32px}.ui-icon-arrowstop-1-w{background-position:-240px -32px}.ui-icon-arrowthick-1-n{background-position:1px -48px}.ui-icon-arrowthick-1-ne{background-position:-16px -48px}.ui-icon-arrowthick-1-e{background-position:-32px -48px}.ui-icon-arrowthick-1-se{background-position:-48px -48px}.ui-icon-arrowthick-1-s{background-position:-64px -48px}.ui-icon-arrowthick-1-sw{background-position:-80px -48px}.ui-icon-arrowthick-1-w{background-position:-96px -48px}.ui-icon-arrowthick-1-nw{background-position:-112px -48px}.ui-icon-arrowthick-2-n-s{background-position:-128px -48px}.ui-icon-arrowthick-2-ne-sw{background-position:-144px -48px}.ui-icon-arrowthick-2-e-w{background-position:-160px -48px}.ui-icon-arrowthick-2-se-nw{background-position:-176px -48px}.ui-icon-arrowthickstop-1-n{background-position:-192px -48px}.ui-icon-arrowthickstop-1-e{background-position:-208px -48px}.ui-icon-arrowthickstop-1-s{background-position:-224px -48px}.ui-icon-arrowthickstop-1-w{background-position:-240px -48px}.ui-icon-arrowreturnthick-1-w{background-position:0 -64px}.ui-icon-arrowreturnthick-1-n{background-position:-16px -64px}.ui-icon-arrowreturnthick-1-e{background-position:-32px -64px}.ui-icon-arrowreturnthick-1-s{background-position:-48px -64px}.ui-icon-arrowreturn-1-w{background-position:-64px -64px}.ui-icon-arrowreturn-1-n{background-position:-80px -64px}.ui-icon-arrowreturn-1-e{background-position:-96px -64px}.ui-icon-arrowreturn-1-s{background-position:-112px -64px}.ui-icon-arrowrefresh-1-w{background-position:-128px -64px}.ui-icon-arrowrefresh-1-n{background-position:-144px -64px}.ui-icon-arrowrefresh-1-e{background-position:-160px -64px}.ui-icon-arrowrefresh-1-s{background-position:-176px -64px}.ui-icon-arrow-4{background-position:0 -80px}.ui-icon-arrow-4-diag{background-position:-16px -80px}.ui-icon-extlink{background-position:-32px -80px}.ui-icon-newwin{background-position:-48px -80px}.ui-icon-refresh{background-position:-64px -80px}.ui-icon-shuffle{background-position:-80px -80px}.ui-icon-transfer-e-w{background-position:-96px -80px}.ui-icon-transferthick-e-w{background-position:-112px -80px}.ui-icon-folder-collapsed{background-position:0 -96px}.ui-icon-folder-open{background-position:-16px -96px}.ui-icon-document{background-position:-32px -96px}.ui-icon-document-b{background-position:-48px -96px}.ui-icon-note{background-position:-64px -96px}.ui-icon-mail-closed{background-position:-80px -96px}.ui-icon-mail-open{background-position:-96px -96px}.ui-icon-suitcase{background-position:-112px -96px}.ui-icon-comment{background-position:-128px -96px}.ui-icon-person{background-position:-144px -96px}.ui-icon-print{background-position:-160px -96px}.ui-icon-trash{background-position:-176px -96px}.ui-icon-locked{background-position:-192px -96px}.ui-icon-unlocked{background-position:-208px -96px}.ui-icon-bookmark{background-position:-224px -96px}.ui-icon-tag{background-position:-240px -96px}.ui-icon-home{background-position:0 -112px}.ui-icon-flag{background-position:-16px -112px}.ui-icon-calendar{background-position:-32px -112px}.ui-icon-cart{background-position:-48px -112px}.ui-icon-pencil{background-position:-64px -112px}.ui-icon-clock{background-position:-80px -112px}.ui-icon-disk{background-position:-96px -112px}.ui-icon-calculator{background-position:-112px -112px}.ui-icon-zoomin{background-position:-128px -112px}.ui-icon-zoomout{background-position:-144px -112px}.ui-icon-search{background-position:-160px -112px}.ui-icon-wrench{background-position:-176px -112px}.ui-icon-gear{background-position:-192px -112px}.ui-icon-heart{background-position:-208px -112px}.ui-icon-star{background-position:-224px -112px}.ui-icon-link{background-position:-240px -112px}.ui-icon-cancel{background-position:0 -128px}.ui-icon-plus{background-position:-16px -128px}.ui-icon-plusthick{background-position:-32px -128px}.ui-icon-minus{background-position:-48px -128px}.ui-icon-minusthick{background-position:-64px -128px}.ui-icon-close{background-position:-80px -128px}.ui-icon-closethick{background-position:-96px -128px}.ui-icon-key{background-position:-112px -128px}.ui-icon-lightbulb{background-position:-128px -128px}.ui-icon-scissors{background-position:-144px -128px}.ui-icon-clipboard{background-position:-160px -128px}.ui-icon-copy{background-position:-176px -128px}.ui-icon-contact{background-position:-192px -128px}.ui-icon-image{background-position:-208px -128px}.ui-icon-video{background-position:-224px -128px}.ui-icon-script{background-position:-240px -128px}.ui-icon-alert{background-position:0 -144px}.ui-icon-info{background-position:-16px -144px}.ui-icon-notice{background-position:-32px -144px}.ui-icon-help{background-position:-48px -144px}.ui-icon-check{background-position:-64px -144px}.ui-icon-bullet{background-position:-80px -144px}.ui-icon-radio-on{background-position:-96px -144px}.ui-icon-radio-off{background-position:-112px -144px}.ui-icon-pin-w{background-position:-128px -144px}.ui-icon-pin-s{background-position:-144px -144px}.ui-icon-play{background-position:0 -160px}.ui-icon-pause{background-position:-16px -160px}.ui-icon-seek-next{background-position:-32px -160px}.ui-icon-seek-prev{background-position:-48px -160px}.ui-icon-seek-end{background-position:-64px -160px}.ui-icon-seek-start{background-position:-80px -160px}.ui-icon-seek-first{background-position:-80px -160px}.ui-icon-stop{background-position:-96px -160px}.ui-icon-eject{background-position:-112px -160px}.ui-icon-volume-off{background-position:-128px -160px}.ui-icon-volume-on{background-position:-144px -160px}.ui-icon-power{background-position:0 -176px}.ui-icon-signal-diag{background-position:-16px -176px}.ui-icon-signal{background-position:-32px -176px}.ui-icon-battery-0{background-position:-48px -176px}.ui-icon-battery-1{background-position:-64px -176px}.ui-icon-battery-2{background-position:-80px -176px}.ui-icon-battery-3{background-position:-96px -176px}.ui-icon-circle-plus{background-position:0 -192px}.ui-icon-circle-minus{background-position:-16px -192px}.ui-icon-circle-close{background-position:-32px -192px}.ui-icon-circle-triangle-e{background-position:-48px -192px}.ui-icon-circle-triangle-s{background-position:-64px -192px}.ui-icon-circle-triangle-w{background-position:-80px -192px}.ui-icon-circle-triangle-n{background-position:-96px -192px}.ui-icon-circle-arrow-e{background-position:-112px -192px}.ui-icon-circle-arrow-s{background-position:-128px -192px}.ui-icon-circle-arrow-w{background-position:-144px -192px}.ui-icon-circle-arrow-n{background-position:-160px -192px}.ui-icon-circle-zoomin{background-position:-176px -192px}.ui-icon-circle-zoomout{background-position:-192px -192px}.ui-icon-circle-check{background-position:-208px -192px}.ui-icon-circlesmall-plus{background-position:0 -208px}.ui-icon-circlesmall-minus{background-position:-16px -208px}.ui-icon-circlesmall-close{background-position:-32px -208px}.ui-icon-squaresmall-plus{background-position:-48px -208px}.ui-icon-squaresmall-minus{background-position:-64px -208px}.ui-icon-squaresmall-close{background-position:-80px -208px}.ui-icon-grip-dotted-vertical{background-position:0 -224px}.ui-icon-grip-dotted-horizontal{background-position:-16px -224px}.ui-icon-grip-solid-vertical{background-position:-32px -224px}.ui-icon-grip-solid-horizontal{background-position:-48px -224px}.ui-icon-gripsmall-diagonal-se{background-position:-64px -224px}.ui-icon-grip-diagonal-se{background-position:-80px -224px}.ui-corner-all,.ui-corner-top,.ui-corner-left,.ui-corner-tl{border-top-left-radius:3px}.ui-corner-all,.ui-corner-top,.ui-corner-right,.ui-corner-tr{border-top-right-radius:3px}.ui-corner-all,.ui-corner-bottom,.ui-corner-left,.ui-corner-bl{border-bottom-left-radius:3px}.ui-corner-all,.ui-corner-bottom,.ui-corner-right,.ui-corner-br{border-bottom-right-radius:3px}.ui-widget-overlay{background:#aaa;opacity:.3;filter:Alpha(Opacity=30)}.ui-widget-shadow{-webkit-box-shadow:0 0 5px #666;box-shadow:0 0 5px #666}
        body {
            font-family: "Helvetica Neue", Helvetica, Arial;
            font-size: 14px;
            line-height: 20px;
            font-weight: 400;
            color: #3b3b3b;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
            background: #039cea5e;
        }
        
        @media screen and (max-width: 580px) {
            body {
                font-size: 16px;
                line-height: 22px;
            }
        }
        
        .wrapper {
            margin: 0 auto;
            padding: 40px;
            max-width: 800px;
        }
        
        .table {
            margin: 0 0 40px 0;
            width: 100%;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            display: table;
        }
        
        @media screen and (max-width: 580px) {
            .table {
                display: block;
            }
        }
        
        .row {
            display: table-row;
            background: #f6f6f6;
        }
        
        .row:nth-of-type(odd) {
            background: #e9e9e9;
        }
        
        .row.header {
            font-weight: 900;
            color: #ffffff;
            background: #017dbc;
        }
             .row.header1 {
            font-weight: 900;
            color: black;
            background: yellow;
        }
        
        .row.green {
            background: #27ae60;
        }
        
        .row.blue {
            background: #2980b9;
        }
        
        @media screen and (max-width: 580px) {
            .row {
                padding: 14px 0 7px;
                display: block;
            }
            .row.header {
                padding: 0;
                height: 6px;
            }
            .row.header .cell {
                display: none;
            }
            .row .cell {
                margin-bottom: 10px;
            }
            .row .cell:before {
                margin-bottom: 3px;
                content: attr(data-title);
                min-width: 98px;
                font-size: 10px;
                line-height: 10px;
                font-weight: bold;
                text-transform: uppercase;
                color: #969696;
                display: block;
            }
        }
        
        .cell {
            padding: 6px 12px;
            display: table-cell;
        }
        
        @media screen and (max-width: 580px) {
            .cell {
                padding: 2px 16px;
                display: block;
            }
        }
        
        .myForm-class input{
              /* float:left; */
               }
input[type="text"]{line-height: 25px; }
input[type="submit"]{line-height: 25px; }
.button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

   .input_modify{line-height: 25px; width: 80%;}
   .input_modify_url{line-height: 25px; width: 30%;}
   .input_modify_email{line-height: 25px; width: 20%;}
   .button {border-radius: 12px;}
    </style>
 
</head>

<body translate="no">
<center>
<div class="myForm-class">


 <b>Last Login Logs Filter :&nbsp; &nbsp; </b><input name="serverUrl" type="text" id="serverUrl"  class="input_modify_url" value="<%= request.getRequestURL().toString().replace("webServiceTest.jsp","otp_getUserLastActivityNew.action")%>" placeholder="server url *" required />  
  <input name="email" type="text" id="emailID"  class="input_modify_email"  placeholder="enter email Id *" required />   
   
  <input name="startDate" type="text" id="startDate" placeholder="enter start Date" /> 
  <input name="endDate" type="text" id="endDate" placeholder="enter end Date" /> 
  
<button type="submit" class="button" form="form1" onclick="searchRecords();" value="search"><b>Search</b></button>
</div>

<br/>

 <b>Webservice Url :&nbsp; &nbsp;</b>
<input name="webserviceUrl" class="input_modify" type="text" id="webserviceUrl" placeholder="webservice url " required readonly />  

</center>

    <div class="wrapper" id="divContent">

  
   
    </div>

</body>
 <script>
 
 
 jQuery.browser = {};
 (function () {
     jQuery.browser.msie = false;
     jQuery.browser.version = 0;
     if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
         jQuery.browser.msie = true;
         jQuery.browser.version = RegExp.$1;
     }
 })();
    
  
        $( "#startDate" ).datepicker({ 
        	dateFormat: 'yy-mm-dd'
	    });
        $( "#endDate" ).datepicker({ 
        	dateFormat: 'yy-mm-dd'
	    });
        
      /*   $("#startDate").on("change", function () {
            var fromdate = $(this).val();
            alert(fromdate);
        }); */
     
        
        
        function searchRecords()
        {
        	$("#loaderImg").show();
            $("#divContent").html('');
        	var serverUrl = $("#serverUrl").val();
        	var emailID = $("#emailID").val();
        	var startDate = $("#startDate").val();
        	var endDate = $("#endDate").val();
         
        	var webserviceUrl='';
        	if(serverUrl == '' || $.trim(serverUrl) == '')
        	{  alert("Enter serverUrl.");
        	   $("#serverUrl").focus();
        	   return false;
        	}
        	else
        		webserviceUrl = serverUrl+'?';
        	
        	if(emailID == '' || $.trim(emailID) == '' )
        	{  alert("Enter emailId.");
        	   $("#emailID").focus();
        	   return false;
        	}
        	else
        		webserviceUrl +='mail='+encodeURIComponent(emailID);
        	
        	if(startDate != '' && $.trim(startDate) != '' && endDate != '' && $.trim(endDate) != '')
        		webserviceUrl +='&startDate='+startDate+'&endDate='+endDate;
        	 
        	 
        	$("#webserviceUrl").val(webserviceUrl);
        	$("#webserviceUrl").css("background-color", "#7dccf500");
        	$.getJSON( webserviceUrl, function( data ) {
        		var tableContent ='';
        		  
        		if(webserviceUrl.includes("otp_getUserLastActivityNew.action"))
        		{
        		  $.each( data, function( key, val ) {
        		     tableContent +=' <div class="row header1"><h2>'+key+'</h2></div><div class="row header"> <div class="cell"> srNo  </div> <div class="cell"> ip </div>  <div class="cell">  requestTime </div>  <div class="cell">  protocol  </div>  <div class="cell">  location </div>    </div>';
        		    if(val != null && val != ''){
        		        $.each(val, function(key,value) {
		        		    	tableContent +='<div class="row">';
		             		    tableContent +=' <div class="cell" data-title="srNo">';
		             		    tableContent +=value.srNo;
		             		    tableContent +='  </div>';
		             		    tableContent +='  <div class="cell" data-title="ip">';
		             		    tableContent +=value.ip;
		             		    tableContent +='  </div>';
		             		    tableContent +='  <div class="cell" data-title="requestTime">';
		             		    tableContent +=value.requestTime;
		             		    tableContent +='  </div>';
		             		    tableContent +='   <div class="cell" data-title="protocol">';
		             		    tableContent +=value.protocol;
		             		    tableContent +='   </div>';
		             		    tableContent +='   <div class="cell" data-title="location">';
		             		    tableContent +=value.location;
		                        tableContent +='  </div>';
		                        tableContent +='    </div>';
        		    	});
        		    }
        		    else
        		    	 tableContent +='   <div class="row"></div  class="cell" data-title="srNo" >  No record found!</div></div>';
        		    tableContent +='    </div> <br/><br/>';
        		    
        		  });
        		
        		}
        		else
        			{
        			   tableContent +='<div class="row header"> <div class="cell"> srNo  </div> <div class="cell"> ip </div>  <div class="cell">  requestTime </div>  <div class="cell">  protocol  </div>  <div class="cell">  location </div>    </div>';
            		    if(data != null && data != ''){
            		        $.each(data, function(key,value) {
    		        		    	tableContent +='<div class="row">';
    		             		    tableContent +=' <div class="cell" data-title="srNo">';
    		             		    tableContent +=value.srNo;
    		             		    tableContent +='  </div>';
    		             		    tableContent +='  <div class="cell" data-title="ip">';
    		             		    tableContent +=value.ip;
    		             		    tableContent +='  </div>';
    		             		    tableContent +='  <div class="cell" data-title="requestTime">';
    		             		    tableContent +=value.requestTime;
    		             		    tableContent +='  </div>';
    		             		    tableContent +='   <div class="cell" data-title="protocol">';
    		             		    tableContent +=value.protocol;
    		             		    tableContent +='   </div>';
    		             		    tableContent +='   <div class="cell" data-title="location">';
    		             		    tableContent +=value.location;
    		                        tableContent +='  </div>';
    		                        tableContent +='    </div>';
            		    	});
            		    }
            		    else
            		    	 tableContent +='   <div class="row"></div  class="cell"  data-title="srNo">  No record found!</div></div>';
            		    tableContent +='    </div> <br/><br/>';
            		 
        			}
        			
        		
        		  $("#loaderImg").hide();
        		  $("#divContent").html(tableContent);
        		  
        	});
        }
    
    </script>
    <div id="loaderImg" style="display: none;"><center>
    <img src="data:image/png;base64, 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" alt="Please Wait......" />
		
		
	</center></div>	
</html>