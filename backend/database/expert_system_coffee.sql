-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2025 at 04:31 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `expert_system_coffee`
--

-- --------------------------------------------------------

--
-- Table structure for table `cirivariabel`
--

CREATE TABLE `cirivariabel` (
  `id` int(11) NOT NULL,
  `kode` varchar(191) NOT NULL,
  `ciri` text NOT NULL,
  `id_variabel` int(11) NOT NULL,
  `pasca_panen` varchar(191) NOT NULL,
  `bobot` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cirivariabel`
--

INSERT INTO `cirivariabel` (`id`, `kode`, `ciri`, `id_variabel`, `pasca_panen`, `bobot`) VALUES
(35, 'CK01', 'Aroma menjadi lebih intens dan kaya setelah tahapan break (4 menit setelah terkena air panas)', 1, 'Umum', 80),
(36, 'CK02', 'Aroma cenderung tetap sama seperti saat pertama terkena air panas tanpa adanya peningkatan intensitas maupun variasi aroma yang signifikan saat tahapan break (4 menit setelah terkena air panas)', 2, 'Umum', 70),
(37, 'CK03', 'Rasa asam yang lembut seperti asam stroberi, plum, blueberry, atau winelike acidity', 3, 'Natural', 0),
(38, 'CK04', 'Rasa asam yang seimbang dan cenderung seperti asam aprikot, peach, madu, atau buah tropis', 4, 'Honey', 0),
(39, 'CK05', 'Rasa asam yang tajam seperti asam citrus (jeruk, lemon) dan apel hijau', 5, 'Washed', 0),
(40, 'CK06', 'Meninggalkan jejak rasa tebal yang lebih lama di mulut', 6, 'Umum', 80),
(41, 'CK07', 'Meninggalkan kesan rasa sweetness yang tebal dan lama di mulut', 6, 'Umum', 90),
(42, 'CK08', 'Terasa lebih ringan di mulut dengan sensasi kurang tebal', 7, 'Umum', 70),
(43, 'CK09', 'Tidak meninggalkan jejak rasa yang lama', 7, 'Umum', 60),
(44, 'CK10', 'Rasa yang ditinggalkan halus dan tidak mengganggu di mulut', 8, 'Umum', 80),
(45, 'CK11', 'Rasa yang ditinggalkan menonjolkan nuansa manis, floral, atau fruity yang tidak mendominasi', 8, 'Umum', 90),
(46, 'CK12', 'Rasa yang ditinggalkan cenderung tidak harmonis misalnya rasa asam yang lebih mendominasi ataupun pahit berlebih', 9, 'Umum', 60),
(47, 'CK13', 'Rasa yang ditinggalkan cenderung lebih cepat di mulut', 9, 'Umum', 70),
(48, 'CK14', 'Rasa /flavor menampilkan beragam elemen rasa yang terasa secara bertahan dan berlapis-lapis', 10, 'Umum', 80),
(49, 'CK15', 'Memiliki kombinasi rasa yang kaya seperti buah-buahan, floral, rempah, dan manis', 10, 'Umum', 90),
(50, 'CK16', 'Rasa/flavor memiliki lapisan rasa yang sedikit dan cenderung lebih dominan pada salah satu rasa misalnya asam atau manis', 11, 'Umum', 70),
(51, 'CK17', 'Rasa yang ada cenderung tidak banyak berubah dari awal sampai akhir tegukan', 11, 'Umum', 60),
(52, 'CK18', 'Memiliki rasa yang konsisten pada setiap seduhan', 12, 'Umum', 90),
(53, 'CK19', 'Rasa dari setiap seduhan berubah ubah atau tidak konsisten', 13, 'Umum', 60),
(54, 'CK20', 'Memiliki rasa pahit, manis, dan asam yang seimbang tanpa adanya rasa yang lebih menonjol', 14, 'Umum', 80),
(55, 'CK21', 'Memiliki salah satu rasa yang lebih menonjol dibanding rasa lainnya', 15, 'Umum', 70),
(56, 'CK22', 'Rasa kopi terbebas dari rasa asing, memiliki rasa yang jernih, murni dan tidak ada elemen yang mengganggu', 16, 'Umum', 90),
(57, 'CK23', 'Air, wadah, dan kelengkapan yang digunakan steril dan bersih', 16, 'Umum', 80),
(58, 'CK24', 'Menandakan adanya kontaminasi rasa, seperti rasa tanah atau jamur', 17, 'Umum', 60),
(59, 'CK25', 'Air, wadah, dan kelengkapan yang digunakan tidak steril atau kotor', 17, 'Umum', 70),
(60, 'CK26', 'Memiliki rasa manis yang intens dan cenderung seperti rasa manis buah (fruity)', 18, 'Natural', 80),
(61, 'CK27', 'Rasa manis yang dihasilkan terasa seperti manis stroberi, anggur, kismis', 18, 'Natural', 90),
(62, 'CK28', 'Memiliki rasa manis yang seimbang antara manis buah dan floral', 19, 'Honey', 80),
(63, 'CK29', 'Rasa manis yang dihasilkan seperti manis madu, peach, aprikot, atau karamel', 19, 'Honey', 90),
(64, 'CK30', 'Memiliki rasa manis yang terasa halus dan lembut seperti manis citrus', 20, 'Washed', 80),
(65, 'CK31', 'Rasa manis yang dihasilkan seperti manis apel hijau, bunga jeruk, atau teh bunga yang memberikan rasa manis yang ringan dan segar', 20, 'Washed', 90),
(66, 'CK32', 'Semua elemen dalam kopi memberikan pengalaman minum yang memuaskan', 21, 'Umum', 80),
(67, 'CK33', 'Memiliki kesan keseluruhan yang baik dari segi rasa, keseimbangan, dan konsistensi', 21, 'Umum', 90),
(68, 'CK34', 'Memiliki kesan yang kurang memuaskan seperti rasa yang tidak seimbang dan konsistensi yang buruk', 22, 'Umum', 70);

-- --------------------------------------------------------

--
-- Table structure for table `hasilpengujian`
--

CREATE TABLE `hasilpengujian` (
  `id` int(11) NOT NULL,
  `date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `id_user` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `output` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hasilpengujian`
--

INSERT INTO `hasilpengujian` (`id`, `date`, `id_user`, `score`, `output`) VALUES
(1, '2025-04-08 07:38:39.152', 1, 80, 'Memuaskan'),
(2, '2025-04-14 07:13:12.811', 1, 80, 'Memuaskan'),
(3, '2025-04-15 05:04:26.781', 1, 80, 'Memuaskan'),
(4, '2025-04-15 05:06:27.695', 1, 80, 'Memuaskan'),
(5, '2025-04-15 05:07:27.803', 1, 80, 'Memuaskan'),
(6, '2025-04-15 05:08:56.067', 1, 80, 'Memuaskan');

-- --------------------------------------------------------

--
-- Table structure for table `pengujian`
--

CREATE TABLE `pengujian` (
  `id` int(11) NOT NULL,
  `id_ciriVariabel` int(11) NOT NULL,
  `id_hasilPengujian` int(11) NOT NULL,
  `form` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pengujian`
--

INSERT INTO `pengujian` (`id`, `id_ciriVariabel`, `id_hasilPengujian`, `form`) VALUES
(1, 35, 1, 80),
(2, 37, 1, 60),
(3, 40, 1, 80),
(4, 44, 1, 80),
(5, 48, 1, 80),
(6, 52, 1, 90),
(7, 54, 1, 80),
(8, 56, 1, 90),
(9, 60, 1, 80),
(10, 66, 1, 80),
(11, 35, 2, 80),
(12, 38, 2, 60),
(13, 40, 2, 80),
(14, 44, 2, 80),
(15, 48, 2, 80),
(16, 52, 2, 90),
(17, 54, 2, 80),
(18, 56, 2, 90),
(19, 62, 2, 80),
(20, 66, 2, 80),
(21, 35, 5, 80),
(22, 35, 6, 80),
(23, 39, 6, 60),
(24, 40, 6, 80),
(25, 44, 6, 80),
(26, 48, 6, 80),
(27, 52, 6, 90),
(28, 54, 6, 80),
(29, 56, 6, 90),
(30, 64, 6, 80),
(31, 66, 6, 80);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `isAdmin`) VALUES
(1, 'nicky', 'nicky@gmail.com', '$2b$10$uv1bSR2i9aYQ1mIWW0yK5OqcWoBYjN4Pg.zWfsuXHYOZ.bRJ4W7HW', 0);

