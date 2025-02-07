-- Crear tabla Locations
CREATE TABLE IF NOT EXISTS Locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    position INT,
    name VARCHAR(255),
    description TEXT,
    explanation TEXT,
    lat DECIMAL(10,6),
    lon DECIMAL(10,6),
    img VARCHAR(255),
    audio VARCHAR(255),
    video VARCHAR(255),
    time INT,
    activity VARCHAR(255)
);

-- Crear tabla Quiz
CREATE TABLE IF NOT EXISTS Quiz (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sentence TEXT,
    img VARCHAR(255),
    answer TINYINT(1) -- Booleano (0 = falso, 1 = verdadero)
);

-- Crear tabla Match_img
CREATE TABLE IF NOT EXISTS Match_img (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    img_before VARCHAR(255),
    img_after VARCHAR(255)
);

-- Crear tabla Match_pair
CREATE TABLE IF NOT EXISTS Match_pair (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255),
    img VARCHAR(255)
);

-- Crear tabla Progress
CREATE TABLE IF NOT EXISTS Progress (
    location_id INTEGER PRIMARY KEY,
    completed TINYINT(1),
    FOREIGN KEY (location_id) REFERENCES Locations(id) ON DELETE CASCADE
);

-- Insertar datos en Locations
INSERT OR IGNORE INTO Locations (id, position, name, description, explanation, lat, lon, img, audio, video, time, activity)
VALUES 
(1, 1, 'Landako Gunea', 
 'joko honetan 5 galdera erantzun beharko dituzu, enuntziatu bakoitzaren azpian bi botoi izango dituzu bat zuzenerako eta bestea gezurrerako. Erantzun ondoren, zuzentzeko aukera izango duzu. Denak ondo erantzun arte, jokoa berriro egin beharko duzu.', 'nulo', 43.170978, -2.630629, 
 '../../assets/images/landakoGunea.jpeg', 'nulo', '../../assets/videos/landakoGunea.mp4', 90, 'Quiz'),

(2, 2, 'Andra Mari Kalea', 
 'joko honetan 5 irudi-pare elkartu beharko dituzu; bi puntutan sakatzean, gezi bat agertuko da, biak elkartzen dituena. Denak batu ondoren, zuzentzeko aukera izango duzu. Denak ondo batu arte, gaizki daudenak berriro batu beharko dituzu.', 
 '1937ko martxoaren 31n, goizeko 08:30ean Italiako tropek Durango bonbardatu zuten, Franco jeneralaren agindupean. Herria suntsituta geratu zen eta 336 pertsona hil ziren.', 43.167950, -2.631669, 
 '../../assets/images/AndraMariKalea.jpg', 'nulo', 'nulo', 90, 'Match_img'),

(3, 3, 'Durangoko Udala', 
 'joko honetan letra-zopa bat egin beharko duzu artopillen osagaien gainean. Jolasteko, hitz baten letrak banan-banan aukeratu behar dituzu. Denboran zehar 6 hitzak aurkitzen dituzunean irabaziko duzu.', 
 '1765.urtetik ospatzen den ekitaldia.  Gaur egun udaletxeko arkupetan.  Madalenen antzeko opila behealdean arto alea duena.', 43.166891, -2.631891, 
 '../../assets/images/durangokoUdala.jpeg', '../../assets/audios/3Ariketa.mp3', 'nulo', 90, 'WordSearch'),

(4, 4, 'Santa Anako Arkua', 
 'Joko hau bi zatitan banatzen da, lehena puzzle bat egitea da, eta bigarren zatian hitzak lotu behar dira dagozkien laukitxoetan. Hori guztia denbora zehatz bati jarraituz.', 
 'Durangoko Santa Ana plazan kokatua. 1556ean sortua eta kontserbatzen den bakarra.  "Merkatuko portalea" esaten zioten lehen, bertatik sartzen zirelako durangarrak salgaiak ornitzeko eta asetzeko. 1743ean Juan de Herdoizak berritu zuen, estilo barroko batekin ordeztuz.', 43.165772, -2.632056, 
 '../../assets/images/4Ariketa.png', 'nulo', 'nulo', 90, 'Puzzle'),

(5, 5, 'Pinondo Plaza', 
 'Joko honetan izenen bikoteak batu beharko dituzu izaki mitologikoen irudiekin, begiratu bideoari ezer baino lehen bakoitza ezagutzeko.', 'nulo', 43.164911, -2.632466, 
 '../../assets/images/5Ariketa.jpeg', 'nulo', '../../assets/videos/5Ariketa.mp4', 90, 'MatchPairs');

-- Insertar datos en Quiz
INSERT OR IGNORE INTO Quiz (id, sentence, img, answer)
VALUES
(1, 'Durangoko Azoka euskal kirolariekin solasean ibiltzeko aukera paregabea da.', '../../assets/images/Quiz1.png', 0),
(2, 'Lehen edizioa Gerediaga Elkarteak antolatu zuen.', '../../assets/images/Quiz2.png', 1),
(3, 'Azokaren helburua nazioarteko liburugintza eta diskogintza ezagutzera ematea zen.', '../../assets/images/Quiz3.png', 0),
(4, 'Elizpean antolatu ondoren, hainbat urtetan udaletxe plazan antolatu behar izan zuten azoka.', '../../assets/images/Quiz4.png', 0),
(5, 'Azoka nagusiaz gain, inguruan beste hainbat gune ere antolatzen dira, besteak beste; saguganbara, irudienea edo eta eszenatokia.', '../../assets/images/Quiz5.png', 1);

-- Insertar datos en Match_img
INSERT OR IGNORE INTO Match_img (id, img_before, img_after)
VALUES
(1, '../../assets/images/Before1.png', '../../assets/images/After1.png'),
(2, '../../assets/images/Before2.png', '../../assets/images/After2.png'),
(3, '../../assets/images/Before3.png', '../../assets/images/After3.png'),
(4, '../../assets/images/Before4.png', '../../assets/images/After4.png'),
(5, '../../assets/images/Before5.png', '../../assets/images/After5.png');

-- Insertar datos en Match_pair
INSERT OR IGNORE INTO Match_pair (id, name, img)
VALUES
(1, 'Tartalo', '../../assets/images/Tartalo.png'),
(2, 'Traganarrua', '../../assets/images/Traganarrua.png'),
(3, 'Sugaar', '../../assets/images/Sugaar.png'),
(4, 'Mari', '../../assets/images/Mari.png'),
(5, 'Herensugea', '../../assets/images/Herensugea.png'),
(6, 'Jentila', '../../assets/images/Jentila.png'),
(7, 'Galtzagorri', '../../assets/images/Galtzagorri.png'),
(8, 'Basajaun', '../../assets/images/Basajaun.png'),
(9, 'Lamia', '../../assets/images/Lamia.png'),
(10, 'Sorginak', '../../assets/images/Sorginak.png');

-- Insertar datos en Progress
INSERT OR IGNORE INTO Progress (location_id, completed)
VALUES
(1, 0),
(2, 0),
(3, 0),
(4, 0),
(5, 0);
