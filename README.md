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
7. **[DB (MySQL)](#db-mysql)**
8. **[DNS (Bind9)](#dns-bind9)**
9. **[SSL (Secure Sockets Layer)](#ssl-secure-sockets-layer)**
10. **[REST API](#rest-api)**
11. **[Aplikazioa - Erabiltzaile Gida](#aplikazioa---erabiltzaile-gida)**
12. **[Etorkizunerako Hobekuntzak](#etorkizunerako-hobekuntzak)**

---

### Sarrera <a name="sarrera"></a>

Proiektu hau UNIEIBAR-ERMUA eta UPV/EHUko Magisteritza Fakultatearen arteko lankidetza baten ondorioz sortu da. Erronka nagusia mugikorrentzako aplikazio bat garatzea izan da, lehen hezkuntzako umeei zuzenduta. Helburua, umeentzako herri jakin bateko leku esanguratsuenak eta horiei buruzko informazio interesgarria biltzea zen, jarduera eta joko interaktiboekin osatuz. Gure kasuan, herria **Durango** da.

#### Erronkaren ezaugarri nagusiak:
- Aplikazioa herri jakin bati buruzkoa da.
- Lehen hezkuntzako umeei zuzenduta dago.
- Herriko lau edo bost leku esanguratsuen informazioa eta joko interaktiboak eskaintzen ditu.
- Aplikazioaren garapenerako **Ionic Framework**-a erabili da, ikuspegi "offline first"-arekin.
- Backend aldean, **Laravel** eta **MySQL** teknologiak erabili dira APIak eta datu-baseen sinkronizaziorako.

Lan hau hainbat teknologia, metodologia eta tresnarekin garatu da, eta fase desberdinetan taldekako lankidetza sustatu da, ikasleen inplikazioa eta autonomia indartzeko. Proiektuaren iraupena **bigarren ebaluazio osoa** izan da (azaroaren 18tik otsailaren 8ra arte), eta garapena hainbat modulutan banatu da, hala nola, bezeroaren ingurunean garapena, zerbitzariaren ingurunean garapena, eta web interfazeen diseinua.

Aplikazioa azken erabiltzailearentzako esperientzia atsegina eta erabilerraza eskaintzeko diseinatu da, garapen prozesuan irisgarritasun- eta usagarritasun-jarraibideak aplikatuz.

---

### Antolakuntza <a name="antolakuntza"></a>

Proiektu honetan zehar, taldekideen arteko antolakuntza oinarrizkoa izan da, eta horretarako, eskuragarri izan ditugun erremintak, eta jasotako ezagutzak erabili ditugu garapen osoan.

Lehenik eta behin, taldea eraiki genuen, bakoitzaren rol-ak definitzen eta hauen ardurak ezartzen. Hau guztia taldearen kontratuan definitu genuen. 

Behin hau definituta, egunero bost minutuko bileratxoak egin ditugu, bakoitzaren garapenak edo arazoak beste taldekideei azaltzeko.

Ondoren, garapen osoan elkarrekin lan egiteko **GitHub** erabili behar genuenez, plataforma honek eskaintzen duen **GitHub Projects** erreminta erabili genuen gure proiektuaren errepositoriora lotuta.

#### Metodologiak: Gantt eta Kanban

---

### Diseinua <a name="diseinua"></a>

Aplikazioaren diseinua funtzionaltasunari eta erabiltzailearen esperientziari lehentasuna emanez egin zen. **Ionic Framework**-aren laguntzaz, aplikazioa interaktiboagoa eta erabilerrazagoa izan da, eta **offline mode**-a aktibatzeko aukera eskaintzen du, hau da, erabiltzaileek interneteko konexiorik gabe ere aplikazioa erabili dezakete.

---

### Zerbitzaria <a name="zerbitzaria"></a>

SFTP zerbitzaria sortu zen, eta **vsftpd** instalatu zen, hau da, FTP bidezko karpeta eta fitxategien kudeaketa egiteko. Zerbitzariaren konfiguracioak, hala nola, SSL erabilera eta **pasibo modua** ezartzea, guztiz bermatzen dute FTP segurtasuna eta erabilgarritasuna.

---

### VSFTPD Konfigurazioa <a name="vsftpd-konfigurazioa"></a>

Zerbitzariaren segurtasuna eta funtzionalitatea hobetu dira, vsftpd konfiguratzeko hainbat ezarpen egin baitira:
- **SSL erabilera**: Segurtasun konexioak ezartzeko.
- **chroot_local_user**: Erabiltzaileak bakarrik bere karpetara sartzea ahalbidetzeko.
- **Pasibo modua**: FTP pasibo moduan funtzionatzeko portu-tarte bat definitzea.

---

### DB (MySQL) <a name="db-mysql"></a>

MySQL zerbitzaria instalatu zen, eta **datu-basea** sortu zen Durango herriari buruzko informazioa kudeatzeko.

---

### DNS (Bind9) <a name="dns-bind9"></a>

DurangoEzagutuz.com domeinua konfiguratuta, **Bind9** erabiliz DNS zerbitzari bat ezarri zen. Konfigurazio egokia ziurtatu zen, eta zerbitzariaren helbideak eta domeinua behar bezala ezarri ziren.

---

### SSL (Secure Sockets Layer) <a name="ssl-secure-sockets-layer"></a>

Segurtasunari dagokionez, **SSL ziurtagiria** erabiliz komunikazioa seguru egiten da, eta domeinuaren konfigurazioa **Apache** web zerbitzariarekin egokitu zen.

---

### REST API <a name="rest-api"></a>

Proiektuaren atzean, **REST API** bat garatu zen, aplikazioaren datuak zerbitzariaren bidez eskuratzea eta eguneratzea ahalbidetzeko. **Laravel** framework-a erabiliz, API egonkor eta eraginkor bat garatu zen.

---

### Aplikazioa - Erabiltzaile Gida <a name="aplikazioa---erabiltzaile-gida"></a>

Aplikazioa erabiltzaileari herriaren leku esanguratsuen inguruko informazioa eta joko interaktiboak eskaintzen dizkio, eta horrek esperientzia atsegina eta hezigarria dakar.

---

### Etorkizunerako Hobekuntzak <a name="etorkizunerako-hobekuntzak"></a>

Hurrengo hobekuntzak planifikatzen dira:
- Datu-basearen aldaketak mugikorrean aplikatzea zerbitzariaren saretik kanpo.
- Jokoa berriz jokatzea erabiltzaileak nahi izanez gero.
- Aplikazioaren kodearen optimizazioa.

Proiektuaren etorkizunerako hobekuntzak eta garapenerako ideiak aurreikusi dira.
