var EMISORA="https://srv7041.dns-lcinternet.com/8042/stream";
var PLAYER_RADIO="http://player.lcinternet.es/v9/cc439_id695/";
var BLOG="https://inconformistasfm.blogspot.com/";
var IVOOX="https://www.ivoox.com/podcast-inconformistas-fm_sq_f166496_1.html";
var SPOTIFY="https://open.spotify.com/show/033ZIDvFkeMDc9u050J6yr";
/* Recursos locales: la web busca automáticamente archivos con nombres
   cancion1.mp3, cancion2.mp3... y foto1.jpg, foto2.jpg...
   No hace falta modificar este HTML al añadir más archivos. */
var CANCIONES=Array.from({length:50},function(_,i){return "audio/cancion"+(i+1)+".mp3";});
var GALERIA=[];
var RECURSOS_CARGADOS=false;
var MAX_RECURSOS=50;


/* [nº, título, enlace directo de iVoox, audio antiguo] */
var P=[
[278,"Programa especial dedicado a Lorca","https://www.ivoox.com/player_ej_182314980_6_1.html?c1=cb2650",null,null,null],
[277,"La Década Prodigiosa","https://go.ivoox.com/rf/181945402",null,"https://inconformistasfm.blogspot.com/","https://open.spotify.com/episode/4ecFlJzocViJlGWyP9pGQX?si=G15o8wikRrq7ofNJbETlbw"],
[276,"Esther Williams","https://www.ivoox.com/entrevista-esther-williams-03-10-2026-audios-mp3_rf_181576456_1.html",null,null,"https://open.spotify.com/episode/1UjzpZ6bX7kRBqYuyj9o9Q"],  [275,"Opinión del ataque de EEUU a Venezuela",null,null,"https://inconformistasfm.blogspot.com/2026/01/opinion-del-ataque-de-eeuu-venezuela.html"],
[274,"Despertar la creatividad desde dentro — Entrevista con Tamara Chenel de Bambalinas","https://www.ivoox.com/tamara-chenel-bambalinas-inconformistas-fm-audios-mp3_rf_158332358_1.html",null,"https://inconformistasfm.blogspot.com/2025/09/despertar-la-creatividad-desde-dentro.html"],[273,"Luback","https://www.ivoox.com/entrevista-a-luback-audios-mp3_rf_48080667_1.html"],[272,"Entrevista a Capitán Cobarde","https://www.ivoox.com/entrevista-a-capitan-cobarde-audios-mp3_rf_78508514_1.html",null,"https://inconformistasfm.blogspot.com/2021/11/entrevista-capitan-cobarde.html"],[271,"Entrevista a Maldito Murphy","https://www.ivoox.com/entrevista-a-maldito-murphy-audios-mp3_rf_78267805_1.html",null,"https://inconformistasfm.blogspot.com/2021/11/entrevista-maldito-murphy.html"],[270,"Entrevista a Tony Carmona","https://www.ivoox.com/entrevista-a-tony-carmona-audios-mp3_rf_77161772_1.html",null,"2021-10","https://inconformistasfm.blogspot.com/2021/10/entrevista-tony-carmona.html"],[269,"Entrevista a El Niño Erizo","https://www.ivoox.com/entrevista-a-el-nino-erizo-audios-mp3_rf_76531999_1.html",null,"https://inconformistasfm.blogspot.com/2021/10/entrevista-el-nino-erizo.html"],[268,"Rap.... Mi mundo es el Rap","https://www.ivoox.com/programa-especial-rap-audios-mp3_rf_75526772_1.html",null,"https://inconformistasfm.blogspot.com/2021/09/rap-mi-mundo-es-el-rap.html"],[267,"El mejor Rock de la Historia","https://www.ivoox.com/rock-audios-mp3_rf_57013268_1.html",null,"https://inconformistasfm.blogspot.com/2020/09/el-mejor-rock-de-la-historia.html"],[266,"Empezamos la temporada 10!!!","https://www.ivoox.com/nueva-temporada-audios-mp3_rf_56545717_1.html",null,"https://inconformistasfm.blogspot.com/2020/09/empezamos-la-temporada-10.html"],[265,"From 92","https://www.ivoox.com/entrevista-a-from-92-audios-mp3_rf_47464787_1.html"],[264,"Asociación Mayores por la Educación Permanente","https://www.ivoox.com/entrevista-a-asociacion-mayores-educacion-permanente-audios-mp3_rf_45143910_1.html"],[263,"Ramón Castellanos y Carolina Pérez","https://www.ivoox.com/entrevista-a-ramon-castellanos-carolina-perez-audios-mp3_rf_44330767_1.html"],[262,"Elena Ley","https://www.ivoox.com/entrevista-a-elena-ley-audios-mp3_rf_44045102_1.html"],[261,"The Night Animal","https://www.ivoox.com/entrevista-a-the-night-animal-audios-mp3_rf_43539275_1.html"],[260,"Natali Castillo","https://www.ivoox.com/entrevista-a-natali-castillo-audios-mp3_rf_43230902_1.html"],[259,"Jorge Dylan","https://www.ivoox.com/entrevista-a-jorge-dylan-audios-mp3_rf_42954806_1.html"],[258,"Erre Violet","https://www.ivoox.com/entrevista-a-erre-violet-audios-mp3_rf_41680655_1.html"],[257,"Sidonie","https://www.ivoox.com/entrevista-a-sidonie-audios-mp3_rf_38326936_1.html"],[256,"Fiestas de Santiago Apóstol","https://www.ivoox.com/especial-fiestas-santiago-apostol-2019-audios-mp3_rf_38080819_1.html"],[255,"Javier Labadie","https://www.ivoox.com/entrevista-a-javier-lebadie-audios-mp3_rf_37368184_1.html"],[254,"Sinestrees y Lucía Pérez","https://www.ivoox.com/entrevista-a-sinestress-lucia-perez-audios-mp3_rf_35947626_1.html"],[253,"Sechem","https://www.ivoox.com/entrevista-a-sechem-audios-mp3_rf_35754513_1.html"],[252,"Ego Maniac","https://www.ivoox.com/entrevista-ego-maniacs-audios-mp3_rf_34413344_1.html"],[251,"Aldeas Infantiles","https://www.ivoox.com/entrevista-a-aldeas-infantiles-audios-mp3_rf_33203613_1.html"],[250,"Aldeas Infantiles · Educación de calle","https://www.ivoox.com/educacion-calle-aldeas-infantiles-sos-audios-mp3_rf_32369310_1.html"],[249,"Nana Aby","https://www.ivoox.com/entrevista-a-nana-aby-tributo-a-amy-winehouse-audios-mp3_rf_31566235_1.html"],[248,"Kinnia","https://www.ivoox.com/entrevista-a-kinnia-audios-mp3_rf_30266639_1.html"],[247,"Deborandos","https://www.ivoox.com/entrevista-a-deborandos-especial-rock-audios-mp3_rf_30105379_1.html"],[246,"Ocelon","https://www.ivoox.com/entrevista-a-ocelon-audios-mp3_rf_29953943_1.html"],[245,"Nacho Campillo y Asociación Vecinal Collado Villalba","https://www.ivoox.com/entrevista-a-nacho-campillo-asociacion-vecinal-de-audios-mp3_rf_29472643_1.html"],[244,"Los 70","https://www.ivoox.com/programa-especial-70-audios-mp3_rf_29096415_1.html"],[243,"Nana Aby y Miguel Yera","https://www.ivoox.com/entrevista-a-nana-aby-miguel-yera-audios-mp3_rf_28568361_1.html"],[242,"María Aguado","https://www.ivoox.com/entrevista-a-maria-aguado-inconformistas-fm-audios-mp3_rf_27054871_1.html"],[241,"Mister Jota","https://www.ivoox.com/entrevista-a-mister-jota-audios-mp3_rf_26910178_1.html"],[240,"Unique","https://www.ivoox.com/entrevista-a-unique-audios-mp3_rf_26561475_1.html"],[239,"Mariela Köhn","https://www.ivoox.com/entrevista-a-mariella-kohn-audios-mp3_rf_26434937_1.html"],[238,"Nana Aby","https://www.ivoox.com/entrevista-a-nana-aby-concierto-collado-villalba-audios-mp3_rf_26056866_1.html"],[237,"Rompeolas","https://www.ivoox.com/entrevista-a-rompeolas-tributo-a-loquillo-audios-mp3_rf_25932942_1.html"],[236,"Asociación Esclerosis Múltiple Collado Villalba","https://www.ivoox.com/entrevista-a-asociacion-esclerosis-multiple-de-audios-mp3_rf_25538538_1.html"],[235,"Isabel Soyo y Conciertos Solidarios","https://www.ivoox.com/entrevista-a-isabel-soto-conciertos-solidarios-audios-mp3_rf_25155619_1.html"],[234,"Rebbeca Newey","https://www.ivoox.com/entrevista-a-rebecca-newey-audios-mp3_rf_24573818_1.html"],[233,"Eugenio Gurumeta","https://www.ivoox.com/entrevista-a-eugenio-gurumeta-audios-mp3_rf_24186861_1.html"],[232,"Elena Mikailova","https://www.ivoox.com/entrevista-a-elena-mikailova-audios-mp3_rf_23671854_1.html"],[231,"Irene Sánchez y Andrea Campos"],
[230,"Rebeca Soul","https://www.ivoox.com/entrevista-a-rebeca-soul-audios-mp3_rf_23251072_1.html"],[229,"Grim Swindango","https://www.ivoox.com/entrevista-a-grim-swindango-audios-mp3_rf_23120479_1.html"],[228,"Lemozine y George Karja","https://www.ivoox.com/entrevista-a-lemozine-george-karja-audios-mp3_rf_22003600_1.html"],[227,"Proyecto Reutiliza","https://www.ivoox.com/proyecto-reutiliza-audios-mp3_rf_21594745_1.html"],[226,"Miss Newey","https://www.ivoox.com/entrevista-a-miss-newey-audios-mp3_rf_21310563_1.html"],[225,"Nana Aby","https://www.ivoox.com/entrevista-a-nana-aby-audios-mp3_rf_20902896_1.html"],[224,"Fabiani","https://www.ivoox.com/entrevista-a-fabiani-audios-mp3_rf_19788409_1.html"],[223,"José Córdoba","https://www.ivoox.com/entrevista-a-jose-cordoba-el-chivi-audios-mp3_rf_19546239_1.html"],[222,"Ego Maniacs y Linze","https://www.ivoox.com/entrevista-a-ego-maniacs-linze-audios-mp3_rf_19047524_1.html"],[221,"Jezabel Martínez","https://www.ivoox.com/jezabel-martinez-audios-mp3_rf_18903136_1.html"],[220,"Cristy Leiro","https://www.ivoox.com/entrevista-a-cristy-leiro-audios-mp3_rf_18789803_1.html"],[219,"La señorita Jenckins y sus pacientes","https://www.ivoox.com/entrevista-la-senorita-jenkins-sus-pacientes-audios-mp3_rf_18655870_1.html"],[218,"Miguel García Domenech","https://www.ivoox.com/entrevista-a-miguel-garcia-domenech-audios-mp3_rf_18522893_1.html"],[217,"Fernando Bazán"],[216,"Aroa Fernández"],[215,"Balta Cano"],[214,"Ego Maniacs"],[213,"Carlos de Abuín"],[212,"Angélica Leyva"],[211,"Mireia Montávez"],
[210,"Lui · Concierto Madrid"],[209,"Gema López"],[208,"Laila Rota"],[207,"Luna Llena y Atacados"],
[206,"Gata Cattana"],[205,"Fernando Moraño"],[204,"Valentina Sco"],[203,"Iago Cid"],
[202,"Lupe Catalá y Jamonas","https://www.ivoox.com/entrevista-a-lupe-catala-jamonas-audios-mp3_rf_12236960_1.html"],
[201,"Emilio Sanchis y Fran Menez"],[200,"71"],[199,"Isabel Soto"],
[198,"Jimmy Bartanan y Estefanía Martínez"],[197,"Oxígeno"],[196,"Raúl Charlo y Gema López"],
[195,"Óscar Tomé"],
[194,"Atacados y Álvaro Brazo","https://www.ivoox.com/entrevista-a-atacados-alvaro-brazo-audios-mp3_rf_11431634_1.html"],
[193,"Óscar Palet y Joaquín Molina"],[192,"Ángel Robledillo"],[191,"Lui"],
[190,"Luis Larraya, Abigail López y Laila Rota"],[189,"George Dandin"],[188,"Barei · Eurovisión 2016"],
[187,"Diversidad Literaria"],[186,"Especial Los 80"],[185,"Whatspc"],[184,"Mingo"],
[183,"Andorrafreemarket.com"],[182,"Yaima"],[181,"Versilia"],
[180,"Penny Necklace y Totxtreme · 5 dic 2015"],[179,"Olga Montes · 28 nov 2015"],
[178,"Lupe Catalá y Ciclonautas · 21 nov 2015"],[177,"Merche Diolch · 7 nov 2015"],
[176,"Mis Vísceras en el Supermercado · 31 oct 2015"],[175,"Lucía Galindo · 24 oct 2015"],
[174,"Eva Marciel · 17 oct 2015"],[173,"Carmen Jiménez · 10 oct 2015"],[172,"Vramn · 3 oct 2015"],
[171,"Saraqusta y Yaima · 25 sep 2015"],[170,"Jesús López (Santa Teresa) · 19 sep 2015"],
[169,"Dacil Santana · 25 jun 2015"],[168,"Ecocivita · 13 jun 2015"],[167,"Iago Cid · 30 may 2015"],
[166,"Tarifa Plana y Sonia Betancort · 22 may 2015"],[165,"Programa del 16 de mayo de 2015"],
[164,"Programa del 25 de abril de 2015"],[163,"Patricia Develasco · 9 abr 2015"],
[162,"Nonno · 13 mar 2015"],[161,"Blondays · 7 mar 2015"],
[160,"Lucía Moro y el Síndrome de Woyzeck · 17 feb 2015"],[159,"Coppel y Vidas · 6 feb 2015"],
[158,"Lara Morello · 30 ene 2015"],[157,"La Herida del Tiempo · 27 ene 2015"],
[156,"El Sueño de Rocío · 23 ene 2015"],[155,"Lucía Moro · 17 ene 2015"],
[154,"Metro · 20 dic 2014"],[153,"Microteatro · 19 dic 2014"],[152,"Olaya Alcázar · 11 dic 2014"],
[151,"El Combate · 22 nov 2014"],[150,"Luz Iglesias · 15 nov 2014"],[149,"Mama Ladilla · 8 nov 2014"],
[148,"Speed Limit Cruise · 25 oct 2014"],[147,"Ana Estaca · 18 oct 2014"],
[146,"Martín Maez · 11 oct 2014"],[145,"Javier Calle · 4 oct 2014"],
[144,"Laura Ordoñez · 27 sep 2014"],[143,"Elisa Mishelle Dávalos · 20 sep 2014"],
[142,"Jazmín Abuín · 26 jul 2014","https://www.ivoox.com/entrevista-a-jazmin-abuin-audios-mp3_rf_3347738_1.html"],
[141,"Sara Bandera · 12 jul 2014","https://www.ivoox.com/entrevista-sara-banderas-audios-mp3_rf_3304486_1.html"],
[140,"No Eres de Villalba, The Night Animal y Diade · 28 jun 2014","https://www.ivoox.com/inconformistas-fm-no-eres-villalba-si-audios-mp3_rf_3260486_1.html"],
[139,"Moriana · 14 jun 2014","https://www.ivoox.com/entrevista-a-moriana-audios-mp3_rf_3217107_1.html"],
[138,"Odü · 7 jun 2014","https://www.ivoox.com/entrevista-a-odu-audios-mp3_rf_3191983_1.html"],
[137,"The Fallen Angels · 24 may 2014","https://www.ivoox.com/entrevista-a-the-fallen-angels-audios-mp3_rf_3168746_1.html"],
[136,"Nur · 17 may 2014","https://www.ivoox.com/entrevista-a-nur-audios-mp3_rf_3125702_1.html"],
[135,"Barei · 10 may 2014","https://www.ivoox.com/entrevista-a-barei-audios-mp3_rf_3097956_1.html"],
[134,"Olga y Héctor · 26 abr 2014","https://www.ivoox.com/entrevista-a-olga-hector-audios-mp3_rf_3054200_1.html"],
[133,"Chenoa · 5 abr 2014","https://www.ivoox.com/entrevista-a-chenoa-audios-mp3_rf_2991261_1.html"],
[132,"Axel Losada y The Night Animals · 22 mar 2014","https://www.ivoox.com/entrevista-a-axel-losada-the-night-animals-audios-mp3_rf_2948736_1.html"],
[131,"Cristina Fungueiriño · 8 mar 2014","https://www.ivoox.com/entrevista-a-cristina-fungueirino-audios-mp3_rf_2896912_1.html"],
[130,"Yarelín García · 15 feb 2014","https://www.ivoox.com/entrevista-a-yarelin-garcia-audios-mp3_rf_2833032_1.html"],
[129,"Bea Losán · 8 feb 2014","https://www.ivoox.com/entrevista-a-bea-losan-presentacion-llevame-audios-mp3_rf_2809900_1.html"],
[128,"The Revolts · 1 feb 2014","https://www.ivoox.com/entrevista-a-the-revolts-audios-mp3_rf_2809517_1.html"],
[127,"Iván Martín y Yanira Gómez · 18 ene 2014","https://www.ivoox.com/entrevista-ivan-martin-yanira-gomez-audios-mp3_rf_2727528_1.html"],
[126,"Carlos Galán · 9 ene 2014","https://www.ivoox.com/entrevista-a-carlos-galan-audios-mp3_rf_2701054_1.html"],
[125,"Bea Losán · 21 dic 2013","https://www.ivoox.com/entrevista-a-bea-losan-audios-mp3_rf_2668073_1.html"],
[124,"David Amón y Joaquín Molina · 12 dic 2013",null,"http://inconformistasfm.wordpress.com/2013/12/16/entrevista-a-joaquin-molina-y-david-amon/"],
[123,"María Aguado · 7 dic 2013","https://www.ivoox.com/entrevista-a-maria-aguado-audios-mp3_rf_2621949_1.html"],
[122,"Abraham «La Voz» · 16 nov 2013","https://www.ivoox.com/entrevista-a-abraham-la-voz-audios-mp3_rf_2590916_1.html"],
[121,"Nocturnal Pollution · 16 nov 2013","https://www.ivoox.com/entrevista-a-nocturnal-pollution-audios-mp3_rf_2561032_1.html"],
[120,"Adrián García · 9 nov 2013","https://www.ivoox.com/entrevista-a-adrian-garcia-audios-mp3_rf_2544352_1.html"],
[119,"Same of Fears · 26 oct 2013","https://www.ivoox.com/entrevista-a-same-of-fears-audios-mp3_rf_2492002_1.html"],
[118,"Las Mónicas y Mirko · 19 oct 2013","https://www.ivoox.com/entrevista-a-las-monicas-mirko-audios-mp3_rf_2491882_1.html"],
[117,"Barei · 12 oct 2013","https://www.ivoox.com/entrevista-a-barei-12-10-2013-audios-mp3_rf_2437649_1.html"],
[116,"Programa del 28 de septiembre de 2013","https://www.ivoox.com/inconformistas-fm-28-09-2013-audios-mp3_rf_2411336_1.html"],
[115,"Programa del 14 de septiembre de 2013","https://www.ivoox.com/entrevista-a-odu-audios-mp3_rf_2075776_1.html"],
[114,"La Banda de Mireia · 20 jul 2013","https://www.ivoox.com/entrevista-a-la-banda-mireia-audios-mp3_rf_2227477_1.html"],
[113,"Kike Navas · 13 jul 2013","https://www.ivoox.com/entrevista-a-kike-navas-audios-mp3_rf_2212716_1.html"],
[112,"Programa del 6 de julio de 2013","https://www.ivoox.com/programa-6-julio-2013-audios-mp3_rf_2191950_1.html"],
[111,"Esmeralda Grao · 29 jun 2013","https://www.ivoox.com/entrevista-a-esmeralda-grao-audios-mp3_rf_2176990_1.html"],
[110,"Angélica Leyva · 22 jun 2013","https://www.ivoox.com/entrevista-a-angelica-leyva-audios-mp3_rf_2153293_1.html"],
[109,"Programa del 15 de junio de 2013","https://www.ivoox.com/inconformistas-fm-15-junio-2012-audios-mp3_rf_2135415_1.html"],
[108,"Juan José Jiménez y Varry Brava · 8 jun 2013","https://www.ivoox.com/entrevista-a-juan-jose-jimenez-varry-brava-audios-mp3_rf_2116236_1.html"],
[107,"Rocío Durán y SN2 · 1 jun 2013","https://www.ivoox.com/entrevista-a-sn2-rocio-duran-audios-mp3_rf_2093294_1.html"],
[106,"Odü · 25 may 2013","https://www.ivoox.com/entrevista-a-odu-audios-mp3_rf_2075776_1.html"],
[105,"Especial contra la violencia de género · 18 may 2013","https://www.ivoox.com/programa-contra-violencia-genero-audios-mp3_rf_2055819_1.html"],
[104,"Barei · 11 may 2013","https://www.ivoox.com/entrevista-a-barei-11-05-2013-audios-mp3_rf_2036368_1.html"],
[103,"Lugar a Duda · 20 abr 2013","https://www.ivoox.com/entrevista-a-lugar-a-duda-audios-mp3_rf_1967174_1.html"],
[102,"Merche · 13 abr 2013","https://www.ivoox.com/entrevista-a-merche-13-04-2013-audios-mp3_rf_1952499_1.html"],
[101,"Programa del 6 de abril de 2013",null,"https://www.box.com/s/wl27xu84okmdg6r0oxdt"],
[100,"No Pressure · 23 mar 2013",null,"https://www.box.com/s/ejjbz4oq52er5ql8uz5k"],
[99,"Smile Crew · 16 mar 2013",null,"https://www.box.com/s/q54sy40laozko6h1peoa"],
[98,"José Ignacio · Tiro con arco · 9 mar 2013",null,"https://www.box.com/s/85c3qjs99map5bj28u6q"],
[97,"Pull My Strings e Iñigo González · 2 mar 2013",null,"https://www.box.com/s/tm3k0k7nbbnb2cjd6vmq"],
[96,"Alfre Camarote · 16 feb 2013",null,"https://www.box.com/s/7w7arfupuemtqafjawtm"],
[95,"Coral Segovia · 9 feb 2013",null,"https://www.box.com/s/3p4pbpbuznvpmj2gqs4c"],
[94,"Scrig · 2 feb 2013",null,"https://www.box.com/s/rip2h1w43k7yq8de70zp"],
[93,"Jesús Avilés · 26 ene 2013",null,"https://www.box.com/s/c6q2k73q3dekafnn8za2"],
[92,"Programa del 19 de enero de 2013",null,"https://www.box.com/s/6l45lon8o8ry0lyrqf5d"],
[91,"Rosa Martínez · 12 ene 2013",null,"https://www.box.com/s/tcr641xd5beuu7yo72d3"],
[90,"Natalia Tapia · 22 dic 2012",null,"https://www.box.com/s/pmi0o411erbo4bh6r8bp"],
[89,"Melburn · 15 dic 2012",null,"https://www.box.com/s/7ss1xacxleurr3xz3qno"],
[88,"Joe Traveller · 8 dic 2012",null,"https://www.box.com/s/1forw9lnlca8ntc7n3tc"],
[87,"Los Luque · 1 dic 2012",null,"https://www.box.com/s/ep0zmlrjpeojl2kz34cb"],
[86,"Barei · 24 nov 2012",null,"https://www.box.com/s/5ywotcpqvgy5egt7my6r"],
[85,"Virginia (La Voz) y Ainhoa Cantalapiedra · 10 nov 2012",null,"https://www.box.com/s/2pu873m1r1gl9icojkt7"],
[84,"Versilia · 10 nov 2012",null,"https://www.box.com/s/d8xzmpwzyvyfudsvjb2l"],
[83,"Mirko · 27 oct 2012",null,"https://www.box.com/s/18qexx4a3sfket4hkw3x"],
[82,"Salva Ortega · 19 oct 2012",null,"https://www.box.com/s/ygu25yzocdlz29rh8n9s"],
[81,"Javier Báez · 12 oct 2012",null,"https://www.box.com/s/re2fm6520yxlny8k3u3f"],
[80,"Cristian Martín · 5 oct 2012",null,"https://www.box.com/s/vx2gfo57pfd8rodrcqep"],
[79,"Moriana · 29 sep 2012",null,"https://www.box.com/s/bfvqleuf1y7cuf8thdn3"],
[78,"Aarón y Orlando · 22 sep 2012",null,"https://www.box.com/s/u2n7xnnzsy8vf2v7aqpp"],
[77,"Josué y Narciso Tenorio · 15 sep 2012",null,"https://www.box.com/s/ob3tdz8l5l4qgts89d9v"],
[76,"Carlos «The Hitman» · 8 sep 2012",null,"https://www.box.com/s/6vyb1rodviimi1lyjex2"],
[75,"Mireia Montávez y Lydia Gregory · 28 jul 2012",null,"https://www.box.com/s/21b9c29b888474f3b7cd"],
[74,"María Villalón · 14 jul 2012",null,"https://www.box.com/s/081f679cd528a9cca8f5"],
[73,"Lukas con K · 7 jul 2012",null,"https://www.box.com/s/74e9c07e33afa6eac4e8"],
[72,"Iván Gardesa · 9 jun 2012",null,"https://www.box.com/s/0993347dac3dda58aa00"],
[71,"Programa del 16 de junio de 2012",null,"https://www.box.com/s/0421210f4ceb196e1dba"],
[70,"Eduardo Gómez · 2 jun 2012",null,"https://www.box.com/s/5f3f10458d6600079af0"],
[69,"Iñigo González (GH1) · 26 may 2012",null,"https://www.box.com/s/78cb8b5c877dd4cdd62d"],
[68,"Señorita Tristeza · 19 may 2012",null,"https://www.box.com/s/91fb7e81df8247d71fb5"],
[67,"Ladrones · 12 may 2012",null,"https://www.box.com/s/f33b521fbd15cb45fed0"],
[66,"Inhumanos y Varry Brava · 5 may 2012",null,"https://www.box.com/s/865af626b15219ce4cbc"],
[65,"Marabú · 28 abr 2012",null,"https://www.box.com/s/40b192f4aa1fecd5205e"],
[64,"Josué · 21 abr 2012",null,"https://www.box.com/s/394120c7c74471f0a988"],
[63,"Jaime Córdoba · 14 abr 2012",null,"https://www.box.com/s/5dd4b64c3c82eeb4ccb1"],
[62,"María Aguado · 24 mar 2012",null,"http://www.box.com/s/6eb6782fc31f30237598"],
[61,"Barei · 17 mar 2012",null,"http://www.box.com/s/e73575b2bfc29fc6bd2d"],
[60,"Javier Báez · 10 mar 2012",null,"http://www.box.com/s/y7zboengu2c7404qoixp"],
[59,"Ainhoa Cantalapiedra · 7 dic 2011",null,"http://www.box.com/s/dk1c59rgi6cloy1paevl"],
[58,"Sonia Pérez · 7 dic 2011",null,"http://www.box.com/s/390db7p8u1yfkp6mqasx"],
[57,"Sexy Zebras y Sonia Pérez · 30 nov 2011",null,"http://www.box.com/s/txze0dblpznztt1dy6gj"],
[56,"Lidia Guevara y Lydia Autric · 24 nov 2011",null,"http://www.box.com/s/sstj8m6eg8ebj0uoe01l"],
[55,"Alianza Educativa · 16 nov 2011",null,"http://www.box.net/s/xlxecrkai013abf4c8st"],
[54,"David Guillén · 9 nov 2011",null,"http://www.box.net/shared/mqj0eyulnvfnf7hxe58i"],
[53,"Plaza Sur y Fran Fernández · 2 nov 2011",null,"http://www.box.net/shared/hgfsm30hf89oykytkza1"],
[52,"José Ruiz · 26 oct 2011",null,"http://www.box.net/shared/gna0fzyqrv87mixfdhk8"],
[51,"Programa del 19 de octubre de 2011",null,"http://www.box.net/shared/b1y2lni7lptmrz0edbl9"],
[50,"Mireia Montávez y Rubén Tajuelo · 5 oct 2011",null,"http://www.box.net/shared/t1b0ndnj1ubgkkbb5cqt"],
[49,"María Villalón · 28 sep 2011",null,"http://www.box.net/shared/orxm8day8qrrfu47te76"],
[48,"Novana · 21 sep 2011",null,"http://www.box.net/shared/yfpfnf058d70x5vsmsrh"],
[47,"Ismael Beiro · 14 sep 2011",null,"http://www.box.net/shared/hdqfnrcaqg9gpzmnvyvh"],
[46,"Programa del 7 de septiembre de 2011",null,"http://www.box.net/shared/93xr5zukpxoxhp8lyxeg"],
[45,"Marta Simón y María Villalón · 27 jul 2011",null,"http://www.box.net/shared/86g8rtmcemqy8q5qyabs"],
[44,"Angélica · 20 jul 2011",null,"http://www.box.net/shared/49aptjafyjsyah8acr7e"],
[43,"Programa del 13 de julio de 2011",null,"http://www.box.net/shared/v6gkfmomb1axq44o2u5a"],
[42,"Knarias · 6 jul 2011",null,"http://www.box.net/shared/zjcre6gvgvg7sqaeon15"],
[41,"Programa del 22 de junio de 2011",null,"http://www.box.net/shared/m5d5bk16dvxof22enhtu"],
[40,"Programa del 15 de junio de 2011",null,"http://www.box.net/shared/alvaus276v5us2lm9nfu"],
[39,"María Aguado · 8 jun 2011",null,"http://www.box.net/shared/7xn63igvsb"],
[38,"Fundación Blas Méndez Ponce, María Villalón, Auryn y Rubén Tajuelo · 1 jun 2011",null,"http://www.box.net/shared/iaf628zssg"],
[37,"Programa del 25 de mayo de 2011",null,"http://www.box.net/shared/jievyxr1q8"],
[36,"Jon Allende · 18 may 2011",null,"http://www.box.net/shared/c5c0fddgjk"],
[35,"Roxio (Operación Triunfo 2011) · 11 may 2011",null,"http://www.box.net/shared/ucte40gxcp"],
[34,"La Vieja Morla y Los Cucas · 4 may 2011",null,"http://www.box.net/shared/k48103xygl"],
[33,"Programa del 27 de abril de 2011",null,"http://www.box.net/shared/dchvrtuzv7"],
[32,"Santi Simón · 20 abr 2011",null,"http://www.box.net/shared/tolslgyq1x"],
[31,"Lucas y los Mayordomos de San Antonio · 13 abr 2011",null,"http://www.box.net/shared/208pmpgta4"],
[30,"Se Alkila · 6 abr 2011",null,"http://www.box.net/shared/i9j73do9jb"],
[29,"Lucía Pérez, Eurovisión 2011 · 30 mar 2011",null,"http://www.box.net/shared/g9gldcor46"],
[28,"Verónica Ramos · 23 mar 2011",null,"http://www.box.net/shared/qf4k8yv9ie"],
[27,"Programa del 16 de marzo de 2011",null,"http://www.box.net/shared/d0o4btqjsz"],
[26,"Programa del 9 de marzo de 2011",null,"http://www.box.net/shared/np7rdg5su0"],
[25,"Programa del 2 de marzo de 2011",null,"http://www.box.net/shared/hzpl2fmjl5"],
[24,"Siloé de Izán · 23 feb 2011",null,"http://www.box.net/shared/8kmcs2gm6m"],
[23,"O'Madamme · 16 feb 2011",null,"http://www.box.net/shared/z4rf3yj59s"],
[22,"Programa del 9 de febrero de 2011",null,"http://www.box.net/shared/csg6vev4cf"],
[21,"K-Narias · 2 feb 2011",null,"http://www.box.net/shared/z9ri2eqeq7"],
[20,"Programa del 27 de enero de 2011",null,"http://www.box.net/shared/ks8pys7bl5"],
[19,"Programa del 19 de enero de 2011",null,"http://www.box.net/shared/gq8c4qog0q"],
[18,"Programa del 12 de enero de 2011",null,"http://www.box.net/shared/3ec4s1xvfq"],
[17,"Nonno · 5 ene 2011",null,"http://www.box.net/shared/aqpgsqnidf"],
[16,"Alfre y el Camarote · 29 dic 2010",null,"http://www.box.net/shared/gj3z3qsqjf"],
[15,"Programa del 22 de diciembre de 2010",null,"http://www.box.net/shared/hp1gr5632k"],
[14,"K-Narias y María Villalón · 15 dic 2010",null,"http://www.box.net/shared/j42pmuh9hr"],
[13,"Programa del 8 de diciembre de 2010",null,"http://www.box.net/shared/37jbntio8g"],
[12,"Nonno · 1 dic 2010",null,"http://www.box.net/shared/4uh2oebfdx"],
[11,"Natalia · 24 nov 2010",null,"http://www.box.net/shared/xn0a8mbfqu"],
[10,"Programa del 17 de noviembre de 2010",null,"http://www.box.net/shared/6cni2fsl6i"],
[9,"María Villalón · 10 nov 2010",null,"http://www.box.net/shared/sjq2rx54ip"],
[8,"Programa del 3 de noviembre de 2010",null,"http://www.box.net/shared/i5y8c38zpy"],
[7,"Programa del 27 de octubre de 2010",null,"http://www.box.net/shared/ozfvdu3evx"],
[6,"Programa del 20 de octubre de 2010",null,"http://www.box.net/shared/xb05u1y9to"],
[5,"Programa del 13 de octubre de 2010",null,"http://www.box.net/shared/o8bxo5apst"],
[4,"Programa del 6 de octubre de 2010",null,"http://www.box.net/shared/splsj3j3cq"],
[3,"No se emitió: huelga general contra la reforma laboral · 29 sep 2010"],
[2,"Programa del 22 de septiembre de 2010",null,"http://www.box.net/shared/5xjfz4a5u1"],
[1,"Primer programa · 15 de septiembre de 2010",null,"http://www.box.net/shared/cipfqj07i5"]
];

