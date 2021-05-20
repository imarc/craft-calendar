!function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=8)}({0:function(e,t,a){"use strict";a.r(t),a.d(t,"renderEvent",(function(){return i})),a.d(t,"today",(function(){return d})),a.d(t,"renderDay",(function(){return c})),a.d(t,"renderView",(function(){return s})),a.d(t,"eventRepositioned",(function(){return u})),a.d(t,"eventDateChange",(function(){return f})),a.d(t,"eventDurationChange",(function(){return p})),a.d(t,"eventClick",(function(){return m})),a.d(t,"getDayViewLink",(function(){return v})),a.d(t,"getEvents",(function(){return y})),a.d(t,"closeAllQTips",(function(){return h})),a.d(t,"enableQTips",(function(){return b})),a.d(t,"getSpinner",(function(){return C}));var n=a(1);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var o=$("#solspace-calendar"),l=null,i=function(e,t){if(e.allDay&&t.addClass("fc-event-all-day"),e.end){if(e.multiDay||e.allDay)t.addClass("fc-event-multi-day");else{t.addClass("fc-event-single-day");var a=$("<span />").addClass("fc-color-icon").css("background-color",e.backgroundColor).css("border-color",e.borderColor);$(".fc-content",t).prepend(a)}e.enabled||t.addClass("fc-event-disabled"),t.addClass("fc-color-"+e.textColor),Object(n.buildEventPopup)(e,t,o.data("timeFormat"))}},d=new moment,c=function(e,t){var a=t.parents(".fc-bg:first").siblings(".fc-content-skeleton").find("thead > tr > td:eq("+t.index()+")"),n=v(e),r=$("<a />").attr("href",n).html(a.html());a.html(r)},s=function(e,t){var a=t.parents("#solspace-calendar"),n=new moment(a.data("current-day"));"agendaWeek"===e.name&&$(".fc-day-header.fc-widget-header",t).each((function(){var e=$(this).html(),t=e.split(" ");e=t[0]+" <span>"+t[1]+"</span>";var a=new moment($(this).data("date")),r=v(a),o=$("<a />").attr("href",r).html(e);n.format("YYYYMMDD")===a.format("YYYYMMDD")&&o.addClass("fc-title-today"),$(this).html(o)}));$(".fc-localeButton-button",o).addClass("menubtn btn"),"agendaDay"===e.name&&$("thead.fc-head",t).remove()},u=function(e,t,a,n){$.ajax({url:Craft.getCpUrl("calendar/events/api/modify-"+e),type:"post",dataType:"json",data:r({eventId:t.id,siteId:t.site.id,isAllDay:t.allDay,startDate:t.start.toISOString(),endDate:t.end?t.end.toISOString():null,deltaSeconds:a.as("seconds")},Craft.csrfTokenName,Craft.csrfTokenValue),success:function(e){e.error?n():t.repeats&&$calendar.fullCalendar("refetchEvents")},error:function(){n()}})},f=function(e,t,a){u("date",e,t,a)},p=function(e,t,a){u("duration",e,t,a)},m=function(e){window.location.href=Craft.getCpUrl("calendar/events/"+e.id+"/"+e.site.handle)},v=function(e){if(e.isValid()){var t=e.format("YYYY"),a=e.format("MM"),n=e.format("DD");return Craft.getCpUrl("calendar/view/day/"+t+"/"+a+"/"+n)}return""},y=function(e,t,a,n){C().fadeIn("fast");var o=$("ul.calendar-list"),l="*";o.length&&(l=$("input:checked",o).map((function(){return $(this).val()})).get().join());var i=$("#solspace-calendar").data().currentSiteId;$.ajax({url:Craft.getCpUrl("calendar/month"),data:r({rangeStart:e.toISOString(),rangeEnd:t.toISOString(),calendars:l,siteId:i},Craft.csrfTokenName,Craft.csrfTokenValue),type:"post",dataType:"json",success:function(e){for(var t=0;t<e.length;t++){var a=e[t];a.allDay&&(e[t].end=moment(a.end).add(2,"s").utc().format())}n(e),C().fadeOut("fast")}})},h=function(){window.qTipsEnabled=!1,$("div.qtip:visible").qtip("hide")},b=function(){window.qTipsEnabled=!0},C=function(){return l||(o.find(".fc-right").prepend('<div id="solspace-calendar-spinner" class="spinner" style="display: none;"></div>'),l=$("#solspace-calendar-spinner")),l}},1:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.r(t),a.d(t,"showEventCreator",(function(){return l})),a.d(t,"buildEventPopup",(function(){return i})),a.d(t,"createDateAsUTC",(function(){return d}));var r=!1,o=$("#solspace-calendar"),l=function(e,t){r||(r=!0,$("<div />").qtip({content:{text:$("#event-creator"),title:Craft.t("calendar","New Event")},position:{my:"center",at:"center",target:$(window)},show:{ready:!0,modal:{on:!0,blur:!0}},hide:!1,style:{classes:"qtip-bootstrap dialogue",width:500},events:{render:function(a,r){var l=r.elements.content,i=o.data().currentSiteId;$("ul.errors",l).empty();var c=e.utc().format("HHmmss"),s=t.utc().format("HHmmss"),u=!1;c===s&&"000000"===s&&(t.subtract(1,"seconds"),u=!0);var f=d(e.toDate()),p=d(t.toDate()),m=$("#event-creator"),v=$('input[name="startDate[date]"]',m),y=$('input[name="startDate[time]"]',m),h=$('input[name="endDate[date]"]',m),b=$('input[name="endDate[time]"]',m);m.addClass("shown"),v.datepicker("setDate",f),h.datepicker("setDate",p),y.timepicker("setTime",f),b.timepicker("setTime",p);var C=$("input[name=allDay]"),g=C.parents(".lightswitch:first");$("input",g).val(u?1:""),u?(g.data("lightswitch").turnOn(),$(".timewrapper",m).hide()):(g.data("lightswitch").turnOff(),$(".timewrapper",m).show()),setTimeout((function(){$("input[name=title]:first",l).val("").focus().bind("keypress",(function(e){13===(e.which?e.which:e.keyCode)&&$("button.submit",l).trigger("click")}))}),100);var w=y.timepicker("option","timeFormat").replace("h","hh").replace("H","HH").replace("G","H").replace("g","h").replace("A","a").replace("i","mm");$("button.submit",l).unbind("click").click((function(e){var t=$(this),a=$("input[name=title]",l).val(),o=$("select[name=calendarId]",l).val(),d=moment(v.datepicker("getDate")),c=moment(y.val().replace(/(a|p)\.(m)\./gi,"$1$2"),w),s=moment(h.datepicker("getDate")),u=moment(b.val().replace(/(a|p)\.(m)\./gi,"$1$2"),w);t.prop("disabled",!0).addClass("disabled"),t.text(Craft.t("app","Saving...")),$.ajax({url:Craft.getCpUrl("calendar/events/api/create"),type:"post",dataType:"json",data:n({siteId:i,startDate:d.format("YYYY-MM-DD")+" "+c.format("HH:mm:ss"),endDate:s.format("YYYY-MM-DD")+" "+u.format("HH:mm:ss"),allDay:C.val(),event:{title:a,calendarId:o}},Craft.csrfTokenName,Craft.csrfTokenValue),success:function(t){if(t.error)$("ul.errors",l).empty().append($("<li />",{text:t.error}));else if(t.event){var a=t.event;a.allDay&&(a.end=moment(a.end).add(2,"s").utc().format()),$("*[data-calendar-instance]").fullCalendar("renderEvent",a),$("*[data-calendar-instance]").fullCalendar("unselect"),r.hide(e)}},error:function(e){var t=e.responseJSON;Craft.cp.displayNotification("error",t.error)},complete:function(){t.prop("disabled",!1).removeClass("disabled"),t.text(Craft.t("app","Save"))}})})),$("button.delete",l).unbind("click").click((function(){r.hide()}))},hide:function(e,t){$("#event-creator").removeClass("shown").insertAfter($("#solspace-calendar")),$("*[data-calendar-instance]").fullCalendar("unselect"),r=!1,t.destroy()}}}))},i=function(e,t,a){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(e.calendar){var o=$("<div>",{class:"buttons"}),l=$("<div>"),i=$("<div>",{class:"calendar-data",html:'<span class="color-indicator" style="background-color: '+e.backgroundColor+';"></span> '+e.calendar.name}),d=moment(e.start),c=moment(e.end),s="dddd, MMMM D, YYYY";e.allDay?c.subtract(1,"days"):s=s+" [at] "+a;var u=$("<div>",{class:"event-date-range separator",html:'<div style="white-space: nowrap;"><label>'+Craft.t("calendar","Starts")+":</label> "+d.format(s)+'</div><div style="white-space: nowrap;"><label>'+Craft.t("calendar","Ends")+":</label> "+c.format(s)+"</div>"}),f="";e.repeats&&(f=$("<div>",{class:"event-repeats separator",html:"<label>"+Craft.t("calendar","Repeats")+":</label> "+e.readableRepeatRule})),e.editable&&(o.append($("<a>",{class:"btn small submit",href:Craft.getCpUrl("calendar/events/"+e.id+(r?"/"+e.site.handle:"")),text:Craft.t("calendar","Edit")})),o.append($("<a>",{class:"btn small delete-event",href:Craft.getCpUrl("calendar/events/api/delete"),text:Craft.t("calendar","Delete"),data:{id:e.id}})),e.repeats&&o.append($("<a>",{class:"btn small delete-event-occurrence",href:Craft.getCpUrl("calendar/events/api/delete-occurrence"),text:Craft.t("calendar","Delete occurrence"),data:{id:e.id,date:e.start.toISOString()}}))),t.qtip({content:{title:e.title,button:!0,text:l.add(i).add(u).add(f).add(o)},style:{classes:"qtip-bootstrap qtip-event",tip:{width:30,height:15}},position:{my:"right center",at:"left center",adjust:{method:"shift flip"}},show:{solo:!0,delay:500},hide:{fixed:!0,delay:300},events:{show:function(e){window.qTipsEnabled||e.preventDefault()},render:function(t,a){$("a.delete-event-occurrence",a.elements.content).click((function(){var e=$(this).attr("href"),t=$(this).data("id"),r=$(this).data("date");return confirm(Craft.t("calendar","Are you sure?"))&&$.ajax({url:e,type:"post",dataType:"json",data:n({eventId:t,date:r},Craft.csrfTokenName,Craft.csrfTokenValue),success:function(e){if(!e.error)return $("*[data-calendar-instance]").fullCalendar("refetchEvents"),void a.destroy();console.warn(e.error)}}),!1})),$("a.delete-event",a.elements.content).click((function(){var t=$(this).attr("href"),r=$(this).data("id");return confirm(Craft.t("calendar","Are you sure you want to delete this event?"))&&$.ajax({url:t,type:"post",dataType:"json",data:n({eventId:r},Craft.csrfTokenName,Craft.csrfTokenValue),success:function(t){if(!t.error)return $("*[data-calendar-instance]").fullCalendar("removeEvents",e.id),void a.destroy();console.warn(t.error)}}),!1}))}}})}},d=function(e){return new Date(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds())}},8:function(e,t,a){"use strict";a.r(t);var n=a(0);function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null==a)return;var n,r,o=[],l=!0,i=!1;try{for(a=a.call(e);!(l=(n=a.next()).done)&&(o.push(n.value),!t||o.length!==t);l=!0);}catch(e){i=!0,r=e}finally{try{l||null==a.return||a.return()}finally{if(i)throw r}}return o}(e,t)||o(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){if(e){if("string"==typeof e)return l(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?l(e,t):void 0}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var i={week:{columnFormat:"ddd D",timeFormat:"LT",slotLabelFormat:"LT"},day:{columnFormat:"",timeFormat:"LT",slotLabelFormat:"LT"}};document.querySelectorAll("*[data-calendar-agenda]").forEach((function(e){var t=(e=$(e)).data(),a=t.overlapThreshold,l=t.locale,d=t.firstDayOfWeek,c=t.currentDay,s=t.siteId,u=t.calendars,f=t.view;e.fullCalendar({now:c,defaultDate:c,defaultView:f,nextDayThreshold:"0"+a+":00:01",fixedWeekCount:!1,eventLimit:3,lang:l,views:i,firstDay:d,height:500,scrollTime:moment().format("HH:mm:ss"),eventClick:n.eventClick,eventRender:function(e,t){if(e.allDay&&t.addClass("fc-event-all-day"),e.end){if(e.multiDay||e.allDay)t.addClass("fc-event-multi-day");else{t.addClass("fc-event-single-day");var a=$("<span />").addClass("fc-color-icon").css("background-color",e.backgroundColor).css("border-color",e.borderColor);$(".fc-content",t).prepend(a)}e.enabled||t.addClass("fc-event-disabled"),t.addClass("fc-color-"+e.textColor)}},events:function(e,t,a,n){var l,i,d;$.ajax({url:Craft.getCpUrl("calendar/month"),data:(l={rangeStart:e.toISOString(),rangeEnd:t.toISOString(),nonEditable:!0,calendars:u,siteId:s},i=Craft.csrfTokenName,d=Craft.csrfTokenValue,i in l?Object.defineProperty(l,i,{value:d,enumerable:!0,configurable:!0,writable:!0}):l[i]=d,l),type:"post",dataType:"json",success:function(e){var t,a=function(e,t){var a="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=o(e))||t&&e&&"number"==typeof e.length){a&&(e=a);var n=0,r=function(){};return{s:r,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l,i=!0,d=!1;return{s:function(){a=a.call(e)},n:function(){var e=a.next();return i=e.done,e},e:function(e){d=!0,l=e},f:function(){try{i||null==a.return||a.return()}finally{if(d)throw l}}}}(e.entries());try{for(a.s();!(t=a.n()).done;){var l=r(t.value,2),i=l[0],d=l[1];d.allDay&&(e[i].end=moment(d.end).add(2,"s").utc().format()),e[i].editable=!1}}catch(e){a.e(e)}finally{a.f()}n(e)}})},customButtons:{refresh:{text:Craft.t("calendar","Refresh"),click:function(){e.fullCalendar("refetchEvents")}}},header:{right:"prev,today,next",left:"title"}})}))}});