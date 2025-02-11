# DurangoEzagutzen

**Gorka Garcia, Jon Alberdi eta Aimar Alonso**

---

## Aurkibidea

1. **[Sarrera](#sarrera)**
2. **[Antolakuntza](#antolakuntza)**
3. **[Diseinua](#diseinua)**
4. **[Zerbitzaria](#zerbitzaria)**
5. **[SFTP](#sftp)**
6. **[VSFTPD Konfigurazioa](#vsftpd-konfigurazioa)**
7. **[DB](#db)**
8. **[DNS](#dns)**
9. **[SSL](#ssl)**
10. **[REST API](#rest-api)**
11. **[Aplikazioa - Erabiltzaile Gida](#erabiltzaile-gida)**
12. **[Etorkizunerako Hobekuntzak](#etorkizunerako-hobekuntzak)**

---

### Sarrera <a name="sarrera"></a>

Proiektu hau UNIEIBAR-ERMUA eta UPV/EHUko Magisteritza Fakultatearen arteko lankidetza baten ondorioz sortu da. Erronka nagusia mugikorrentzako aplikazio bat garatzea izan da, lehen hezkuntzako umeei zuzenduta. Helburua, umeentzako herri jakin bateko leku esanguratsuenak eta horiei buruzko informazio interesgarria biltzea zen, jarduera eta joko interaktiboekin osatuz. Gure kasuan, herria **Durango** da.

# Sarrera <a name="sarrera"></a>
Proiektu hau UNIEIBAR-ERMUA eta UPV/EHUko Magisteritza Fakultatearen arteko lankidetza baten ondorioz sortu da. Erronka nagusia mugikorrentzako aplikazio bat garatzea izan da, lehen hezkuntzako umeei zuzenduta. Helburua, umeentzako herri jakin bateko leku esanguratsuenak eta horiei buruzko informazio interesgarria biltzea zen, jarduera eta joko interaktiboekin osatuz. Gure kasuan, herria Durango da.

Erronkaren ezaugarri nagusiak honako hauek izan dira:

 Aplikazioa herri jakin bati buruzkoa da.
 Lehen hezkuntzako umeei zuzenduta dago.
 Herriko lau edo bost leku esanguratsuen informazioa eta joko interaktiboak eskaintzen ditu.
 Aplikazioaren garapenerako Ionic Framework-a erabili da, ikuspegi "offline first"-arekin.
 Backend aldean, Laravel eta MySQL teknologiak erabili dira APIak eta datu-baseen sinkronizaziorako.
 Edukia eta betekizunak UPVko ikasleen eskutik jaso dira, eta gure taldearen ardura horiek aplikazioan integratzea izan da.

Lan hau hainbat teknologia, metodologia eta tresnarekin garatu da, eta fase desberdinetan taldekako lankidetza sustatu da, ikasleen inplikazioa eta autonomia indartzeko. Proiektuaren iraupena bigarren ebaluazio osoa izan da (azaroaren 18tik otsailaren 8ra arte), eta garapena hainbat modulutan banatu da, hala nola, bezeroaren ingurunean garapena, zerbitzariaren ingurunean garapena, eta web interfazeen diseinua.

Aplikazioa azken erabiltzailearentzako esperientzia atsegina eta erabilerraza eskaintzeko diseinatu da, garapen prozesuan irisgarritasun- eta usagarritasun-jarraibideak aplikatuz.


# Antolakuntza <a name="antolakuntza"></a>
Proiektu honetan zehar, taldekideen arteko antolakuntza oinarrizkoa izan da, eta horretarako, eskuragarri izan ditugun erremintak, eta jasotako ezagutzak erabili ditugu garapen osoan.

Lehenik eta behin, taldea eraiki genuen, bakoitzaren rol-ak definitzen eta hauen ardurak ezartzen. Hau guztia taldearen kontratuan definitu genuen. 

Behin hau definituta, egunero bost minutuko bileratxoak egunero egin ditugu, bakoitzaren garapenak edo arazoak beste taldekideei azaltzeko.

Ondoren, garapen osoan elkarrekin lan egiteko github erabili behar genuenez, plataforma honek eskaintzen duen Github Projects erreminta erabili genuen gure proiektuaren errepositoriora lotuta.

Hau horrela izanda, label berriak sortu genituen gure beharren arabera, sortutako issue berriei arduradun eta label zehatz bat ezarri ahal izateko:





Behin issue nagusiak definituta zeuzkagula, hauek bi board-etan ikusteko aukera inplementatu genuen, alde batetik Gantt metodologia erabiltzen duen bat (issue-ak denboran zehar antolatuta), eta beste aldetik Kanban metodologian oinarritutako beste bat (issue-ak hauen egoeraren arabera antolatuta).

Erronkaren hasieran gehien bat UPV-ko ikasleekin bilerak egin genituen hurrengo bi prozesuak definitzeko:

Aplikazioaren funtzioak, baldintzak eta funtzionamendua.
Aplikazioaren diseinua.



# Diseinua <a name="diseinua"></a>



# Zerbitzaria <a name="zerbitzaria"></a>

## SFTP <a name="sftp"></a>

Lehenik eta behin ubuntun dauden eguneraketak aplikatuko ditugu:
sudo apt-get update

SFTP bat sortu ahal izateko vsftpd instalatu dugu:
sudo apt-get install vsftpd

Vsftpd-ren defektuzko konfigurazioa klonatzen dugu, konfiguratzean gauza bat gaizki egiten badugu defektuz dagoena pegatzeko eta berriz hasteko:
sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.original

Firewall-a aktibatzen dugu:
sudo ufw enable
……
sudo ufw allow 20/tcp
sudo ufw allow 21/tcp
sudo ufw allow 40000:50000/tcp

Admin erabiltzailea sortzen dugu:
sudo adduser admin

Erabiltzaile horrentzako karpeta sortzen dugu ftp egiteko:
sudo mkdir /home/admin/ftp

Eta baimen hauek eman dizkiogu:














Gero ftp karpetaren barruan beste karpeta bat sortu dugu non horren barruan dauden fitxategiak editatu ahalko dira:
sudo mkdir /home/admin/ftp/files
Eta honela geratu dira files karpetaren baimenak:





## VSFTPD KONFIGURAZIOA <a name="vsftpd-konfigurazioa"></a>

vsftpd.conf fitxategian hurrengo aldaketak egin dira:

write_enable deskomentatu
# Uncomment this to enable any form of FTP write command.
write_enable=YES
SSL erabiltzeko 
ssl_enable YES jarri vsftpd ssl erabiltzeko

Eta hurrengo aldagaiak gehitu ditugu
chroot_local_user=YES
user_sub_token=$USER
local_root=/home/$USER/ftp

pasv_min_port=40000
pasv_max_port=50000

chroot_local_user=YES
Erabiltzaile guztiak haien etxeko direktorioan giltzaperatuko dira eta ezin izango dira hortik kanpo nabigatu

user_sub_token=$USER
$USER aldagaia erabiltzen du erabiltzailearen izena automatikoki txertatzeko.
local_root=/home/$USER/ftp
Erabiltzaile bakoitzaren FTP erro direktorioa /home/erabiltzailea/ftp izango da.
pasv_min_port=40000
pasv_max_port=50000

Honako konfigurazio hau vsftpd-ren pasibo moduan (Passive Mode) funtzionatzeko portu-tartea definitzeko erabiltzen da


## DB <a name="db"></a>
MySQL instalatu:
sudo apt update 
sudo apt install mysql-server -y
Zerbitzua hasieratu:
sudo systemctl start mysql
sudo systemctl enable mysql

MySQL an sartu
sudo mysql -u root -p
Datu Basea sortu:
CREATE DATABASE durango;
Erabiltzailea sortu pribilegio guztiekin:
CREATE USER 'admin'@'%' IDENTIFIED BY 'tu_contraseña_segura';
GRANT ALL PRIVILEGES ON durango.* TO 'admin'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;
MySQL konfigurazio editatu konexio remotoa izateko:
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
Bilatu bind-address = 127.0.0.1 eta hau jarri:
bind-address = 0.0.0.0
MySQL berrebiarazi:
sudo systemctl restart mysql
MySQL erabiltzen duen defektuzko portua 3306 da eta portu hori ireki behar da firewall-aren bidez datu basera konektatu ahal izateko







## DNS <a name="dns"></a>
Ubuntun instalazioa egiteko hurrengo agindua erabiliko dugu:
sudo apt-get install bind9 bind9-utils

Konfigurazioa
Gure domeinua definitzeko hurrengo fitxategia irekitzen dugu:
sudo nano /etc/bind/named.conf.local
Eta honela lagatzen dugu:
zone "durangoezagutuz.com" {
	type master;
	file "/etc/bind/db.durangoezagutuz";
};


options {
	directory "/var/cache/bind";

	

	forwarders {
     	8.8.8.8;
     	10.15.27.1;
 	};

	
	dnssec-validation auto;
	allow-query { 192.168.73.0/24; 127.0.0.1; };
	listen-on-v6 { any; };
	listen-on { any; };
};
forwarders:Ebatzi ezin dituen eskaerak Interneteko DNS zerbitzari batzuei birbidaliko dizkie kasu honeta googleko dns-r eta uniko dns-ra
allow-query:Zer ip duten baimena dns ra konektatzeko.Kasu honetan zerbitzaria eta 192.168.73.X Ip duten ordenagailuak
listen-on-v6 { any; };listen-on { any; };:Zerbitzariak eskuragarri dauden sareko interfaze guztietan entzutea ahalbidetzen du (bai IPv4, bai IPv6)




 db.durangoezagutuz
$TTL 604800
durangoezagutuz.com. IN SOA durangoezagutuz.com. wag.durangoezagutuz.com. (
2006081401;
28800;
3600;
604800;
38400)

durangoezagutuz.com. IN NS wag.durangoezagutuz.com.


wag IN A 192.168.73.12
server2 IN A 192.168.73.13

www IN CNAME wag
ftp IN CNAME server2

named.conf fitxategia aztertzeko komandoa:
named-checkconf
Ez duenez irteerik sortzen ondo dago
DNS domeinua ondo dagoen egiaztatzeko hurrengo komando exekutatzen dugu
named-checkzone durangoezagutuz.com /etc/bind/db.durangoezagutuz
OK bat bueltatzen badu konfigurazioa ondo dagoela esan nahi du
Eta DNS frogatzeko 
Bezero ordenagailuan DNS-a gure zerbitzariaren IP-a jartzen dugu eta cmd-an hurrengo komandoa sartzen dugu nslookup durangoezagutuz.com
Servidor:  UnKnown
Address:  192.168.73.12

Nombre:  durangoezagutuz.com
VirtualHost
Apache Instalatzen dugu
sudo apt install apache2
/var/www/durango/public_html

sudo mkdir -p /var/www/durango/public_html

Gure erabiltzaile arruntak gure web direktorio barruan aldaketak egitea nahi baldin badugu, jabetza propietatea aldatu beharko dugu:
sudo chown -R $USER:$USER /var/www/durango/public_html


Bestalde, web direktorio orokorrean irakurtzeko baimena emanda dagoela ziurtatzeko honako komando idatziko dugu: 
sudo chmod -R 755 /var/www

Virtualhostaren proba horria html bat izango eta public_html karpetaren barruan gordeko dugu:
sudo nano /var/www/durango/public_html/index.html
Orain konfigurazio fitxategi bat sortuko dugu bere helburua gure  domeinorako zerbitzu bat eskaintzea da
sudo nano /etc/apache2/sites-available/durangoezagutuz.com.conf
Eta honela geratu da:
<VirtualHost *:80>
	ServerAdmin admin@durangoezagutuz.com
	ServerName www.durangoezagutuz.com
	ServerAlias durangoezagutuz.com
	DocumentRoot /var/www/durango/public_html
	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>

<VirtualHost *:443>
	ServerAdmin admin@durangoezagutuz.com
	ServerName www.durangoezagutuz.com
	ServerAlias durangoezagutuz.com
	DocumentRoot /var/www/durango/public_html
	SSLEngine on
	SSLCertificateFile /etc/apache2/ssl/server.crt
	SSLCertificateKeyFile /etc/apache2/ssl/server.key
	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
Lehen VirtualHosta http bidez 80 portua erabiliko du eta bigarren 443 hauek baimendu beharko ditugu firewallaren bidez hurrengo komandoekin:
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp



Lehenik eta behin ServerAdmin direktiba aldatu dugu, eta gunearen administratzailearen emaila idatzi dugu: 
ServerAdmin admin@durangoezagutuz.com
 

Ondoren ServerName-a idatziko dugu; oinarrizko domeinuaren izena da eta Virtual hostaren definizioarekin bat etorri behar da. Hau izango da bere domeinua: 
ServerName www.durangoezagutuz.com
Document-Root ean webgunearen lokalizazioa sartzen dugu domeinua nabegatzailean sartzen karpeta horretan dagoena agertuko da


## SSL <a name="ssl"></a>

Ikusten denez domeinuaren konfigurazioan ssl erabili dugu hau funtzionatzeko hurrengo pausuak jarraitu behar genituen
SSL ziurtagiriak gordeko diren karpeta sortu
sudo mkdir /etc/apache2/ssl

Orain 3 urterako (1095 egun) balioko diguten ziurtagiriak sortuko ditugu ondorengo agindua erabiliz:
sudo openssl req -x509 -nodes -days 1095 -newkey rsa:2048 -out /etc/apache2/ssl/server.crt -keyout /etc/apache2/ssl/server.key
Hau exekutaztean galdera batzuk egingo dizkigu gure herrialdearen izenari buruz, organizazioaren izena eta hauek bete ditugu
Agindu honek /etc/apache2/ports.conf fitxategia aurrekonfiguratzen du lerro batzuek gehituz. Hauen artean 443 portua entzuteko esaten duena. :
sudo a2enmod ssl
Gero Virtualhostean ssl aktibatuta egoteko
SSLEngine on
SSL ziurtagirien lokalizazioa gehitu dugu
	SSLCertificateFile /etc/apache2/ssl/server.crt
	SSLCertificateKeyFile /etc/apache2/ssl/server.key


# REST API <a name="rest-api"></a>
Aplikazio bat garatzerakoan, argi definitu behar da nolakoa izango da aplikazioan erabiliko diren datuen fluxua. Honen ondorioz, oso garrantzitsua da ere kontuan izatea zer gertatuko den aplikazioa duen dispositiboa konexiorik gabe badago.

Gure kasuan, ariketa desberdinen datu erabat finkoak izango dira, hau da, erabiltzaileak aplikazioa erabiltzerakoan ez du datu berririk sortuko, edo behintzat, ez dira zerbitzariko datu basera igo behar. Orduan, aplikaziotik bakarrik zerbitzariko datu basearen datuak irakurtzeko aukera izan behar du, bai modelo baten instantzia guztiak jasotzeko (GET ALL), bai instantzia zehar bat jasotzeko (GET BY ID).

Bestalde, proiektuaren kudeatzaileak zerbitzariko datuak aldatu nahi badute, adibidez, ariketa baten eraikin zahar baten argazkia eguneratzeko, hau egiteko aukera ere izan beharko luke (UPDATE).

Prozesu guzti hauek erabat errazteko, REST API bat garatzea erabaki genuen, eta honetarako, klasean ikasi eta erabilitako Laravel framework-a aukeratu genuen.

Laravel bidez REST API-a garatzeko, hurrengo pausuak jarraitu genituen:

Datu basearen modeloak definitu:

Proiektuan definitu hauen klaseak, migrazioak, etab. 
Datu basea sortu zerbitzarian.
Beharrezko migrazioak exekutatu.


# Aplikazioaren erabiltzaile gida <a name="erabiltzaile-gida"></a>
Lehenik eta behin, jokoa irekitzerakoan, hurrengo portada ikusiko dugu, gure jokoaren protagonistarekin ongi-etorria ematen:



Hemen, Sartu botoia sakatu beharko dugu, jokoaren nabigazio orri nagusira sartzeko, eta geraleku desberdinak ikusi ahal izateko:


Pantaila honetan, goialdeko eskumaldean, bi aukera ikusiko ditugu, aukera hauek bakarrik garapenean egongo dira, eta geolokalizazio prozesua bypass-eatzeko balio dute, testeatzeko lanak errazteko.

Mapa honetan, ikusi dezakegu zein da tokatzen zaigun geralekua, eta honetan klikatzerakoan, geraleku honen jokora sarbidea izango dugu, baina honen aurretik, jokoaren deskripzio labur bat erakutsiko zaio erabiltzaileari eduki multimedia batekin lotuta (irudia, bideoa, edo audioa):

































Joko bakoitza desberdina da, eta horregatik bakoitzak prozesu desberdin bat jarraitzun du, jokoaren helburua, zuzenketa, … Kasu honetan (beste batzuetan era horrela da), dena erantzuten dugunean, ariketa zuzendu ahalko dugu, zuzenketa ostean, ariketa ondo baldin badago, orduan Amaitu aukera klikagarri izango duzu:















Jokoa zuzendu eta amaitzerakoan, zoriontzeko orri bat erakutsiko da, eta Irten botoian klikatzen badugu, nabigazio mapara bueltatuko gara, azkenengo ariketan izan ezik, jokoa ixten duela:



# Etorkizunerako hobekuntzak <a name="etorkizunerako-hobekuntzak"></a>
Proiektu honen aplikazioa garatzeko denbora oso mugatua izan dugu, honen ondorioz, etorkizunerako hobekuntza edota zuzenketa asko geratu dira:

DB-ko aldaketak aplikaziora ekartzeko saretik kanpo egon ahal izatea.
Jokoak berriz jokatzeko aukera behin hau bukatuta dagoela.
Joko batzuetan kronometro bat gehitzea.
Aplikazio osoaren estiloa hobetzea eta txukuntzea.
Aplikazioaren eta jokoen kodigoa txukuntzea eta komentatzea.
Hizki sopan hitzak diagonalean eta alderantziz ere agertzea.
Puzzlea eta hizki sopa jokoak dinamikoki kargatzea eta ez hardcodeatuta.