var FOTO_BAREI="/img/barei.jpg";
var FOTO_CHENOA="/img/chenoa.jpg";
var FOTO_MERCHE="/img/merche.jpg";
var FOTO_NATALIA="/img/natalia.jpg";
var FOTO_VILLALON="/img/villalon.jpg";

var COLAB=[
  ["Barei","http://www.bareimusic.com/","Música",FOTO_BAREI],
  ["María Villalón","https://mariavillalon.org/","Música",FOTO_VILLALON],
  ["Natalia","http://nataliaoficial.com/","Música",FOTO_NATALIA],
  ["Merche","https://www.youtube.com/user/MercheCanalOficial","Música",FOTO_MERCHE],
  ["Chenoa","http://chenoa.net/","Música",FOTO_CHENOA]
];

function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}

function dias(){var h=new Date();h.setHours(0,0,0,0);return Math.round((new Date(2026,9,3)-h)/86400000);}
function saludo(){
  var d=dias();
  if(d>1) return "Quedan <b>"+d+" días</b> para el estreno de la nueva temporada";
  if(d===1) return "<b>Mañana</b> arranca la nueva temporada";
  if(d===0) return "<b>¡Hoy!</b> arranca la nueva temporada";
  return "Nueva temporada <b>en antena</b>";
}

