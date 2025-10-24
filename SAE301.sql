-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Час створення: Жов 24 2025 р., 12:51
-- Версія сервера: 10.11.14-MariaDB-0+deb12u2
-- Версія PHP: 8.3.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База даних: `mishcherikova1`
--

-- --------------------------------------------------------

--
-- Структура таблиці `Category`
--

CREATE TABLE `Category` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Дамп даних таблиці `Category`
--

INSERT INTO `Category` (`id`, `name`) VALUES
(1, 'Vinyles'),
(2, 'Merch'),
(3, 'Accessoires');

-- --------------------------------------------------------

--
-- Структура таблиці `Gallery`
--

CREATE TABLE `Gallery` (
  `id_gallery` int(11) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `Gallery`
--

INSERT INTO `Gallery` (`id_gallery`, `image`, `id_product`) VALUES
(2, 'Sabrina-Carpenter-Man\'s-Best-Friend-Vinyle-Luxe-Packaging-cover.webp', 1),
(3, 'Sabrina-Carpenter-Man\'s-Best-Friend-Vinyle-Luxe-Packaging-vinyl2.webp', 1),
(4, 'Sabrina-Carpenter-Man\'s-Best-Friend-Vinyle-Luxe-Packaging-vinyl3.webp', 1),
(5, 'I-Swear-They-Choose-Me-T-Shirt.webp', 4),
(6, 'I-Swear-They-Choose-Me-T-Shirt-side.jpg', 4),
(7, 'I-Swear-They-Choose-Me-T-Shirt-back.png', 4),
(39, 'Manchild-Patch-Casquette.webp', 5),
(40, 'Manchild-Patch-Casquette-side.jpg', 5),
(41, 'Manchild-Patch-Casquette-back.jpg', 5),
(42, 'Songkick-Poster.webp', 6),
(43, 'Songkick-Poster-green.jpg', 6),
(44, 'Songkick-Poster-white.jpg', 6),
(45, 'Kit-de-nettoyage-2-en-1-pour-disques-vinyle.jpg', 7),
(46, 'Kit-de-nettoyage-2-en-1-pour-disques-vinyle-utils.jpg', 7),
(47, 'Kit-de-nettoyage-2-en-1-pour-disques-vinyle-brosse.jpg', 7),
(48, 'Platine-vinyle-Bluetooth-Audio-Technica-AT-LP-120XBT-USB-Noir.webp', 8),
(49, 'Platine-vinyle-Bluetooth-Audio-Technica-AT-LP-120XBT-USB-Noir-top.jpg', 8),
(50, 'Platine-vinyle-Bluetooth-Audio-Technica-AT-LP-120XBT-USB-Noir-disk.jpg', 8),
(51, 'Platine-vinyle-Sony-PS-LX310-BT.webp', 9),
(52, 'Platine-vinyle-Sony-PS-LX310-BT-top.jpg', 9),
(53, 'Platine-vinyle-Sony-PS-LX310-BT-detail.jpg', 9),
(54, 'Various-Artist-Almost-Famous-Double-Vinyle-Violet&Magenta-Exclusif.webp', 2),
(55, 'Various-Artist-Almost-Famous-Double-Vinyle-Violet&Magenta-Exclusif-cover.jpg', 2),
(56, 'Various-Artist-Almost-Famous-Double-Vinyle-Violet&Magenta-Exclusif-tracklist.webp', 2),
(57, 'KPop-Demon-Hunters-(Soundtrack-from-the-Netflix-Film)-Vinyle-Smokey-Fushia-Exclusif.webp', 3),
(58, 'KPop-Demon-Hunters-(Soundtrack-from-the-Netflix-Film)-Vinyle-Smokey-Fushia-Exclusif-cover', 3),
(59, 'KPop-Demon-Hunters-(Soundtrack-from-the-Netflix-Film)-Vinyle-Smokey-Fushia-Exclusif-posters.webp', 3),
(60, 'The_Beatles_1964.webp', 32),
(61, 'The_Beatles_1964_cover.webp', 32),
(62, 'The_Beatles_1964_Coffret.jpg', 32),
(64, 'All_dolled-up-t-shirt.webp', 33),
(65, 'All_dolled-up-t-shirt-back.webp', 33),
(66, 'All_dolled-up-t-shirt-side.webp', 33),
(67, 'Le-Support-Vinyles-Taupe-Loia.webp', 34),
(68, 'Le-Support-Vinyles-Taupe-Loia-back.webp', 34),
(69, 'Le-Support-Vinyles-Taupe-Loia-side.webp', 34);

-- --------------------------------------------------------

--
-- Структура таблиці `OrderItems`
--

CREATE TABLE `OrderItems` (
  `id_order_item` int(10) UNSIGNED NOT NULL,
  `id_order` int(10) UNSIGNED NOT NULL,
  `id_product` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `price_unit` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблиці `Orders`
--

CREATE TABLE `Orders` (
  `id_order` int(10) UNSIGNED NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `total_amount` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблиці `Product`
--

CREATE TABLE `Product` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `category` int(11) NOT NULL,
  `price` decimal(7,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `artist` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `etat` text DEFAULT NULL,
  `special` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Дамп даних таблиці `Product`
--

INSERT INTO `Product` (`id`, `name`, `category`, `price`, `image`, `description`, `artist`, `label`, `country`, `year`, `genre`, `etat`, `special`) VALUES
(1, 'Sabrina Carpenter - Man\'s Best Friend - Vinyle Luxe Packaging (Exclusivité)', 1, '59.99', 'Sabrina-Carpenter -Man\'s Best -Friend-Vinyle-Luxe-Packaging.webp', 'Man\'s Best Friend est le dernier album de la popstar mondiale Sabrina Carpenter. Après avoir remporté un GRAMMY avec son projet Short n\' Sweet, de nombreux singles multi-platine ajoutés à son CV, le dernier album de Sabrina Carpenter contient son nouveau single \"Manchild\", disponible dès maintenant.', 'Sabrina Carpenter', 'Island Records / Universal (distribution)', 'États-Unis', 2025, 'Pop, country pop, dance-pop, R&B', 'Édition luxe exclusive, packaging premium avec détails en fausse fourrure, médaillon en forme de collier de chien au verso, pochette gatefold, insert avec la tracklist, poster, pochette vinyle avec crédits', 'Disque bleu irisé, assemblage unique (chaque exemplaire est produit de manière individuelle), emballage plastique protecteur en raison de la fragilité des éléments décoratifs'),
(2, 'Various Artist - Almost Famous - Double Vinyle Violet & Magenta Exclusif', 1, '34.99', 'Various-Artist-Almost-Famous-Double-Vinyle-Violet&Magenta-Exclusif.webp', 'ande originale du film oscarisé de Cameron Crowe. Avec des chansons de Led Zeppelin, The Who, Elton John, Simon and Garfunkel, The Beach Boys, Todd Rundgren, Rod Stewart, The Seeds, The Allman Brothers Band, Lynyrd Skynyrd, David Bowie, Clarence Carter, Cat Stevens, Thunderclap Newman, la bande originale de Nancy Wilson et « Fever Dog » du groupe fictif Stillwater. Maintenant disponible en édition limitée sur vinyle violet et magenta.', 'Various Artist', 'DreamWorks / Universal', 'États-Unis', 2000, 'Rock, Pop, Soundtrack', 'Double vinyle violet & magenta exclusif, pochette gatefold, insert avec photos du film et crédits', 'Vinyle translucide violet/magenta, pressage limité'),
(3, 'KPop Demon Hunters (Soundtrack from the Netflix Film) - Vinyle Smokey Fushia Exclusif', 1, '29.99', 'KPop-Demon-Hunters-(Soundtrack-from-the-Netflix-Film)-Vinyle-Smokey-Fushia-Exclusif.webp', 'KPop Demon Hunters, un film Netflix de Sony Pictures Animation, suit les superstars de la Kpop Rumi, Mira et Zoey. Lorsqu\'elles ne remplissent pas des stades, elles utilisent leurs identités secrètes de chasseuses de démons pour protéger leurs fans d\'une menace surnaturelle omniprésente. Ensemble, elles doivent affronter leur plus grand ennemi : un irrésistible boys band rival composé de démons déguisés. KPop Demon Hunters met en vedette Arden Cho, Ahn Hyo-seop, May Hong et Ji-young Yoo, et est sorti sur Netflix le 20 juin 2025. La bande originale de KPop Demon Hunters comprend la nouvelle chanson « TAKEDOWN » avec Jeongyeon, Jihyo et Chaeyoung du groupe de filles de K-pop TWICE.', 'Divers Artistes (Bande originale du film)', 'Netflix / Sony Pictures', 'Corée du Sud', 2024, 'K-pop, Soundtrack', 'Vinyle smokey fushia exclusif, édition spéciale Netflix', 'Pochette collector, insert avec crédits, poster exclusif'),
(4, 'I Swear They Choose Me T-Shirt', 2, '40.99', 'I-Swear-They-Choose-Me-T-Shirt.webp', 'T-shirt unisexe jaune avec les inscriptions « Manchild » et « I Swear They Choose Me », avec un motif SC, un cœur et une voiture imprimés sur le devant.\n\nCe produit est un rendu numérique et est présenté à titre d\'illustration uniquement. Les détails du produit peuvent varier.', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'Manchild Patch Casquette', 2, '40.00', 'Manchild-Patch-Casquette.webp', 'Half your brain just aint there..but we can\'t tell with this hat on!\n\nCasquette trucker déstructurée bleu marine et pierre, ornée d\'un patch « Manchild » sur le devant.\n\nCe produit est présenté sous forme numérique et à titre d\'illustration uniquement. Les détails du produit peuvent varier.', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'Songkick Poster', 2, '15.99', 'Songkick-Poster.webp', 'The Twenty One Pilots ‘Songkick Poster’ 18x24. ', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'Kit de nettoyage 2 en 1 pour disques vinyle', 3, '14.99', 'Kit-de-nettoyage-2-en-1-pour-disques-vinyle.jpg', 'Kit-de-nettoyage-2-en-1-pour-disques-vinyle.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'Platine vinyle Bluetooth Audio-Technica AT-LP-120XBT-USB Noir', 3, '359.00', 'Platine-vinyle-Bluetooth-Audio-Technica-AT-LP-120XBT-USB-Noir.webp', 'Développez votre expérience d’écoute avec la connectivité sans fil Bluetooth\nCette version actualisée de la platine disques se compose d’un nouveau servomoteur à entraînement direct CC ainsi que d’un contrôle antipatinage dynamique réglable et d’un préamplificateur phono sélectionnable.\nLa platine disques entièrement manuelle possède trois vitesses de lecture 33-1/3, 45 et 78 tours, une connexion Bluetooth pratique et est équipée d’une sortie USB qui permet de la brancher directement à un ordinateur.', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'Platine vinyle Sony PS-LX310 BT', 3, '249.00', 'Platine-vinyle-Sony-PS-LX310-BT.webp', 'Revivez l\'expérience indémodable du vinyle avec des commandes simples et une connectivité Bluetooth stable. Grâce au lecteur de disques vinyle PS-LX310BT, vous bénéficiez d\'un son naturel et clair, que vous écoutiez vos anciens vinyles préférés ou que vous partagiez une superbe réédition avec votre famille.\nLa platine est conçue dans un style minimaliste pour un contrôle aisé, avec une lecture automatique en une seule étape. Choisissez vos disques préférés et profitez de votre musique.', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(32, 'The Beatles - The Beatles: 1964 Albums In Mono - Coffret 8LP\r\n', 1, '275.00', 'The_Beatles_1964.webp', '1964 est l\'année où les États-Unis sont tombés amoureux des Beatles, avec une série sans précédent d\'albums et de singles en tête des hit-parades et vendus à des millions d\'exemplaires. Mais ces albums ne sont pas de simples répliques des albums de 1963 et 1964 publiés par Parlophone au Royaume-Uni et dans le reste du monde. Voyant une autre opportunité, Capitol Records et United Artists ont compilé ces albums pour les sortir aux États-Unis entre janvier 1964 et mars 1965.\r\n \r\nPour célébrer cette année mémorable où la Beatlemania a explosé aux États-Unis, sept albums des Beatles sont rassemblés dans un nouveau coffret vinyle 8LP spectaculaire. Meet The Beatles, The Beatles\' Second Album, A Hard Day\'s Night (Original Motion Picture Sound Track), Something New, The Beatles\' Story (2LP), Beatles \'65 et The Early Beatles comportent tous des illustrations fidèlement reproduites et de nouveaux encarts de quatre panneaux contenant des essais rédigés par l\'historien et auteur américain Bruce Spizer. Les nouvelles laques vinyles des albums ont été gravées par Kevin Reeves aux East Iris Studios de Nashville en se référant constamment aux premiers pressages vinyles originaux afin de s\'assurer qu\'elles sont fidèles à la version originale, tout en permettant d\'entendre plus d\'informations musicales que ce qui était possible auparavant. Pressage audiophile de 180 grammes. Le disque The Beatles\' Story 2LP est exclusif au coffret.', 'The Beatles', 'Apple Corps Ltd. / Capitol Records / UMG International', 'États-Unis', 2024, 'Pop Rock / Rock & Roll / Beat', 'Nouveau', 'Comprend 7 albums américains de 1964, dont un (The Beatles’ Story) — exclusivement pour cet ensemble'),
(33, 'All Dolled Up T-Shirt', 2, '30.95', 'All_dolled-up-t-shirt.webp', 'Sortons en ville dans ce super T-shirt All Dolled Up !', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(34, 'Le Support Vinyles Taupe - Loia', 3, '39.00', 'Le-Support-Vinyles-Taupe-Loia.webp', 'Compact and versatile, the Loia Vinyl Stand can be positioned on a piece of furniture or wall-mounted, showcasing your favorite vinyls or listening to them. Its meticulous design, combined with French craftsmanship, offers a practical and aesthetic solution for all vinyl enthusiasts.', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблиці `Users`
--

CREATE TABLE `Users` (
  `id_user` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `secondName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `Users`
--

INSERT INTO `Users` (`id_user`, `email`, `password`, `firstName`, `secondName`) VALUES
(22, 'mishcherikova.alina@gmail.com', '$2y$10$Eo2j.MtLCcfI67CU9wGaoeWCYAxNvEGIeFy0Sa2nuDdp6fz2t6Jb6', 'Alina', 'Mishcherikova'),
(23, 'oleg.l@urk.net', '$2y$10$MKtHHw7KsaxgR3fa.aRi6e1bM.wOf6vlFkLuEbSOf.L6RlW2gmLvu', 'oleg', 'mishcherikov'),
(25, 'azerty@gmail.com', '$2y$10$0mdUb8VP4ORWWTdu8WMTseFe4sYvUvVNpGRJIreCpvGxOOOqE.RKO', 'azerty', 'azerty'),
(26, 'test@gmail.com', '$2y$10$/QMYOnJhuEs2C6b3x7gNweLNdUQfDaILdhYl0zHqOclGwJmU8e10e', 'test', 'test');

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `Gallery`
--
ALTER TABLE `Gallery`
  ADD PRIMARY KEY (`id_gallery`),
  ADD KEY `Galerry_ibfk_1` (`id_product`);

--
-- Індекси таблиці `OrderItems`
--
ALTER TABLE `OrderItems`
  ADD PRIMARY KEY (`id_order_item`),
  ADD KEY `id_order` (`id_order`);

--
-- Індекси таблиці `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `id_user` (`id_user`);

--
-- Індекси таблиці `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`);

--
-- Індекси таблиці `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `Category`
--
ALTER TABLE `Category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблиці `Gallery`
--
ALTER TABLE `Gallery`
  MODIFY `id_gallery` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT для таблиці `OrderItems`
--
ALTER TABLE `OrderItems`
  MODIFY `id_order_item` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблиці `Orders`
--
ALTER TABLE `Orders`
  MODIFY `id_order` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблиці `Product`
--
ALTER TABLE `Product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT для таблиці `Users`
--
ALTER TABLE `Users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Обмеження зовнішнього ключа збережених таблиць
--

--
-- Обмеження зовнішнього ключа таблиці `Gallery`
--
ALTER TABLE `Gallery`
  ADD CONSTRAINT `Gallery_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `Product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Обмеження зовнішнього ключа таблиці `OrderItems`
--
ALTER TABLE `OrderItems`
  ADD CONSTRAINT `OrderItems_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `Orders` (`id_order`);

--
-- Обмеження зовнішнього ключа таблиці `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `Users` (`id_user`);

--
-- Обмеження зовнішнього ключа таблиці `Product`
--
ALTER TABLE `Product`
  ADD CONSTRAINT `category` FOREIGN KEY (`category`) REFERENCES `Category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