-- --------------------------------------------------------

--
-- Table structure for table `variabel`
--

CREATE TABLE `variabel` (
  `id` int(11) NOT NULL,
  `kode` varchar(191) NOT NULL,
  `variabel` varchar(191) NOT NULL,
  `pasca_panen` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `variabel`
--

INSERT INTO `variabel` (`id`, `kode`, `variabel`, `pasca_panen`) VALUES
(1, 'K01', 'Fragrance/Aroma Kompleks', 'Umum'),
(2, 'K02', 'Fragrance/Aroma Sederhana', 'Umum'),
(3, 'K03', 'Natural Acid', 'Natural'),
(4, 'K04', 'Honey Acid', 'Honey'),
(5, 'K05', 'Washed Acid', 'Washed'),
(6, 'K06', 'Body Heavy', 'Umum'),
(7, 'K07', 'Body Thin', 'Umum'),
(8, 'K08', 'Aftertaste nyaman', 'Umum'),
(9, 'K09', 'Aftertaste tidak nyaman', 'Umum'),
(10, 'K10', 'Flavor kompleks', 'Umum'),
(11, 'K11', 'Flavor non-kompleks', 'Umum'),
(12, 'K12', 'Uniformity/Keseragaman konsisten', 'Umum'),
(13, 'K13', 'Uniformity/Keseragaman non-konsisten', 'Umum'),
(14, 'K14', 'Balance/Keseimbangan rasa baik', 'Umum'),
(15, 'K15', 'Balance/Keseimbangan rasa buruk', 'Umum'),
(16, 'K16', 'Clean Cup/ steril', 'Umum'),
(17, 'K17', 'Clean Cup/ non-steril', 'Umum'),
(18, 'K18', 'Natural Sweetness', 'Natural'),
(19, 'K19', 'Honey Sweetness', 'Honey'),
(20, 'K20', 'Washed Sweetness', 'Washed'),
(21, 'K21', 'Overall/Total keseluruhan baik', 'Umum'),
(22, 'K22', 'Overall/Total keseluruhan buruk', 'Umum');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cirivariabel`
--
ALTER TABLE `cirivariabel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CiriVariabel_id_variabel_fkey` (`id_variabel`);

--
-- Indexes for table `hasilpengujian`
--
ALTER TABLE `hasilpengujian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `HasilPengujian_id_user_fkey` (`id_user`);

--
-- Indexes for table `pengujian`
--
ALTER TABLE `pengujian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Pengujian_id_ciriVariabel_fkey` (`id_ciriVariabel`),
  ADD KEY `Pengujian_id_hasilPengujian_fkey` (`id_hasilPengujian`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `variabel`
--
ALTER TABLE `variabel`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cirivariabel`
--
ALTER TABLE `cirivariabel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `hasilpengujian`
--
ALTER TABLE `hasilpengujian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `pengujian`
--
ALTER TABLE `pengujian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `variabel`
--
ALTER TABLE `variabel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cirivariabel`
--
ALTER TABLE `cirivariabel`
  ADD CONSTRAINT `CiriVariabel_id_variabel_fkey` FOREIGN KEY (`id_variabel`) REFERENCES `variabel` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `hasilpengujian`
--
ALTER TABLE `hasilpengujian`
  ADD CONSTRAINT `HasilPengujian_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `pengujian`
--
ALTER TABLE `pengujian`
  ADD CONSTRAINT `Pengujian_id_ciriVariabel_fkey` FOREIGN KEY (`id_ciriVariabel`) REFERENCES `cirivariabel` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Pengujian_id_hasilPengujian_fkey` FOREIGN KEY (`id_hasilPengujian`) REFERENCES `hasilpengujian` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