var vistas={};

vistas.inicio=function(){
  var anuncioEspecialHTML='';
  var ahora=new Date();
  var fechaEntrevista=new Date(2026,9,10,20,30,0);
  {
    var fechaPublicacionLorca=new Date("2026-10-17T20:30:00");
    var lorcaYaEmitido=ahora>=fechaPublicacionLorca;
    var hoyL=new Date();hoyL.setHours(0,0,0,0);
    var diasL=Math.round((new Date(2026,9,17)-hoyL)/86400000);
    var textoL=diasL>1?"QUEDAN "+diasL+" DÍAS":(diasL===1?"QUEDA 1 DÍA":"¡HOY ES EL DÍA!");
    anuncioEspecialHTML=
    '<div class="anuncio-especial anuncio-rock" style="background:var(--papel);border:3px solid var(--tinta);border-radius:22px;padding:22px;margin-top:18px;box-shadow:var(--dura);display:grid;grid-template-columns:130px minmax(0,1fr);gap:18px;align-items:center">'+
      '<img src="/img/anuncio-1.jpg" alt="Cartel del programa de Inconformistas FM sobre bandas de rock" style="width:100%;max-width:130px;height:auto;object-fit:contain;border-radius:16px;border:3px solid var(--tinta)"/><div>'+
      '<div style="margin:0 0 10px"><span style="display:inline-block;color:#fff;font-weight:700;font-size:13px;padding:4px 12px;border-radius:20px;margin:0 8px 8px 0;background:var(--turquesa)">PRÓXIMO PROGRAMA</span><span id="contador-dias-rock" style="display:inline-block;color:#fff;font-weight:700;font-size:13px;padding:4px 12px;border-radius:20px;margin:0 8px 8px 0;background:var(--frambuesa)"></span></div>'+
      '<h3 style="margin:0 0 8px">Bandas de rock que cambiaron su formación</h3>'+
      '<p style="margin:0 0 8px;color:var(--suave);line-height:1.45">En el próximo programa de <b>Inconformistas FM</b> hablaremos de bandas de rock que han cambiado su composición durante su carrera, como Nightwish, Metallica, AC/DC, Black Sabbath, Pink Floyd y Mägo de Oz.</p>'+
      '<p style="margin:0;color:var(--suave);line-height:1.45">Además, os daremos un avance del programa especial de la Noche de las Ánimas.</p>'+
      '<p style="margin:10px 0 0;font-weight:700">Sábado 24 de octubre a las 19:30 · Radio Villalba 107.4 FM y en nuestra web.</p>'+
      '</div></div>'+
    '<section aria-labelledby="titulo-ultimos-programas" style="margin:34px 0 0;padding:0 0 0 14px;border-left:5px solid var(--frambuesa);">'+
      '<h2 id="titulo-ultimos-programas" style="margin:0;color:var(--tinta);font-size:clamp(22px,3vw,30px);line-height:1.2;font-weight:800;letter-spacing:-.4px;">Últimos programas y entrevistas</h2>'+
      '<p style="margin:7px 0 0;color:var(--suave);font-size:15px;line-height:1.5;">Vuelve a escuchar nuestros especiales, entrevistas y protagonistas.</p>'+
    '</section>'+
    '<div class="fila-noticias-portada" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px;margin-top:20px;align-items:stretch">'+
      '<article class="anuncio-especial" style="background:var(--papel);border:1px solid var(--borde, var(--tinta));border-radius:18px;padding:20px;box-shadow:0 6px 20px rgba(0,0,0,.07);min-width:0;display:flex;flex-direction:column">'+
        '<img src="/img/anuncio-2.jpg" alt="La Década Prodigiosa" style="display:block;width:100%;height:160px;object-fit:contain;object-position:center;border-radius:12px;border:1px solid var(--tinta);background:var(--fondo);margin-bottom:14px">'+
        '<span style="display:inline-block;align-self:flex-start;color:#fff;font-weight:700;font-size:10px;padding:3px 8px;border-radius:20px;margin:0 0 8px;background:var(--turquesa)">ENTREVISTA</span>'+
        '<h3 style="font-size:18px;line-height:1.35;margin:0 0 12px">La Década Prodigiosa</h3>'+
        '<p style="margin:0 0 14px;color:var(--suave);font-size:14px;line-height:1.65">Entrevistamos a Javier Enzo, director y una de las voces de la formación, que lleva 41 años en activo. Repasamos su trayectoria y sus recomendaciones musicales.</p>'+
        '<div style="margin-top:auto;padding-top:16px"><a href="https://go.ivoox.com/rf/181945402" onclick="return abrirIvoox(this.href)" style="display:inline-block;color:#fff;font-weight:700;font-size:11px;padding:8px 12px;border-radius:20px;background:var(--turquesa);text-decoration:none">Escuchar</a></div>'+
      '</article>'+
      '<article class="anuncio-especial" style="background:var(--papel);border:1px solid var(--borde, var(--tinta));border-radius:18px;padding:20px;box-shadow:0 6px 20px rgba(0,0,0,.07);min-width:0;display:flex;flex-direction:column">'+
        '<img src="https://inconformistasfm.es/fotos-programas/276/portada.jpg" alt="Entrevista a Esther Williams" style="display:block;width:100%;height:160px;object-fit:contain;object-position:center;border-radius:12px;border:1px solid var(--tinta);background:var(--fondo);margin-bottom:14px" loading="lazy">'+
        '<span style="display:inline-block;align-self:flex-start;color:#fff;font-weight:700;font-size:10px;padding:3px 8px;border-radius:20px;margin:0 0 8px;background:var(--turquesa)">ENTREVISTA</span>'+
        '<h3 style="font-size:18px;line-height:1.35;margin:0 0 12px">Esther Williams</h3>'+
        '<p style="margin:0 0 14px;color:var(--suave);font-size:14px;line-height:1.65">Recuperamos la entrevista a Esther Williams, publicada en Inconformistas FM, para volver a disfrutar de la conversación y sus historias.</p>'+
        '<div style="margin-top:auto;padding-top:16px"><a href="https://go.ivoox.com/rf/181576456" onclick="return abrirIvoox(this.href)" style="display:inline-block;color:#fff;font-weight:700;font-size:11px;padding:8px 12px;border-radius:20px;background:var(--turquesa);text-decoration:none">Escuchar</a></div>'+
      '</article>'+
    '</div>' + '<style>.fila-noticias-portada article{gap:0}.fila-noticias-portada article h3{overflow-wrap:anywhere}.fila-noticias-portada article p{max-width:42ch}@media(max-width:760px){.fila-noticias-portada{grid-template-columns:1fr!important;gap:20px!important;margin-top:24px!important}.fila-noticias-portada article{padding:18px!important}}@media(min-width:761px) and (max-width:1000px){.fila-noticias-portada{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:22px!important}.fila-noticias-portada article:first-child{grid-column:1/-1}}.fila-noticias-portada article{display:grid!important;grid-template-columns:minmax(88px,32%) minmax(0,1fr)!important;grid-template-rows:auto auto auto 1fr auto;column-gap:14px!important;align-content:start}.fila-noticias-portada article>img{grid-column:1!important;grid-row:1 / span 5!important;width:100%!important;height:auto!important;max-height:190px!important;object-fit:contain!important;object-position:center!important;margin:0!important;align-self:start}.fila-noticias-portada article>:not(img){grid-column:2!important;min-width:0}.fila-noticias-portada article>span{align-self:start}.fila-noticias-portada article h3{font-size:17px!important;margin-bottom:8px!important}.fila-noticias-portada article p{font-size:13px!important;line-height:1.5!important;margin-bottom:10px!important}.fila-noticias-portada article>div{margin-top:8px!important;padding-top:4px!important;align-self:end}@media(max-width:400px){.fila-noticias-portada article{grid-template-columns:minmax(78px,30%) minmax(0,1fr)!important;column-gap:10px!important;padding:14px!important}.fila-noticias-portada article h3{font-size:16px!important}} @media(max-width:760px){.anuncio-rock{grid-template-columns:100px minmax(0,1fr)!important;gap:14px!important;padding:16px!important;align-items:start!important}.anuncio-rock>img{grid-column:1!important;grid-row:1!important;width:100%!important;max-width:100px!important;height:auto!important;max-height:none!important;object-fit:contain!important;margin:0!important}.anuncio-rock>div{grid-column:2!important;min-width:0!important}} </style>' + '<div class="acciones" style="margin-top:22px"><a class="btn blanco" href="/programas/">🎧 Todos los programas</a></div>';
  }
  return '<section class="seccion hero"><div class="wrap">'+
    '<span class="hola">'+saludo()+'</span>'+
    '<div class="hero-top"><div class="hero-copy">'+
    '<p class="marca-nombre">Inconformistas FM</p>'+
    '<h1>Las mejores entrevistas, sábado a sábado.'+
      '<span class="sub">Música, cultura, entrevistas y actualidad con humor y sin censura. Sábados a las 19:30 en Radio Villalba, 107.4 FM. Desde 2010.</span></h1>'+
    '</div>'+

    '<div class="radio">'+
      '<div class="radiotop"><span class="luz" id="luz"></span><b>Sintoniza el dial</b><span>mueve la ruedecita hasta el 107.4</span></div>'+
      '<div class="radiobody">'+
        '<div class="pantalla"><span class="freq" id="freq">88.0<small>FM</small></span></div>'+
        '<p class="estado" id="estado">Solo se oye ruido… sigue girando.</p>'+ 
        '<div class="pista">'+
          '<div class="rayas"></div><div class="marca74"></div><div class="aguja" id="aguja" style="left:0%"></div>'+ 
          '<input class="dial" id="dial" type="range" min="880" max="1080" step="1" value="880" aria-label="Dial de 88.0 a 108.0 FM">'+
        '</div>'+ 
        '<p class="pistanota">Arrástralo con el ratón, con el dedo o con las flechas del teclado.</p>'+ 
        '<div class="acciones"><a class="btn rosa" id="btnDirecto" href="#" onclick="return iniciarRadio();">Escuchar en directo</a>'+ 
        '<a class="btn blanco" href="/programas/">Ver los programas</a></div>'+ 
      '</div>'+ 
    '</div>'+
    '</div>'+
    anuncioEspecialHTML+
    '<div class="cifras">'+
      '<div><b>'+P.length+'</b><small>programas emitidos</small></div>'+
      '<a class="cifra-enlace" href="#" onclick="return iniciarRadio();"><b>107.4 FM</b><small>sábados a las 19:30 · Escuchar en directo</small></a>'+
      '<div><b>2010</b><small>en antena desde 2010</small></div>'+
    '</div>'+

    '<h2 style="margin-top:38px">Lo último en el blog</h2>'+
    '<ul class="progs" id="feed"><li class="vacio">Cargando las últimas entradas…</li></ul>'+
    '<div class="acciones"><a class="btn blanco" href="'+BLOG+'" target="_blank" rel="noopener">Ir al blog</a></div>'+
  '</div></section>';
};

vistas.noticias=function(){return '<section class="seccion"><div class="wrap"><h2>Noticias de Collado Villalba</h2><p class="intro">Noticias recientes de Collado Villalba recogidas de publicaciones que aparecen en Google News.</p><p class="noticias-actualizacion" id="noticiasActualizacion">Actualizando…</p><ul class="noticias-lista" id="noticiasLista"><li class="noticias-cargando">Buscando las últimas noticias de Villalba…</li></ul><div class="nota" style="margin-top:18px"><p>La sección se actualiza automáticamente cada 10 minutos. Las noticias son recopiladas de otros medios y publicaciones externas. Inconformistas FM no redacta ni controla esos contenidos y no se hace responsable de su exactitud, opiniones, errores u omisiones. Al pulsar una noticia se abre el medio que la publicó.</p></div></div></section>';};

vistas.programas=function(){
  return '<section class="seccion"><div class="wrap">'+
    '<h2>Programas</h2>'+
    '<p class="intro">Todas las entrevistas emitidas desde que empezó el programa. Busca por artista, grupo, asociación o fecha y escúchalo en iVoox.</p>'+
    '<div class="buscador"><input id="q" type="search" placeholder="🔍  Barei, Chenoa, Eurovisión, 2015…" autocomplete="off"></div>'+
    '<p class="contador" id="contador"></p>'+
    '<ul class="progs" id="lista"></ul>'+
    '<div class="nota"><p>Los programas que aún no tienen audio subido llevan al canal del programa en <a href="'+IVOOX+'" target="_blank" rel="noopener">iVoox</a>. Los más antiguos conservan su enlace original de archivo.</p></div>'+
  '</div></section>';
};

vistas.fotosprograma=function(){
  var qs=location.search.slice(1);
  var params=new URLSearchParams(qs);
  var numero=params.get('programa')||'';
  var programa=P.find(function(x){return String(x[0])===String(numero);});
  var nombre=programa?programa[1]:('Programa '+numero);
  return '<section class="seccion"><div class="wrap">'+
    '<a class="btn blanco" href="/programas/">← Volver a programas</a>'+
    '<h2 style="margin-top:22px">📷 Fotos · '+esc(nombre)+'</h2>'+
    '<p class="intro" id="estadoFotos">Cargando las fotos del programa…</p>'+
    '<div id="galeriaPrograma" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,240px));gap:14px;margin-top:20px"></div>'+
  '</div></section>';
};

