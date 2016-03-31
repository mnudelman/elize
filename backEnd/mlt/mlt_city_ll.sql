-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Мар 29 2016 г., 11:22
-- Версия сервера: 5.1.40-community
-- Версия PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `multy`
--

-- --------------------------------------------------------

--
-- Структура таблицы `mlt_city_ll`
--

CREATE TABLE IF NOT EXISTS `mlt_city_ll` (
  `cityid` int(10) unsigned NOT NULL,
  `lat` float NOT NULL,
  `long` float NOT NULL,
  PRIMARY KEY (`cityid`)
) ENGINE=MyISAM DEFAULT CHARSET=cp1251;

--
-- Дамп данных таблицы `mlt_city_ll`
--

INSERT INTO `mlt_city_ll` (`cityid`, `lat`, `long`) VALUES
(1, 55.1544, 61.4297),
(174, 53.3974, 58.9795),
(2, 54.7852, 56.0456),
(56, 51.7727, 55.0988),
(66, 56.8575, 60.6125),
(72, 57.1522, 65.5272),
(186, 60.9344, 76.5531),
(286, 61.25, 73.4167),
(45, 55.45, 65.3333),
(59, 58.0174, 56.2855),
(474, 55.1736, 59.6546),
(54, 55.0415, 82.9346),
(24, 56.0097, 92.7917),
(42, 55.3333, 86.0833),
(55, 55, 73.4),
(70, 56.5, 84.9667),
(38, 52.2978, 104.296),
(22, 53.3606, 83.7636),
(19, 53.7156, 91.4292),
(142, 53.7557, 87.1099),
(75, 52.0333, 113.55),
(25, 43.1056, 131.874),
(27, 48.4808, 135.093),
(41, 53.0452, 158.648),
(77, 55.7522, 37.6156),
(78, 59.8944, 30.2642),
(63, 53.2, 50.15),
(39, 54.7065, 20.511),
(71, 54.2044, 37.6111),
(68, 52.7317, 41.4339),
(58, 53.2007, 45.0046),
(73, 54.3333, 48.4),
(36, 51.672, 39.1843),
(61, 47.2356, 39.7122),
(23, 45.0488, 38.9725),
(34, 48.7194, 44.5018),
(64, 51.5667, 46.0333),
(52, 56.3287, 44.002),
(16, 55.7887, 49.1221),
(274, 55.045, 60.1083),
(62, 54.6269, 39.6916),
(163, 53.5198, 49.4048),
(18, 56.85, 53.2333),
(76, 57.6299, 39.8737),
(116, 55.7254, 52.4112),
(48, 52.6031, 39.5708),
(29, 55.4833, 36.4),
(322, 53.3917, 83.9363),
(30, 46.3497, 48.0408),
(31, 50.6107, 36.5802),
(32, 53.2521, 34.3717),
(33, 56.1366, 40.3966),
(134, 48.7858, 44.7797),
(35, 59.2187, 39.8886),
(37, 56.9972, 40.9714),
(12, 56.6388, 47.8908),
(40, 54.5293, 36.2754),
(43, 58.5966, 49.6601),
(44, 57.7665, 40.9269),
(46, 51.7373, 36.1874),
(51, 68.9792, 33.0925),
(166, 57.9242, 59.9658),
(57, 52.9651, 36.0785),
(222, 51.5, 81.25),
(10, 61.7849, 34.3469),
(13, 54.1838, 45.1749),
(67, 54.7818, 32.0401),
(123, 43.5992, 39.7257),
(26, 45.0428, 41.9734),
(102, 53.6246, 55.9501),
(161, 47.2362, 38.8969),
(69, 56.8619, 35.8931),
(3, 51.826, 107.61),
(21, 56.1322, 47.2519),
(135, 59.1333, 37.9),
(14, 62.0339, 129.733),
(374, 55.1008, 61.6589),
(95, 43.3083, 45.7003),
(266, 56.4133, 61.9259),
(156, 51.203, 58.3266),
(256, 51.2049, 58.5668),
(366, 56.9053, 59.9436),
(202, 53.3837, 55.9077),
(172, 58.2, 68.2667),
(159, 59.4152, 56.8124),
(302, 56.092, 54.2703),
(402, 54.75, 55.4667),
(145, 56.0825, 63.6436),
(122, 52.5364, 85.2072),
(60, 57.8136, 28.3496),
(11, 61.6764, 50.8099),
(124, 69.3535, 88.2027),
(223, 44.7244, 37.7675),
(323, 43.429, 39.9239),
(423, 44.9892, 41.1234),
(7, 43.4981, 43.6189),
(5, 42.9764, 47.5024),
(138, 56.1325, 101.614),
(238, 52.5367, 103.886),
(216, 54.9044, 52.3154),
(338, 58.0006, 102.662),
(438, 52.7519, 103.645),
(538, 53.1561, 103.067),
(119, 53.8236, 91.2842),
(316, 55.6366, 51.8245),
(416, 55.8438, 48.5178),
(516, 54.5378, 52.7985),
(616, 55.7613, 52.0649),
(716, 54.6026, 52.4609),
(816, 55.3631, 50.6424),
(152, 56.2389, 43.4631),
(252, 55.3949, 43.8399),
(352, 54.9358, 43.3235),
(452, 56.3581, 44.0748),
(552, 56.1473, 44.1979),
(652, 55.9686, 43.0912),
(752, 55.3175, 42.1744),
(852, 56.4906, 43.5919),
(523, 46.7055, 38.2739),
(623, 45.4375, 40.5756),
(723, 45.2558, 38.1256),
(823, 44.1053, 39.0802),
(923, 45.8547, 40.1253),
(1023, 44.6342, 40.7356),
(1123, 44.9293, 37.9912),
(1223, 44.8908, 37.3239),
(1323, 44.7673, 39.8742),
(1423, 45.6169, 38.9453),
(1523, 44.5622, 38.0848),
(125, 42.8333, 132.895),
(225, 43.8025, 132.009),
(325, 43.3675, 132.199),
(425, 44.1631, 133.273),
(224, 56.2694, 90.4993),
(324, 56.2017, 95.7175),
(424, 52.331, 35.3711),
(524, 56.1147, 94.5861),
(624, 53.7103, 91.6875),
(724, 58.2358, 92.4828),
(824, 56.0064, 90.3914),
(164, 51.5, 46.1167),
(264, 52.0278, 47.8007),
(364, 51.5502, 43.1667),
(464, 51.9863, 47.2434),
(177, 55.8094, 37.9581),
(277, 55.897, 37.4297),
(377, 55.4242, 37.5547),
(477, 55.9142, 37.8256),
(577, 55.9116, 37.7308),
(677, 55.6772, 37.8932),
(777, 55.0794, 38.7783),
(877, 55.7896, 38.4467),
(977, 55.678, 37.2777),
(1077, 55.744, 38.0168),
(1177, 54.9214, 37.4108),
(1277, 55.8067, 38.9618),
(1377, 55.8665, 38.4438),
(1477, 55.893, 38.0586),
(1577, 56.3, 38.1333),
(1677, 55.5953, 38.1203),
(1777, 55.8204, 37.3302),
(1877, 56.0172, 37.8667),
(1977, 55.3125, 38.6636),
(2077, 55.4413, 37.7537),
(2177, 55.5669, 38.2303),
(2277, 55.7611, 37.8575),
(2377, 55.9041, 37.5606),
(2477, 56.3333, 36.7333),
(2577, 55.1477, 37.4773),
(2677, 55.3875, 36.7331),
(2777, 56.0097, 37.4819),
(2877, 55.3828, 39.0323),
(2977, 54.9008, 38.0708),
(3077, 56.35, 37.5167),
(3177, 56.7333, 37.1667),
(3277, 55.7807, 38.6545),
(3377, 56.1833, 36.9833),
(3477, 55.9711, 37.9208),
(3577, 55.3635, 37.5298),
(3677, 55.5524, 37.7097),
(3777, 55.9606, 38.0456),
(3877, 55.5827, 37.9052),
(261, 47.7091, 40.2144),
(361, 47.4177, 40.0945),
(461, 47.5136, 42.1514),
(561, 47.7604, 39.9333),
(661, 47.1667, 39.7333),
(761, 48.3178, 40.2595),
(861, 47.1078, 39.4165),
(961, 48.0531, 39.9311),
(1061, 46.4747, 41.5411),
(1161, 48.3337, 39.9478),
(259, 59.6196, 56.7729),
(359, 56.7686, 54.1148),
(459, 58.1089, 57.8062),
(559, 57.4336, 56.9516),
(659, 58.0802, 55.7541),
(219, 53.0875, 91.3997),
(422, 53.7074, 84.9493),
(28, 50.2667, 127.533),
(128, 50.9158, 128.461),
(228, 51.4, 128.133),
(160, 56.34, 30.5452),
(118, 56.4763, 53.7978),
(218, 58.1394, 52.6584),
(318, 57.0486, 53.9872),
(418, 56.4447, 52.2276),
(195, 43.1286, 45.5431),
(105, 43.25, 46.5881),
(205, 42.0678, 48.2899),
(305, 42.8816, 47.6392),
(405, 42.819, 47.1192),
(505, 43.207, 46.8679),
(605, 42.5695, 47.8645),
(173, 54.2139, 49.6184),
(148, 52.6237, 38.5017),
(574, 55.7556, 60.7028),
(674, 55.485, 37.3074),
(774, 56.085, 60.7314),
(466, 59.6033, 60.5787),
(566, 57.2439, 60.0839),
(666, 57.0099, 61.4578),
(766, 56.4422, 60.1878),
(866, 56.801, 59.9303),
(966, 59.7666, 60.2086),
(1066, 56.9667, 60.5808),
(1166, 56.1464, 59.8641),
(1266, 56.9111, 60.7993),
(234, 50.0983, 45.416),
(334, 49.7703, 44.4188),
(242, 53.9059, 86.719),
(342, 54.6567, 86.1737),
(442, 53.6942, 88.0603),
(542, 53.99, 86.6621),
(642, 55.7231, 84.8861),
(742, 56.081, 86.0285),
(842, 54.4165, 86.2976),
(126, 44.0486, 43.0594),
(226, 43.9133, 42.7208),
(326, 44.6333, 41.9444),
(426, 44.0444, 42.8606),
(526, 44.2103, 43.1353),
(626, 44.1519, 43.4697),
(726, 44.7839, 44.1658),
(826, 45.1383, 41.9997),
(133, 56.3572, 41.3192),
(233, 55.5656, 42.0417),
(333, 56.3952, 38.7122),
(433, 55.6111, 40.6519),
(101, 44.6078, 40.1058),
(6, 43.2261, 44.765),
(106, 43.3211, 45.0522),
(502, 53.9757, 58.4306),
(602, 53.4545, 56.0415),
(702, 52.7216, 58.6647),
(802, 54.6067, 53.7097),
(902, 52.7667, 55.7833),
(1002, 52.9667, 55.9167),
(1102, 54.1167, 54.1167),
(386, 61.0998, 72.6035),
(86, 61.0042, 69.0019),
(486, 62.2586, 74.5013),
(586, 62.1406, 65.3936),
(686, 61.0296, 76.1136),
(263, 53.1585, 48.4681),
(363, 53.0959, 49.9462),
(463, 52.9771, 49.7086),
(563, 53.3997, 49.4953),
(171, 54.0105, 38.2846),
(271, 54.51, 37.08),
(371, 53.9711, 38.3363),
(471, 53.9884, 37.6291),
(571, 53.9818, 38.1712),
(356, 52.7807, 52.2635),
(456, 53.6554, 52.442),
(121, 56.111, 47.4776),
(89, 66.0833, 76.6333),
(189, 63.1994, 75.4507),
(140, 55.0968, 36.6101),
(176, 58.0446, 38.8426),
(129, 64.5627, 39.8339),
(229, 61.2575, 46.6496),
(170, 56.6006, 84.8864),
(111, 63.5671, 53.6835),
(211, 67.5, 64),
(272, 56.1128, 69.4902),
(9, 44.2233, 42.0578),
(8, 46.3078, 44.2558),
(65, 46.9581, 142.734),
(79, 48.8, 132.95),
(4, 51.9561, 85.955),
(107, 43.7574, 44.0297),
(112, 55.8664, 48.3594),
(114, 56.6709, 124.649),
(15, 43.0367, 44.6678),
(17, 51.7, 94.45),
(49, 59.5667, 150.8),
(53, 58.5167, 31.2833),
(153, 58.2958, 31.7882),
(3977, 55.485, 37.3074),
(154, 54.7551, 83.0967),
(254, 54.6366, 83.3045),
(178, 59.5764, 30.1283),
(278, 60.7076, 28.7528),
(378, 59.9, 29.1167),
(478, 59.6451, 33.5294),
(578, 59.4471, 32.0205),
(136, 51.3671, 42.0849),
(236, 51.1209, 38.5116),
(336, 50.9841, 39.5154),
(132, 52.7602, 32.2393),
(131, 51.2967, 37.8417),
(231, 51.2817, 37.5458),
(137, 57.4391, 42.1289),
(237, 56.8487, 41.3883),
(143, 58.5539, 50.0399),
(146, 52.331, 35.3711),
(151, 67.5641, 33.4031),
(251, 69.0689, 33.4162),
(157, 52.4253, 37.6069),
(158, 53.1167, 46.6004),
(258, 53.2036, 45.1923),
(874, 54.4469, 61.2642),
(167, 55.2104, 34.2951),
(267, 53.9528, 32.8639),
(367, 55.0667, 32.6667),
(168, 52.8978, 40.4907),
(169, 56.2624, 34.3282),
(269, 57.5913, 34.5645),
(369, 56.8667, 37.35),
(127, 50.552, 137.015),
(227, 50.2261, 136.899),
(175, 50.0979, 118.037),
(10001, 43.2808, 76.9123),
(10002, 49.8746, 73.1052),
(10003, 42.309, 69.6062),
(10004, 51.1518, 71.4801),
(10005, 42.8905, 71.3963),
(10006, 49.9667, 82.6188),
(10007, 52.3133, 76.9696),
(10106, 50.4095, 80.2758),
(10008, 50.2878, 57.1837),
(10009, 53.2207, 63.6355),
(10010, 54.88, 69.1516),
(10011, 51.2243, 51.4048),
(10102, 50.0649, 72.9779),
(10012, 47.1103, 51.9259),
(10013, 44.8503, 65.4973),
(10103, 43.2954, 68.2422),
(10014, 43.6447, 51.2301),
(10107, 51.7279, 75.3103),
(10104, 53.2843, 69.3928),
(10109, 52.9653, 63.1416),
(10202, 47.7905, 67.7186),
(10101, 45.021, 78.3761),
(10206, 50.3521, 83.5109),
(10113, 45.6098, 63.2835),
(10302, 46.8475, 74.9773),
(10402, 47.9024, 67.5421),
(10203, 43.5175, 68.5082),
(10204, 52.3522, 71.8835),
(10114, 43.3429, 52.8564),
(10502, 49.7082, 72.5878),
(20001, 52.0938, 23.685),
(20003, 53.1396, 26.0224),
(20006, 52.2123, 24.3567),
(20005, 52.1237, 26.0876),
(20007, 55.1915, 30.207),
(20008, 54.5132, 30.4144),
(20009, 55.5304, 28.6562),
(20010, 55.499, 28.7899),
(20011, 52.4319, 31.0109),
(20012, 52.0533, 29.2504),
(20013, 52.8934, 30.0264),
(20014, 52.6346, 29.7337),
(20015, 52.3641, 30.3993),
(20016, 52.1258, 29.3277),
(20017, 53.6776, 23.8242),
(20018, 53.896, 25.2823),
(20019, 53.0849, 25.3492),
(20020, 53.1506, 24.4507),
(20021, 53.8943, 30.3224),
(20022, 53.1366, 29.1995),
(20023, 54.2788, 30.9854),
(20024, 53.8829, 27.7174),
(20025, 54.2212, 28.5129),
(20026, 52.7879, 27.5419),
(20027, 54.3127, 26.8522),
(20028, 54.097, 28.3392),
(20029, 53.022, 27.5606),
(40001, 44.6175, 33.5246),
(40002, 44.9523, 34.0971),
(40003, 45.3524, 36.475),
(40004, 45.1909, 33.3673),
(40005, 44.499, 34.1688),
(40006, 45.0303, 35.3839),
(40007, 45.7096, 34.3878),
(40008, 49.2336, 28.4737),
(40009, 49.0425, 28.0993),
(40010, 50.7569, 25.3445),
(40011, 51.2132, 24.7098),
(40012, 50.7363, 24.1725),
(40013, 50.8482, 24.3221),
(40014, 48.4646, 35.0454),
(40015, 47.9051, 33.3932),
(40016, 48.5371, 34.5676),
(40017, 47.5668, 34.3981),
(40018, 48.5296, 35.894),
(40019, 48.6346, 35.2583),
(40020, 48.3456, 33.5044),
(40021, 47.6361, 34.6255),
(40022, 47.6563, 34.1024),
(40023, 48.0161, 37.8019),
(40024, 48.6042, 38.0074),
(40025, 48.0414, 38.1455),
(40026, 48.8476, 37.6295),
(40027, 48.2312, 38.2052),
(40028, 48.7384, 37.5863),
(40029, 48.3223, 38.1349),
(40030, 48.1347, 37.7522),
(40031, 48.128, 37.8726),
(40032, 48.041, 37.9641),
(40033, 47.0971, 37.548),
(40034, 48.3366, 38.4054),
(40035, 48.2942, 37.2781),
(40036, 48.148, 37.2987),
(40037, 48.0657, 38.4531),
(40038, 48.4695, 37.0829),
(40039, 48.6207, 37.5276),
(40040, 48.037, 38.7515),
(40041, 48.2807, 37.1735),
(40042, 48.3841, 37.8531),
(40043, 48.5261, 37.7042),
(40044, 48.0335, 38.6184),
(40045, 50.2546, 28.6574),
(40046, 49.8916, 28.5993),
(40047, 50.9496, 28.6408),
(40048, 50.5833, 27.6202),
(40049, 48.6259, 22.2884),
(40050, 48.4417, 22.7196),
(40051, 48.1738, 23.2895),
(40052, 47.8395, 35.1396),
(40053, 46.8434, 35.3563),
(40054, 46.7558, 36.789),
(40055, 47.5001, 34.6558),
(40056, 48.9228, 24.7094),
(40057, 49.0445, 24.362),
(40058, 48.5406, 25.0339),
(40059, 50.4511, 30.5223),
(40060, 49.8055, 30.1209),
(40061, 50.5086, 30.7883),
(40062, 50.52, 30.2443),
(40063, 50.3484, 30.9529),
(40064, 50.0743, 29.9078),
(40065, 48.5104, 32.2665),
(40066, 48.666, 33.0749),
(40067, 49.0499, 33.235),
(40068, 48.5721, 39.3076),
(40069, 48.4682, 38.7923),
(40070, 48.1302, 39.1062),
(40071, 48.5139, 38.6623),
(40072, 48.1398, 38.9304),
(40073, 48.2941, 39.7343),
(40074, 48.9005, 38.4182),
(40075, 48.6281, 38.548),
(40076, 48.0686, 39.3444),
(40077, 49.0126, 38.3874),
(40078, 48.0587, 39.6572),
(40079, 48.9588, 38.4952),
(40080, 48.5604, 38.6435),
(40081, 49.8422, 24.0312),
(40082, 49.3518, 23.5053),
(40083, 50.3866, 24.2305),
(40084, 49.2584, 23.8409),
(40085, 46.965, 31.9876),
(40086, 48.6281, 38.548),
(40087, 47.8216, 31.1749),
(40088, 46.4695, 30.7398),
(40089, 45.3501, 28.8467),
(40090, 46.2978, 30.6458),
(40091, 46.1886, 30.3366),
(40092, 47.742, 29.5351),
(40093, 49.5898, 34.5508),
(40094, 49.0671, 33.4113),
(40095, 49.0107, 33.6371),
(40096, 50.0162, 32.9887),
(40097, 49.9632, 33.6166),
(40098, 50.6198, 26.2508),
(40099, 51.3443, 25.8512),
(40100, 50.912, 34.8029),
(40101, 51.24, 33.2015),
(40102, 51.8701, 33.4819),
(40103, 50.3134, 34.8989),
(40104, 50.7445, 33.4842),
(40105, 49.5536, 25.5945),
(40106, 50.0062, 36.2283),
(40107, 48.8894, 36.3113),
(40108, 49.7016, 37.6133),
(40109, 49.1958, 37.2803),
(40110, 46.6403, 32.6139),
(40111, 46.7506, 33.3613),
(40112, 46.7997, 33.4949),
(40113, 49.42, 26.9787),
(40114, 48.6864, 26.5911),
(40115, 50.1795, 27.0619),
(40116, 49.4447, 32.0594),
(40117, 48.763, 30.2158),
(40118, 49.2338, 31.8827),
(40119, 51.4911, 31.2984),
(40120, 51.0415, 31.8804),
(40121, 50.5855, 32.3921),
(40122, 48.2923, 25.9349);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
