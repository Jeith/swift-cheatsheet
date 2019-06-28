var express = require('express');
let axios = require('axios');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/:countryName', function(req, res, next) {
        let properCountryName;
        let countryName = req.params.countryName;
        let cc;
        switch(countryName){
            case "aruba":
                cc = "aa";
                break;
            case "antigua and barbuda":
                cc = "ac";
                break;
            case "united arab emirates":
            case "uae":
                cc = "ae";
                break;
            case "afghanistan":
                cc = "af";
                break;
            case "algeria":
                cc = "ag";
                break;
            case "azerbaijan":
                cc = "aj";
                break;
            case "albania":
                cc = "al";
                break;
            case "armenia":
                cc = "am";
                break;
            case "andorra":
                cc = "an";
                break;   
            case "angola":
                cc = "ao";
                break;
            case "american somoa":
            case "somoa":
                cc = "aq";
                break;
            case "argentina":
                cc = "ar";
                break;
            case "australia":
                cc = "as";
                break;
            case "ashmore and cartier islands":
                cc = "at";
                break;
            case "austria":
                cc = "au";
                break;
            case "anguilla":
                cc = "av";
                break;
            case "akrotiri":
                cc = "ax";
                break;  
            case "antarctica":
                cc = "ay";
                break;
            case "bahrain":
                cc = "ba";
                break;
            case "barbados":
                cc = "bb";
                break;
            case "botswana":
                cc = "bc";
                break;
            case "bermuda":
                cc = "bd";
                break;
            case "belgium":
                cc = "be";
                break;
            case "Bahamas":
                cc = "bf";
                break;
            case "bangladesh":
                cc = "bg";
                break;
            case "belize":
                cc = "bh";
                break;
            case "bosnia and herzegovina":
                cc = "bk";
                break;
            case "bolivia":
                cc = "bl";
                break;
            case "burma":
            case "myanmar":
                cc = "bm";
                break;
            case "benin":
                cc = "bn";
                break;
            case "belarus":
                cc = "bo";
                break;
            case "solomon islands":
                cc = "bp";
                break;
            case "navassa island":
                cc = "bq";
                break; 
            case "brazil":
                cc = "br";
                break;
            case "bhutan":
                cc = "bt";
                break;
            case "bulgaria":
                cc = "bu";
                break;
            case "brunei":
                cc = "bx";
                break;
            case "burundi":
                cc = "by";
                break;
            case "canada":
                cc = "ca";
                break;
            case "cambodia":
                cc = "cb";
                break;
            case "curacao":
                cc = "cc";
                break;
            case "chad":
                cc = "cd";
                break;
            case "sri lanka":
                cc = "ce";
                break;
            case "republic of the congo":
            case "republic of congo":
                cc = "cf";
                break;
            case "democratic republic of the congo":
            case "drc":
                cc = "cg";
                break;
            case "china":
                cc = "ch";
                break;
            case "chile":
                cc = "ci";
                break;
            case "cayman islands":
                cc = "cj";
                break;  
            case "cocos islands":
                cc = "ck";
                break; 
            case "cameroon":
                cc = "cm";
                break; 
            case "comoros":
                cc = "cn";
                break; 
            case "colombia":
                cc = "co";
                break;     
            case "northern mariana islands":
                cc = "cq";
                break; 
            case "coral sea islands":
                cc = "cr";
                break; 
            case "costa rica":
                cc = "cs";
                break; 
            case "central african republic":
            case "car":
                cc = "ct";
                break;  
            case "cuba":
                cc = "cu";
                break; 
            case "cabo verde":
                cc = "cv";
                break; 
            case "cook islands":
                cc = "cw";
                break; 
            case "cyprus":
                cc = "cy";
                break;     
            case "denmark":
                cc = "da";
                break; 
            case "djibouti":
                cc = "dj";
                break; 
            case "dominica":
                cc = "do";
                break; 
            case "dominican republic":
                cc = "dr";
                break; 
            case "dhekelia":
                cc = "dx";
                break; 
            case "ecuador":
                cc = "ec";
                break;     
            case "european union":
                cc = "ee";
                break; 
            case "egypt":
                cc = "eg";
                break; 
            case "ireland":
                cc = "ei";
                break; 
            case "equatorial guinea":
                cc = "ek";
                break;  
            case "estonia":
                cc = "en";
                break; 
            case "eritrea":
                cc = "er";
                break; 
            case "el salvador":
                cc = "es";
                break; 
            case "ethiopia":
                cc = "et";
                break;     
            case "czech republic":
                cc = "ez";
                break; 
            case "finland":
                cc = "fi";
                break; 
            case "fiji":
                cc = "fj";
                break; 
            case "falkland islands":
                cc = "fk";
                break;
            case "micronesia":
                cc = "fm";
                break; 
            case "faroe islands":
                cc = "fo";
                break;     
            case "french polynesia":
                cc = "fp";
                break; 
            case "france":
                cc = "fr";
                break; 
            case "french southern and antarctic lands":
                cc = "fs";
                break; 
            case "the gambia":
            case "gambia":
                cc = "ga";
                break;  
            case "gabon":
                cc = "gb";
                break; 
            case "georgia":
                cc = "gg";
                break; 
            case "ghana":
                cc = "gh";
                break; 
            case "gibralter":
                cc = "gi";
                break;     
            case "grenada":
                cc = "gj";
                break; 
            case "guernsey":
                cc = "gk";
                break; 
            case "greenland":
                cc = "gl";
                break; 
            case "germany":
                cc = "gm";
                break; 
            case "guam":
                cc = "gq";
                break; 
            case "greece":
                cc = "gr";
                break;     
            case "guatemala":
                cc = "gt";
                break; 
            case "guinea":
                cc = "gv";
                break; 
            case "guyana":
                cc = "gy";
                break; 
            case "gaza strip":
                cc = "gz";
                break;  
            case "haiti":
                cc = "ha";
                break; 
            case "hong kong":
                cc = "hk";
                break; 
            case "heard island and mcdonald islands":
                cc = "hm";
                break; 
            case "honduras":
                cc = "ho";
                break;     
            case "croatia":
                cc = "hr";
                break; 
            case "hungary":
                cc = "hu";
                break; 
            case "iceland":
                cc = "ic";
                break; 
            case "indonesia":
                cc = "id";
                break; 
            case "isle of man":
                cc = "im";
                break; 
            case "india":
                cc = "in";
                break;     
            case "clipperton island":
                cc = "ip";
                break; 
            case "iran":
                cc = "ir";
                break; 
            case "israel":
                cc = "is";
                break;  
            case "italy":
                cc = "it";
                break; 
            case "cote d'lvoire":
            case "ivory coast":
                cc = "iv";
                break; 
            case "iraq":
                cc = "iz";
                break; 
            case "japan":
                cc = "ja";
                break;     
            case "jersey":
                cc = "je";
                break; 
            case "jamaica":
                cc = "jm";
                break; 
            case "jan mayen":
                cc = "jn";
                break; 
            case "jordan":
                cc = "jo";
                break; 
            case "kenya":
            cc = "ke";
                break;
            case "kyrgyzstan":
            cc = "kg";
                break;
            case "north korea":
            case "drnk":
            cc = "kn";
                break;
            case "kiribati":
            cc = "kr";
                break;
            case "south korea":
            case "rok":
            cc = "ks";
                break;
            case "christmas island":
            cc = "kt";
                break;
            case "kuwait":
            cc = "ku";
                break;
            case "kosovo":
            cc = "kv";
                break;
            case "kazakhstan":
            cc = "kz";
                break;
            case "laos":
            cc = "la";
                break;
            case "lebanon":
            cc = "le";
                break;
            case "latvia":
            cc = "lg";
                break;
            case "lithuania":
            cc = "lh";
                break;
            case "liberia":
            cc = "li";
                break;
            case "slovakia":
            cc = "lo";
                break;
            case "liechtenstein":
            cc = "ls";
            break;
            case "lesotho":
            cc = "lt";
                break;
            case "luxembourg":
            cc = "lu";
                break;
            case "libya":
            cc = "ly";
                break;
            case "madagascar":
            cc = "ma";
                break;
            case "macau":
            cc = "mc";
                break;
            case "moldova":
            cc = "md";
                break;
            case "mongolia":
            cc = "mg";
                break;
            case "montserrat":
            cc = "mh";
                break;
            case "malawi":
            cc = "mi";
                break;
            case "montenegro":
            cc = "mj";
                break;
            case "macedonia":
            cc = "mk";
                break;
            case "mali":
            cc = "ml";
                break;
            case "monaco":
            cc = "mn";
                break;
            case "morocco":
            cc = "mo";
                break;
            case "mauritius":
            cc = "mp";
                break;
            case "mauritania":
            cc = "mr";
                break;
            case "malta":
            cc = "mt";
                break;
            case "oman":
            cc = "mu";
                break;
            case "maldives":
            cc = "mv";
                break;
            case "mexico":
            cc = "mx";
                break;
            case "malaysia":
            cc = "my";
                break;
            case "mozambique":
            cc = "mz";
                break;
            case "new caledonia":
            cc = "nc";
                break;
            case "niue":
            cc = "ne";
                break;
            case "norfolk island":
            cc = "nf";
                break;
            case "niger":
            cc = "ng";
                break;
            case "vanuatu":
            cc = "nh";
                break;
            case "nigeria":
            cc = "ni";
                break;
            case "netherlands":
            cc = "nl";
                break;
            case "no":
            cc = "norway";
                break;
            case "nepal":
            cc = "np";
                break;
            case "nauru":
            cc = "nr";
                break;
            case "suriname":
            cc = "ns";
                break;
            case "nicaragua":
            cc = "nu";
                break;
            case "new zealand":
            cc = "nz";
                break;
            case "south sudan":
            cc = "od";
                break;
            case "paraguay":
            cc = "pa";
                break;
            case "pitcairn islands":
            cc = "pc";
                break;
            case "peru":
            cc = "pe";
                break;
            case "paracel islands":
            cc = "pf";
                break;
            case "spratly islands":
            cc = "pg";
                break;
            case "pakistan":
            cc = "pk";
                break;
            case "poland":
            cc = "pl";
                break;
            case "panama":
            cc = "pm";
                break;
            case "portugal":
            cc = "po";
                break;
            case "papua new guinea":
            cc = "pp";
                break;
            case "palau":
            cc = "ps";
                break;
            case "guinea-bissau":
            cc = "pu";
                break;
            case "qatar":
            cc = "qa";
                break;
            case "serbia":
            cc = "ri";
                break;
            case "marshall islands":
            cc = "rm";
                break;
            case "saint martin":
            cc = "rn";
                break;
            case "romania":
            cc = "ro";
                break;
            case "philippines":
            cc = "rp";
                break;
            case "puerto rico":
            cc = "rq";
                break;
            case "russia":
            cc = "rs";
                break;
            case "rwanda":
            cc = "rw";
                break;
            case "saudi arabia":
            cc = "sa";
                break;
            case "saint pierre and miquelon":
            cc = "sb";
                break;
            case "saint kitts and nevis":
            cc = "sc";
                break;
            case "seychelles":
            cc = "se";
                break;
            case "south africa":
            cc = "sf";
                break;
            case "senegal":
            cc = "sg";
                break;
            case "saint helena":
            cc = "sh";
                break;
            case "slovenia":
            cc = "si";
                break;
            case "sint maarten":
            cc = "sk";
                break;
            case "sierra leone":
            cc = "sl";
                break;
            case "san marino":
            cc = "sm";
                break;
            case "singapore":
            cc = "sn";
                break;
            case "somalia":
            cc = "so";
                break;
            case "spain":
            cc = "sp";
                break;
            case "saint lucia":
            cc = "st";
                break;
            case "sudan":
            cc = "su";
                break;
            case "svalbard":
            cc = "sv";
                break;
            case "sweden":
            cc = "sw";
                break;
            case "south georgia and south sandwich islands":
            cc = "sx";
                break;
            case "syria":
            cc = "sy";
                break;
            case "switzerland":
            cc = "sz";
                break;
            case "saint barthlemy":
            cc = "tb";
                break;
            case "trinidad and tobago":
            cc = "td";
                break;
            case "thailand":
            cc = "th";
                break;
            case "tajikistan":
            cc = "ti";
                break;
            case "turks and caicos island":
            cc = "tk";
                break;
            case "togo":
            cc = "to";
                break;
            case "sao tome and principe":
            cc = "tp";
                break;
            case "tunisia":
            cc = "timor-leste";
                break;
            case "turkey":
            cc = "tu";
                break;
            case "tuvalu":
            cc = "tv";
                break;
            case "taiwan":
            cc = "tw";
                break;
            case "turkmenistan":
            cc = "tx";
                break;
            case "tanzania":
            cc = "tz";
                break;
            case "uganda":
            cc = "ug";
                break;
            case "united kingdom":
            case "uk":
            cc = "uk";
                break;
            case "united states pacific island wildlife refuges":
            cc = "um";
                break;
            case "ukraine":
            cc = "up";
                break;
            case "united states":
            case "us":
            case "usa":
            case "united states of america":
            cc = "us";
                break;
            case "burkina faso":
            cc = "uv";
                break;
            case "uruguay":
            cc = "uy";
                break;
            case "uzbekistan":
            cc = "uz";
                break;
            case "saint vincent and the grenadines":
            cc = "vc";
                break;
            case "venezuela":
            cc = "ve";
                break;
            case "british virgin islands":
            cc = "vi";
                break;
            case "vietnam":
            cc = "vm";
                break;
            case "virgin islands":
            cc = "vq";
                break;
            case "vatican city":
            cc = "vt";
                break;
            case "namibia":
            cc = "wa";
                break;
            case "west bank":
            cc = "we";
                break;
            case "wallis and futuna":
            cc = "wf";
                break;
            case "western sahara":
            cc = "wi";
                break;
            case "wake island":
            cc = "wq";
                break;
            case "samoa":
            case "american samoa":
            cc = "ws";
                break;
            case "swaziland":
            cc = "wz";
                break;
            case "yemen":
            cc = "ym";
                break;
            case "zambia":
            cc = "za";
                break;
            case "zimbabwe":
            cc = "zi";
                break;
            default:
            cc = req.params.countryName;
        }

        axios.get('https://raw.githubusercontent.com/Jeith/worldfactbookapi/master/countries/' + cc + ".json")
        .then(response => {
            properCountryName = response.data.Government["Country name"]["conventional short form"]["text"];
            const renderData = {  countryName: properCountryName, cc: cc };
            res.render('country-info', renderData);
        });

});

module.exports = router;