vistas.equipo=function(){
  var antiguos=[
    ["Flavia Bertolini","Estudiante de periodismo. Llegó desde Sorda FM en el verano de 2012 y puso la cordura del equipo."],
    ["Adrián Pérez","Fotógrafo desde los nueve años y titulado en realización audiovisual. La mirada del programa."],
    ["Beatriz Garrandés","Periodista (TVE, La Razón, Proyecto Khalo, Diagonal). Trajo rock, música de los Balcanes y planes culturales."],
    ["Natalia Tapia","Uno de los pilares del programa, siempre buscando entrevistas nuevas. Lo dejó a mediados de 2013."],
    ["Sergio Hernández","Responsable de todo lo responsable y, sobre todo, de mantener a raya al equipo."],
    ["David León","Responsable de televisión: el gourmet de la tele."],
    ["Verónica Ramos","Seis meses de alegría malagueña en el estudio."],
    ["Rebecca Newey","Es una artista multidisciplinar con más de tres décadas de trayectoria en el mundo de la interpretación, habiendo trabajado en teatro, cine y televisión."]
  ].map(function(a){return '<div><b>'+esc(a[0])+'</b><p>'+esc(a[1])+'</p></div>';}).join("");

  return '<section class="seccion"><div class="wrap">'+
    '<h2>Equipo</h2>'+
    '<p class="intro">Las personas que hacen esto posible, semana tras semana.</p>'+
    '<div class="ficha juanma-ficha"><img class="juanma-foto" src="foto2.jpg" alt="Juanma Hontoria, director y locutor de Inconformistas FM"><div class="juanma-datos"><h3>Juanma Hontoria</h3><div><span class="rol">Director y locutor</span></div>'+
      '<p>Juan Manuel Hontoria nació en Madrid el 27 de abril de 1982 y, como buena parte de la generación de Naranjito, vivió de cerca los cambios de la sociedad española. Estudió EGB en el colegio público Miguel Delibes y después en el IES María Guerrero, en Collado Villalba.</p>'+
      '<p>Su vida ha transcurrido entre música y castings de programas como Operación Triunfo o Gente de Primera; hoy es funcionario del Ayuntamiento de Collado Villalba. Llegó a la radio por casualidad y, después de tantos programas, ya no sabría vivir sin ella.</p></div></div>'+
    '<div class="ficha juanma-ficha"><img class="juanma-foto" src="aurora.jpg" alt="Aurora Sánchez, locutora de Inconformistas FM"><div class="juanma-datos"><h3>Aurora Sánchez</h3><div><span class="rol uva">Locutora</span></div>'+
      '<p>Historiadora, ayuda imprescindible en el programa, nos trae semana tras semana una sección de actualidad, con recomendaciones culturales.</p></div></div>'+
    '<div class="ficha"><h3>Han pasado por aquí</h3><div class="antiguos">'+antiguos+'</div>'+
      '<p style="margin-top:22px">Gracias a todos los artistas que han participado y participarán en este proyecto.</p></div>'+
  '</div></section>';
};

vistas.madrinas=function(){
  var v=[["Natalia",384],["María Villalón",228],["Verónica Romero",41],["Merche",18],["Angy",8],["Ainhoa",5],["Georgina",5],["Vega",2],["Otros",10]];
  var filas=v.map(function(x){
    return '<div class="voto"><span>'+esc(x[0])+'</span><b>'+x[1]+'</b><span class="barra"><i style="width:'+Math.round(x[1]/384*100)+'%"></i></span></div>';
  }).join("");
  return '<section class="seccion"><div class="wrap">'+
    '<h2>Madrinas</h2>'+
    '<p class="intro">Las eligió la audiencia. Y como somos inconformistas, no nos conformamos con una.</p>'+
    '<div class="ficha"><h3>Natalia</h3><div><span class="rol">Madrina del programa</span></div>'+
      '<p>Ganó la votación popular con 384 votos de los 701 que echasteis.</p></div>'+
    '<div class="ficha"><h3>María Villalón</h3><div><span class="rol uva">Madrina de honor</span></div>'+
      '<p>Fue nuestra primera entrevista, allá por junio de 2010, y volvió al programa el 10 de noviembre. Por eso, y por lo bien que se lo pasó, la nombramos madrina de honor.</p></div>'+
    '<div class="ficha"><h3>Así quedó la votación</h3>'+filas+
      '<p style="margin-top:16px;color:var(--suave)">Votaron 701 personas.</p></div>'+
  '</div></section>';
};

vistas.galeria=function(){
  return '<section class="seccion"><div class="wrap">'+
    '<h2>Galería</h2>'+
    '<p class="intro">Fotos del estudio, de los conciertos y de los actos de Inconformistas FM.</p>'+
    '<div class="galeria-carrusel">'+
      '<div class="galeria-ventana" id="galeriaVentana"><div class="galeria-placeholder"><strong>Tu galería</strong><span>Sube las fotos a la carpeta <b>galeria</b> y aparecerán aquí.</span></div></div>'+
      '<div class="galeria-controles"><button type="button" id="galPrev" aria-label="Foto anterior">‹</button><span id="galContador">0 / 0</span><button type="button" id="galNext" aria-label="Foto siguiente">›</button></div>'+
    '</div>'+
    '<div class="galeria-miniaturas" id="galMiniaturas"></div>'+
    '<div class="enlaces">'+
      '<a href="https://inconformistasfm.blogspot.com/p/galeria.html" target="_blank" rel="noopener">Galería del blog<small>Todas las fotos publicadas allí</small></a>'+
      '<a href="https://www.youtube.com/user/Inconformistasfm" target="_blank" rel="noopener">Canal de YouTube<small>Entrevistas en vídeo</small></a>'+
      '<a href="https://www.facebook.com/profile.php?id=100001375665552" target="_blank" rel="noopener">Facebook<small>El día a día del programa</small></a>'+
    '</div>'+
    '<div class="nota"><p>¿Tienes fotos de algún programa o concierto? Mándanoslas y las publicamos: <a href="mailto:inconformistas.radiovillalba@gmail.com">inconformistas.radiovillalba@gmail.com</a></p></div>'+
  '</div></section>';
};

vistas.colaboradores=function(){
  var l=COLAB.map(function(c){
    var foto=c[3]?' class="colab" style="background-image:url(\''+c[3]+'\')"':'';
    return '<a'+foto+' href="'+esc(c[1])+'" target="_blank" rel="noopener"><span class="colab-txt">'+esc(c[0])+'<small>'+esc(c[2])+'</small></span></a>';
  }).join("");
  return '<section class="seccion"><div class="wrap">'+
    '<h2>Artistas</h2>'+
    '<p class="intro">Artistas, comercios y medios que acompañan al programa. Con ellos salen también los sorteos para los oyentes.</p>'+
    '<div class="enlaces">'+l+'</div>'+
    '<div class="nota"><p>Las bases y los sorteos en marcha se publican en el blog: <a href="https://inconformistasfm.blogspot.com/p/colaboradores-y-sorteos.html" target="_blank" rel="noopener">colaboradores y sorteos</a>. ¿Quieres colaborar? Escríbenos.</p></div>'+
  '</div></section>';
};

vistas.radio=function(){
  return '<section class="seccion"><div class="wrap">'+
    '<h2>Radio online</h2>'+
    '<p class="intro">Inconformistas FM suena los sábados a las 19:30 en Radio Villalba, 107.4 FM. Si te pilla lejos, escúchalo por internet.</p>'+
    '<div class="acciones" style="margin-top:0">'+
      '<a class="btn rosa" href="directo-inconformistas.html" target="_blank" rel="noopener" onclick="event.stopPropagation();">¡Vamos al directo!!!</a>'+
      '<a class="btn blanco" href="'+IVOOX+'" target="_blank" rel="noopener">Escuchar en iVoox</a>'+
      '<a class="btn blanco" href="'+SPOTIFY+'" target="_blank" rel="noopener">Escuchar en Spotify</a>'+
    '</div>'+
    '<div class="nota"><p>¡Vamos al directo!!! abre una página nueva con el reproductor, mapa de conexiones y contador de audiencia.</p></div>'+
    '<p style="margin-top:28px">¿Te has perdido un programa? Está en el <a href="/programas/">archivo</a>.</p>'+
  '</div></section>';
};

vistas.contacto=function(){
  var mapa="https://www.google.com/maps?q=40.6429147,-3.9884136&z=16&hl=es&output=embed";
  return '<section class="seccion"><div class="wrap">'+
    '<h2>Contacto</h2>'+
    '<p class="intro">¿Quieres venir al programa, proponernos una entrevista o simplemente saludar? Escríbenos y hablamos.</p>'+
    '<div class="contacto-email">'+
      '<div><strong>Correo de Inconformistas FM</strong><span>Estamos al otro lado del correo.</span></div>'+
      '<a href="mailto:inconformistas.radiovillalba@gmail.com">inconformistas.radiovillalba@gmail.com</a>'+
    '</div>'+
    '<div class="ficha"><h3>Dónde nos encontrarás</h3>'+
      '<p class="dir">Centro Cultural Peñalba · Calle Doctor José María Poveda, Collado Villalba (Madrid)</p>'+
      '<div class="mapa mapa-pequeno">'+
        '<div class="fallback"><span>Centro Cultural Peñalba, Collado Villalba</span><span>Si el mapa no carga, ábrelo en Google Maps.</span></div>'+
        '<iframe title="Mapa del Centro Cultural Peñalba, Collado Villalba" src="'+mapa+'" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>'+
      '</div>'+
      '<div class="acciones" style="margin-top:6px">'+
        '<a class="btn" href="https://www.google.com/maps/search/?api=1&query=40.6429147,-3.9884136" target="_blank" rel="noopener">Cómo llegar</a>'+
      '</div></div>'+
    '<div class="ficha"><h3>Escríbenos</h3>'+
      '<p>Rellena el formulario y pulsa enviar. El mensaje llegará directamente a nuestro correo.</p>'+
      '<div class="form">'+
        '<label for="fnombre">Tu nombre</label><input id="fnombre" name="name" type="text" placeholder="Nombre y apellidos">\n        <label for="femail">Tu correo electrónico <span aria-hidden="true">*</span></label><input id="femail" name="email" type="email" placeholder="tu@correo.com" autocomplete="email" required>\n'+
        '<label for="fasunto">Asunto</label><input id="fasunto" name="title" type="text" placeholder="Propuesta de entrevista, saludo, dudas…">'+
        '<label for="fmensaje">Mensaje</label><textarea id="fmensaje" name="message" rows="5" placeholder="Cuéntanos"></textarea>'+
        '<div class="acciones"><button class="btn rosa" id="fenviar" type="button">Enviar el mensaje</button></div>'+
        '<p class="pistanota" id="faviso">También puedes escribirnos directamente a <a href="mailto:inconformistas.radiovillalba@gmail.com">inconformistas.radiovillalba@gmail.com</a></p>'+
      '</div></div>'+
    '<div class="ficha"><h3>Síguenos</h3>'+
      '<div class="enlaces">'+
        '<a href="http://twitter.com/Inconformistas_" target="_blank" rel="noopener">X / Twitter<small>@Inconformistas_</small></a>'+
        '<a href="https://www.facebook.com/profile.php?id=100001375665552" target="_blank" rel="noopener">Facebook<small>Inconformistas FM</small></a>'+
        '<a href="https://www.youtube.com/user/Inconformistasfm" target="_blank" rel="noopener">YouTube<small>Entrevistas en vídeo</small></a>'+
        '<a href="'+BLOG+'" target="_blank" rel="noopener">Blog antiguo<small>Todo el histórico en Blogger</small></a>'+
      '</div></div>'+
  '</div></section>';
};

var BLOG_ENTRADAS_PROGRAMAS=[];

function normalizarTexto(s){
  return (s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g," ").trim();
}
function enlaceBlogPrograma(nombre){
  var base=(nombre||"").split("·")[0].trim(), nb=normalizarTexto(base);
  if(!nb) return BLOG+"search?q="+encodeURIComponent(nombre||"");
  var mejor=null, mejorPunt=0;
  BLOG_ENTRADAS_PROGRAMAS.forEach(function(e){
    var titulo=(e.title&&e.title.$t)||"", nt=normalizarTexto(titulo);
    if(!nt) return;
    var punt=0;
    if(nt===nb) punt=100;
    else if(nt.indexOf(nb)>-1) punt=90;
    else if(nb.indexOf(nt)>-1) punt=80;
    else {
      var palabras=nb.split(" ").filter(function(w){return w.length>2;});
      var ac=palabras.filter(function(w){return nt.indexOf(w)>-1;}).length;
      punt=palabras.length ? ac/palabras.length*70 : 0;
    }
    if(punt>mejorPunt){
      var href=BLOG;
      (e.link||[]).forEach(function(l){if(l.rel==="alternate") href=l.href;});
      mejor={href:href,punt:punt};mejorPunt=punt;
    }
  });
  return (mejor && mejor.punt>=55) ? mejor.href : BLOG+"search?q="+encodeURIComponent(base);
}
function cargarEnlacesBlogProgramas(){
  var url=BLOG+"feeds/posts/default?alt=json&max-results=500";
  try{
    fetch(url).then(function(r){return r.json();}).then(function(d){
      BLOG_ENTRADAS_PROGRAMAS=(d.feed&&d.feed.entry)||[];
      pintarProgramas(document.getElementById("q") ? document.getElementById("q").value : "");
    }).catch(function(){});
  }catch(e){}
}

