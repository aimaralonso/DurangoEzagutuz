-- Crear tabla Location
CREATE TABLE IF NOT EXISTS Location (
    id INT PRIMARY KEY,
    position INT,
    name VARCHAR(255),
    description TEXT,
    explanation TEXT,
    lat VARCHAR(50),
    lon VARCHAR(50),
    img VARCHAR(255),
    audio VARCHAR(255),
    video VARCHAR(255),
    time INT,
    activity VARCHAR(255)
);

-- Crear tabla Quiz
CREATE TABLE IF NOT EXISTS Quiz (
    id INT PRIMARY KEY,
    sentence TEXT,
    img VARCHAR(255),
    answer BOOLEAN
);

-- Crear tabla Match_img
CREATE TABLE IF NOT EXISTS Match_img (
    id INT PRIMARY KEY,
    img_before VARCHAR(255),
    img_after VARCHAR(255)
);

-- Crear tabla Match_pair
CREATE TABLE IF NOT EXISTS Match_pair (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    img VARCHAR(255)
);

-- Crear tabla Progress
CREATE TABLE IF NOT EXISTS Progress (
    location_id INT PRIMARY KEY,
    completed BOOLEAN,
    FOREIGN KEY (location_id) REFERENCES Location(id)
);

-- Insertar datos en Location
INSERT OR IGNORE INTO Location (id, position, name, description, explanation, lat, lon, img, audio, video, time, activity)
VALUES 
(1, 1, 'Landako Gunea', 
 'joko honetan 5 galdera erantzun beharko dituzu, enuntziatu bakoitzaren azpian bi botoi izango dituzu bat zuzenerako eta bestea gezurrerako. Erantzun ondoren, zuzentzeko aukera izango duzu. Denak ondo erantzun arte, jokoa berriro egin beharko duzu.', NULL, 43.1709785, -2.630629, 
 '../../assets/images/landakoGunea.jpeg', NULL, '../../assets/videos/landakoGunea.mp4', 90, 'Quiz'),

(2, 2, 'Andra Mari Kalea', 
 'joko honetan 5 irudi-pare elkartu beharko dituzu; bi puntutan sakatzean, gezi bat agertuko da, biak elkartzen dituena. Denak batu ondoren, zuzentzeko aukera izango duzu. Denak ondo batu arte, gaizki daudenak berriro batu beharko dituzu.', 
 '1937ko martxoaren 31n, goizeko 08:30ean Italiako tropek Durango bonbardatu zuten, Franco jeneralaren agindupean. Herria suntsituta geratu zen eta 336 pertsona hil ziren.', 43.1679499, -2.6316685, 
 '../../assets/images/AndraMariKaleajpg.jpg', NULL, NULL, 90, 'Match_img'),

(3, 3, 'Durangoko Udala', 
 'joko honetan letra-zopa bat egin beharko duzu artopillen osagaien gainean. Jolasteko, hitz baten letrak banan-banan aukeratu behar dituzu. Denboran zehar 6 hitzak aurkitzen dituzunean irabaziko duzu.', 
 '1765.urtetik ospatzen den ekitaldia.  Gaur egun udaletxeko arkupetan.  Madalenen antzeko opila behealdean arto alea duena.', 43.1668907, -2.6318913, 
 '../../assets/images/durangokoUdala.jpeg', '../../assets/audios/3Ariketa.mp3', NULL, 90, 'WordSearch'),

(4, 4, 'Santa Anako Arkua', 
 'Joko hau bi zatitan banatzen da, lehena puzzle bat egitea da, eta bigarren zatian hitzak lotu behar dira dagozkien laukitxoetan. Hori guztia denbora zehatz bati jarraituz.', 
 ' Durangoko Santa Ana plazan kokatua. 1556ean sortua eta kontserbatzen den bakarra.  "Merkatuko portalea" esaten zioten lehen, bertatik sartzen zirelako durangarrak salgaiak ornitzeko eta asetzeko. 1743ean Juan de Herdoizak berritu zuen, estilo barroko batekin ordeztuz..', 43.1657721, -2.6320561, 
 '../../assets/images/4Ariketa.jpeg', NULL, NULL, 90, 'Puzzle'),

(5, 5, 'Pinondo Plaza', 
 'Joko honetan izenen bikoteak batu beharko dituzu izaki mitologikoen irudiekin, begiratu bideoari ezer baino lehen bakoitza ezagutzeko.', NULL, 43.1649113, -2.6324657, 
 '../../assets/images/5Ariketa.jpeg', NULL, '../../assets/videos/5Ariketa.mp4', 90, 'MatchPairs');

-- Insertar datos en Quiz
INSERT OR IGNORE INTO Quiz (id, sentence, img, answer)
VALUES
(1, 'Durangoko Azoka euskal kirolariekin solasean...', '../../assets/images/Quiz1.png', 0),
(2, 'Lehen edizioa Gerediaga Elkarteak antolatu zuen.', '../../assets/images/Quiz2.png', 1),
(3, 'Azokaren helburua nazioarteko liburugintza...', '../../assets/images/Quiz3.png', 0),
(4, 'Elizpean antolatu ondoren...', '../../assets/images/Quiz4.png', 0),
(5, 'Azoka nagusiaz gain...', '../../assets/images/Quiz5.png', 1);

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
(1, 'tart', '../../assets/images/tart.png'),
(2, 'sagar', '../../assets/images/sagar.png'),
(3, 'ardoa', '../../assets/images/ardoa.png'),
(4, 'gazta', '../../assets/images/gazta.png'),
(5, 'ogia', '../../assets/images/ogia.png');

-- Insertar datos en Progress
INSERT OR IGNORE INTO Progress (location_id, completed)
VALUES
(1, 1),
(2, 0),
(3, 1),
(4, 0),
(5, 1);
