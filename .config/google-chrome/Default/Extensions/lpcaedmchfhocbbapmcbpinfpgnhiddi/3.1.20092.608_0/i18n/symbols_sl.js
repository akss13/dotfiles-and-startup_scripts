/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var a=this||self,b=function(f,k){f=f.split(".");var e=a;f[0]in e||"undefined"==typeof e.execScript||e.execScript("var "+f[0]);for(var g;f.length&&(g=f.shift());)f.length||void 0===k?e=e[g]&&e[g]!==Object.prototype[g]?e[g]:e[g]={}:e[g]=k};var c={c:{1E3:{other:"0K"},1E4:{other:"00K"},1E5:{other:"000K"},1E6:{other:"0M"},1E7:{other:"00M"},1E8:{other:"000M"},1E9:{other:"0B"},1E10:{other:"00B"},1E11:{other:"000B"},1E12:{other:"0T"},1E13:{other:"00T"},1E14:{other:"000T"}},b:{1E3:{other:"0 thousand"},1E4:{other:"00 thousand"},1E5:{other:"000 thousand"},1E6:{other:"0 million"},1E7:{other:"00 million"},1E8:{other:"000 million"},1E9:{other:"0 billion"},1E10:{other:"00 billion"},1E11:{other:"000 billion"},1E12:{other:"0 trillion"},1E13:{other:"00 trillion"},
1E14:{other:"000 trillion"}}};
c={c:{1E3:{other:"0\u00a0tis."},1E4:{other:"00\u00a0tis."},1E5:{other:"000\u00a0tis."},1E6:{other:"0\u00a0mio."},1E7:{other:"00\u00a0mio."},1E8:{other:"000\u00a0mio."},1E9:{other:"0\u00a0mrd."},1E10:{other:"00\u00a0mrd."},1E11:{other:"000\u00a0mrd."},1E12:{other:"0\u00a0bil."},1E13:{other:"00\u00a0bil."},1E14:{other:"000\u00a0bil."}},b:{1E3:{other:"0 tiso\u010d"},1E4:{other:"00 tiso\u010d"},1E5:{other:"000 tiso\u010d"},1E6:{other:"0 milijonov"},1E7:{other:"00 milijonov"},1E8:{other:"000 milijonov"},
1E9:{other:"0 milijard"},1E10:{other:"00 milijard"},1E11:{other:"000 milijard"},1E12:{other:"0 bilijonov"},1E13:{other:"00 bilijonov"},1E14:{other:"000 bilijonov"}}};var d={fa:"y",ma:"y G",ga:"MMM y",ha:"MMMM y",na:"MM/y",F:"MMM d",G:"MMMM dd",I:"M/d",H:"MMMM d",ka:"MMM d, y",da:"EEE, MMM d",la:"EEE, MMM d, y",i:"d",ja:"MMM d, h:mm a zzzz"};d={fa:"y",ma:"y G",ga:"MMM y",ha:"MMMM y",na:"MM/y",F:"d. MMM",G:"dd. MMMM",I:"d. M.",H:"d. MMMM",ka:"d. MMM y",da:"EEE, d. MMM",la:"EEE, d. MMM y",i:"d.",ja:"d. MMM HH:mm zzzz"};var h={s:["BC","AD"],o:["Before Christ","Anno Domini"],K:"JFMAMJJASOND".split(""),X:"JFMAMJJASOND".split(""),D:"January February March April May June July August September October November December".split(" "),W:"January February March April May June July August September October November December".split(" "),T:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),Z:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),ca:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
aa:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),V:"Sun Mon Tue Wed Thu Fri Sat".split(" "),$:"Sun Mon Tue Wed Thu Fri Sat".split(" "),L:"SMTWTFS".split(""),Y:"SMTWTFS".split(""),U:["Q1","Q2","Q3","Q4"],R:["1st quarter","2nd quarter","3rd quarter","4th quarter"],a:["AM","PM"],g:["EEEE, MMMM d, y","MMMM d, y","MMM d, y","M/d/yy"],ba:["h:mm:ss a zzzz","h:mm:ss a z","h:mm:ss a","h:mm a"],h:["{1} 'at' {0}","{1} 'at' {0}","{1}, {0}","{1}, {0}"],v:6,ea:[5,6],w:5};
h={s:["pr. Kr.","po Kr."],o:["pred Kristusom","po Kristusu"],K:"jfmamjjasond".split(""),X:"jfmamjjasond".split(""),D:"januar februar marec april maj junij julij avgust september oktober november december".split(" "),W:"januar februar marec april maj junij julij avgust september oktober november december".split(" "),T:"jan. feb. mar. apr. maj jun. jul. avg. sep. okt. nov. dec.".split(" "),Z:"jan. feb. mar. apr. maj jun. jul. avg. sep. okt. nov. dec.".split(" "),ca:"nedelja ponedeljek torek sreda \u010detrtek petek sobota".split(" "),
aa:"nedelja ponedeljek torek sreda \u010detrtek petek sobota".split(" "),V:"ned. pon. tor. sre. \u010det. pet. sob.".split(" "),$:"ned. pon. tor. sre. \u010det. pet. sob.".split(" "),L:"npts\u010dps".split(""),Y:"npts\u010dps".split(""),U:["1. \u010det.","2. \u010det.","3. \u010det.","4. \u010det."],R:["1. \u010detrtletje","2. \u010detrtletje","3. \u010detrtletje","4. \u010detrtletje"],a:["dop.","pop."],g:["EEEE, dd. MMMM y","dd. MMMM y","d. MMM y","d. MM. yy"],ba:["HH:mm:ss zzzz","HH:mm:ss z","HH:mm:ss",
"HH:mm"],h:["{1} {0}","{1} {0}","{1} {0}","{1} {0}"],v:0,ea:[5,6],w:6};var l={l:".",A:",",M:"%",ia:"0",P:"+",C:"-",u:"E",O:"\u2030",B:"\u221e",J:"NaN",j:"#,##0.###",S:"#E0",N:"#,##0%",f:"\u00a4#,##0.00",m:"USD"};l={l:",",A:".",M:"%",ia:"0",P:"+",C:"\u2212",u:"e",O:"\u2030",B:"\u221e",J:"NaN",j:"#,##0.###",S:"#E0",N:"#,##0\u00a0%",f:"#,##0.00\u00a0\u00a4",m:"EUR"};b("I18N_DATETIMESYMBOLS_ERAS",h.s);b("I18N_DATETIMESYMBOLS_ERANAMES",h.o);b("I18N_DATETIMESYMBOLS_NARROWMONTHS",h.K);b("I18N_DATETIMESYMBOLS_STANDALONENARROWMONTHS",h.X);b("I18N_DATETIMESYMBOLS_MONTHS",h.D);b("I18N_DATETIMESYMBOLS_STANDALONEMONTHS",h.W);b("I18N_DATETIMESYMBOLS_SHORTMONTHS",h.T);b("I18N_DATETIMESYMBOLS_STANDALONESHORTMONTHS",h.Z);b("I18N_DATETIMESYMBOLS_WEEKDAYS",h.ca);b("I18N_DATETIMESYMBOLS_STANDALONEWEEKDAYS",h.aa);b("I18N_DATETIMESYMBOLS_SHORTWEEKDAYS",h.V);
b("I18N_DATETIMESYMBOLS_STANDALONESHORTWEEKDAYS",h.$);b("I18N_DATETIMESYMBOLS_NARROWWEEKDAYS",h.L);b("I18N_DATETIMESYMBOLS_STANDALONENARROWWEEKDAYS",h.Y);b("I18N_DATETIMESYMBOLS_SHORTQUARTERS",h.U);b("I18N_DATETIMESYMBOLS_QUARTERS",h.R);b("I18N_DATETIMESYMBOLS_AMPMS",h.a);b("I18N_DATETIMESYMBOLS_DATEFORMATS",h.g);b("I18N_DATETIMESYMBOLS_TIMEFORMATS",h.ba);b("I18N_DATETIMESYMBOLS_DATETIMEFORMATS",h.h);b("I18N_DATETIMESYMBOLS_FIRSTDAYOFWEEK",h.v);b("I18N_DATETIMESYMBOLS_WEEKENDRANGE",h.ea);
b("I18N_DATETIMESYMBOLS_FIRSTWEEKCUTOFFDAY",h.w);b("I18N_DATETIMEPATTERNS_YEAR_FULL",d.fa);b("I18N_DATETIMEPATTERNS_YEAR_MONTH_ABBR",d.ga);b("I18N_DATETIMEPATTERNS_YEAR_MONTH_FULL",d.ha);b("I18N_DATETIMEPATTERNS_MONTH_DAY_ABBR",d.F);b("I18N_DATETIMEPATTERNS_MONTH_DAY_FULL",d.G);b("I18N_DATETIMEPATTERNS_MONTH_DAY_SHORT",d.I);b("I18N_DATETIMEPATTERNS_MONTH_DAY_MEDIUM",d.H);b("I18N_DATETIMEPATTERNS_WEEKDAY_MONTH_DAY_MEDIUM",d.da);b("I18N_DATETIMEPATTERNS_DAY_ABBR",d.i);
void 0!==h.oa&&b("I18N_DATETIMESYMBOLS_ZERODIGIT",h.oa);b("I18N_NUMBERFORMATSYMBOLS_DECIMAL_SEP",l.l);b("I18N_NUMBERFORMATSYMBOLS_GROUP_SEP",l.A);b("I18N_NUMBERFORMATSYMBOLS_PERCENT",l.M);b("I18N_NUMBERFORMATSYMBOLS_ZERO_DIGIT",l.ia);b("I18N_NUMBERFORMATSYMBOLS_PLUS_SIGN",l.P);b("I18N_NUMBERFORMATSYMBOLS_MINUS_SIGN",l.C);b("I18N_NUMBERFORMATSYMBOLS_EXP_SYMBOL",l.u);b("I18N_NUMBERFORMATSYMBOLS_PERMILL",l.O);b("I18N_NUMBERFORMATSYMBOLS_INFINITY",l.B);b("I18N_NUMBERFORMATSYMBOLS_NAN",l.J);
b("I18N_NUMBERFORMATSYMBOLS_DECIMAL_PATTERN",l.j);b("I18N_NUMBERFORMATSYMBOLS_SCIENTIFIC_PATTERN",l.S);b("I18N_NUMBERFORMATSYMBOLS_PERCENT_PATTERN",l.N);b("I18N_NUMBERFORMATSYMBOLS_CURRENCY_PATTERN",l.f);b("I18N_NUMBERFORMATSYMBOLS_DEF_CURRENCY_CODE",l.m);b("I18N_COMPACT_DECIMAL_SHORT_PATTERN",c.c);b("I18N_COMPACT_DECIMAL_LONG_PATTERN",c.b);