/* ---------- fotos automáticas (fotos.json lo genera GitHub Actions) ---------- */
var FOTOS_MANIFIESTO=null;
function cargarManifiesto(){
  if(!FOTOS_MANIFIESTO){
    FOTOS_MANIFIESTO=fetch("fotos.json",{cache:"no-cache"}).then(function(r){
      if(!r.ok) throw new Error("sin fotos.json");
      return r.json();
    }).catch(function(){return null;});
  }
  return FOTOS_MANIFIESTO;
}
function esAbs(p){return /^(https?:)?\/\//.test(p);}
function rutaFoto(p){return esAbs(p)?p:String(p).split("/").map(encodeURIComponent).join("/");}
function fotoMin(p){return (esAbs(p)||/\.gif$/i.test(p))?rutaFoto(p):"optimizadas/min/"+rutaFoto(p)+".webp";}
function fotoMed(p){return (esAbs(p)||/\.gif$/i.test(p))?rutaFoto(p):"optimizadas/med/"+rutaFoto(p)+".webp";}
/* si la versión ligera aún no existe, se usa la original */
function conRespaldo(img,original){img.addEventListener("error",function(){if(img.dataset.r)return;img.dataset.r="1";img.src=rutaFoto(original);});}

/* ---------- archivo ---------- */
function montarFotosPrograma(){
  var qs=location.search.slice(1);
  var params=new URLSearchParams(qs);
  var numero=params.get('programa')||'';
  var estado=document.getElementById('estadoFotos'), gal=document.getElementById('galeriaPrograma');
  if(!estado||!gal||!numero)return;
  estado.textContent='Cargando las fotos del programa…';
  cargarManifiesto().then(function(m){
    var fotos=(m&&m.programas&&m.programas[String(numero)])||[];
    if(!fotos.length){estado.textContent='Todavía no hay fotos publicadas para este programa.';gal.innerHTML='';return;}
    estado.textContent=fotos.length+(fotos.length===1?' foto publicada.':' fotos publicadas.');
    gal.innerHTML=fotos.map(function(f,i){
      return '<a href="'+esc(rutaFoto(f))+'" target="_blank" rel="noopener" style="display:block"><img data-i="'+i+'" src="'+esc(fotoMin(f))+'" alt="Foto '+(i+1)+' del programa '+esc(numero)+'" loading="lazy" decoding="async" style="width:100%;height:220px;object-fit:cover;border-radius:16px;border:3px solid var(--tinta);box-shadow:var(--dura);display:block;background:#eee"></a>';
    }).join('');
    gal.querySelectorAll('img').forEach(function(img){conRespaldo(img,fotos[Number(img.dataset.i)]);});
  });
}


function abrirIvoox(url){
  if(!url) return false;
  var id=(url.match(/player_ej_(\d+)/i)||url.match(/(?:rf_|rf\/)(\d+)/i)||[])[1];
  if(!id){ window.open(url,"_blank","noopener"); return false; }
  var modal=document.getElementById("ivooxModal"),player=document.getElementById("ivooxPlayer");
  if(!modal||!player){ window.open(url,"_blank","noopener"); return false; }
  player.src=/player_ej_/i.test(url)?url:"https://www.ivoox.com/player_ej_"+id+"_6_1.html";
  modal.classList.add("abierto");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
  return false;
}
function cerrarIvoox(ev){
  if(ev && ev.target!==ev.currentTarget) return;
  var modal=document.getElementById("ivooxModal"),player=document.getElementById("ivooxPlayer");
  if(modal) { modal.classList.remove("abierto"); modal.setAttribute("aria-hidden","true"); }
  if(player) player.src="about:blank";
  document.body.style.overflow="";
}
document.addEventListener("keydown",function(e){if(e.key==="Escape"){cerrarIvoox();cerrarSpotify();}});

function abrirSpotify(url){
  if(!url) return false;
  var limpio=url.split(/[?#]/)[0].replace(/\/$/,"");
  var coincidencia=limpio.match(/open\.spotify\.com\/(episode|track|album|playlist|show|artist)\/([A-Za-z0-9]+)/i);
  if(!coincidencia){window.open(url,"_blank","noopener");return false;}
  var modal=document.getElementById("spotifyModal"),player=document.getElementById("spotifyPlayer");
  if(!modal||!player){window.open(url,"_blank","noopener");return false;}
  player.src="https://open.spotify.com/embed/"+coincidencia[1]+"/"+coincidencia[2]+"?utm_source=generator";
  modal.classList.add("abierto");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
  return false;
}
function cerrarSpotify(ev){
  if(ev && ev.target!==ev.currentTarget) return;
  var modal=document.getElementById("spotifyModal"),player=document.getElementById("spotifyPlayer");
  if(modal){modal.classList.remove("abierto");modal.setAttribute("aria-hidden","true");}
  if(player) player.src="about:blank";
  document.body.style.overflow="";
}

var FOTOS_PROGRAMAS=null, FOTOS_PEDIDAS=false;
var PROGS_LOTE=60, PROGS_LIMITE=PROGS_LOTE, PROGS_ULTIMO_FILTRO=null;
var LOGO_PROGS=null;
function logoProgramas(){
  if(LOGO_PROGS===null){
    var im=document.querySelector(".logo img");
    LOGO_PROGS=(im&&im.getAttribute("src"))||"";
    if(LOGO_PROGS) document.documentElement.style.setProperty("--logo-url",'url("'+LOGO_PROGS+'")');
  }
  return !!LOGO_PROGS;
}
function compartirPrograma(btn){
  var titulo=btn.getAttribute("data-t")||"Inconformistas FM", url=btn.getAttribute("data-u")||location.href;
  var texto="Escucha este programa de Inconformistas FM: "+titulo;
  var original=btn.getAttribute("data-label")||btn.textContent;
  btn.setAttribute("data-label",original);
  function aviso(t){btn.textContent=t;clearTimeout(btn._t);btn._t=setTimeout(function(){btn.textContent=original;},2000);}
  if(navigator.share){
    navigator.share({title:"Inconformistas FM",text:texto,url:url}).catch(function(){});
    return false;
  }
  var completo=texto+" "+url;
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(completo).then(function(){aviso("✓ Enlace copiado");}).catch(function(){window.prompt("Copia este enlace:",completo);});
  }else{
    window.prompt("Copia este enlace:",completo);
  }
  return false;
}
function verMasProgramas(){
  PROGS_LIMITE+=PROGS_LOTE;
  var q=document.getElementById("q");
  pintarProgramas(q?q.value:"");
}
function pintarProgramas(f){
  var lista=document.getElementById("lista"),cont=document.getElementById("contador");
  if(!lista) return;
  f=(f||"").trim().toLowerCase();
  if(PROGS_ULTIMO_FILTRO!==f){PROGS_LIMITE=PROGS_LOTE;PROGS_ULTIMO_FILTRO=f;}
  var ahora=new Date();
  var mostrarEsther=ahora >= new Date("2026-10-03T20:30:00");
  var mostrarDecada=ahora >= new Date("2026-10-10T20:30:00");
  var mostrarLorca=ahora >= new Date("2026-10-17T20:30:00");
  var res=P.filter(function(p){
    if(p[0]===276 && !mostrarEsther) return false;
    if(p[0]===277 && !mostrarDecada) return false;
    if(p[0]===278 && !mostrarLorca) return false;
    return !f || (p[1]+" "+p[0]).toLowerCase().indexOf(f)>-1;
  });
  cont.textContent = f ? (res.length===1?"1 programa encontrado":res.length+" programas encontrados") : P.length+" programas en el archivo";
  if(!res.length){lista.innerHTML='<li class="vacio">No hay ningún programa con ese nombre. Prueba con otra palabra.</li>';return;}
  var total=res.length;
  res=res.slice(0,PROGS_LIMITE);
  var hayLogo=logoProgramas();
  lista.innerHTML=res.map(function(p){
    var directo=p[2], viejo=p[3], blogDest=p[4] || enlaceBlogPrograma(p[1]);
    var hrefEsc=directo?esc(directo):IVOOX;
    var accion=directo?' onclick="return abrirIvoox(this.getAttribute(\'href\'));"':' target="_blank" rel="noopener"';
    var chip='<a class="play canal escuchar" href="'+hrefEsc+'"'+accion+'>▶ Escuchar ahora</a>';
    var extra=viejo?' <a class="play canal sec" href="'+esc(viejo)+'" target="_blank" rel="noopener">Archivo</a>':'';
    if(p[5]) extra+=' <a class="play canal sec" href="'+esc(p[5])+'" onclick="return abrirSpotify(this.getAttribute(\'href\'))">▶ Spotify</a>';
    extra+=' <a class="play canal sec" href="/fotosprograma/?programa='+encodeURIComponent(p[0])+'">📷 Fotos</a>';
    var cartel=(p[0]===275 && !f)?'<li class="cartel-temporada" style="justify-content:center;text-align:center;background:var(--sol);box-shadow:var(--dura);padding:16px 18px;font-family:\'Fraunces\',serif;font-weight:900;font-size:22px;letter-spacing:.5px;color:var(--tinta)">🎙️ Nueva temporada</li>':'';
    var fotos=(FOTOS_PROGRAMAS&&FOTOS_PROGRAMAS[String(p[0])])||[];
    var urlCompartir=(function(){
      if(directo){var mi=String(directo).match(/player_ej_(\d+)/i);return mi?"https://go.ivoox.com/rf/"+mi[1]:directo;}
      return p[4]||blogDest||IVOOX;
    })();
    var btnCompartir=' <button type="button" class="play canal sec" data-t="'+esc("Programa "+p[0]+": "+p[1])+'" data-u="'+esc(urlCompartir)+'" onclick="return compartirPrograma(this)">↗ Compartir</button>';
    extra+=btnCompartir;
    var portada=fotos.filter(function(x){return /(^|\/)portada[^\/]*$/i.test(String(x));})[0]||fotos[0];
    var foto=fotos.length?'<img class="pc-foto" data-f="'+esc(portada)+'" src="'+esc(fotoMin(portada))+'" alt="Foto del programa '+esc(p[0])+'" loading="lazy" decoding="async">':(hayLogo?'<div class="pc-sinfoto con-logo" role="img" aria-label="Inconformistas FM"></div>':'<div class="pc-sinfoto" aria-hidden="true">🎙️</div>');
    return cartel+'<li class="pc"><div class="pc-media">'+foto+'<span class="pc-num">Nº '+p[0]+'</span></div><div class="pc-cab"><span class="t"><a class="blog-programa" href="'+esc(blogDest)+'" target="_blank" rel="noopener" title="Abrir entrada en el blog">'+esc(p[1])+'</a></span></div><div class="pc-botones">'+chip+'<div class="pc-sec">'+extra+'</div></div></li>';
  }).join("")+(total>res.length?'<li class="pc-mas"><button type="button" class="btn blanco" onclick="verMasProgramas()">Ver más programas ('+(total-res.length)+' restantes)</button></li>':'');
  if(total>res.length) cont.textContent+=" · mostrando "+res.length;
  lista.querySelectorAll("img.pc-foto").forEach(function(img){conRespaldo(img,img.getAttribute("data-f"));});
  if(FOTOS_PROGRAMAS===null && !FOTOS_PEDIDAS){
    FOTOS_PEDIDAS=true;
    var BASE_WEB="https://inconformistasfm.es/";
    cargarManifiesto().then(function(m){
      if(m&&m.programas&&Object.keys(m.programas).length) return m.programas;
      /* respaldo: si no hay fotos.json junto a este archivo, se pide al sitio publicado */
      return fetch(BASE_WEB+"fotos.json",{cache:"no-cache"}).then(function(r){
        if(!r.ok) throw new Error("sin fotos.json");
        return r.json();
      }).then(function(d){
        var out={},src=(d&&d.programas)||{};
        Object.keys(src).forEach(function(k){
          out[k]=(src[k]||[]).map(function(f){return esAbs(f)?f:BASE_WEB+rutaFoto(f);});
        });
        return out;
      }).catch(function(){return {};});
    }).then(function(programas){
      FOTOS_PROGRAMAS=programas||{};
      var q=document.getElementById("q");
      pintarProgramas(q?q.value:"");
    });
  }
}

// Publica automáticamente el programa 277 el 10/10/2026 a las 20:30 (hora local).
setTimeout(function(){
  var campoBusqueda=document.getElementById("q");
  pintarProgramas(campoBusqueda ? campoBusqueda.value : "");
}, Math.max(0, new Date("2026-10-10T20:30:00").getTime()-Date.now()));
setTimeout(function(){
  var campoBusqueda=document.getElementById("q");
  pintarProgramas(campoBusqueda ? campoBusqueda.value : "");
}, Math.max(0, new Date("2026-10-17T20:30:00").getTime()-Date.now()));

/* ---------- dial ---------- */
function montarFormulario(){
  var b=document.getElementById("fenviar");
  if(!b) return;
  var form=b.closest(".form");
  if(!form) return;
  emailjs.init({publicKey:"lCm5mkNthLNbSYUUw"});
  b.addEventListener("click",function(){
    var n=document.getElementById("fnombre").value.trim(),
        e=document.getElementById("femail").value.trim(),
        m=document.getElementById("fmensaje").value.trim(),
        aviso=document.getElementById("faviso"),
        email=document.getElementById("femail");
    if(!e){aviso.innerHTML="Es obligatorio indicar tu correo electrónico.";email.focus();return;}
    if(!email.checkValidity()){aviso.innerHTML="Introduce una dirección de correo electrónico válida.";email.focus();return;}
    if(!m){aviso.innerHTML="Escribe un mensaje antes de enviarlo.";document.getElementById("fmensaje").focus();return;}
    var asunto=document.getElementById("fasunto").value.trim()||"Mensaje desde la web de Inconformistas FM";
    aviso.textContent="Enviando mensaje…";
    b.disabled=true;
    var params={name:n||"No indicado",email:e,title:asunto,message:m,time:new Date().toLocaleString("es-ES")};
    emailjs.send("service_th709xi","template_ctrkbfo",params,{publicKey:"lCm5mkNthLNbSYUUw"})
      .then(function(){
        aviso.innerHTML="<b>Mensaje enviado correctamente.</b> Gracias por escribirnos.";
        document.getElementById("fnombre").value="";
        document.getElementById("femail").value="";
        document.getElementById("fasunto").value="";
        document.getElementById("fmensaje").value="";
      })
      .catch(function(){
        aviso.innerHTML="No se ha podido enviar el mensaje. Inténtalo de nuevo o escríbenos a <a href=\"mailto:inconformistas.radiovillalba@gmail.com\">inconformistas.radiovillalba@gmail.com</a>.";
      })
      .finally(function(){b.disabled=false;});
  });
}

function cargarFeed(){
  var c=document.getElementById("feed");
  if(!c) return;
  var respaldo='<li class="vacio">Las últimas entradas se publican en el blog. '+
    '<a href="'+BLOG+'" target="_blank" rel="noopener">Ábrelo aquí</a>.</li>';
  var url=BLOG+"feeds/posts/default?alt=json&max-results=5";
  try{
    fetch(url).then(function(r){return r.json();}).then(function(d){
      var e=(d.feed&&d.feed.entry)||[];
      if(!e.length){c.innerHTML=respaldo;return;}
      c.innerHTML=e.map(function(x){
        var t=(x.title&&x.title.$t)||"Entrada del blog";
        var enlace=BLOG,l=x.link||[];
        for(var i=0;i<l.length;i++){if(l[i].rel==="alternate"){enlace=l[i].href;}}
        var f="";
        if(x.published&&x.published.$t){
          f=new Date(x.published.$t).toLocaleDateString("es-ES",{day:"numeric",month:"long",year:"numeric"});
        }
        return '<li><span class="n">✦</span><span class="t"><a href="'+esc(enlace)+'" target="_blank" rel="noopener">'+esc(t)+'</a></span>'+
               (f?'<span class="play canal">'+esc(f)+'</span>':'')+'</li>';
      }).join("");
    }).catch(function(){c.innerHTML=respaldo;});
  }catch(err){c.innerHTML=respaldo;}
}

function cargarBlogCompleto(){
  var lista=document.getElementById("blogLista");
  if(!lista) return;
  var entradas=[];
  var indice=1;
  function pagina(){
    var url=BLOG+"feeds/posts/default?alt=json&max-results=500&start-index="+indice;
    fetch(url).then(function(r){return r.json();}).then(function(d){
      var e=(d.feed&&d.feed.entry)||[];
      entradas=entradas.concat(e);
      if(e.length===500){
        indice+=500; pagina();
      }else{
        BLOG_ENTRADAS_PROGRAMAS=entradas; pintarBlog(entradas); pintarProgramas(document.getElementById("q") ? document.getElementById("q").value : "");
      }
    }).catch(function(){
      lista.innerHTML='<li class="vacio">No se han podido cargar las entradas automáticamente. <a href="'+BLOG+'" target="_blank" rel="noopener">Abrir el blog</a>.</li>';
    });
  }
  function pintarBlog(datos){
    var q=(document.getElementById("blogQ")||{}).value||"";
    q=q.trim().toLowerCase();
    var res=datos.filter(function(x){
      var t=(x.title&&x.title.$t)||"";
      return !q || t.toLowerCase().indexOf(q)>-1;
    });
    if(!res.length){
      lista.innerHTML='<li class="vacio">No hay entradas que coincidan.</li>';
      return;
    }
    lista.innerHTML=res.map(function(x){
      var t=(x.title&&x.title.$t)||"Entrada del blog",enlace=BLOG,f="";
      (x.link||[]).forEach(function(l){if(l.rel==="alternate") enlace=l.href;});
      if(x.published&&x.published.$t) f=new Date(x.published.$t).toLocaleDateString("es-ES",{day:"numeric",month:"long",year:"numeric"});
      return '<li><a href="'+esc(enlace)+'" target="_blank" rel="noopener">'+esc(t)+'</a><span class="blog-fecha">'+esc(f)+'</span></li>';
    }).join("");
    var bq=document.getElementById("blogQ");
    if(bq && !bq.dataset.ready){
      bq.dataset.ready="1";
      bq.addEventListener("input",function(){pintarBlog(entradas);});
    }
  }
  pagina();
}

function montarDial(){
  var dial=document.getElementById("dial");if(!dial)return;
  var freq=document.getElementById("freq"),estado=document.getElementById("estado"),aguja=document.getElementById("aguja"),luz=document.getElementById("luz");
  var ultimo=null,ventanaAbierta=false,audioCtx=null;
  var ruidos=["Ruido de sintonización…","Buscando emisora…","Interferencias…","Señal débil…","Buscando estación…"];
  function audio(){try{var A=window.AudioContext||window.webkitAudioContext;if(!A)return null;if(!audioCtx)audioCtx=new A();if(audioCtx.state==="suspended")audioCtx.resume();return audioCtx;}catch(e){return null;}}
  function ruido(){var ac=audio();if(!ac)return;try{var t=ac.currentTime,d=.18,b=ac.createBuffer(1,Math.floor(ac.sampleRate*d),ac.sampleRate),x=b.getChannelData(0);for(var i=0;i<x.length;i++){var env=1-Math.pow(i/x.length,.7);x[i]=(Math.random()*2-1)*env*.28;}var q=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();f.type="bandpass";f.frequency.setValueAtTime(700+Math.random()*900,t);f.frequency.exponentialRampToValueAtTime(2600+Math.random()*1800,t+d);f.Q.value=1.2;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.16,t+.018);g.gain.exponentialRampToValueAtTime(.0001,t+d);q.buffer=b;q.connect(f);f.connect(g);g.connect(ac.destination);q.start(t);q.stop(t+d);var o=ac.createOscillator(),og=ac.createGain();o.type="triangle";o.frequency.setValueAtTime(1450+Math.random()*500,t);o.frequency.exponentialRampToValueAtTime(360+Math.random()*220,t+d);og.gain.setValueAtTime(.0001,t);og.gain.exponentialRampToValueAtTime(.025,t+.025);og.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(og);og.connect(ac.destination);o.start(t);o.stop(t+d);if(Math.random()<.35){var c=ac.createBuffer(1,Math.floor(ac.sampleRate*.035),ac.sampleRate),cx=c.getChannelData(0);for(var j=0;j<cx.length;j++)cx[j]=(Math.random()*2-1)*.5;var cs=ac.createBufferSource(),cg=ac.createGain();cg.gain.value=.05;cs.buffer=c;cs.connect(cg);cg.connect(ac.destination);cs.start(t+.05);}}catch(e){}}
  function ok(){var ac=audio();if(!ac)return;try{var t=ac.currentTime,o=ac.createOscillator(),g=ac.createGain();o.type="sine";o.frequency.setValueAtTime(620,t);o.frequency.exponentialRampToValueAtTime(880,t+.16);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.05,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.34);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+.35);}catch(e){}}

window.iniciarRadio=function(){
  var panel=document.getElementById("radioPersistente");
  var audio=document.getElementById("radioAudio");
  var estadoRadio=document.getElementById("radioEstado");
  if(!panel||!audio)return false;
  panel.classList.add("activo");
  panel.style.opacity="1";
  panel.style.pointerEvents="auto";
  if(audio.src!==EMISORA){audio.src=EMISORA;audio.load();}
  if(estadoRadio) estadoRadio.textContent="Radio Villalba · 107.4 FM · En directo";
  var p=audio.play();
  if(p&&p.catch){p.catch(function(){if(estadoRadio)estadoRadio.textContent="Radio Villalba · 107.4 FM · Pulsa ▶ para escuchar";});}
  return false;
}
window.cerrarRadio=window.cerrarRadio||function(){
  var panel=document.getElementById("radioPersistente");
  var audio=document.getElementById("radioAudio");
  if(audio){audio.pause();audio.removeAttribute("src");audio.load();}
  if(panel) panel.classList.remove("activo");
};

// Reproductor flotante: arrastrable con ratón o dedo y conserva su posición.
(function(){
  function activarArrastre(){
    var panel=document.getElementById("radioPersistente");
    var barra=panel&&panel.querySelector(".radioPersistenteBar");
    if(!panel||!barra||panel.dataset.dragReady)return;
    panel.dataset.dragReady="1";

    var guardado=null;
    try{guardado=JSON.parse(localStorage.getItem("radioVillalbaPos")||"null");}catch(e){}
    if(guardado && typeof guardado.left==="number" && typeof guardado.top==="number"){
      panel.style.left=Math.max(4,Math.min(window.innerWidth-panel.offsetWidth-4,guardado.left))+"px";
      panel.style.top=Math.max(4,Math.min(window.innerHeight-panel.offsetHeight-4,guardado.top))+"px";
      panel.style.right="auto"; panel.style.bottom="auto"; panel.style.transform="none";
    }

    barra.style.cursor="grab";
    barra.style.touchAction="none";
    var arr=false,sx=0,sy=0,ox=0,oy=0,pid=null;

    barra.addEventListener("pointerdown",function(e){
      if(e.target.closest(".radioCerrar"))return;
      if(e.button!==undefined && e.button!==0)return;
      var r=panel.getBoundingClientRect();
      arr=true; pid=e.pointerId; sx=e.clientX; sy=e.clientY; ox=r.left; oy=r.top;
      panel.style.left=ox+"px"; panel.style.top=oy+"px";
      panel.style.right="auto"; panel.style.bottom="auto"; panel.style.transform="none";
      barra.style.cursor="grabbing";
      try{barra.setPointerCapture(pid);}catch(_){ }
      e.preventDefault();
    });

    barra.addEventListener("pointermove",function(e){
      if(!arr || e.pointerId!==pid)return;
      var maxX=Math.max(4,window.innerWidth-panel.offsetWidth-4);
      var maxY=Math.max(4,window.innerHeight-panel.offsetHeight-4);
      var nx=Math.max(4,Math.min(maxX,ox+(e.clientX-sx)));
      var ny=Math.max(4,Math.min(maxY,oy+(e.clientY-sy)));
      panel.style.left=nx+"px"; panel.style.top=ny+"px";
    });

    function soltar(e){
      if(!arr || (e.pointerId!==undefined && e.pointerId!==pid))return;
      arr=false; barra.style.cursor="grab";
      try{barra.releasePointerCapture(pid);}catch(_){ }
      var r=panel.getBoundingClientRect();
      try{localStorage.setItem("radioVillalbaPos",JSON.stringify({left:r.left,top:r.top}));}catch(_){ }
      pid=null;
    }
    barra.addEventListener("pointerup",soltar);
    barra.addEventListener("pointercancel",soltar);
    barra.addEventListener("lostpointercapture",function(){if(arr)soltar({pointerId:pid});});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",activarArrastre);
  else activarArrastre();
})();
document.addEventListener("DOMContentLoaded",function(){
  var directo=document.getElementById("btnDirecto");
  if(directo){directo.addEventListener("click",function(e){e.preventDefault();iniciarRadio();});}
  var b=document.querySelector(".radioCerrar");
  if(b){b.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();cerrarRadio();},true);}
});
  function actualizar(){var v=parseInt(dial.value,10),n=(v/10).toFixed(1);freq.innerHTML=n+'<small>FM</small>';aguja.style.left=((v-880)/200*100)+"%";if(v===1074){estado.textContent="¡Sintonizado! Inconformistas FM · 107.4 FM";estado.classList.add("sintonizado");luz.classList.add("on");if(ultimo!==1074){ok();iniciarRadio();}}else{estado.textContent=ruidos[v%ruidos.length];estado.classList.remove("sintonizado");luz.classList.remove("on");if(ultimo!==null&&ultimo!==v)ruido();ventanaAbierta=false;}ultimo=v;}
  dial.addEventListener("input",actualizar);actualizar();
}

function textoContadorDecada(){
  var hoy=new Date();
  hoy.setHours(0,0,0,0);
  var objetivoDia=new Date(2026,9,10);
  objetivoDia.setHours(0,0,0,0);
  var dias=Math.round((objetivoDia-hoy)/86400000);
  if(dias>0) return "Quedan "+dias+" "+(dias===1?"día":"días");
  return "¡¡Hoy es el día!!";
}
function actualizarContadorDecada(){
  var el=document.getElementById("contadorDecada");
  if(!el)return;
  el.textContent=textoContadorDecada();
}
actualizarContadorDecada();
setInterval(actualizarContadorDecada,60000);

function montarGaleria(){
  var ventana=document.getElementById("galeriaVentana"), mini=document.getElementById("galMiniaturas");
  if(!ventana || !mini) return;
  var actual=0, autoTimer=null;

  function detenerAuto(){if(autoTimer){clearInterval(autoTimer);autoTimer=null;}}
  function iniciarAuto(mostrar){detenerAuto();if(GALERIA.length>1)autoTimer=setInterval(function(){mostrar(actual+1);},3000);}

  function render(){
    var validas=GALERIA.slice(), contador=document.getElementById("galContador");
    if(!validas.length){
      ventana.innerHTML='<div class="galeria-placeholder"><strong>Aún no hay fotos</strong><span>Introduce las fotos en <b>galeria</b> con nombres como <b>foto1.jpg</b>, <b>foto2.jpg</b>…</span></div>';
      if(contador) contador.textContent="0 / 0";
      mini.innerHTML="";
      return;
    }
    function mostrar(n){
      actual=(n+validas.length)%validas.length;
      ventana.innerHTML='<img src="'+esc(fotoMed(validas[actual]))+'" alt="Foto de Inconformistas FM" decoding="async">';
      var im=ventana.querySelector("img");conRespaldo(im,validas[actual]);
      var sig=new Image();sig.src=fotoMed(validas[(actual+1)%validas.length]);
      if(contador) contador.textContent=(actual+1)+" / "+validas.length;
      mini.querySelectorAll("button").forEach(function(b,i){b.classList.toggle("on",i===actual);});
    }
    mini.innerHTML=validas.map(function(src,i){return '<button type="button" aria-label="Ver foto '+(i+1)+'"><img src="'+esc(fotoMin(src))+'" alt="" loading="lazy" decoding="async"></button>';}).join("");
    mini.querySelectorAll("img").forEach(function(im,i){conRespaldo(im,validas[i]);});
    mini.querySelectorAll("button").forEach(function(b,i){b.addEventListener("click",function(){mostrar(i);});});
    var prev=document.getElementById("galPrev"),next=document.getElementById("galNext");
    if(prev) prev.onclick=function(){mostrar(actual-1);iniciarAuto(mostrar);};
    if(next) next.onclick=function(){mostrar(actual+1);iniciarAuto(mostrar);};
    mini.querySelectorAll("button").forEach(function(b){b.addEventListener("click",function(){iniciarAuto(mostrar);});});
    mostrar(0);
    iniciarAuto(mostrar);
  }
  if(RECURSOS_CARGADOS) render();
  else document.addEventListener("recursosListos",render,{once:true});
} 

/* Descubre todas las fotos que haya en la carpeta "galeria", sea cual
   sea su nombre. No hace falta llamarlas foto1.jpg, foto2.jpg...

   1) Primero prueba una función de Netlify que lee la carpeta "galeria"
      directamente en el servidor (ver netlify/functions/galeria.js).
      Esta es la que funciona con tu forma de publicar en Netlify.
   2) Si no está disponible, intenta leer el listado de la carpeta tal
      cual lo da el servidor (funciona en algunos hostings, no en Netlify).
   3) Si tampoco, intenta leer un archivo de texto "galeria/fotos.json"
      con la lista de nombres (un simple array, ej: ["playa.jpg"]).
   4) Si nada de eso existe, usa el método antiguo por si ya tenías
      fotos llamadas foto1.jpg, foto2.jpg... */
function descubrirGaleria(){
  var EXT_IMAGEN=/\.(jpe?g|png|webp|gif)$/i;
  var baseGaleria=new URL("/galeria/",location.origin);

  function porFuncionNetlify(){
    return fetch("/.netlify/functions/fotos-galeria").then(function(r){
      if(!r.ok) throw new Error("sin función");
      return r.json();
    }).then(function(lista){
      if(!Array.isArray(lista) || !lista.length) throw new Error("carpeta vacía");
      return lista.map(function(nombre){return new URL(nombre,baseGaleria).href;});
    });
  }

  function porListadoServidor(){
    return fetch(baseGaleria.href).then(function(r){
      if(!r.ok) throw new Error("sin listado");
      return r.text();
    }).then(function(html){
      var doc=new DOMParser().parseFromString(html,"text/html");
      var enlaces=Array.prototype.slice.call(doc.querySelectorAll("a[href]"));
      var vistos={}, encontradas=[];
      enlaces.forEach(function(a){
        var href=a.getAttribute("href");
        if(!href || !EXT_IMAGEN.test(href)) return;
        var url=new URL(href,baseGaleria).href;
        if(!vistos[url]){vistos[url]=true;encontradas.push(url);}
      });
      if(!encontradas.length) throw new Error("carpeta vacía o sin listado");
      return encontradas;
    });
  }

  function porManifiesto(){
    return fetch("galeria/fotos.json").then(function(r){
      if(!r.ok) throw new Error("sin manifiesto");
      return r.json();
    }).then(function(lista){
      if(!Array.isArray(lista) || !lista.length) throw new Error("manifiesto vacío");
      return lista.map(function(nombre){return new URL(nombre,baseGaleria).href;});
    });
  }

  function porFotosJson(){
    return cargarManifiesto().then(function(m){
      if(!m) throw new Error("sin fotos.json");
      var lista=(m.galeria||[]).slice();
      Object.keys(m.programas||{}).sort(function(a,b){return Number(b)-Number(a);}).forEach(function(n){
        lista=lista.concat(m.programas[n]);
      });
      if(!lista.length) throw new Error("fotos.json vacío");
      return lista;
    });
  }

  porFotosJson()
    .catch(porFuncionNetlify)
    .catch(porListadoServidor)
    .catch(porManifiesto)
    .catch(function(){return null;})
    .then(function(encontradas){
      if(encontradas){GALERIA=encontradas;comprobarRecursos();}
      else descubrirGaleriaClasica();
    });
}

/* Método antiguo (compatibilidad): busca foto1.jpg, foto2.jpg... */
function descubrirGaleriaClasica(){
  var pendientes=MAX_RECURSOS, encontradas=[];
  for(let i=1;i<=MAX_RECURSOS;i++){
    (function(n){
      var encontrada=false, extensiones=["jpg","jpeg","png","webp"];
      var quedan=extensiones.length;
      extensiones.forEach(function(ext){
        var im=new Image();
        im.onload=function(){if(!encontrada){encontrada=true;encontradas.push("galeria/foto"+n+"."+ext);} if(--quedan===0) pendientes--; finalizar();};
        im.onerror=function(){if(--quedan===0){pendientes--;finalizar();}};
        im.src="galeria/foto"+n+"."+ext;
      });
    })(i);
  }
  function finalizar(){
    if(pendientes<=0){GALERIA=encontradas;comprobarRecursos();}
  }
}

/* Busca cancion1.mp3, cancion2.mp3… y también ogg/wav/m4a. */
function descubrirAudio(){
  /* No hace falta enumerar la carpeta: el dial probará cancion1.mp3,
     cancion2.mp3... cuando necesite una canción. */
  comprobarRecursos();
}

function comprobarRecursos(){
  if(GALERIA.length || CANCIONES.length || !RECURSOS_CARGADOS){
    if(!RECURSOS_CARGADOS){
      RECURSOS_CARGADOS=true;
      document.dispatchEvent(new Event("recursosListos"));
    }
  }
}

function cargarRecursos(){
  /* Evita repetir el descubrimiento al navegar entre secciones. */
  if(RECURSOS_CARGADOS) return;
  descubrirGaleria();
  descubrirAudio();
}

/* ---------- noticias Villalba ---------- */
var NOTICIAS_TIMER=null;
/* Fuentes RSS de Google News: se consultan a través de rss2json para evitar
   que el navegador bloquee el RSS por CORS. La presentación sigue siendo la
   misma lista de titulares. */
var NOTICIAS_FEEDS=[
  "https://news.google.com/rss/search?q=%22Collado+Villalba%22&hl=es&gl=ES&ceid=ES:es",
  "https://news.google.com/rss/search?q=%22Collado+Villalba%22+when%3A7d&hl=es&gl=ES&ceid=ES:es",
  "https://news.google.com/rss/search?q=%22Collado+Villalba%22+site%3Acadenaser.com&hl=es&gl=ES&ceid=ES:es",
  "https://news.google.com/rss/search?q=%22Collado+Villalba%22+site%3Aperiodicosierramadrid.es&hl=es&gl=ES&ceid=ES:es"
];
var NOTICIAS_RSS2JSON="https://api.rss2json.com/v1/api.json?rss_url=";
var NOTICIAS_FALLBACK=[
  {title:"Más de un millón de euros para la renovación de aceras, alumbrado y mobiliario urbano en cinco calles de Collado Villalba",link:"https://www.cope.es/emisoras/comunidad-de-madrid/madrid-provincia/villalba/noticias/millon-euros-renovacion-aceras-alumbrado-mobiliario-urbano-cinco-calles-collado-villalba-20261007_3451279.html",source:"COPE de la Sierra",date:"2026-10-07T10:06:00"},
  {title:"El PSOE de Collado Villalba alerta del parón de servicios y las deficiencias en el inicio de la temporada deportiva",link:"https://cadenaser.com/cmadrid/2026/09/22/el-psoe-de-collado-villalba-alerta-del-paron-de-servicios-y-las-deficiencias-en-el-inicio-de-la-temporada-deportiva-ser-madrid-sierra/",source:"SER Madrid Sierra",date:"2026-09-22T12:00:00"},
  {title:"Collado Villalba celebra este domingo la XVI Carrera Solidaria de la Ilusión",link:"https://espaciodiario.com/collado-villalba-celebra-este-domingo-la-xvi-carrera-solidaria-de-la-ilusion-de-la-fundacion-pita-lopez/",source:"Espacio Diario",date:"2026-09-22T10:00:00"},
  {title:"El flamenco abre la nueva Programación Cultural de Otoño en Collado Villalba con ‘Olor a tiempo’",link:"https://espaciodiario.com/el-flamenco-abre-la-nueva-programacion-cultural-de-otono-en-collado-villalba-con-olor-a-tiempo/",source:"Espacio Diario",date:"2026-09-22T09:00:00"},
  {title:"La criminalidad en Collado Villalba ha subido un 14 por ciento en los últimos tres meses",link:"https://aquienlasierra.es/collado-villalba-ultimas-noticias",source:"Aquí en la Sierra",date:"2026-09-18T10:00:00"},
  {title:"CC OO y CSIF denuncian la negativa de la alcaldesa de Collado Villalba a climatizar los centros educativos públicos",link:"https://aquienlasierra.es/collado-villalba-ultimas-noticias",source:"Aquí en la Sierra",date:"2026-09-17T10:00:00"},
  {title:"Nueva edición del Programa de Ocio en Familia en el Salón El Capricho de Collado Villalba",link:"https://aquienlasierra.es/collado-villalba-ultimas-noticias",source:"Aquí en la Sierra",date:"2026-09-17T09:00:00"},
  {title:"El Ayuntamiento de Collado Villalba no tiene constancia de que se haya producido una filtración de datos en el ciberataque",link:"https://aquienlasierra.es/collado-villalba-ultimas-noticias",source:"Aquí en la Sierra",date:"2026-09-17T08:00:00"},
  {title:"Ciberataque contra el Ayuntamiento de Collado Villalba: el CNI y la Comunidad de Madrid estudian su gravedad",link:"https://aquienlasierra.es/collado-villalba-ultimas-noticias",source:"Aquí en la Sierra",date:"2026-09-15T10:00:00"}
];
function cargarNoticias(){
  var lista=document.getElementById("noticiasLista"),marca=document.getElementById("noticiasActualizacion");
  if(!lista)return;
  var terminado=false,resultados=[];
  function limpiar(){if(window.__noticiasTimer){clearTimeout(window.__noticiasTimer);window.__noticiasTimer=null;}}
  function pintar(items,noGuardar){
    var vistos={},limpios=[];
    (items||[]).forEach(function(x){
      var titulo=(x.title||"").replace(/\s+/g," ").trim(),link=x.link||"",fecha=new Date(x.date||x.pubDate||0);
      if(!titulo||!link||isNaN(fecha.getTime()))return;
      var clave=titulo.toLowerCase().replace(/[^a-z0-9áéíóúüñ ]/gi,"").trim();
      if(vistos[clave])return; vistos[clave]=1;
      limpios.push({title:titulo,link:link,date:fecha,source:x.source||x.author||"Medio de comunicación"});
    });
    limpios.sort(function(a,b){return b.date-a.date;});
    limpios=limpios.slice(0,12);
    if(!limpios.length)return false;
    if(!noGuardar){try{localStorage.setItem("noticiasCacheV1",JSON.stringify(limpios));localStorage.setItem("noticiasCacheTsV1",String(Date.now()));}catch(e){}}
    terminado=true;limpiar();
    lista.innerHTML=limpios.map(function(x){
      return '<li><a href="'+esc(x.link)+'" target="_blank" rel="noopener noreferrer"><strong>'+esc(x.title)+'</strong></a><div class="noticia-meta"><span>'+esc(x.source)+'</span><span>'+x.date.toLocaleDateString("es-ES",{day:"2-digit",month:"2-digit",year:"numeric"})+'</span></div></li>';
    }).join("");
    if(marca)marca.textContent="Últimos titulares · actualizado "+new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"});
    return true;
  }
  function fallo(){
    if(terminado)return; terminado=true;limpiar(); pintar(NOTICIAS_FALLBACK,true);
    if(marca)marca.textContent="Últimos titulares de Collado Villalba · fuente RSS";
  }
  var pendientes=NOTICIAS_FEEDS.length,vivo=false;
  function pedir(i){
    var url=NOTICIAS_RSS2JSON+encodeURIComponent(NOTICIAS_FEEDS[i]);
    fetch(url)
      .then(function(r){if(!r.ok)throw Error("rss");return r.json();})
      .then(function(d){
        var its=(d&&d.items)||[];
        its.forEach(function(x){resultados.push({title:x.title,link:x.link,date:x.pubDate,source:x.author||((d.feed&&d.feed.title)||"Google News")});});
        /* Se pinta en cuanto llega la primera fuente y se completa con las demás. */
        if(its.length&&pintar(resultados))vivo=true;
      })
      .catch(function(){})
      .then(function(){
        if(--pendientes===0&&!vivo)fallo();
      });
  }
  lista.innerHTML='<li class="noticias-cargando">Cargando titulares de Collado Villalba…</li>';
  if(marca)marca.textContent="Actualizando titulares…";
  /* Si ya se cargaron noticias en otra visita, se muestran al instante mientras se actualizan. */
  try{
    var cache=JSON.parse(localStorage.getItem("noticiasCacheV1")||"null");
    if(cache&&cache.length&&pintar(cache,true)&&marca)marca.textContent="Actualizando titulares…";
  }catch(e){}
  window.__noticiasTimer=setTimeout(fallo,12000);
  for(var k=0;k<NOTICIAS_FEEDS.length;k++)pedir(k);
}
function iniciarActualizacionNoticias(){
  if(NOTICIAS_TIMER)clearInterval(NOTICIAS_TIMER);
  if(ruta()==="noticias"){
    cargarNoticias();
    NOTICIAS_TIMER=setInterval(function(){if(ruta()==="noticias")cargarNoticias();},300000);
  }
}

/* Precarga en segundo plano: deja las noticias guardadas para que la sección abra al instante.
   No se repite si la lista guardada tiene menos de 10 minutos. */
function precargarNoticias(){
  try{
    var ts=parseInt(localStorage.getItem("noticiasCacheTsV1")||"0",10);
    if(ts&&Date.now()-ts<600000)return;
  }catch(e){}
  if(ruta()==="noticias")return;
  var res=[],pend=NOTICIAS_FEEDS.length;
  function fin(){
    if(--pend>0)return;
    var vistos={},limpios=[];
    res.forEach(function(x){
      var titulo=(x.title||"").replace(/\s+/g," ").trim(),link=x.link||"",fecha=new Date(x.date||0);
      if(!titulo||!link||isNaN(fecha.getTime()))return;
      var clave=titulo.toLowerCase().replace(/[^a-z0-9áéíóúüñ ]/gi,"").trim();
      if(vistos[clave])return; vistos[clave]=1;
      limpios.push({title:titulo,link:link,date:fecha,source:x.source});
    });
    limpios.sort(function(a,b){return b.date-a.date;});
    limpios=limpios.slice(0,12);
    if(!limpios.length)return;
    try{localStorage.setItem("noticiasCacheV1",JSON.stringify(limpios));localStorage.setItem("noticiasCacheTsV1",String(Date.now()));}catch(e){}
  }
  NOTICIAS_FEEDS.forEach(function(f){
    fetch(NOTICIAS_RSS2JSON+encodeURIComponent(f))
      .then(function(r){if(!r.ok)throw Error("rss");return r.json();})
      .then(function(d){
        ((d&&d.items)||[]).forEach(function(x){res.push({title:x.title,link:x.link,date:x.pubDate,source:x.author||((d.feed&&d.feed.title)||"Google News")});});
      })
      .catch(function(){})
      .then(fin);
  });
}
setTimeout(precargarNoticias,2500);

/* ---------- router ---------- */
function ruta(){var h=location.pathname.replace(/^\/+|\/+$/g,"").split("/")[0];return vistas[h]?h:"inicio";}
function pintar(){
  cargarRecursos();
  var r=ruta();
  document.getElementById("main").innerHTML=vistas[r]();
  var a=document.querySelectorAll("nav.menu a");
  for(var i=0;i<a.length;i++){a[i].classList.toggle("on",a[i].getAttribute("href")===(r==="inicio"?"/":"/"+r+"/"));}
  document.getElementById("menu").classList.remove("abierto");
  document.getElementById("burger").setAttribute("aria-expanded","false");
  if(r==="programas"){
    pintarProgramas("");
    var q=document.getElementById("q");
    q.addEventListener("input",function(){pintarProgramas(q.value);});
  }
  if(r==="inicio"){montarDial();cargarFeed();}
  if(r==="galeria") montarGaleria();
  if(r==="fotosprograma") montarFotosPrograma();
  if(r==="contacto") montarFormulario();
  if(r==="noticias") iniciarActualizacionNoticias();
  window.scrollTo(0,0);
}
document.getElementById("burger").addEventListener("click",function(){
  var m=document.getElementById("menu"),ab=m.classList.toggle("abierto");
  this.setAttribute("aria-expanded",ab?"true":"false");
});
window.addEventListener("hashchange",pintar);
pintar();
;
/* --- Reparación independiente del dial y reproductor --- */
(function(){
  var STREAM="https://srv7041.dns-lcinternet.com/8042/stream";
  function qs(id){return document.getElementById(id);}
  function abrirRadio(){
    var panel=qs("radioPersistente"), audio=qs("radioAudio"), estado=qs("radioEstado");
    if(!panel||!audio)return false;
    panel.classList.add("activo");
    panel.style.opacity="1"; panel.style.pointerEvents="auto";
    if(audio.src!==STREAM){audio.src=STREAM;}
    if(estado)estado.textContent="Radio Villalba · 107.4 FM · En directo";
    var p=audio.play();
    if(p&&p.catch)p.catch(function(){if(estado)estado.textContent="Radio Villalba · 107.4 FM · Pulsa ▶ para escuchar";});
    return false;
  }
  function cerrarRadio(){
    var panel=qs("radioPersistente"),audio=qs("radioAudio");
    if(audio){try{audio.pause();}catch(e){} audio.removeAttribute("src"); try{audio.load();}catch(e){}}
    if(panel){panel.classList.remove("activo");panel.style.opacity="0";panel.style.pointerEvents="none";}
  }
  window.iniciarRadio=abrirRadio;
  window.cerrarRadio=cerrarRadio;

  function activar(){
    var panel=qs("radioPersistente"),barra=panel&&panel.querySelector(".radioPersistenteBar");
    if(panel&&barra&&!barra.dataset.arrastreOK){
      barra.dataset.arrastreOK="1"; barra.style.cursor="grab"; barra.style.touchAction="none";
      var mov=false,sx=0,sy=0,ox=0,oy=0,pid=null;
      barra.addEventListener("pointerdown",function(e){
        if(e.target.closest(".radioCerrar"))return;
        if(e.pointerType==="mouse"&&e.button!==0)return;
        var r=panel.getBoundingClientRect(); sx=e.clientX;sy=e.clientY;ox=r.left;oy=r.top;pid=e.pointerId;mov=true;
        panel.style.left=ox+"px";panel.style.top=oy+"px";panel.style.right="auto";panel.style.bottom="auto";panel.style.transform="none";
        barra.style.cursor="grabbing"; try{barra.setPointerCapture(pid);}catch(_){ } e.preventDefault();
      });
      barra.addEventListener("pointermove",function(e){
        if(!mov||e.pointerId!==pid)return;
        var x=Math.max(4,Math.min(window.innerWidth-panel.offsetWidth-4,ox+e.clientX-sx));
        var y=Math.max(4,Math.min(window.innerHeight-panel.offsetHeight-4,oy+e.clientY-sy));
        panel.style.left=x+"px";panel.style.top=y+"px";
      });
      function soltar(e){if(!mov)return;if(e.pointerId!==undefined&&e.pointerId!==pid)return;mov=false;barra.style.cursor="grab";try{barra.releasePointerCapture(pid);}catch(_){ }var r=panel.getBoundingClientRect();try{localStorage.setItem("radioVillalbaPos",JSON.stringify({left:r.left,top:r.top}));}catch(_){ }pid=null;}
      barra.addEventListener("pointerup",soltar);barra.addEventListener("pointercancel",soltar);
      try{var pos=JSON.parse(localStorage.getItem("radioVillalbaPos")||"null");if(pos&&typeof pos.left==="number"&&typeof pos.top==="number"){panel.style.left=Math.max(4,Math.min(window.innerWidth-panel.offsetWidth-4,pos.left))+"px";panel.style.top=Math.max(4,Math.min(window.innerHeight-panel.offsetHeight-4,pos.top))+"px";panel.style.right="auto";panel.style.bottom="auto";panel.style.transform="none";}}catch(_){ }
    }
    var close=panel&&panel.querySelector(".radioCerrar");
    if(close&&!close.dataset.closeOK){close.dataset.closeOK="1";close.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();cerrarRadio();});}
    var direct=qs("btnDirecto");
    if(direct&&!direct.dataset.directOK){direct.dataset.directOK="1";direct.addEventListener("click",function(e){e.preventDefault();abrirRadio();});}
    var dial=qs("dial");
    if(dial&&!dial.dataset.dialOK){
      dial.dataset.dialOK="1";
      var freq=qs("freq"),estado=qs("estado"),aguja=qs("aguja"),luz=qs("luz"),ultimo=dial.value;
      function actualizarDial(){
        var v=Number(dial.value),n=(v/10).toFixed(1);
        if(freq)freq.innerHTML=n+"<small>FM</small>";
        if(aguja)aguja.style.left=((v-880)/200*100)+"%";
        if(estado){if(v===1074){estado.textContent="¡Sintonizado! Inconformistas FM · 107.4 FM";estado.classList.add("sintonizado");if(luz)luz.classList.add("on");}else{estado.textContent="Buscando emisora…";estado.classList.remove("sintonizado");if(luz)luz.classList.remove("on");}}
        if(v===1074&&String(ultimo)!=="1074")abrirRadio();
        ultimo=v;
      }
      dial.addEventListener("input",actualizarDial);dial.addEventListener("change",actualizarDial);actualizarDial();
    }
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",activar);else activar();
  window.addEventListener("load",activar);
  window.addEventListener("hashchange",function(){setTimeout(activar,30);});
})();
;
(function(){
  function actualizarContador(){
    var texto=document.getElementById('contador-dias-rock');
    if(!texto)return;
    var hoy=new Date();
    var actual=new Date(hoy.getFullYear(),hoy.getMonth(),hoy.getDate());
    var fecha=new Date(2026,9,24);
    if(actual>fecha){var etiqueta=texto.parentElement; if(etiqueta)etiqueta.remove();return;}
    if(actual.getTime()===fecha.getTime())texto.textContent='¡HOY ES EL DÍA!';
    else {var dias=Math.ceil((fecha-actual)/86400000);texto.textContent=dias===1?'QUEDA 1 DÍA':'QUEDAN '+dias+' DÍAS';}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',actualizarContador);else actualizarContador();
  setInterval(actualizarContador,60000);
})();
;
/* Orden de las tarjetas de Últimos programas y entrevistas. */
(function(){
  function ordenarUltimos(){
    var fila=document.querySelector('.fila-noticias-portada');
    if(!fila) return;
    Array.prototype.forEach.call(fila.querySelectorAll('article'),function(card){
      var h=card.querySelector('h3');
      var t=h?h.textContent.trim():'';
      if(/Lorca/i.test(t)) card.remove();
      if(/La Década Prodigiosa|Esther Williams/i.test(t) || card.dataset.noticiaFlamenco==='1') card.remove();
    });
    function crear(clave,titulo,etiqueta,imagen,alt,descripcion,enlace){
      var card=fila.querySelector('article[data-orden-portada="'+clave+'"]');
      if(card) return card;
      card=document.createElement('article');
      card.className='anuncio-especial';
      card.dataset.ordenPortada=clave;
      card.style.cssText='background:var(--papel);border:1px solid var(--borde, var(--tinta));border-radius:18px;padding:20px;box-shadow:0 6px 20px rgba(0,0,0,.07);min-width:0;display:flex;flex-direction:column';
      var img=document.createElement('img'); img.src=imagen; img.alt=alt; img.style.cssText='display:block;width:100%;height:160px;object-fit:contain;object-position:center;border-radius:12px;border:1px solid var(--tinta);background:var(--fondo);margin-bottom:14px'; card.appendChild(img);
      var tag=document.createElement('span'); tag.textContent=etiqueta; tag.style.cssText='display:inline-block;align-self:flex-start;color:#fff;font-weight:700;font-size:10px;padding:3px 8px;border-radius:20px;margin:0 0 8px;background:var(--turquesa)'; card.appendChild(tag);
      var h=document.createElement('h3'); h.textContent=titulo; h.style.cssText='font-size:18px;line-height:1.35;margin:0 0 12px;font-weight:700'; card.appendChild(h);
      var p=document.createElement('p'); p.textContent=descripcion; p.style.cssText='margin:0 0 14px;color:var(--suave);font-size:14px;line-height:1.65'; card.appendChild(p);
      var zona=document.createElement('div'); zona.style.cssText='margin-top:auto;padding-top:16px';
      var a=document.createElement('a'); a.href=enlace; a.textContent='Escuchar'; a.setAttribute('onclick','return abrirIvoox(this.href)'); a.style.cssText='display:inline-block;color:#fff;font-weight:700;font-size:11px;padding:8px 12px;border-radius:20px;background:var(--turquesa);text-decoration:none'; zona.appendChild(a); card.appendChild(zona);
      return card;
    }
    var halloween=crear('halloween','Especial Halloween','PROGRAMA ESPECIAL','https://raw.githubusercontent.com/inconformistasfm/inconformistasfmweb/main/fotos-programas/280/watermarked_img_7616198293509931508.jpg','Cartel del Especial Halloween','Un programa especial con Gustavo Adolfo Bécquer, Don Juan Tenorio y una historia que pudo o no pasar.','https://www.ivoox.com/player_ej_182802536_6_1.html?c1=cb2650');
    var bandas=crear('bandas','Bandas de rock que cambiaron su formación','ÚLTIMO PROGRAMA','https://raw.githubusercontent.com/inconformistasfm/inconformistasfmweb/main/fotos-programas/279/portada.jpg','Cartel del programa Bandas de rock','En Inconformistas FM hablamos de bandas de rock que han cambiado su composición durante su carrera, como Nightwish, Metallica, AC/DC, Black Sabbath, Pink Floyd y Mägo de Oz.','https://www.ivoox.com/player_ej_182637950_6_1.html?c1=cb2650');
    var flamenco=window.FOTO_DE_ARTE_FLAMENCO ? crear('flamenco','Entrevista a De Arte Flamenco','ENTREVISTA',window.FOTO_DE_ARTE_FLAMENCO,'Cartel de la entrevista a De Arte Flamenco','El duende, el compás y el sentimiento de la música flamenca llegaron a nuestros micrófonos de la mano de De Arte Flamenco, que además nos sorprendió con alguno de sus temas en directo.','https://www.ivoox.com/player_ej_183380889_6_1.html?c1=cb2650') : null;
    var anterior=null;
    [flamenco,halloween,bandas].forEach(function(card){
      if(!card) return;
      var ref=anterior ? anterior.nextSibling : fila.firstChild;
      if(card!==ref) fila.insertBefore(card,ref);
      anterior=card;
    });
  }
  function programar(){setTimeout(ordenarUltimos,250);}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',programar); else programar();
  window.addEventListener('load',programar);
  window.addEventListener('hashchange',function(){setTimeout(ordenarUltimos,250);});
  setInterval(ordenarUltimos,1500);
})();
;
/* Portada estable: fija la noticia principal (posición 1): Entrevista a Tinaisa, con su botón de escucha en directo. */
(function(){
  window.FOTO_DE_ARTE_FLAMENCO = "/img/de-arte-flamenco.jpg";
  var FOTO = "/img/foto-portada.jpg";
  var TITULO = "ENTREVISTA A TINAISA";
  var PARRAFOS = [
    '¡Este sábado, ritmo afrobeat y afropop con Tinaisa!',
    'Este sábado 14 de noviembre a las 19:30h nos visita en Inconformistas FM la artista Tinaisa para presentarnos «Baby Boo», su recién estrenado sencillo. Un tema lleno de energía que fusiona afrobeat y afropop contemporáneo con una producción de primer nivel a cargo de Dabruk. Hablaremos con ella sobre su trayectoria, el proceso creativo detrás de este lanzamiento y todo lo que viene.',
    'Sintonízanos en el 107.4 FM (Radio Villalba) o escúchanos en directo desde la web en inconformistasfm.es. ¡No te lo pierdas!'
  ];
  /* El sábado 14/11/2026 (desde las 00:00, hora peninsular) la noticia pasa a decir «Hoy». */
  var HOY_TINAISA = new Date("2026-11-14T00:00:00+01:00");
  var PARRAFOS_HOY = [
    '¡Hoy el ritmo afrobeat y afropop con Tinaisa!',
    'Hoy sábado 14 de noviembre a las 19:30h nos visita en Inconformistas FM la artista Tinaisa para presentarnos «Baby Boo», su recién estrenado sencillo. Un tema lleno de energía que fusiona afrobeat y afropop contemporáneo con una producción de primer nivel a cargo de Dabruk. Hablaremos con ella sobre su trayectoria, el proceso creativo detrás de este lanzamiento y todo lo que viene.',
    'Sintonízanos en el 107.4 FM (Radio Villalba) o escúchanos en directo desde la web en inconformistasfm.es. ¡No te lo pierdas!'
  ];
  var ESTILO_P = 'margin:0 0 8px;color:var(--suave);line-height:1.45';
  function aplicar(){
    var principal=document.querySelector('.anuncio-rock');
    if(!principal) return;
    var h=principal.querySelector('h3'), img=principal.querySelector('img');
    if(!h || !img) return;
    if(h.textContent.trim()!==TITULO) h.textContent=TITULO;
    if(img.getAttribute('src')!==FOTO){img.src=FOTO; img.alt='Portada del sencillo «Baby Boo» de Tinaisa';}
    img.style.cssText='display:block;width:100%;max-width:130px;height:auto;object-fit:contain;border:0;border-radius:0';
    var texto=h.parentElement;
    var TEXTO=(new Date()>=HOY_TINAISA)?PARRAFOS_HOY:PARRAFOS;
    var ps=texto.querySelectorAll('p');
    while(ps.length<TEXTO.length){var p=document.createElement('p'); texto.appendChild(p); ps=texto.querySelectorAll('p');}
    for(var i=0;i<TEXTO.length;i++){
      if(ps[i].innerHTML!==TEXTO[i]) ps[i].innerHTML=TEXTO[i];
      if(ps[i].getAttribute('style')!==ESTILO_P) ps[i].setAttribute('style',ESTILO_P);
    }
    for(var j=TEXTO.length;j<ps.length;j++) ps[j].remove();
    var etiqueta=texto.querySelector('span'); if(etiqueta && etiqueta.textContent!=='ENTREVISTA') etiqueta.textContent='ENTREVISTA';
    var contador=texto.querySelector('#contador-dias-rock'); if(contador) contador.remove();
    Array.prototype.forEach.call(principal.querySelectorAll('.escuchar-rock-programado'),function(e){e.remove();});
    Array.prototype.forEach.call(principal.querySelectorAll('a,button'),function(el){
      if(el.hasAttribute('data-boton-principal')) return;
      if(/escuchar\\s*ahora/i.test((el.textContent||'').trim()) || /escuchar/i.test((el.textContent||'').trim())) el.remove();
    });
  }
  var queued=false;
  function schedule(){if(queued)return; queued=true; requestAnimationFrame(function(){queued=false;aplicar();});}
  function init(){aplicar(); if(document.body && !window.__inconformistasPortadaObserver){
    window.__inconformistasPortadaObserver=new MutationObserver(schedule);
    window.__inconformistasPortadaObserver.observe(document.body,{childList:true,subtree:true});
  }}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
  window.addEventListener('load',schedule);
  window.addEventListener('hashchange',schedule);
})();
;
/* Cambios de Bandas de rock programados para el 24/10/2026 a las 20:30, hora peninsular española.
   Hasta esa fecha, este bloque no modifica el contenido actual de la página. */
(function(){
  var fechaActivacion = new Date("2026-10-24T20:30:00+02:00");
  var tituloPrograma = "Bandas de rock que cambiaron su formación";
  var reproductor = "https://www.ivoox.com/player_ej_182637950_6_1.html?c1=cb2650";
  var noticiaActualizada = false;
  var programaAgregado = false;

  function activarCambios(){
    if (new Date() < fechaActivacion) return;

    /* Actualiza la noticia solo cuando llega la hora programada y cuando la portada está presente. */
    if (!noticiaActualizada) {
      var tarjetas = document.querySelectorAll(".anuncio-rock");
      tarjetas.forEach(function(tarjeta){
        var h3 = tarjeta.querySelector("h3");
        if (!h3 || h3.textContent.trim() !== tituloPrograma) return;
        var contenedorTexto = h3.parentElement;
        var parrafos = contenedorTexto.querySelectorAll("p");
        if (parrafos[0]) {
          parrafos[0].innerHTML = 'En <b>Inconformistas FM</b> hablamos de bandas de rock que han cambiado su composición durante su carrera, como Nightwish, Metallica, AC/DC, Black Sabbath, Pink Floyd y Mägo de Oz.';
        }
        Array.prototype.forEach.call(parrafos, function(p){
          if (p.textContent.indexOf("Sábado 24 de octubre a las 19:30") !== -1) p.remove();
        });
        if (!document.querySelector(".anuncio-rock[data-halloween-actualizado=\"1\"]") && !contenedorTexto.querySelector(".escuchar-rock-programado")) {
          var zona = document.createElement("div");
          zona.className = "escuchar-rock-programado";
          zona.style.cssText = "margin-top:14px";
          var enlace = document.createElement("a");
          enlace.href = reproductor;
          enlace.textContent = "▶ Escuchar ahora";
          enlace.style.cssText = "display:inline-block;color:#fff;font-weight:700;font-size:12px;padding:9px 14px;border-radius:20px;background:var(--turquesa);text-decoration:none";
          enlace.addEventListener("click", function(ev){ ev.preventDefault(); abrirIvoox(reproductor); });
          zona.appendChild(enlace);
          contenedorTexto.appendChild(zona);
        }
        noticiaActualizada = true;
      });
    }

    /* Añade el programa 279 a la lista solo al activarse. */
    if (!programaAgregado && typeof P !== "undefined") {
      if (!P.some(function(p){ return p[0] === 279; })) {
        P.unshift([279, tituloPrograma, reproductor, null, null, null]);
      }
      programaAgregado = true;
      var lista = document.getElementById("lista");
      if (lista && typeof pintarProgramas === "function") {
        var buscador = document.getElementById("q");
        pintarProgramas(buscador ? buscador.value : "");
      }
      var cifras = document.querySelector(".cifras");
      if (cifras) {
        var total = cifras.querySelector("div b");
        if (total) total.textContent = P.length;
      }
    }
  }

  activarCambios();
  var reloj = window.setInterval(function(){
    activarCambios();
    if (noticiaActualizada && programaAgregado) window.clearInterval(reloj);
  }, 15000);
})();
;
/* Cambios temporales del Especial Halloween: se activan por fecha y hora local del navegador. */
(function(){
  var FECHA_HALLOWEEN = new Date("2026-10-31T19:30:00");
  var FIN_LAZO = new Date("2026-11-01T00:00:00");
  var REPRODUCTOR = "https://www.ivoox.com/player_ej_182802536_6_1.html?c1=cb2650";
  var IMAGEN_LAZO = "/img/lazo.png";

  var estilo = document.createElement("style");
  estilo.textContent = ".logo .lazo-negro{position:static;display:block;flex:0 0 auto;width:32px;height:52px;max-width:none;object-fit:contain;margin-left:5px;filter:none;pointer-events:none}.logo .lema{flex:0 0 auto}@media(max-width:760px){.logo .lazo-negro{width:29px;height:48px;margin-left:4px}}";
  document.head.appendChild(estilo);

  function gestionarLazo(){
    var logo = document.querySelector("header .logo");
    if(!logo) return;
    var activo = new Date() < FIN_LAZO;
    var lazo = logo.querySelector(".lazo-negro");
    if(activo && !lazo){
      lazo = document.createElement("img");
      lazo.className = "lazo-negro";
      lazo.src = IMAGEN_LAZO;
      lazo.alt = "";
      lazo.setAttribute("aria-hidden","true");
      logo.appendChild(lazo);
    }else if(!activo && lazo){
      lazo.remove();
    }
  }

  function activarReproductor(enlace){
    enlace.addEventListener("click",function(ev){
      ev.preventDefault();
      if(typeof window.abrirIvoox === "function"){
        window.abrirIvoox(REPRODUCTOR);
      }else{
        var modal=document.getElementById("ivooxModal");
        var frame=modal && modal.querySelector("iframe");
        if(frame){frame.src=REPRODUCTOR;modal.classList.add("activo");modal.setAttribute("aria-hidden","false");}
      }
    });
  }

  function ponerBotonEnNoticia(){
    if(new Date() < FECHA_HALLOWEEN) return;
    var noticia=document.querySelector(".anuncio-rock");
    if(!noticia) return;
    var texto=noticia.querySelector("h3")?.parentElement || noticia;
    if(texto.querySelector('[data-halloween-escuchar="1"]')) return;
    var boton=document.createElement("a");
    boton.href=REPRODUCTOR;
    boton.className="btn rosa";
    boton.textContent="▶ Escuchar ahora";
    boton.setAttribute("role","button");
    boton.setAttribute("data-halloween-escuchar","1");
    boton.style.cssText="display:inline-flex;margin-top:12px;align-items:center;justify-content:center";
    activarReproductor(boton);
    texto.appendChild(boton);
  }

  function ponerPrograma(){
    if(new Date() < FECHA_HALLOWEEN || !Array.isArray(window.P)) return;
    if(!window.P.some(function(p){return Number(p[0])===280;})){
      window.P.unshift([280,"Especial Halloween",REPRODUCTOR,null,null,null]);
      if(typeof window.pintarProgramas==="function"){
        var q=document.getElementById("q");
        window.pintarProgramas(q?q.value:"");
      }
    }
  }

  function actualizar(){
    gestionarLazo();
    ponerBotonEnNoticia();
    ponerPrograma();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",actualizar);
  else actualizar();
  window.addEventListener("load",actualizar);
  window.addEventListener("hashchange",function(){setTimeout(actualizar,100);});
  window.setInterval(actualizar,1000);
})();
;
/* Botón de la noticia principal (Escuchar en directo) + programa 281 (De Arte Flamenco)
   + sábado 14/11/2026 a las 20:30: el botón pasa a «Escuchar» (reproductor iVoox) y se añade el programa 282 (Tinaisa). */
(function(){
  var INICIO = new Date("2026-11-07T00:00:00+01:00");
  var EMISION = new Date("2026-11-07T20:30:00+01:00");
  var IVOOX = "https://www.ivoox.com/player_ej_183380889_6_1.html?c1=cb2650";
  var TITULO = "ENTREVISTA A DE ARTE FLAMENCO";
  var agregado = false;
  var EMISION_TINAISA = new Date("2026-11-14T20:30:00+01:00");
  var IVOOX_TINAISA = "https://www.ivoox.com/player_ej_183749601_6_1.html?c1=cb2650";
  var TITULO_TINAISA = "Entrevista a Tinaisa 14/11/2026";
  var agregado282 = false;

  function botonNoticia(contenedor){
    if(contenedor.querySelector('[data-boton-principal="1"]')) return;
    var a=document.createElement('a');
    a.setAttribute('data-boton-principal','1');
    a.className='btn rosa';
    a.href='#';
    a.textContent=(new Date()>=EMISION_TINAISA)?'▶ Escuchar':'▶ Escuchar en directo';
    a.style.cssText='display:inline-flex;margin-top:12px;align-items:center;justify-content:center';
    a.addEventListener('click',function(ev){
      ev.preventDefault();
      if(new Date()>=EMISION_TINAISA){
        if(typeof window.abrirIvoox==='function') window.abrirIvoox(IVOOX_TINAISA);
        return;
      }
      if(typeof window.iniciarRadio==='function') window.iniciarRadio();
    });
    contenedor.appendChild(a);
  }

  /* A las 20:30 del 14/11/2026 el botón ya existente cambia solo, sin recargar la página. */
  function ajustarBotonNoticia(contenedor){
    var a=contenedor.querySelector('[data-boton-principal="1"]');
    if(!a) return;
    var texto=(new Date()>=EMISION_TINAISA)?'▶ Escuchar':'▶ Escuchar en directo';
    if(a.textContent!==texto) a.textContent=texto;
  }

  function actualizarPrincipal(){
    var principal=document.querySelector('.anuncio-rock');
    if(!principal) return;
    var h=principal.querySelector('h3');
    if(!h) return;
    botonNoticia(h.parentElement);
    ajustarBotonNoticia(h.parentElement);
  }

  function limpiarNumerosNoticias(){
    document.querySelectorAll('.numero-noticia').forEach(function(badge){badge.remove();});
  }

  function agregarPrograma281(ahora){
    if(ahora<EMISION || agregado || !Array.isArray(window.P)) return;
    if(!window.P.some(function(p){return Number(p[0])===281;})){
      window.P.unshift([281,TITULO,IVOOX,null,null,null]);
    }
    agregado=true;
    if(typeof window.pintarProgramas==='function'){
      var q=document.getElementById('q');
      window.pintarProgramas(q?q.value:'');
    }
    actualizarContador();
  }

  function agregarPrograma282(ahora){
    if(ahora<EMISION_TINAISA || agregado282 || !Array.isArray(window.P)) return;
    if(!window.P.some(function(p){return Number(p[0])===282;})){
      window.P.unshift([282,TITULO_TINAISA,IVOOX_TINAISA,null,null,null]);
    }
    agregado282=true;
    if(typeof window.pintarProgramas==='function'){
      var q=document.getElementById('q');
      window.pintarProgramas(q?q.value:'');
    }
    actualizarContador();
  }

  function actualizarContador(){
    var cifra=document.querySelector('.cifras div b');
    if(cifra && Array.isArray(window.P)) cifra.textContent=String(window.P.length);
  }

  function ejecutar(){
    var ahora=new Date();
    actualizarPrincipal();
    limpiarNumerosNoticias();
    agregarPrograma281(ahora);
    agregarPrograma282(ahora);
    actualizarContador();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',ejecutar);
  else ejecutar();
  window.addEventListener('load',ejecutar);
  window.addEventListener('hashchange',function(){setTimeout(ejecutar,250);});
  setInterval(ejecutar,3000);
})();

/* ---------- navegación: URLs reales, sin recargar (la radio sigue sonando) ---------- */
(function(){
  var TIT={inicio:"Inconformistas FM — Radio Villalba 107.4",programas:"Programas y entrevistas · Inconformistas FM",noticias:"Noticias de Collado Villalba · Inconformistas FM",equipo:"Equipo · Inconformistas FM",galeria:"Galería de fotos · Inconformistas FM",colaboradores:"Artistas y colaboradores · Inconformistas FM",radio:"Radio online · Inconformistas FM",contacto:"Contacto · Inconformistas FM",madrinas:"Madrinas · Inconformistas FM",fotosprograma:"Fotos del programa · Inconformistas FM"};
  function ir(){document.title=TIT[ruta()]||TIT.inicio;window.dispatchEvent(new Event("hashchange"));}
  document.addEventListener("click",function(e){
    if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    var a=e.target.closest&&e.target.closest("a[href]");
    if(!a||a.target==="_blank"||a.hasAttribute("download"))return;
    var u;try{u=new URL(a.getAttribute("href"),location.href);}catch(x){return;}
    if(u.origin!==location.origin)return;
    var p=u.pathname.replace(/^\/+|\/+$/g,"").split("/")[0];
    if(p!==""&&!vistas[p])return;
    e.preventDefault();
    history.pushState(null,"",u.pathname+u.search);
    ir();
  });
  window.addEventListener("popstate",ir);
})();
